import { common, home } from './selectors'

export const waitForLoaderHidden = () =>
  cy.get('[role="progressbar"]').should('not.exist')

export const waitForModalLoaderHidden = () =>
  common.modalLoader.should('not.exist')

export const openLoginModal = () => {
  home.loginBtn.click()
  common.modalLoader.should('not.exist')
}

export const waitForBtnToBeEnabled = (
  el: Cypress.Chainable<JQuery<HTMLElement>>,
) => el.invoke('attr', 'tabindex').should('eq', '0')

// you can create .env file with own creds to test it

export const creds = {
  email: process.env.email ? process.env.email : 'testtwit@mailto.plus',
  username: process.env.username ? process.env.username : 'TestGuy288',
  password: process.env.password ? process.env.password : 'Test1est!',
}
