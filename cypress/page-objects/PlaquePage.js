// cypress/page-objects/PlaquePage.js

class PlaquePage {
  // URL et sélecteurs de base
  plaqueListUrl = '/lieux/plaques';
  
  // Sélecteurs pour la liste des plaques
  plaqueEditIcon = 'button[aria-label="edit"], button[aria-label="Modifier"], button:has(svg[data-testid="EditIcon"])';
  
  // Sélecteurs du formulaire d'édition
  nameField = 'input[name="nom"]';
  abbreviationField = 'input[name="nomAbrege"]';
  addressField = 'input[name="adresse"]';
  postalCodeField = 'input[name="cp"]';
  cityField = 'input[name="ville"]';
  
  // Sélecteurs pour la section contacts
  contactFunctionField = 'input[name="fonction"]';
  contactFunctionDropdown = 'div';
  addContactButtonText = /AJOUTER\s+UN\s+CONTACT/i;
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
  saveButtonText = /Enregistrer|METTRE À JOUR|Mettre à jour/i;
  backButtonText = /Retour/i;
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

  ensureContactForm() {
    cy.get('body').then(($body) => {
      const hasPhoneField = [...$body.find('label')].some((label) => /Téléphone/i.test(label.textContent));
      if (!hasPhoneField) {
        cy.contains('button', this.addContactButtonText).scrollIntoView().click();
      }
    });
  }

  getContactFunctionField() {
    this.ensureContactForm();
    return cy.contains('label', /Fonction/i).parent().find('input').first();
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
    cy.contains('button', this.addContactButtonText).scrollIntoView().should('be.visible');

    cy.get(this.commentField).should('be.enabled');
    return this;
  }

  // Opérations sur les champs
  fillContactInformation(phone, email) {
    this.ensureContactForm();
    if (phone) {
      this.getContactPhoneField().clear().type(phone);
    }
    if (email) {
      this.getContactEmailField().clear().type(email);
    }
    return this;
  }
  
  selectContactFunction(functionName) {
    this.getContactFunctionField().click().clear();
    cy.contains('[role="option"], [role="menuitem"], div', functionName).click();
    return this;
  }
  
  fillComment(comment) {
    cy.get(this.commentField).clear().type(comment);
    return this;
  }
  
  // Actions
  saveForm() {
    cy.contains('button', this.saveButtonText).scrollIntoView().click();
    return this;
  }
  
  clickBackButton() {
    cy.contains('button', this.backButtonText).scrollIntoView().click();
    return this;
  }
  
  // Validations des messages
  validateSuccessMessage() {
    cy.get(this.successMessage).should('be.visible');
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
