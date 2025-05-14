// cypress/page-objects/PlaquePage.js

class PlaquePage {
  // URL et sélecteurs de base
  plaqueListUrl = '/lieux/plaques';
  
  // Sélecteurs pour la liste des plaques
  plaqueEditIcon = 'button[aria-label="edit"]';
  
  // Sélecteurs du formulaire d'édition
  nameField = 'input[name="nom"]';
  abbreviationField = 'input[name="nomAbrege"]';
  addressField = 'input[name="adresse"]';
  postalCodeField = 'input[name="cp"]';
  cityField = 'input[name="ville"]';
  
  // Sélecteurs pour la section contacts
  contactFunctionField = 'input[name="fonction"]';
  contactFunctionDropdown = 'div';
  addContactButton = 'button:contains("AJOUTER UN CONTACT")';
  getContactNameField(){
    return cy
    .contains('label', 'Nom et Prénom').invoke('attr', 'for').then((id) => {
    const escapedId = CSS.escape(id);
    cy.get(`#${escapedId}`);
    });
  }
  getContactPhoneField(){
    return cy
    .contains('label', 'Téléphone').invoke('attr', 'for').then((id) => {
    const escapedId = CSS.escape(id);
    cy.get(`#${escapedId}`)
    });
  }
  getContactEmailField(){
    return cy
    .contains('label', 'E-mail').invoke('attr', 'for').then((id) => {
    const escapedId = CSS.escape(id);
    cy.get(`#${escapedId}`)
    });
  }
  
  // Sélecteur pour les commentaires
  commentField = 'textarea[name="commentaire"]';
  
  // Sélecteurs pour les boutons et messages
  saveButton = 'button:contains("Enregistrer")';
  backButton = 'button:contains("Retour")';
  successMessage = '.MuiAlert-message';
  phoneErrorMessage = 'div:contains("Veuillez entrer un numéro de téléphone valide à 10 chiffres.")';
  emailErrorMessage = 'div:contains("Veuillez saisir une adresse e-mail valide.")';
  
  // Sélecteurs pour le modal des territoires
  territoireModal = '.MuiDialog-paperScrollPaper';
  territoireModalCloseButton = 'button[aria-label="close"]';
  
  //Retourne le <tr> de la ligne dont la colonne Nom === `plaqueName`
  getRowByName(plaqueName) {
    return cy
      .contains('tbody tr td', plaqueName)   // cherche dans les <td> du tbody
      .closest('tr');                        // remonte au <tr>
  }
  
  // Table elements
    getTable() {
      return cy.get('table, [role="table"]');
    }
  
    getTableRows() {
      return this.getTable().find('tr, [role="row"]').not(':first-child');
    }
  
  // Navigation
  visitPlaquesList() {
    cy.visit(this.plaqueListUrl);
    cy.url().should('include', this.plaqueListUrl);
    return this;
  }
  
  //Clique sur l'icône edit de la ligne dont le Nom === `plaqueName`
  clickEditIconByName(plaqueName) {
    this.getRowByName(plaqueName)
      .find(this.plaqueEditIcon)
      .should('be.visible')
      .click();
  }
  
  // Validation de l'affichage du formulaire
  validateFormIsDisplayed() {
    cy.get(this.nameField).should('be.visible').should('be.disabled');
    cy.get(this.abbreviationField).should('be.visible').should('be.enabled');
    cy.get(this.addressField).should('be.visible').should('be.disabled');
    cy.get(this.postalCodeField).should('be.visible').should('be.disabled');
    cy.get(this.cityField).should('be.visible');
    cy.get(this.contactFunctionField).should('be.visible').should('be.enabled');

    this.getContactNameField().should('be.visible').should('be.enabled');
    this.getContactPhoneField().should('be.visible').should('be.enabled');
    this.getContactEmailField().should('be.visible').should('be.enabled');

    cy.get(this.commentField).should('be.enabled');
    return this;
  }

  // Opérations sur les champs
  fillContactInformation(phone, email) {
    if (phone) {
      this.getContactPhoneField().clear().type(phone);
    }
    if (email) {
      this.getContactEmailField().clear().type(email);
    }
    return this;
  }
  
  selectContactFunction(functionName) {
    cy.get(this.contactFunctionField).click().clear();
    cy.get(`${this.contactFunctionDropdown} div:contains("${functionName}")`).eq(1).click();
    return this;
  }
  
  fillComment(comment) {
    cy.get(this.commentField).clear().type(comment);
    return this;
  }
  
  // Actions
  saveForm() {
    cy.get(this.saveButton).click();
    return this;
  }
  
  clickBackButton() {
    cy.get(this.backButton).click();
    return this;
  }
  
  // Validations des messages
  validateSuccessMessage() {
    //cy.get(this.successMessage).should('be.visible');
    cy.get(this.successMessage).should('contain', 'Mise à jour a été effectué succès !');
    return this;
  }
  
  validatePhoneErrorMessage() {
    cy.get(this.phoneErrorMessage).should('be.visible');
    return this;
  }
  
  validateEmailErrorMessage() {
    cy.get(this.emailErrorMessage).should('be.visible');
    return this;
  }
  
  // Visualisation des liens associés
  clickTerritoiresLink() {
    cy.contains('Les Territoires de la plaque').click();
    cy.get(this.territoireModal).should('be.visible');
    return this;
  }
  
  closeTerritoiresModal() {
    cy.get(this.territoireModalCloseButton).click();
    cy.get(this.territoireModal).should('not.be.visible');
    return this;
  }
}

export default new PlaquePage();