/// <reference types="Cypress" />

import PlaquesPage from '/cypress/page-objects/plaquesPage';

describe('Liste des Plaques Page Tests', () => {
  beforeEach(() => {
    
    PlaquesPage.navigate();
  });

  it('devrait afficher correctement la page de liste des Plaques (titre, fil d’Ariane, tableau, champ de recherche, boutons d’impression et d’export)', () => {
    // Verify title and UI elements
    PlaquesPage.getTitle().should('be.visible');
    PlaquesPage.getBreadcrumb().should('be.visible');
    PlaquesPage.getTable().should('be.visible');
    PlaquesPage.getSearchInput().should('be.visible');
    PlaquesPage.getImpressionButton().should('be.visible');
    PlaquesPage.getExportButton().should('be.visible');
  });

  it('devrait afficher les bons en-têtes de colonnes dans le tableau', () => {
    const expectedHeaders = ['#', 'Nom', 'Code Postal', 'Ville', 'Contact', 'Téléphone', 'Mise à jour', 'Actions'];
    
    PlaquesPage.getTableHeaders().each(($header, index) => {
      cy.wrap($header).should('contain.text', expectedHeaders[index]);
    });
  });

  it('Devrait contenir certaines plaques régionales spécifiques dans le tableau', () => {
    const expectedRegions = [
      'ALPES PROVENCE CÔTE D\'AZUR',
      'AUVERGNE LIMOUSIN',
      'CORSE',
      'EST',
      'GRAND OUEST'
    ];

    expectedRegions.forEach(region => {
      PlaquesPage.verifyRegionExists(region).should('be.visible');
    });
  });

  it('devrait filtrer le tableau correctement lors d’une recherche', () => {
    PlaquesPage.search('CORSE');
    cy.contains('CORSE').should('be.visible');
    cy.contains('ALPES PROVENCE').should('not.exist');
    
    PlaquesPage.navigate();
    PlaquesPage.search('EST');
    cy.contains('EST').should('be.visible');
    cy.contains('CORSE').should('not.exist');
  });

  it('devrait naviguer vers la page d’édition en cliquant sur le bouton "modifier"', () => {
    cy.intercept('GET', '**/plaques/*').as('getPlaque');
    
    // Click the edit button for the first row
    PlaquesPage.getEditButton(0).click();
    
    // Verify redirection or modal opening
    cy.wait('@getPlaque').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/lieux/plaques/9');
  });

  it('devrait permettre de changer le nombre d’éléments affichés par page', () => {
    // Verify current pagination
    PlaquesPage.getPaginationDisplayText().should('exist');
    
    // Change items per page to 10
    PlaquesPage.selectRowsPerPage(10);
    
    // Verify updated pagination
    PlaquesPage.getPaginationDisplayText().should('exist');

    // Change items per page to 20
    PlaquesPage.selectRowsPerPage(20);
    
    // Verify updated pagination
    PlaquesPage.getPaginationDisplayText().should('exist');
  });

  it('devrait vérifier les informations de contact pour les entrées "Marseille" et "Strasbourg"', () => {
    // Verify contact for Marseille
    cy.contains('Marseille')
      .closest('tr')
      .invoke('text')
      .should('contain', 'Dupont6')
      .and('contain', '0610136636');
    
    // Verify contact for Strasbourg
    cy.contains('Strasbourg')
      .closest('tr')
      .invoke('text')
      .should('contain', 'Dupont4')
      .and('contain', '0698510445');
  });
});
