import TablePage from './tablePage';

class CmcasPage extends TablePage {
  navigate() {
    cy.visit('/lieux/cmcas');
  }

  getTitle() {
    return cy.contains('Liste des CMCAS');
  }

  getBreadcrumb() {
    return cy.get('.breadcrumb, nav').contains(/Cmcas|CMCAS/);
  }
}

export default new CmcasPage();
