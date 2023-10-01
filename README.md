# Cypress E2E Test Suite for Swag Labs Demo App
This repository contains a suite of Cypress end-to-end (e2e) tests for the Swag Labs demo application. The tests cover three main parts of the application: Login, Products page, and Checkout. 

In some of the tests you can find custom commands, custom methods, mock data, AAA pattern of testing and more. 

**Not every single test is the same because I wanted to show how they can be approached with different styles.**

## Prerequisites
To run the tests, ensure you have the following prerequisites installed:

- `Node.js (Version 16.x/18.x/20.x)`
- `Cypress (Version 12.x)`

## Installation
1. Clone this repository to your local machine
2. Navigate to the saucedemo-webshop directory -> `cd .\saucedemo-webshop\`
3. Install the required dependencies with -> `npm install`
4. Run the tests with -> `npx cypress open`

## Project Structure
    saucedemo-webshop/ - Main directory
        cypress/ - Contains the Cypress test files and configuration.
            e2e/ - Contains Web Shop Folder.
                web shop/ - Contains all the main structure of e2e tests.
                    login/ - Contains login e2e tests.
                    mock-user/ - Contains mocked users that are used through out the test.
                    pages/ - Contains all of the pages from the website.
                    products/ - Contains products e2e tests.
            support/ - Shared utility functions and custom commands.
            cypress.json - Cypress configuration file.
            package.json - Node.js project configuration.

## Test Coverage
This test suite covers the following parts of the Swag Labs demo app:
1. Login functionality
2. Products page interactions
3. Checkout process



