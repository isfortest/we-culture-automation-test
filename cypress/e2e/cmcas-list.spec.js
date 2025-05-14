/// <reference types="Cypress" />

import CmcasPage from '/cypress/page-objects/cmcasPage';

describe('Liste des CMCAS Page Tests', () => {
  beforeEach(() => {
    
    CmcasPage.navigate();
  });

  it('devrait afficher correctement la page de liste des CMCAS (titre, breadcrumb, tableau, barre de recherche, boutons d’impression et d’export)', () => {
    // Verify title and UI elements
    CmcasPage.getTitle().should('be.visible');
    CmcasPage.getBreadcrumb().should('be.visible');
    CmcasPage.getTable().should('be.visible');
    CmcasPage.getSearchInput().should('be.visible');
    CmcasPage.getImpressionButton().should('be.visible');
    CmcasPage.getExportButton().should('be.visible');
  });

  it('devrait afficher les bons en-têtes de colonnes dans le tableau', () => {
    const expectedHeaders = ['#', 'Nom', 'Code Postal', 'Ville', 'Plaque', 'Territoire', 'Contact', 'Téléphone', 'Mise à jour', 'Actions'];
    
    CmcasPage.getTableHeaders().each(($header, index) => {
      cy.wrap($header).should('contain.text', expectedHeaders[index]);
    });
  });

  it('devrait contenir certaines régions spécifiques dans le tableau', () => {
    const expectedRegions = [
      'AGEN',
      'ALLIER PUYDEMACHAT COMBRAILLE',
      'ANGOULEME',
      'ANJOU MAINE',
      'ARDENNES AUBE MARNE'
    ];

    expectedRegions.forEach(region => {
      CmcasPage.verifyRegionExists(region).should('be.visible');
    });
  });

  it('devrait filtrer le tableau correctement lors d’une recherche', () => {
    CmcasPage.search('CORSE');
    cy.contains('CORSE').should('be.visible');
    cy.contains('ALPES PROVENCE').should('not.exist');
    
    CmcasPage.search('EST'); // Clear search
    cy.contains('EST').should('be.visible');
    cy.contains('CORSE').should('not.exist');
  });

  it('devrait filtrer les résultats lors d’une recherche par Nom', () => {
      // Sélectionner "Nom" dans la liste déroulante
      CmcasPage.getColumnFilterButton().click();
      cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Nom').click();
      
      // Taper un nom existant
      CmcasPage.search('AUDE');
      
      // Vérifier que les résultats sont filtrés correctement
      cy.get('table tbody tr').should('have.length.at.least', 1);
      cy.get('tr td:nth-child(2)').should('be.visible')
      .each(($e1, index, $list) =>{ //iterating through array of elements
        const StoreText = $e1.text();     //storing iterated element
        expect(StoreText).to.contain('AUDE');
      });
    });
  
    it('devrait filtrer les résultats lors d’une recherche par Code Postal', () => {
      // Sélectionner "Code Postal" dans la liste déroulante
      CmcasPage.getColumnFilterButton().click();
      cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Code Postal').click();
      
      // Taper un Code Postal existant
      CmcasPage.search('11100');
      
      // Vérifier que les résultats sont filtrés correctement
      cy.get('table tbody tr').should('have.length.at.least', 1);
      cy.get('tr td:nth-child(3)').should('be.visible')
      .each(($e1, index, $list) =>{ //iterating through array of elements
        const StoreText = $e1.text();     //storing iterated element
        expect(StoreText).to.contain('11100');
      });
    });
  
    it('devrait filtrer les résultats lors d’une recherche par Ville', () => {
      // Sélectionner "Ville" dans la liste déroulante
      CmcasPage.getColumnFilterButton().click();
      cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Ville').click();
      
      // Taper une Ville existant
      CmcasPage.search('LE MANS');
      
      // Vérifier que les résultats sont filtrés correctement
      cy.get('table tbody tr').should('have.length.at.least', 1);
      cy.get('tr td:nth-child(4)').should('be.visible')
      .each(($e1, index, $list) =>{ //iterating through array of elements
        const StoreText = $e1.text();     //storing iterated element
        expect(StoreText).to.contain('LE MANS');
      });
    });
  
    it('devrait filtrer les résultats lors d’une recherche par Contact', () => {
      // Sélectionner "Contact" dans la liste déroulante
      CmcasPage.getColumnFilterButton().click();
      cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Contact').click();
      
      // Taper une Contact existant
      CmcasPage.search('Edouard');
      
      // Vérifier que les résultats sont filtrés correctement
      cy.get('table tbody tr').should('have.length.at.least', 1);
      cy.get('tr td:nth-child(7)').should('be.visible')
      .each(($e1, index, $list) =>{ //iterating through array of elements
        const StoreText = $e1.text();     //storing iterated element
        expect(StoreText).to.contain('Edouard');
      });
    });
  
    it('devrait filtrer les résultats lors d’une recherche par Téléphone', () => {
      // Sélectionner "Téléphone" dans la liste déroulante
      CmcasPage.getColumnFilterButton().click();
      cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Téléphone').click();
      
      // Taper une Téléphone existant
      CmcasPage.search('0683855867');
      
      // Vérifier que les résultats sont filtrés correctement
      cy.get('table tbody tr').should('have.length', 1);
      cy.get('tr td:nth-child(8)').should('be.visible')
      .each(($e1, index, $list) =>{ //iterating through array of elements
        const StoreText = $e1.text();     //storing iterated element
        expect(StoreText).to.contain('0683855867');
      });
    });
  
    it('devrait filtrer les résultats lors d’une recherche par Mise à jour', () => {
      // Sélectionner "Mise à jour" dans la liste déroulante
      CmcasPage.getColumnFilterButton().click();
      cy.get('.css-6ary1h-MuiButtonBase-root-MuiMenuItem-root').contains('Mise à jour').click();
      
      // Taper une date Mise à jour existant
      CmcasPage.search('07');
      
      // Vérifier que les résultats sont filtrés correctement
      cy.get('table tbody tr').should('have.length.at.least', 1);
      cy.get('tr td:nth-child(9)').should('be.visible')
      .each(($e1, index, $list) =>{ //iterating through array of elements
        const StoreText = $e1.text();     //storing iterated element
        expect(StoreText).to.contain('07');
      });
    });

  it('devrait naviguer vers la page d’édition en cliquant sur le bouton "modifier"', () => {
    cy.intercept('GET', '**/cmcas/*').as('getCMCAS');
    
    // Click the edit button for the first row
    CmcasPage.getEditButton(0).click();
    
    // Verify redirection or modal opening
    cy.wait('@getCMCAS').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/lieux/cmcas/');
  });

  it('devrait permettre de changer le nombre d’éléments affichés par page', () => {
    // Verify current pagination
    CmcasPage.getPaginationDisplayText().should('contain', '1-5 sur 66');
    
    // Change items per page to 10
    CmcasPage.selectRowsPerPage(10);
    
    // Verify updated pagination
    CmcasPage.getPaginationDisplayText().should('contain', '1-10 sur 66');

    // Change items per page to 20
    CmcasPage.selectRowsPerPage(20);
    
    // Verify updated pagination
    CmcasPage.getPaginationDisplayText().should('contain', '1-20 sur 66');
  });

  it('devrait vérifier les informations de contact pour les entrées "LE PASSAGE" et "LE MANS', () => {
    // Verify Plaque, Territoire, Contact for LE PASSAGE
    cy.contains('LE PASSAGE')
      .closest('tr')
      .should('contain', 'NOUVELLE AQUITAINE')
      .and('contain','AQUITAINE')
      .and('contain','Stéphane Rolle')
      .and('contain', '0683855867');
    
    // Verify Plaque, Territoire, Contact for LE MANS
    cy.contains('LE MANS')
      .closest('tr')
      .should('contain', 'GRAND OUEST')
      .and('contain','PAYS DE LOIRE');
  });
});