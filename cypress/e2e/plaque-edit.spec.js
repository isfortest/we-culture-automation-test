import PlaquePage from '/cypress/page-objects/PlaquePage';

describe("Tests du formulaire d'édition des Plaques", () => {
  beforeEach(function() {
    cy.fixture('plaque-data').then((data) => {
      this.data = data;
    });

    PlaquePage.visitPlaquesList();
  });

  it("Vérifie l'affichage correct du formulaire après clic sur l'icône Modifier", function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage.validateFormIsDisplayed();

    cy.get(PlaquePage.nameField).should('have.value', this.data.validPlaque.name);
    cy.get(PlaquePage.abbreviationField).should('have.value', this.data.validPlaque.abbreviation);
    cy.get(PlaquePage.addressField).should('have.value', this.data.validPlaque.address);
    cy.get(PlaquePage.postalCodeField).should('have.value', this.data.validPlaque.postalCode);
    cy.get(PlaquePage.cityField).should('have.value', this.data.validPlaque.city);
    cy.get(PlaquePage.commentField).should('have.value', this.data.validPlaque.comment);
  });

  it('Vérifie la saisie des coordonnées de contact', function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage.fillContactInformation(this.data.validPlaque.contact.validPhone, this.data.validPlaque.contact.validEmail);
    PlaquePage.getContactPhoneField().should('have.value', this.data.validPlaque.contact.validPhone);
    PlaquePage.getContactEmailField().should('have.value', this.data.validPlaque.contact.validEmail);
  });

  it("Vérifie la saisie d'un numéro de téléphone invalide", function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage.fillContactInformation(this.data.validPlaque.contact.invalidPhone, this.data.validPlaque.contact.validEmail);
    PlaquePage.getContactPhoneField().should('have.value', this.data.validPlaque.contact.invalidPhone);

    PlaquePage.fillContactInformation(this.data.validPlaque.contact.incompletePhone, this.data.validPlaque.contact.validEmail);
    PlaquePage.getContactPhoneField().should('have.value', this.data.validPlaque.contact.incompletePhone);
  });

  it("Vérifie la saisie d'une adresse e-mail invalide", function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage.fillContactInformation(this.data.validPlaque.contact.validPhone, this.data.validPlaque.contact.invalidEmail);
    PlaquePage.getContactEmailField().should('have.value', this.data.validPlaque.contact.invalidEmail);

    PlaquePage.fillContactInformation(this.data.validPlaque.contact.validPhone, this.data.validPlaque.contact.incompleteEmail);
    PlaquePage.getContactEmailField().should('have.value', this.data.validPlaque.contact.incompleteEmail);
  });

  it("Vérifie l'ajout d'un commentaire", function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage.fillComment(this.data.validPlaque.comment).saveForm().validateSuccessMessage();

    cy.reload();
    cy.get(PlaquePage.commentField).should('have.value', this.data.validPlaque.comment);
  });

  it('Vérifie la navigation via les liens de visualisation', function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage.clickTerritoiresLink();

    cy.get(PlaquePage.territoireModal).should('contain', 'CORSE');
    PlaquePage.closeTerritoiresModal();
  });

  it('Vérifie le fonctionnement du bouton retour', function() {
    PlaquePage.clickEditIconByName(this.data.validPlaque.name);
    PlaquePage.clickBackButton();

    cy.url().should('include', PlaquePage.plaqueListUrl);
    cy.url().should('not.include', '/edit');
  });
});
