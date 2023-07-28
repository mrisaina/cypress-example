import {
  creds,
  openLoginModal,
  waitForBtnToBeEnabled,
  waitForModalLoaderHidden,
} from '../constants/common'
import {
  common,
  forgotPassword,
  home,
  login,
  signup,
} from '../constants/selectors'
import { deleteEmails, getEmailCode, getRandomTempMail } from '../utils/email'
import { selectBirthDate } from '../utils/signup'

describe('twitter tests', () => {
  beforeEach(() => {
    // delete messages from email
    deleteEmails(creds.email)

    // visit site and accept cookies
    cy.visit(Cypress.config('baseUrl'))
    // common.acceptCookiesBtn.click()
  })

  it('fill the sign up form and check that the data is defined as valid', () => {
    const email = getRandomTempMail()

    home.signupBtn.click()
    waitForModalLoaderHidden()

    signup.username.type('TestUser')

    // phone registration proposed, use email intead
    cy.get('span').then((el) => {
      if (el.text() === 'Use email instead') {
        cy.contains('Use email instead').click()
      }
    })
    signup.email.type(email)
    selectBirthDate({ month: 'April', day: 20, year: 2000 })
    waitForBtnToBeEnabled(login.nextBtn)
    login.nextBtn.click()

    // submit another page
    cy.contains('Step 2 of 5').should('be.visible')
    login.nextBtn.click()

    // sign up
    login.greenCheckMark.eq(0).should('have.css', 'color', 'rgb(0, 186, 124)')
    login.greenCheckMark.eq(1).should('have.css', 'color', 'rgb(0, 186, 124)')
    login.greenCheckMark.eq(2).should('have.css', 'color', 'rgb(0, 186, 124)')

    // here's human verification
  })

  it('login into account', () => {
    cy.intercept('POST', 'https://api.twitter.com/1.1/onboarding/task.json').as(
      'loginReq',
    )
    openLoginModal()

    login.userNameEmailInput.type(creds.email)
    login.nextBtn.click()

    // sometimes twitter asks to enter username additionally
    cy.get('input').then((el) => {
      if (el.prop('name') === 'text') {
        login.username.type(creds.username)
        login.nextBtn.click()
      }
    })

    login.password.type(creds.password)
    waitForBtnToBeEnabled(login.loginBtn)
    login.loginBtn.click()

    // check that login req was successful and user was navigated to the home page
    cy.location('pathname').should('eq', '/home')
    cy.wait('@loginReq').then((req) =>
      expect(req.response.statusCode).to.eq(200),
    )
  })

  it('change password with valid data', () => {
    openLoginModal()

    login.forgotPasswordBtn.click()
    cy.location('pathname').should('contain', '/password_reset')

    forgotPassword.username.type(creds.username)
    waitForBtnToBeEnabled(login.nextBtn)
    login.nextBtn.click()

    cy.contains('Send an email to').should('be.visible')
    login.nextBtn.click()

    getEmailCode(creds.email).then((code) => {
      cy.get('input[name="text"]').type(code)
      waitForBtnToBeEnabled(login.nextBtn)
      login.nextBtn.click()
    })
    waitForModalLoaderHidden()

    forgotPassword.newPassword.type(creds.password)
    forgotPassword.repeatNewPassword.type(creds.password)

    // wait for change password to be enabled
    waitForBtnToBeEnabled(forgotPassword.changePassword)
    forgotPassword.changePassword.click()

    cy.get('[name="single-choice"]').eq(2).click()
    login.nextBtn.click()

    forgotPassword.continueToTwitter.click()

    cy.location('pathname').should('eq', '/home')
  })
})
