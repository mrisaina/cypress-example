# Cypress example test project

## Installation:

- clone the git repo with

  ```bash
  $ git clone *repo link*
  ```

- install dependencies:
  ```bash
  $ npm install
  ```
- run command for testing (located in package.json):
  ```bash
  $ npm test
  ```

  or to open cypress UI:

  ```bash
  $ npm run test:open
  ```

## Configuration:

- baseURL is set in **cypress.config.ts**

## Folder Structure:

- cypress
  - e2e - contains test files
  - constants - common functions and selectors
  - utils - util functions

## Additional plugins/packages:

- [dotenv](https://www.npmjs.com/package/dotenv) (for setup local env files)
- [faker](https://www.npmjs.com/package/@faker-js/faker) (for generating fake data)
