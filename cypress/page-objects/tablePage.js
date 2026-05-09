class TablePage {
  getTable() {
    return cy.get('table, [role="table"]');
  }

  getTableRows() {
    return this.getTable().find('tbody tr, [role="row"]').not(':first-child');
  }

  getTableHeaders() {
    return this.getTable().find('th, [role="columnheader"]');
  }

  getSearchInput() {
    return cy.get('input[type="text"]').filter(':visible').first();
  }

  search(term) {
    this.getSearchInput().clear().type(term);
  }

  getColumnFilterButton() {
    return cy.contains('[role="combobox"], .MuiSelect-select, button', 'Tous les colonnes');
  }

  selectColumnFilter(columnName) {
    this.getColumnFilterButton().click();
    cy.get('[role="option"], [role="menuitem"], li').contains(columnName).click();
  }

  getEditButton(rowIndex) {
    return this.getTableRows()
      .eq(rowIndex)
      .find('button[aria-label="edit"], button[aria-label="Modifier"], button:has(svg[data-testid="EditIcon"])');
  }

  getImpressionButton() {
    return cy.contains(/Imprimer/i);
  }

  getExportButton() {
    return cy.contains(/Télécharger|Telecharger/i);
  }

  getPaginationDisplayText() {
    return cy.contains(/Affichant\s+\d+\s+à\s+\d+\s+de\s+\d+\s+lignes|\d+\s*-\s*\d+\s+sur\s+\d+/);
  }

  getRowsPerPageSelector() {
    return cy.contains('Afficher').parent().find('[role="combobox"]').first();
  }

  selectRowsPerPage(number) {
    this.getRowsPerPageSelector().click();
    cy.get(`[role="option"][data-value="${number}"], .MuiMenuItem-root[data-value="${number}"]`).click();
  }

  getNextPageButton() {
    return cy.get('button[aria-label="Go to next page"]');
  }

  getPreviousPageButton() {
    return cy.get('button[aria-label="Go to previous page"]');
  }

  verifyRegionExists(regionName) {
    return cy.contains(regionName);
  }
}

export default TablePage;
