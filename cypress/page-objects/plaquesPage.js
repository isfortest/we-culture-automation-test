import TablePage from './tablePage';

class PlaquesPage extends TablePage {
  navigate() {
    cy.visit('/lieux/plaques');
  }

  getTitle() {
    return cy.contains('Liste des Plaques');
  }

  getBreadcrumb() {
    return cy.get('.breadcrumb, nav').contains('Plaques');
  }
}

export default new PlaquesPage();
