class LoginPage {
    navigate() {
      cy.visit('/');
    }
  
    login(username, password) {
      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('#signOnButton').click();
    }
  }
  
  export default new LoginPage();