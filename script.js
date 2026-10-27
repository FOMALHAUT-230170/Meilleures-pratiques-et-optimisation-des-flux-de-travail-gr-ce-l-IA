  ];
  const pricingGrid = document.getElementById('pricing-grid');
  const billingButtons = document.querySelectorAll('.billing-toggle [data-cycle]');
  let cycleFacturation = 'mensuel';
  function periodePour(forfait) {
    if (/devis/i.test(forfait.prixMensuel)) return '';
    return cycleFacturation === 'annuel' ? '/an' : '/mois';
  }
  const trialBtn = document.querySelector('.pricing .btn');
  if (trialBtn) {
    trialBtn.addEventListener('click', () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  function prixPour(forfait) {
    return cycleFacturation === 'annuel' ? forfait.prixAnnuel : forfait.prixMensuel;
  }
  function rendreForfaits() {
    pricingGrid.replaceChildren();
    const fragment = document.createDocumentFragment();
    forfaits.forEach((forfait) => {
      fragment.appendChild(
        Card(forfait.titre, prixPour(forfait), forfait.fonctionnalités, {
          description: forfait.description,
          badge: forfait.badge,
          misEnAvant: forfait.misEnAvant,
          periode: periodePour(forfait),
          boutonTexte: forfait.boutonTexte,
        })
      );
    });
    pricingGrid.appendChild(fragment);
  }
  // Étape 2 : Écouter l'événement clic pour changer le thème
  billingButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      cycleFacturation = btn.dataset.cycle;
      billingButtons.forEach((other) => {
        const actif = other === btn;
        other.setAttribute('aria-pressed', String(actif));
        other.classList.toggle('is-active', actif);
      });
      rendreForfaits();
    });
  });
  rendreForfaits();
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  htmlElement.setAttribute('data-theme', initialTheme);
  updateToggleUI(initialTheme);
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
    
    // Application du thème global
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Sauvegarde du choix de l'utilisateur
    localStorage.setItem('portfolio-theme', newTheme);
    
    // Mise à jour visuelle et textuelle du bouton
    updateToggleUI(newTheme);
  });
  // Fonction utilitaire pour synchroniser le texte et l'icône du bouton
  function updateToggleUI(theme) {
    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Mode Clair';
      themeToggle.setAttribute('aria-label', "Désactiver le mode sombre");
    } else {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Mode Sombre';
      themeToggle.setAttribute('aria-label', "Activer le mode sombre");
    }
    const isDark = theme === 'dark';
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    themeText.textContent = isDark ? 'Mode Clair' : 'Mode Sombre';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute(
      'aria-label',
      isDark ? 'Désactiver le mode sombre' : 'Activer le mode sombre'
    );
  }
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const observed = document.querySelectorAll('header[id], main section[id]');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const actif = link.getAttribute('href') === `#${entry.target.id}`;
          if (actif) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  observed.forEach((section) => sectionObserver.observe(section));
  const contactForm = document.querySelector('.contact-form');
  const formStatus = document.getElementById('form-status');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    contactForm.reset();
    if (formStatus) {
      formStatus.textContent =
        'Merci. Votre demande a bien été enregistrée localement. Nous vous recontacterons à l’adresse indiquée.';
    }
  });
});