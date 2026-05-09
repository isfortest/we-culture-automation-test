class LieuxProgrammationPage {
    // Navigation
    navigate() {
      cy.visit('/lieux/lieux%20de%20programmation');
    }
  
    // Page elements
    getTitle() {
      return cy.contains('Lieux de programmation');
    }
  
    getBreadcrumb() {
      return cy.get('nav').contains('Programmation');
    }
  
    getRetourButton() {
      return cy.contains('RETOUR');
    }
  
    // Filters section
    getFiltersSection() {
      return cy.contains('Filtrer par').parent();
    }
  
    getFilterSelect(filterName) {
      return cy.contains(filterName).parent().find('select, [role="combobox"]');
    }
  
    openFilterDropdown(filterName) {
      this.getFilterSelect(filterName).click();
    }
  
    selectFilterOption(filterName, optionText) {
      this.openFilterDropdown(filterName);
      cy.contains(optionText).click();
    }
  
    getResetFiltersButton() {
      return cy.contains('Réinitialiser les filtres');
    }
  
    resetFilters() {
      this.getResetFiltersButton().click();
    }
  
    getFilterCountText() {
      return cy.contains(/Nombre de lieux de programmation\s*:/);
    }
  
    // Table section
    getAddButton() {
      return cy.contains('Ajouter un lieu');
    }
  
    getColumnFilterButton() {
      return cy.get('[role="combobox"], .MuiSelect-select').filter(':visible').last();
    }
    getListColumnFilter() {
        return cy.get('[role="listbox"], [role="menu"], .MuiMenu-list');
      }
  
    openColumnFilter() {
      this.getColumnFilterButton().click();
    }
  
    selectColumnInFilter(columnName) {
      this.openColumnFilter();
      cy.contains(columnName).click();
    }
  
    getSearchInput() {
      return cy.get('input[type="text"]').filter(':visible').last();
    }
  
    search(term) {
      this.getSearchInput().clear().type(term);
      // Add wait for search results if needed
      cy.wait(500);
    }
  
    getPrintButton() {
      return cy.contains('button', /Imprimer/i).scrollIntoView();
    }
  
    getDownloadButton() {
      return cy.contains('button', /Télécharger|Telecharger/i).scrollIntoView();
    }
  
    getTable() {
      return cy.get('table, [role="table"]');
    }
  
    getTableHeaders() {
      return cy.get('th, [role="columnheader"]');
    }
  
    getTableRows() {
      return cy.get('table.MuiTable-root tbody tr');
    }
  
    // Row actions
    getViewButton(rowIndex) {
      return this.getTableRows().eq(rowIndex).find('[aria-label="Voir"], button:has(svg[data-testid="VisibilityIcon"])');
    }

    // Méthode pour obtenir le dropdown de téléchargement
    getDownloadDropdown() {
      return cy.get('.MuiPopover-paper');
    }

    // Méthode pour obtenir une option de format spécifique dans le dropdown
    getFormatOption(formatName) {
      return this.getDownloadDropdown().find('.MuiMenuItem-root').contains(formatName);
    }

    // Méthode pour cliquer sur l'option PDF
    clickPdfFormat() {
      this.getDownloadButton().click();
      this.getFormatOption('Format PDF').click();
    }

    // Méthode pour cliquer sur l'option Excel
    clickExcelFormat() {
      this.getDownloadButton().click();
      this.getFormatOption('Format Excel').click();
    }

    // Méthode pour vérifier si un fichier a été téléchargé (à utiliser avec l'interception)
    verifyFileDownloaded(alias, fileType) {
      return cy.wait(alias).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        if (fileType === 'pdf') {
          expect(interception.response.headers['content-type']).to.include('application/pdf');
        } else if (fileType === 'excel') {
          expect(interception.response.headers['content-type']).to.include('spreadsheet');
        }
        expect(interception.response.headers['content-disposition']).to.include('attachment');
      });
    }
  
    getDeleteButton(rowIndex) {
      return this.getTableRows().eq(rowIndex).find('[aria-label="Supprimer"], button:has(svg[data-testid="DeleteIcon"])');
    }
  
    getEditButton(rowIndex) {
      return this.getTableRows().eq(rowIndex).find('[aria-label="Modifier"], button:has(svg[data-testid="EditIcon"])');
    }
  
    // Pagination
    getPaginationInfo() {
      return cy.contains(/Affichant\s+\d+\s+à\s+\d+\s+de\s+\d+\s+lignes|\d+\s*-\s*\d+\s+sur\s+\d+/);
    }
  
    getRowsPerPageSelect() {
      return cy.contains('Afficher').parent().find('[role="combobox"]').first();
    }
  
    changeRowsPerPage(number) {
      this.getRowsPerPageSelect().click();
      cy.get(`.MuiMenuItem-root[data-value="${number}"]`).click();
    }
  
    getNextPageButton() {
      return cy.get('button[aria-label="Go to next page"]');
    }
  
    getPreviousPageButton() {
      return cy.get('button[aria-label="Go to previous page"]');
    }
  
    // Helper methods for filters
    getCurrentFilterValues() {
      const filters = {};
      const filterNames = ['Plaques', 'Territoires', 'CMCAS', 'Programmable', 'Saison', 'Dotation'];
      
      filterNames.forEach(name => {
        cy.get(`label:contains("${name}")`).parent().find('.MuiSelect-select, [role="button"]').invoke('text').then(text => {
          filters[name] = text.trim();
        });
      });
      
      return cy.wrap(filters);
    }
  }
  
  export default new LieuxProgrammationPage();
