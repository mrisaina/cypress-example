import { creds, openLoginModal } from '../constants/common'
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
    // clear the state and delete messages from email
    deleteEmails(creds.email)

    // visit site and accept cookies
    cy.visit(Cypress.config('baseUrl'))
    common.acceptCookiesBtn.click()
  })

  it('fill the sign up form and check that the data is defined as valid', () => {
    const email = getRandomTempMail()

    home.signupBtn.click()
    common.modalLoader.should('not.exist')

    signup.username.type('TestUser')
    signup.email.type(email)
    selectBirthDate({ month: 'April', day: 20, year: 2000 })
    login.nextBtn.click()

    // submit another page
    cy.contains('Step 2 of 5').should('be.visible')
    login.nextBtn.click()

    // sign up
    signup.signupBtn.click()

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
    login.nextBtn.click()

    cy.contains('Send an email to').should('be.visible')
    login.nextBtn.click()

    getEmailCode(creds.email).then((code) => {
      cy.get('input[name="text"]').type(code)
      login.nextBtn.click()
      common.modalLoader.should('not.exist')
    })

    forgotPassword.newPassword.type(creds.password)
    forgotPassword.repeatNewPassword.type(creds.password)

    // wait for change password to be enabled
    forgotPassword.changePassword.invoke('attr', 'tabindex').should('eq', '0')
    forgotPassword.changePassword.click()

    cy.get('[name="single-choice"]').eq(2).click()
    login.nextBtn.click()

    forgotPassword.continueToTwitter.click()

    cy.location('pathname').should('eq', '/home')
  })
})
