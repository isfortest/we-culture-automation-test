import LieuxProgrammationPage from '/cypress/page-objects/lieuxProgrammationPage';

describe('Lieux de Programmation - Table Tests', () => {
  beforeEach(() => {
    // Intercepter la requête API qui charge les données des lieux
    cy.intercept('GET', '**lieux/lieux%20de%20programmation*').as('getLieux');
    
    LieuxProgrammationPage.navigate();
    cy.wait('@getLieux');
  });

  it('devrait afficher la table avec les bons headers', () => {
    const expectedHeaders = ['#', 'Nom', 'Code Postal', 'Ville', 'Public', 'Convention', 'Programmable', 'Dotation', 'Actions'];
    
    LieuxProgrammationPage.getTable().should('be.visible');
    
    LieuxProgrammationPage.getTableHeaders().each(($header, index) => {
      if (index < expectedHeaders.length) {
        cy.wrap($header).should('contain.text', expectedHeaders[index]);
      }
    });
  });

  it('devrait avoir le bon nombre de rows', () => {
    // Vérifier le nombre de lignes
    LieuxProgrammationPage.getTableRows().should('have.length', 5);
    
    // Vérifier le texte de pagination
    LieuxProgrammationPage.getPaginationInfo().should('contain', '1-5 sur 7');
  });

  it('devrait afficher les bonnes données dans les rows de la table', () => {
    // Verify first row data
    LieuxProgrammationPage.getTableRows().eq(0).should('contain', 'AVIGNON CONTRE COURANT-CCAS')
      .and('contain', '84000')
      .and('contain', 'Avignon');
    
    // Verify second row data
    LieuxProgrammationPage.getTableRows().eq(1).should('contain', 'LA COURONNE PLAGE')
      .and('contain', '13500')
      .and('contain', 'La Couronne Plage');
  });

  it('devrait permettre la recherche et le filter de la table', () => {
    // Rechercher un terme spécifique
    LieuxProgrammationPage.search('Paris');
    
    // Vérifier que les résultats contiennent le terme recherché
    LieuxProgrammationPage.getTableRows().each($row => {
      cy.wrap($row).should('contain', 'Paris');
    });
    
    // Effacer la recherche
    LieuxProgrammationPage.getSearchInput().clear();
    cy.wait(500);
  });

  it('devrait ouvrir le column filter et permettre la sélection d-une colonne', () => {
    // Ouvrir le filtre de colonnes
    LieuxProgrammationPage.getColumnFilterButton().should('have.text', 'Tous les colonnes');
    LieuxProgrammationPage.openColumnFilter();
    
    // Vérifier les options disponibles
    LieuxProgrammationPage.getListColumnFilter().contains('Tous les colonnes').should('be.visible');
    LieuxProgrammationPage.getListColumnFilter().contains('Nom').should('be.visible');
    LieuxProgrammationPage.getListColumnFilter().contains('Code Postal').should('be.visible');
    LieuxProgrammationPage.getListColumnFilter().contains('Ville').should('be.visible');
    
    // Sélectionner une colonne spécifique
    LieuxProgrammationPage.getListColumnFilter().contains('Nom').click();
    LieuxProgrammationPage.getListColumnFilter().should('contain','Nom');
    
    // Vérifier que le filtre est appliqué (le nombre de colonnes visibles devrait être réduit)
    LieuxProgrammationPage.getColumnFilterButton().should('have.text', 'Nom');
  });

  it('devrait gérer correctement les actions sur les rows', () => {
    // Tester le bouton Voir (premier élément)
    cy.intercept('GET', '**/lieux/lieu%20de%20programmation*').as('getLieuDetail');
    LieuxProgrammationPage.getViewButton(0).click();
    cy.url().should('include', '/lieux/lieu%20de%20programmation')
    //cy.wait('@getLieuDetail');
    
    // Retourner à la page principale
    cy.go('back');
    cy.url('include','/lieux/lieu%20de%20programmation')
    //cy.wait('@getLieux');
    
    // Tester le bouton Modifier (deuxième élément)
    cy.intercept('GET', '**/lieux/lieu%20de%20programmation*').as('getLieuEdit');
    LieuxProgrammationPage.getEditButton(1).click();
    cy.url().should('include', '/lieux/lieu%20de%20programmation/2')
    //cy.wait('@getLieuEdit');
    
    // Retourner à la page principale
    cy.go('back');
    cy.url().should('include', '/lieux/lieu%20de%20programmation')
    //cy.wait('@getLieux');
  });

  it('devrait tester le bouton "Ajouter nouveau lieu"', () => {
    // Intercepter la requête qui sera déclenchée lors du clic sur Ajouter
    cy.intercept('GET', '**/lieux/lieu%20de%20programmation/ajouter').as('createLieu');
    
    // Cliquer sur le bouton Ajouter
    LieuxProgrammationPage.getAddButton().click();
    
    // Vérifier la redirection vers la page de création
    //cy.wait('@createLieu');
    cy.url().should('include', '/lieux/lieu%20de%20programmation/ajouter');
  });

  it('devrait tester les contrôles de pagination', () => {
    // Vérifier les informations de pagination initiales
    LieuxProgrammationPage.getPaginationInfo().should('contain', '1-5 sur 7');
    
    // Tester le changement du nombre d'éléments par page
    cy.intercept('GET', '**/platform-api/lieux/programmation*').as('changePageSize');
    LieuxProgrammationPage.changeRowsPerPage(10);
    //cy.wait('@changePageSize');
    
    // Vérifier que la pagination a été mise à jour
    LieuxProgrammationPage.getPaginationInfo().should('contain', '1-7 sur 7');
    
    // Comme il n'y a que 6 éléments au total, on ne peut pas tester la navigation entre pages
    // Mais on peut vérifier que le bouton "page suivante" est désactivé
    LieuxProgrammationPage.getNextPageButton().should('be.disabled');
  });

  it('devrait tester les boutons Imprimmer et Télécharger', () => {
    // Ces fonctions sont difficiles à tester avec Cypress car elles déclenchent des actions du navigateur
    // On peut simplement vérifier que les boutons sont présents et cliquables
    LieuxProgrammationPage.getPrintButton().should('be.visible');
    LieuxProgrammationPage.getDownloadButton().should('be.visible');
    
    // Pour tester le clic sur télécharger, on peut intercepter une éventuelle requête
    cy.intercept('GET', '**/platform-api/lieux/programmation/export*').as('exportData');
    LieuxProgrammationPage.getDownloadButton().click();
    
    // Note: Si un menu déroulant s'ouvre avec des options d'export, il faudrait adapter le test
  });
});