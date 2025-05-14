/// <reference types="Cypress" />

import TerritoiresPage from '/cypress/page-objects/territoiresPage';

describe('Liste des Territoires Page Tests', () => {
  beforeEach(() => {
    
    TerritoiresPage.navigate();
  });

  it('devrait afficher correctement la page de liste des Territoires (titre, fil d’Ariane, tableau, champ de recherche, boutons d’impression et d’export)', () => {
    // Verify title and UI elements
    TerritoiresPage.getTitle().should('be.visible');
    TerritoiresPage.getBreadcrumb().should('be.visible');
    TerritoiresPage.getTable().should('be.visible');
    TerritoiresPage.getSearchInput().should('be.visible');
    TerritoiresPage.getImpressionButton().should('be.visible');
    TerritoiresPage.getExportButton().should('be.visible');
  });

  it('devrait afficher les bons en-têtes de colonnes dans le tableau', () => {
    const expectedHeaders = ['#', 'Nom', 'Code Postal', 'Ville', 'Contact', 'Téléphone', 'Mise à jour', 'Actions'];
    
    TerritoiresPage.getTableHeaders().each(($header, index) => {
      cy.wrap($header).should('contain.text', expectedHeaders[index]);
    });
  });

  it('devrait contenir certaines régions spécifiques dans le tableau', () => {
    const expectedRegions = [
      'ALPES PROVENCE',
      'AQUITAINE',
      'AUDE PYRENEES ORIENTALES',
      'AUVERGNE LIMOUSIN',
      'BOURGOGNE FRANCHE COMTE'
    ];

    expectedRegions.forEach(region => {
      TerritoiresPage.verifyRegionExists(region).should('be.visible');
    });
  });

  it('devrait filtrer le tableau correctement lors d’une recherche', () => {
    TerritoiresPage.search('CORSE');
    cy.contains('CORSE').should('be.visible');
    cy.contains('ALPES PROVENCE').should('not.exist');
    
    TerritoiresPage.search('EST'); // Clear search
    cy.contains('EST').should('be.visible');
    cy.contains('CORSE').should('not.exist');
  });

  it('devrait filtrer les résultats lors d’une recherche par Nom', () => {
    // Sélectionner "Nom" dans la liste déroulante
    TerritoiresPage.getColumnFilterButton().click();
    cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Nom').click();
    
    // Taper un nom existant
    TerritoiresPage.search('EST');
    
    // Vérifier que les résultats sont filtrés correctement
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('tr td:nth-child(2)').should('be.visible')
    .each(($e1, index, $list) =>{ //iterating through array of elements
      const StoreText = $e1.text();     //storing iterated element
      expect(StoreText).to.contain('EST');
    });
  });

  it('devrait filtrer les résultats lors d’une recherche par Code Postal', () => {
    // Sélectionner "Code Postal" dans la liste déroulante
    TerritoiresPage.getColumnFilterButton().click();
    cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Code Postal').click();
    
    // Taper un Code Postal existant
    TerritoiresPage.search('31003');
    
    // Vérifier que les résultats sont filtrés correctement
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('tr td:nth-child(3)').should('be.visible')
    .each(($e1, index, $list) =>{ //iterating through array of elements
      const StoreText = $e1.text();     //storing iterated element
      expect(StoreText).to.contain('31003');
    });
  });

  it('devrait filtrer les résultats lors d’une recherche par Ville', () => {
    // Sélectionner "Ville" dans la liste déroulante
    TerritoiresPage.getColumnFilterButton().click();
    cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Ville').click();
    
    // Taper une Ville existant
    TerritoiresPage.search('Bordeaux');
    
    // Vérifier que les résultats sont filtrés correctement
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('tr td:nth-child(4)').should('be.visible')
    .each(($e1, index, $list) =>{ //iterating through array of elements
      const StoreText = $e1.text();     //storing iterated element
      expect(StoreText).to.contain('Bordeaux');
    });
  });

  it('devrait filtrer les résultats lors d’une recherche par Contact', () => {
    // Sélectionner "Contact" dans la liste déroulante
    TerritoiresPage.getColumnFilterButton().click();
    cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Contact').click();
    
    // Taper une Contact existant
    TerritoiresPage.search('Franck');
    
    // Vérifier que les résultats sont filtrés correctement
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('tr td:nth-child(5)').should('be.visible')
    .each(($e1, index, $list) =>{ //iterating through array of elements
      const StoreText = $e1.text();     //storing iterated element
      expect(StoreText).to.contain('Franck');
    });
  });

  it('devrait filtrer les résultats lors d’une recherche par Téléphone', () => {
    // Sélectionner "Téléphone" dans la liste déroulante
    TerritoiresPage.getColumnFilterButton().click();
    cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Téléphone').click();
    
    // Taper une Téléphone existant
    TerritoiresPage.search('0611114946');
    
    // Vérifier que les résultats sont filtrés correctement
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('tr td:nth-child(6)').should('be.visible')
    .each(($e1, index, $list) =>{ //iterating through array of elements
      const StoreText = $e1.text();     //storing iterated element
      expect(StoreText).to.contain('0611114946');
    });
  });

  it('devrait filtrer les résultats lors d’une recherche par Mise à jour', () => {
    // Sélectionner "Mise à jour" dans la liste déroulante
    TerritoiresPage.getColumnFilterButton().click();
    cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Mise à jour').click();
    
    // Taper une date Mise à jour existant
    TerritoiresPage.search('05');
    
    // Vérifier que les résultats sont filtrés correctement
    cy.get('table tbody tr').should('have.length.at.least', 1);
    cy.get('tr td:nth-child(7)').should('be.visible')
    .each(($e1, index, $list) =>{ //iterating through array of elements
      const StoreText = $e1.text();     //storing iterated element
      expect(StoreText).to.contain('05');
    });
  });

  it('devrait naviguer vers la page d’édition en cliquant sur le bouton "modifier"', () => {
    cy.intercept('GET', '**/territoires/*').as('getTerritoires');
    
    // Click the edit button for the first row
    TerritoiresPage.getEditButton(0).click();
    
    // Verify redirection or modal opening
    cy.wait('@getTerritoires').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/lieux/territoires/1');
  });

  it('Devrait permettre de changer le nombre d’éléments affichés par page', () => {
    // Verify current pagination
    TerritoiresPage.getPaginationDisplayText().should('contain', '1-5 sur 23');
    
    // Change items per page to 10
    TerritoiresPage.selectRowsPerPage(10);
    
    // Verify updated pagination
    TerritoiresPage.getPaginationDisplayText().should('contain', '1-10 sur 23');

    // Change items per page to 20
    TerritoiresPage.selectRowsPerPage(20);
    
    // Verify updated pagination
    TerritoiresPage.getPaginationDisplayText().should('contain', '1-20 sur 23');
  });

  it('Devrait vérifier les informations de contact pour les entrées "Marseille" et "Strasbourg"', () => {
    // Verify contact for Marseille
    cy.contains('Marseille')
      .closest('tr')
      .should('contain', 'François Thomson')
      .and('contain', '0654232123');
    
    // Verify contact for Strasbourg
    cy.contains('Strasbourg')
      .closest('tr')
      .should('contain', 'Dupont6')
      .and('contain', '0611114946');
  });
});