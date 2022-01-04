Cypress.Commands.add('addUser', (data) => {
    cy.get('[name="FirstName"]').clear().type(data.firstName);
    cy.get('[name="LastName"]').clear().type(data.lastName);
    cy.get('[name="UserName"]').clear().type(data.username);
    cy.get('[name="Password"]').clear().type(data.password);
    cy.contains('.radio', data.company).click();
    cy.get('[name="RoleId"]').select(data.role);
    cy.get('[name="Email"]').clear().type(data.email);
    cy.get('[name="Mobilephone"]').clear().type(data.cellPhone);
 });

Cypress.Commands.add('deleteUser', (username) => {
    cy.contains(username).parent('tr').within(() => {
    cy.get('td').eq(10).should('be.visible').click();
    })
    cy.contains('button', 'Cancel').should('be.visible');
    cy.contains('button', 'OK').should('be.visible').click();
 });
