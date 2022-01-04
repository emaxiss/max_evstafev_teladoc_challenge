 ///<reference types="cypress" />

import users from '../fixtures/users.json';

describe('Add/Delete a user and validate the user has been added/deleted', () => {

    before(() => {
        cy.visit('/angularjs-protractor/webtables/');
        cy.title().should('eq', 'Protractor practice website - WebTables');
        cy.get('.smart-table').should('be.visible')
    });

    describe('Create a new user', () => {

        beforeEach(() => {
            cy.contains('Add User').click();

        });

        it('Verify "Save", "Close" buttons', () => {
            cy.contains('Save')
                .should('be.visible')
                .and('be.disabled');
            cy.contains('Close')
                .should('be.visible')
                .and('not.be.disabled')
                .click();
        });

        users.forEach(user => {
            it(`Create new ${user.user} user`, () => {
                cy.addUser({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.userName,
                    password: user.password,
                    company: user.company,
                    role: user.role,
                    email: user.email,
                    cellPhone: user.cellPhone
            });
            cy.contains('Save').should('not.be.disabled').click(); 
            cy.contains('td', user.userName).should('exist');
            });
        });    
    });

    describe('Delete users', () => {

        it('Delete user novak', () => {
            cy.deleteUser('novak')
            cy.contains('td', 'novak').should('not.exist')
        });

    });
    
});
