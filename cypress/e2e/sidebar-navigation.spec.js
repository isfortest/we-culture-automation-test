/// <reference types="Cypress" />
describe('Navigation via sidebar', () => {
    beforeEach(() => {
      cy.visit('/', {
        timeout: 60000,
        failOnStatusCode: false
      });
    });

    it('devrait vérifier tous les éléments de la navigation principale, y compris les éléments du sub-menu "Lieux"', () => {
      // Click on the Lieux menu item to expand
      cy.contains('Lieux').click();

      const expectedNavItems = [
        'Accueil',
        'Lieux',
        'Plaques',
        'Territoires',
        'CMCAS',
        'Lieux de Programmation',
        'Activités',
        'Programmation et Outils',
        'Administration et Reporting',
        'À propos'
      ];
      
      expectedNavItems.forEach(item => {
        cy.contains(item).should('be.visible');
      });
    });
  
    it('devrait naviguer vers la page "Plaques" depuis la sidebar', () => {
      // Click on the Lieux menu item to expand
      cy.contains('Lieux').click();
      
      // Click on the Plaques sub-menu item
      cy.contains('Plaques').click();
      
      // Verify we are on the Plaques page
      cy.url().should('include', '/lieux/plaques');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Lieux/Plaques');
      cy.contains('Retour').should('be.visible');
      cy.contains('Liste des Plaques').should('be.visible');
    });

    it('devrait naviguer vers la page "Territoires" depuis la sidebar', () => {
      // Click on the Lieux menu item to expand
      cy.contains('Lieux').click();
      
      // Click on the Territoires sub-menu item
      cy.contains('Territoires').click();
      
      // Verify we are on the Territoires page
      cy.url().should('include', '/lieux/territoires');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Lieux/Territoires');
      cy.contains('Retour').should('be.visible');
      cy.contains('Liste des Territoires').should('be.visible');
    });

    it('devrait naviguer vers la page "CMCAS" depuis la sidebar', () => {
      // Click on the Lieux menu item to expand
      cy.contains('Lieux').click();
      
      // Click on the CMCAS sub-menu item
      cy.contains('CMCAS').click();
      
      // Verify we are on the CMCAS page
      cy.url().should('include', '/lieux/cmcas');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Lieux/Cmcas');
      cy.contains('Retour').should('be.visible');
      cy.contains('Liste des CMCAS').should('be.visible');
    });

    it('devrait naviguer vers la page "Programmation" depuis la sidebar', () => {
      // Click on the Lieux menu item to expand
      cy.contains('Lieux').click();
      
      // Click on the Programmation sub-menu item
      cy.contains('Lieux de Programmation').click();
      
      // Verify we are on the Programmation page
      cy.url().should('include', '/lieux/programmation');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Lieux/Programmation');
      cy.contains('Retour').should('be.visible');
      cy.contains('Lieux de programmation').should('be.visible');
      cy.contains('Liste des Lieux de programmation').should('be.visible');
    });
  
    it('devrait vérifier tous les éléments de la navigation principale, y compris les éléments du sub-menu "Activités"', () => {
      // Click on the Activités menu item to expand
      cy.contains('Activités').click();

      const expectedNavItems = [
        'Accueil',
        'Lieux',
        'Activités',
        'Interventions',
        'Interventions Programmables',
        'Intervenants',
        'Annuaire des Intervenants',
        'Séjours',
        'Programmation et Outils',
        'Administration et Reporting',
        'À propos'
      ];
      
      expectedNavItems.forEach(item => {
        cy.contains(item).should('be.visible');
      });
    });

    it('devrait naviguer vers la page "Interventions" depuis la sidebar', () => {
      // Click on the Activités menu item to expand
      cy.contains('Activités').click();
      
      // Click on the Interventions sub-menu item
      cy.contains('Interventions').click();
      
      // Verify we are on the Interventions page
      cy.url().should('include', '/interventions');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Interventions');
      //cy.contains('Retour').should('be.visible');
    });

    it('devrait naviguer vers la page "Interventions Programmables" depuis la sidebar', () => {
      // Click on the Activités menu item to expand
      cy.contains('Activités').click();
      
      // Click on the Territoires sub-menu item
      cy.contains('Interventions Programmables').click();
      
      // Verify we are on the Interventions Programmables page
      cy.url().should('include', '/activites/interventions/interventionsprogrammables');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Activites/Interventions/Interventionsprogrammables');
      cy.contains('Retour').should('be.visible');
      cy.contains('Liste des interventions programmables').should('be.visible');
    });

    it('devrait naviguer vers la page "Intervenants" depuis la sidebar', () => {
      // Click on the Activités menu item to expand
      cy.contains('Activités').click();
      
      // Click on the Intervenants sub-menu item
      cy.contains('Intervenants').click();
      
      // Verify we are on the CMCAS page
      cy.url().should('include', '/activites/interventions/intervenants');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Activites/Interventions/Intervenants');
      cy.contains('Retour').should('be.visible');
      cy.contains('Liste des intervenants').should('be.visible');
    });

    it('devrait naviguer vers la page "Annuaire Intervenants" depuis la sidebar', () => {
      // Click on the Activités menu item to expand
      cy.contains('Activités').click();
      
      // Click on the Annuaire des Intervenants sub-menu item
      cy.contains('Annuaire des Intervenants').click();
      
      // Verify we are on the Annuaire des Intervenants page
      cy.url().should('include', '/annuaire-intervenants');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Annuaire Intervenants');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Annuaire Intervenants').should('be.visible');
    });

    it('devrait naviguer vers la page "Séjours" depuis la sidebar', () => {
      // Click on the Activités menu item to expand
      cy.contains('Activités').click();
      
      // Click on the Séjours sub-menu item
      cy.contains('Séjours').click();
      
      // Verify we are on the Séjours page
      cy.url().should('include', '/sejours');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Sejours');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Séjours').should('be.visible');
    });

    it('Vérifier tous les éléments de la navigation principale, y compris les éléments du sub-menu "Programmation et Outils"', () => {
      // Click on the Programmation et Outils menu item to expand
      cy.contains('Programmation et Outils').click();
      
      const expectedNavItems = [
        'Accueil',
        'Lieux',
        'Activités',
        'Programmation et Outils',
        'Programmation',
        'Feuilles de routage',
        'Aperçu de la Programmation',
        "Commandes d'impression",
        'Administration et Reporting',
        'À propos'
      ];
      
      expectedNavItems.forEach(item => {
        cy.contains(item).should('be.visible');
      });
    });

    it('devrait naviguer vers la page "Programmation" depuis la sidebar', () => {
      // Click on the Programmation et Outils menu item to expand
      cy.contains('Programmation et Outils').click();
      
      // Click on the Programmation sub-menu item
      cy.get('[href="/programmation"]').click();
      
      // Verify we are on the Programmation page
      cy.url().should('include', '/programmation');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Programmation');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Programmation').should('be.visible');
    });

    it('devrait naviguer vers la page "Feuilles de routage" depuis la sidebar', () => {
      // Click on the Programmation et Outils menu item to expand
      cy.contains('Programmation et Outils').click();
      
      // Click on the Feuilles de routage sub-menu item
      cy.contains('Feuilles de routage').click();
      
      // Verify we are on the Feuilles de routage page
      cy.url().should('include', '/feuilles-de-routage');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Feuilles De Routage');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Feuilles De Routage').should('be.visible');
    });

    it('devrait naviguer vers la page "Apercu Programmation" depuis la sidebar', () => {
      // Click on the Programmation et Outils menu item to expand
      cy.contains('Programmation et Outils').click();
      
      // Click on the Apercu Programmation sub-menu item
      cy.contains('Aperçu de la Programmation').click();
      
      // Verify we are on the Apercu Programmation page
      cy.url().should('include', '/apercu-programmation');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Apercu Programmation');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Apercu Programmation').should('be.visible');
    });

    it('devrait naviguer vers la page "Commandes Impression" depuis la sidebar', () => {
      // Click on the Programmation et Outils menu item to expand
      cy.contains('Programmation et Outils').click();
      
      // Click on the Commandes d'impression sub-menu item
      cy.contains("Commandes d'impression").click();
      
      // Verify we are on the Commandes Impression page
      cy.url().should('include', '/commandes-impression');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Commandes Impression');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Commandes Impression').should('be.visible');
    });

    it('Vérifier tous les éléments de la navigation principale, y compris les éléments du sub-menu "Administration et Reporting"', () => {
      // Click on the Programmation et Outils menu item to expand
      cy.contains('Administration et Reporting').click();
      
      const expectedNavItems = [
        'Accueil',
        'Lieux',
        'Activités',
        'Programmation et Outils',
        'Administration et Reporting',
        'Fiches Appréciations',
        'Profils et Habilitations',
        'Paramétrage et Administration',
        'Reporting et Statistiques',
        'À propos'
      ];
      
      expectedNavItems.forEach(item => {
        cy.contains(item).should('be.visible');
      });
    });

    it('devrait naviguer vers la page "fiches-appreciations" depuis la sidebar', () => {
      // Click on the Administration et Reporting menu item to expand
      cy.contains('Administration et Reporting').click();
      
      // Click on the Fiches Appréciations sub-menu item
      cy.contains("Fiches Appréciations").click();
      
      // Verify we are on the fiches-appreciations page
      cy.url().should('include', '/fiches-appreciations');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Fiches Appreciations');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Fiches Appreciations').should('be.visible');
    });

    it('devrait naviguer vers la page "profils-habilitations" depuis la sidebar', () => {
      // Click on the Administration et Reporting menu item to expand
      cy.contains('Administration et Reporting').click();
      
      // Click on the Profils et Habilitations sub-menu item
      cy.contains("Profils et Habilitations").click();
      
      // Verify we are on the profils-habilitations page
      cy.url().should('include', '/profils-habilitations');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Profils Habilitations');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Profils et Habilitations').should('be.visible');
    });

    it('devrait naviguer vers la page "parametrage-administration" depuis la sidebar', () => {
      // Click on the Administration et Reporting menu item to expand
      cy.contains('Administration et Reporting').click();
      
      // Click on the Paramétrage et Administration sub-menu item
      cy.contains("Paramétrage et Administration").click();
      
      // Verify we are on the parametrage-administration page
      cy.url().should('include', '/parametrage-administration');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Parametrage Administration');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Paramétrage et Administration').should('be.visible');
    });

    it('devrait naviguer vers la page "reporting-statistiques" depuis la sidebar', () => {
      // Click on the Administration et Reporting menu item to expand
      cy.contains('Administration et Reporting').click();
      
      // Click on the Reporting et Statistiques sub-menu item
      cy.contains("Reporting et Statistiques").click();
      
      // Verify we are on the reporting-statistiques page
      cy.url().should('include', '/reporting-statistiques');
      cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/Reporting Statistiques');
      //cy.contains('Retour').should('be.visible');
      //cy.contains('Reporting et Statistiques').should('be.visible');
    });

    it('devrait naviguer vers la page "About" depuis la sidebar', () => {
        // Click on the about menu item
        cy.contains('À propos').click();
        
        // Verify we are on the about page
        cy.url().should('include', '/about');
        cy.get('.MuiBreadcrumbs-ol').should('have.text','Accueil/About');
        cy.contains('À propos de notre application We-Cultures').should('be.visible');
      });
  });