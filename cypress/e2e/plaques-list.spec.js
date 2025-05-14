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
    
    PlaquesPage.search('EST'); // Clear search
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
    PlaquesPage.getPaginationDisplayText().should('contain', '1-5 sur 11');
    
    // Change items per page to 10
    PlaquesPage.selectRowsPerPage(10);
    
    // Verify updated pagination
    PlaquesPage.getPaginationDisplayText().should('contain', '1-10 sur 11');

    // Change items per page to 20
    PlaquesPage.selectRowsPerPage(20);
    
    // Verify updated pagination
    PlaquesPage.getPaginationDisplayText().should('contain', '1-11 sur 11');
  });

  it('devrait vérifier les informations de contact pour les entrées "Marseille" et "Strasbourg"', () => {
    // Verify contact for Marseille
    cy.contains('Marseille')
      .closest('tr')
      .should('contain', 'Franck Martin')
      .and('contain', '0621939795');
    
    // Verify contact for Strasbourg
    cy.contains('Strasbourg')
      .closest('tr')
      .should('contain', 'Dupont4')
      .and('contain', '0675512550');
  });
});