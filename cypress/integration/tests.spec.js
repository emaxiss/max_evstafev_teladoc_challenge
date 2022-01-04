 ///<reference types="cypress" />

describe('Add/Delete a user and validate the user has been added/deleted', ()=> {

    before(() => {
        cy.visit('/');
        cy.get('.smart-table').should('be.visible')
    });

    describe('Create a new user', ()=> {

        beforeEach(()=> {
            cy.contains('Add User').click();

        });

        it('Verify "Save", "Close" buttons', ()=> {
            cy.contains('Save')
                .should('be.visible')
                .should('be.disabled');
            cy.contains('Close')
                .should('be.visible')
                .should('not.be.disabled')
                .click();
        });

        it('Create new user', ()=> {
            cy.get('[name="FirstName"]').should('be.visible').type('Jon');
            cy.get('[name="LastName"]').type('Snow');
            cy.get('[name="UserName"]').type('TheNorthKing');
            cy.get('[name="Password"]').type(12345678);
            cy.contains('.radio', 'Company AAA').click();
            cy.get('[name="RoleId"]').select(3);
            cy.get('[name="Email"]').type('jonsnow@mail.com');
            cy.get('[name="Mobilephone"]').type(17982312465);
            cy.contains('Save').should('not.be.disabled').click(); 
            cy.contains('td', 'TheNorthKing').should('be.visible');
        })
    });

    describe('Delete users', ()=> {

        it('Delete user novak', ()=> {
            cy.contains('novak').parent('tr').within(() => {
                cy.get('td').eq(10).should('be.visible').click();
                })
            cy.contains('button', 'Cancel').should('be.visible');
            cy.contains('button', 'OK').should('be.visible').click();
            cy.contains('td', 'novak').should('not.exist')
        });

    });

    
});
