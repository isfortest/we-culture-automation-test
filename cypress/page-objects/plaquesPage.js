class PlaquesPage {
    navigate() {
      cy.visit('/lieux/plaques');
    }
  
    // Navigation and Breadcrumb
    getTitle() {
      return cy.contains('Liste des Plaques');
    }
  
    getBreadcrumb() {
      return cy.get('.breadcrumb, nav').contains('Plaques');
    }
  
    // Table elements
    getTable() {
      return cy.get('table, [role="table"]');
    }
  
    getTableRows() {
      return this.getTable().find('tr, [role="row"]').not(':first-child');
    }
  
    getTableHeaders() {
      return this.getTable().find('th, [role="columnheader"]');
    }
  
    // Filtering and searching
    getSearchInput() {
      return cy.get("input[id=':rh:']");
    }
  
    search(term) {
      this.getSearchInput().clear().type(term);
    }
  
    getColumnFilterButton() {
      return cy.contains('Tous les colonnes');
    }
  
    // Actions
    getEditButton(rowIndex) {
      return this.getTableRows().eq(rowIndex).find('button[aria-label="edit"]');
    }
  
    getImpressionButton() {
      return cy.contains('Imprimer');
    }
  
    getExportButton() {
      return cy.contains('Télécharger');
    }
  
    // Pagination
    getPaginationDisplayText() {
      return cy.get('.MuiTablePagination-displayedRows');
    }
  
    getRowsPerPageSelector() {
        return cy.get('.MuiSelect-standard.MuiInputBase-input');
      }
    
    openRowsPerPageMenu() {
        this.getRowsPerPageSelector().click();
      }
    
    selectRowsPerPage(number) {
        this.openRowsPerPageMenu();
        cy.get(`.MuiMenuItem-root[data-value="${number}"]`).click();
      }
    
    // Navigation buttons
    getNextPageButton() {
    return cy.get('button[aria-label="Go to next page"]');
    }

    getPreviousPageButton() {
    return cy.get('button[aria-label="Go to previous page"]');
    }
    // Specific data verifications
    verifyRegionExists(regionName) {
      return cy.contains(regionName);
    }
  }
  
  export default new PlaquesPage();