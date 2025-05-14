/// <reference types="cypress" />
import LieuxProgrammationPage from '/cypress/page-objects/lieuxProgrammationPage';

describe('Lieux de Programmation - Filters Tests', () => {
  beforeEach(() => {
    // Intercepter la requête API qui charge les données des lieux
    cy.intercept('GET', '**lieux/lieux%20de%20programmation*').as('getLieux');
    
    LieuxProgrammationPage.navigate();
    cy.wait('@getLieux');
  });

  it('devrait afficher correctement tous les éléments de filtre', () => {
    const expectedFilters = ['Plaques', 'Territoires', 'CMCAS', 'Programmable', 'Saison', 'Dotation'];
    
    LieuxProgrammationPage.getFiltersSection().should('be.visible');
    
    expectedFilters.forEach(filter => {
      cy.contains(filter).should('be.visible');
      LieuxProgrammationPage.getFilterSelect(filter).should('be.visible');
    });
    
    LieuxProgrammationPage.getResetFiltersButton().should('be.visible');
    LieuxProgrammationPage.getFilterCountText().should('contain', '7');
  });

  it('devrait ouvrir et afficher les options du filtre "Saison"', () => {
    // Intercepter la requête qui sera déclenchée lors du changement de filtre
    cy.intercept('GET', '**/lieux/programmation*').as('getFilteredLieux');
    
    // Ouvrir le dropdown Saison
    LieuxProgrammationPage.openFilterDropdown('Saison');
    
    // Vérifier les options disponibles
    cy.contains('Toute(s)').should('be.visible');
    cy.contains('Été').should('be.visible');
    cy.contains('Hiver').should('be.visible');
    
    // Sélectionner une option
    cy.contains('Été').click();
    
    // Attendre que les données soient rechargées
    //cy.wait('@getFilteredLieux');
    
    // Vérifier que le filtre a été appliqué
    LieuxProgrammationPage.getFilterSelect('Saison').should('have.value', 'Été');
  });

  it('devrait ouvrir et afficher les options du filtre "Programmable"', () => {
    // Intercepter la requête qui sera déclenchée lors du changement de filtre
    cy.intercept('GET', '**/lieux/programmation*').as('getFilteredLieux');
    
    // Ouvrir le dropdown Programmable
    LieuxProgrammationPage.openFilterDropdown('Programmable');
    
    // Vérifier les options disponibles
    cy.contains('Toute(s)').should('be.visible');
    cy.contains('Oui').should('be.visible');
    cy.contains('Non').should('be.visible');
    
    // Sélectionner une option
    cy.contains('Oui').click();
    
    // Attendre que les données soient rechargées
    //cy.wait('@getFilteredLieux');
    
    // Vérifier que le filtre a été appliqué
    LieuxProgrammationPage.getFilterSelect('Programmable').should('have.value', 'Oui');
  });

  it('devrait ouvrir et afficher les options du filtre "Dotation"', () => {
    // Ouvrir le dropdown Dotation
    LieuxProgrammationPage.openFilterDropdown('Dotation');
    
    // Vérifier les options disponibles
    cy.contains('Toute(s)').should('be.visible');
    cy.contains('12-14 Complète').should('be.visible');
    cy.contains('Publics Dotations').should('be.visible');
    
    // Tester la fermeture du menu sans sélection
    cy.get('body').click();
  });

  it('devrait réinitialiser les filtres lorsqu’on clique sur le bouton de réinitialisation', () => {
    // Intercepter les requêtes API
    cy.intercept('GET', '**/lieux/programmation*').as('getFilteredLieux');
    
    // Appliquer un filtre
    LieuxProgrammationPage.selectFilterOption('Saison', 'Été');
    //cy.wait('@getFilteredLieux');
    
    // Appliquer un second filtre
    LieuxProgrammationPage.selectFilterOption('Programmable', 'Oui');
    //cy.wait('@getFilteredLieux');
    
    // Vérifier que les filtres sont appliqués
    LieuxProgrammationPage.getFilterSelect('Saison').should('have.value', 'Été');
    LieuxProgrammationPage.getFilterSelect('Programmable').should('have.value', 'Oui');
    
    // Réinitialiser les filtres
    LieuxProgrammationPage.resetFilters();
    //cy.wait('@getFilteredLieux');
    
    // Vérifier que les filtres sont réinitialisés
    LieuxProgrammationPage.getFilterSelect('Saison').should('have.value', 'Toute(s)');
    LieuxProgrammationPage.getFilterSelect('Programmable').should('have.value', 'Toute(s)');
  });

  it('devrait combiner plusieurs filtres', () => {
    // Intercepter les requêtes API
    cy.intercept('GET', '**/platform-api/lieux/programmation*').as('getFilteredLieux');
    
    // Appliquer plusieurs filtres
    LieuxProgrammationPage.selectFilterOption('Saison', 'Été');
    //cy.wait('@getFilteredLieux');
    
    LieuxProgrammationPage.selectFilterOption('Programmable', 'Oui');
    //cy.wait('@getFilteredLieux');
    
    // Vérifier que les filtres sont combinés correctement
    LieuxProgrammationPage.getFilterCountText().should('be.visible');
    
    // Le nombre peut varier en fonction du filtrage, donc on vérifie juste la présence
  });
});