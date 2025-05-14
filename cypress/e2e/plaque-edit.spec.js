// cypress/e2e/plaque-edit.spec.js

import PlaquePage from '/cypress/page-objects/PlaquePage';

describe('Tests du formulaire d\'édition des Plaques', () => {
  beforeEach(() => {
    // Si nécessaire, l'authentification ici
    cy.fixture('plaque-data').then(function(data) {
      this.data = data;
    });
    
    // Accéder à la liste des plaques et cliquer sur l'icône d'édition
    PlaquePage.visitPlaquesList();
  });

  it('Vérifie l\'affichage correct du formulaire après clic sur l\'icône Modifier', function() {

    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage.validateFormIsDisplayed();
      
    // Vérifier que les champs sont pré-remplis avec les bonnes valeurs
    cy.get(PlaquePage.nameField).should('have.value', this.data.validPlaque.name);
    cy.get(PlaquePage.abbreviationField).should('have.value', this.data.validPlaque.abbreviation);
    cy.get(PlaquePage.addressField).should('have.value', this.data.validPlaque.address);
    cy.get(PlaquePage.postalCodeField).should('have.value', this.data.validPlaque.postalCode);
    cy.get(PlaquePage.cityField).should('have.value', this.data.validPlaque.city);
    cy.get(PlaquePage.contactFunctionField).should('have.value', this.data.validPlaque.contact.function);
    PlaquePage.getContactNameField().should('have.value', this.data.validPlaque.contact.name);
    PlaquePage.getContactPhoneField().should('have.value', this.data.validPlaque.contact.validPhone);
    PlaquePage.getContactEmailField().should('have.value', this.data.validPlaque.contact.validEmail);
    cy.get(PlaquePage.commentField).should('have.value', this.data.validPlaque.comment);
  });

  it('Vérifie la modification des coordonnées de contact avec succès', function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
      // Modifier le numéro de téléphone et l'email
    PlaquePage.fillContactInformation(this.data.validPlaque.contact.validPhone, this.data.validPlaque.contact.validEmail)
      .saveForm()
      .validateSuccessMessage();
      
    // Vérifier que les modifications ont été enregistrées en rafraîchissant la page
    cy.reload();
    PlaquePage.getContactPhoneField().should('have.value', this.data.validPlaque.contact.validPhone);
    PlaquePage.getContactEmailField().should('have.value', this.data.validPlaque.contact.validEmail);
  });

  it('Vérifie les messages d\'erreur pour un numéro de téléphone invalide', function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage
      .fillContactInformation(this.data.validPlaque.contact.invalidPhone, this.data.validPlaque.contact.validEmail)
      .saveForm()
      .validatePhoneErrorMessage();
      
    // Tester avec un numéro incomplet
    PlaquePage
      .fillContactInformation(this.data.validPlaque.contact.incompletePhone, this.data.validPlaque.contact.validEmail)
      .saveForm()
      .validatePhoneErrorMessage();
  });

  it('Vérifie les messages d\'erreur pour une adresse e-mail invalide', function() {
    PlaquePage
      .clickEditIconByName(this.data.validPlaque.name)
    PlaquePage.fillContactInformation(this.data.validPlaque.contact.validPhone, this.data.validPlaque.contact.invalidEmail)
      .saveForm()
      .validateEmailErrorMessage();
      
    // Tester avec un email incomplet
    PlaquePage
      .fillContactInformation(this.data.validPlaque.contact.validPhone, this.data.validPlaque.contact.incompleteEmail)
      .saveForm()
      .validateEmailErrorMessage();
  });

  it('Vérifie la sélection des fonctions dans le menu déroulant', function() {
    PlaquePage
      .clickEditIconByName(this.data.validPlaque.name);
      
    // Tester la sélection de chaque fonction
    this.data.functions.forEach(functionName => {
      PlaquePage.selectContactFunction(functionName);
      // Vérifier que la fonction est sélectionnée
      cy.get(PlaquePage.contactFunctionField).should('have.value', functionName);
    });
  });

  it('Vérifie l\'ajout d\'un commentaire', function() {
    PlaquePage
      .clickEditIconByName(this.data.validPlaque.name)
    PlaquePage
      .fillComment(this.data.validPlaque.comment)
      .saveForm()
      .validateSuccessMessage();
      
    // Vérifier que le commentaire a été enregistré
    cy.reload();
    cy.get(PlaquePage.commentField).should('have.value', this.data.validPlaque.comment);
  });

  it('Vérifie la navigation via les liens de visualisation', function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name)
    PlaquePage.clickTerritoiresLink();
      
    // Vérifier que le modal contient les données attendues
    cy.get(PlaquePage.territoireModal).should('contain', 'CORSE');
    //cy.get(PlaquePage.territoireModal).should('contain', 'ALPES PROVENCE');
    //cy.get(PlaquePage.territoireModal).should('contain', 'CÔTE D\'AZUR');
    
    // Fermer le modal
    PlaquePage.closeTerritoiresModal();
  });

  it('Vérifie le fonctionnement du bouton retour', function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage .clickBackButton();
      
    // Vérifier qu'on est revenu à la liste des plaques
    cy.url().should('include', PlaquePage.plaqueListUrl);
    cy.url().should('not.include', '/edit');
  });
});