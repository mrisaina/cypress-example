import { common, home } from './selectors'

export const waitForLoaderHidden = () =>
  cy.get('[role="progressbar"]').should('not.exist')

export const openLoginModal = () => {
  home.loginBtn.click()
  common.modalLoader.should('not.exist')
}

// you can create .env file with own creds to test it

export const creds = {
  email: process.env.email ? process.env.email : 'testtwitt@mailto.plus',
  username: process.env.username ? process.env.username : 'TestGuy28',
  password: process.env.password ? process.env.password : 'Test1est!',
}
