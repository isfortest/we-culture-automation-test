import TablePage from './tablePage';

class TerritoiresPage extends TablePage {
  navigate() {
    cy.visit('/lieux/territoires');
  }

  getTitle() {
    return cy.contains('Liste des Territoires');
  }

  getBreadcrumb() {
    return cy.get('.breadcrumb, nav').contains('Territoires');
  }
}

export default new TerritoiresPage();
