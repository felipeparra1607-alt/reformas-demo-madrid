(() => {
  if (window.__reformasNovaInitialized) return;
  window.__reformasNovaInitialized = true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open');
    });

    nav.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const animated = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    animated.forEach((item) => observer.observe(item));
  } else {
    document.querySelectorAll('[data-animate]').forEach((item) => item.classList.add('visible'));
  }

  document.querySelectorAll('[data-ajax-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = form.querySelector('.form-message');
      if (message) {
        message.textContent = 'Gracias, te contactamos en breve.';
      }
      form.reset();
    });
  });

  const projectData = [
    {
      title: 'Reforma integral luminosa',
      description:
        'Proyecto en Chamberí enfocado en abrir espacios y reforzar la entrada de luz natural con acabados neutros y cálidos.',
      before: 'https://unsplash.com/photos/3tu1nlIg4XM/download?force=true',
      after: 'https://unsplash.com/photos/8FIqK2J7jSc/download?force=true'
    },
    {
      title: 'Baño contemporáneo',
      description:
        'Actualización completa de baño en Retiro con nuevo revestimiento, ducha amplia y almacenamiento integrado.',
      before: 'https://unsplash.com/photos/ET9MLDGk7zM/download?force=true',
      after: 'https://unsplash.com/photos/xW2oK045Rwc/download?force=true'
    },
    {
      title: 'Cocina abierta funcional',
      description:
        'Intervención en Salamanca para ganar superficie útil y conectar cocina y salón con una distribución más fluida.',
      before: 'https://unsplash.com/photos/3tu1nlIg4XM/download?force=true',
      after: 'https://unsplash.com/photos/ET9MLDGk7zM/download?force=true'
    },
    {
      title: 'Vivienda modernizada',
      description:
        'Reforma en Chamartín con mejora de recorridos, renovación de iluminación y selección de materiales resistentes.',
      before: 'https://unsplash.com/photos/yygL_U1Vmvk/download?force=true',
      after: 'https://unsplash.com/photos/3tu1nlIg4XM/download?force=true'
    },
    {
      title: 'Salón y cocina renovados',
      description:
        'Proyecto en Arganzuela con foco en integración visual, confort diario y uniformidad de acabados.',
      before: 'https://unsplash.com/photos/xW2oK045Rwc/download?force=true',
      after: 'https://unsplash.com/photos/yygL_U1Vmvk/download?force=true'
    },
    {
      title: 'Redistribución integral',
      description:
        'En Moncloa redefinimos estancias para aprovechar mejor la vivienda y facilitar el mantenimiento cotidiano.',
      before: 'https://unsplash.com/photos/ET9MLDGk7zM/download?force=true',
      after: 'https://unsplash.com/photos/8FIqK2J7jSc/download?force=true'
    }
  ];

  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const title = modal.querySelector('#modal-title');
  const description = modal.querySelector('#modal-description');
  const beforeImg = modal.querySelector('#modal-before');
  const afterImg = modal.querySelector('#modal-after');
  const closeBtn = modal.querySelector('.modal-close');

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  const openModal = (index) => {
    const project = projectData[index];
    if (!project || !title || !description || !beforeImg || !afterImg) return;
    title.textContent = project.title;
    description.textContent = project.description;
    beforeImg.src = project.before;
    afterImg.src = project.after;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  document.querySelectorAll('[data-project]').forEach((card) => {
    const handler = () => {
      const index = Number(card.getAttribute('data-project'));
      openModal(index);
    };

    card.addEventListener('click', handler);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handler();
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
