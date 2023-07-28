export const login = {
  get nextBtn() {
    return cy.get('[role="button"]').filter(':contains(Next)')
  },
  get userNameEmailInput() {
    return cy.get('input[autocomplete="username"]')
  },
  get username() {
    return cy.get('input[name="text"]')
  },
  get password() {
    return cy.get('[name="password"]')
  },
  get loginBtn() {
    return cy.get('[role="button"]').filter(':contains(Log in)')
  },
  get forgotPasswordBtn() {
    return cy.get('[role="button"]').contains('Forgot password?')
  },
}

export const home = {
  get signupBtn() {
    return cy.get('[data-testid="signupButton"]')
  },
  get loginBtn() {
    return cy.get('[data-testid="loginButton"]')
  },
}

export const signup = {
  get username() {
    return cy.get('input[name="name"]')
  },
  get email() {
    return cy.get('input[type="email"]')
  },
  dropdown(label: string) {
    return cy.get('label').filter(`:contains(${label})`).siblings('select')
  },
  get signupBtn() {
    return cy.get('[role="button"]').contains('Sign up')
  },
}

export const forgotPassword = {
  get username() {
    return cy.get('[name="username"]')
  },
  get changePassword() {
    return cy.get('[role="button"]').filter(':contains(Change password)')
  },
  get continueToTwitter() {
    return cy.get('[role="button"]').contains('Continue to Twitter')
  },
  get newPassword() {
    return cy.get('input[autocomplete="new-password"]').eq(0)
  },
  get repeatNewPassword() {
    return cy.get('input[autocomplete="new-password"]').eq(1)
  },
}

export const common = {
  get modalLoader() {
    return cy.get('[role="dialog"]').find('[role="progressbar"]')
  },
  get acceptCookiesBtn() {
    return cy.get('[role="button"]').contains('Accept all cookies')
  },
}
