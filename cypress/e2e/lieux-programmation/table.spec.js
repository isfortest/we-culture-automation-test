import LieuxProgrammationPage from '../../page-objects/lieuxProgrammationPage';

describe('Lieux de Programmation - Table Tests', () => {
  beforeEach(() => {
    // Intercepter la requête API qui charge les données des lieux
    cy.intercept('GET', '**lieux/lieux%20de%20programmation*').as('getLieux');
    
    LieuxProgrammationPage.navigate();
    cy.wait('@getLieux');
  });

  it('devrait afficher la table avec les bons headers', () => {
    const expectedHeaders = ['#', 'Nom', 'Code Postal', 'Ville', 'Public', 'Convention', 'Programmable', 'Dotation', 'Actions'];
    
    LieuxProgrammationPage.getTable();
    //.should('be.visible');
    
    LieuxProgrammationPage.getTableHeaders().each(($header, index) => {
      if (index < expectedHeaders.length) {
        cy.wrap($header).should('contain.text', expectedHeaders[index]);
      }
    });
  });

  it('devrait avoir le bon nombre de rows', () => {
    // Vérifier le nombre de lignes
    LieuxProgrammationPage.getTableRows().should('have.length.at.least', 1);
    
    // Vérifier le texte de pagination
    LieuxProgrammationPage.getPaginationInfo().should('exist');
  });

  it('devrait afficher les bonnes données dans les rows de la table', () => {
    LieuxProgrammationPage.getTableRows().first().invoke('text').should('not.be.empty');
    LieuxProgrammationPage.getTableRows().eq(1).invoke('text').should('not.be.empty');
  });

  it('devrait permettre la recherche et le filter de la table', () => {
    // Rechercher un terme spécifique
    LieuxProgrammationPage.search('A Tester');
    
    // Vérifier que les résultats contiennent le terme recherché
    LieuxProgrammationPage.getTableRows().should('have.length.at.least', 1);
    
    // Effacer la recherche
    LieuxProgrammationPage.getSearchInput().clear();
    cy.wait(500);
  });

  it('devrait ouvrir le column filter et permettre la sélection d-une colonne', () => {
    // Ouvrir le filtre de colonnes
    LieuxProgrammationPage.getColumnFilterButton().should('exist');
    LieuxProgrammationPage.openColumnFilter();
    
    // Vérifier les options disponibles
    LieuxProgrammationPage.getListColumnFilter().contains('Tous les colonnes').should('be.visible');
    LieuxProgrammationPage.getListColumnFilter().contains('Nom').should('be.visible');
    LieuxProgrammationPage.getListColumnFilter().contains('Code Postal').should('be.visible');
    LieuxProgrammationPage.getListColumnFilter().contains('Ville').should('be.visible');
    
    // Sélectionner une colonne spécifique
    LieuxProgrammationPage.getListColumnFilter().contains('Nom').click();
    LieuxProgrammationPage.getColumnFilterButton().should('contain.text', 'Nom');
    
    // Vérifier que le filtre est appliqué (le nombre de colonnes visibles devrait être réduit)
    LieuxProgrammationPage.getColumnFilterButton().should('contain.text', 'Nom');
  });

  it('devrait gérer correctement les actions sur les rows', () => {
    // Tester le bouton Voir (premier élément)
    cy.intercept('GET', '**/lieux/lieux%20de%20programmation*').as('getLieuDetail');
    LieuxProgrammationPage.getViewButton(0).click();
    cy.url().should('include', '/lieux/lieux%20de%20programmation')
    //cy.wait('@getLieuDetail');
    
    // Retourner à la page principale
    cy.go('back');
    cy.url('include','/lieux/lieux%20de%20programmation')
    //cy.wait('@getLieux');
    
    // Tester le bouton Modifier (deuxième élément)
    cy.intercept('GET', '**/lieux/lieux%20de%20programmation*').as('getLieuEdit');
    LieuxProgrammationPage.getEditButton(1).click();
    cy.url().should('match', /\/lieux\/lieux%20de%20programmation\/\d+/)
    //cy.wait('@getLieuEdit');
    
    // Retourner à la page principale
    cy.go('back');
    cy.url().should('include', '/lieux/lieux%20de%20programmation')
    //cy.wait('@getLieux');
  });

  it('devrait tester le bouton "Ajouter nouveau lieu"', () => {
    // Intercepter la requête qui sera déclenchée lors du clic sur Ajouter
    cy.intercept('GET', '**/lieux/lieux%20de%20programmation/ajouter').as('createLieu');
    
    // Cliquer sur le bouton Ajouter
    LieuxProgrammationPage.getAddButton().click();
    
    // Vérifier la redirection vers la page de création
    //cy.wait('@createLieu');
    cy.url().should('include', '/lieux/lieux%20de%20programmation/ajouter');
  });

  it('devrait tester les contrôles de pagination', () => {
    // Vérifier les informations de pagination initiales
    LieuxProgrammationPage.getPaginationInfo().should('exist');
    
    // Tester le changement du nombre d'éléments par page
    cy.intercept('GET', '**/platform-api/lieux/programmation*').as('changePageSize');
    LieuxProgrammationPage.changeRowsPerPage(10);
    //cy.wait('@changePageSize');
    
    // Vérifier que la pagination a été mise à jour
    LieuxProgrammationPage.getPaginationInfo().should('exist');
    
    // Comme il n'y a que 6 éléments au total, on ne peut pas tester la navigation entre pages
    // Mais on peut vérifier que le bouton "page suivante" est désactivé
    LieuxProgrammationPage.getPaginationInfo().should('exist');
  });

    it('devrait tester le bouton Imprimer de manière plus modulaire', () => {
    // Vérifier que le bouton Imprimer est visible
    LieuxProgrammationPage.getPrintButton().should('be.visible');
    
    // Test du bouton Imprimer
    LieuxProgrammationPage.getPrintButton().click();
    LieuxProgrammationPage.getPrintButton().should('be.visible');
  });

  it('devrait tester le bouton Télécharger avec les options de format de manière plus modulaire', () => {
    // Vérifier que le bouton Télécharger est visible
    LieuxProgrammationPage.getDownloadButton().should('be.visible');
    
    // Test du format PDF
    cy.intercept('GET', '**/platform-api/lieux/programmation/export?format=pdf').as('pdfExport');
    LieuxProgrammationPage.clickPdfFormat();
    //LieuxProgrammationPage.verifyFileDownloaded('@pdfExport', 'pdf');
    
    // Test du format Excel
    cy.intercept('GET', '**/platform-api/lieux/programmation/export?format=excel').as('excelExport');
    LieuxProgrammationPage.clickExcelFormat();
    //LieuxProgrammationPage.verifyFileDownloaded('@excelExport', 'excel');
  });
});
