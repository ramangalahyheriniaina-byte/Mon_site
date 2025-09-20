document.addEventListener('DOMContentLoaded', function() {
  // Navigation entre les sections
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = document.querySelectorAll('.contenue-principale');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Vérifier si c'est un lien d'ancrage dans la même page
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        
        // Mettre à jour la navigation active
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
        
        // Afficher la section cible
        contentSections.forEach(section => {
          section.classList.remove('active');
          if (section.id === targetId) {
            section.classList.add('active');
          }
        });
        
        // Fermer le sidebar sur mobile
        if (window.innerWidth <= 820) {
          document.getElementById('sidebar').classList.remove('active');
        }
        
        // Faire défiler vers la section
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Gestion des liens d'ancrage dans le contenu
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#') {
        e.preventDefault();
        
        const targetId = href.substring(1);
        
        // Mettre à jour la navigation active
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        document.querySelector(`.nav-link[href="${href}"]`).classList.add('active');
        
        // Afficher la section cible
        contentSections.forEach(section => {
          section.classList.remove('active');
          if (section.id === targetId) {
            section.classList.add('active');
          }
        });
        
        // Faire défiler vers la section
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Toggle du menu hamburger
  const hamburger = document.getElementById('hamb');
  const sidebar = document.getElementById('sidebar');
  
  if (hamburger && sidebar) {
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('active');
    });
  }
  
  // Changement de thème 
  const themeSwitch = document.getElementById('checkbox');
  
  if (themeSwitch) {
    //  le mode clair par défaut
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeSwitch.checked = false;
    
    themeSwitch.addEventListener('change', function() {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeSwitch.checked = true;
    } else {
      // Assurer le mode clair
      document.documentElement.removeAttribute('data-theme');
      themeSwitch.checked = false;
    }
  }
  
  // Gestion du chargement initial de la page avec ancre
  function handleInitialHash() {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const targetSection = document.getElementById(hash);
      const navLink = document.querySelector(`.nav-link[href="#${hash}"]`);
      
      if (targetSection && navLink) {
        // Mettre à jour la navigation active
        navLinks.forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
        
        // Afficher la section cible
        contentSections.forEach(section => {
          section.classList.remove('active');
          if (section.id === hash) {
            section.classList.add('active');
          }
        });
        
        // Faire défiler vers la section
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }
  
  // Gérer l'ancrage initial au chargement de la page
  handleInitialHash();
  
  // Écouter les changements de hash (lorsqu'on utilise les boutons précédent/suivant du navigateur)
  window.addEventListener('hashchange', handleInitialHash);
});