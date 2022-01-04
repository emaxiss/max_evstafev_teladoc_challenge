 ///<reference types="cypress" />

import users from '../fixtures/users.json';

const requiredFields = ['FirstName', 'UserName', 'RoleId', 'Mobilephone'];

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

    describe('Negative scenarios', () => {

        requiredFields.forEach(field => {
            it(`Fails to save user without required field ${field}`, () => {
                const user = users.find(x => x.user == 'Admin');
                cy.contains('Add User').click();
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
                cy.contains('Save').should('not.be.disabled');
                field == 'RoleId' ? cy.get('[name="RoleId"]').select([]) : cy.clearField(field);      
                cy.contains('Save').should('be.disabled');  
                cy.contains('Close').click();
            });
        });
    }) 
});
