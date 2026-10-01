const menu = window.restaurantMenu;
const menuNotes = window.restaurantMenuNotes || {};
const tabs = [...document.querySelectorAll('.menu-tabs [data-category]')];
const panel = document.querySelector('#menu-panel');
const categoryNote = document.querySelector('#category-note');

function showMenu(key) {
  if (!panel || !menu?.[key]) return;

  if (categoryNote) categoryNote.textContent = menuNotes[key] || '';

  tabs.forEach((tab) => {
    const selected = tab.dataset.category === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  panel.setAttribute('aria-labelledby', `tab-${key}`);
  panel.replaceChildren(
    ...menu[key].map(([name, price, description]) => {
      const row = document.createElement('div');
      row.className = 'menu-item';

      const top = document.createElement('div');
      top.className = 'menu-item-top';

      const nameEl = document.createElement('span');
      nameEl.textContent = name;

      const priceEl = document.createElement('span');
      priceEl.textContent = price;

      top.append(nameEl, priceEl);
      row.append(top);

      if (description) {
        const descriptionEl = document.createElement('p');
        descriptionEl.textContent = description;
        row.append(descriptionEl);
      }

      return row;
    })
  );
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showMenu(tab.dataset.category));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const nextIndex = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? tabs.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;

    tabs[nextIndex].focus();
    showMenu(tabs[nextIndex].dataset.category);
  });
});

showMenu('starters');

const header = document.querySelector('header');
const headerActions = document.querySelector('.header-actions');
if (header && headerActions) {
  let menuButton = header.querySelector('.mobile-menu-toggle');
  let mobileNav = header.querySelector('#mobile-menu, #mobile-navigation');

  if (menuButton && mobileNav) {
    mobileNav.classList.add('mobile-navigation');
  } else {
    menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'mobile-navigation');
    menuButton.innerHTML = '<span></span><span></span><span></span>';

    mobileNav = document.createElement('nav');
    mobileNav.id = 'mobile-navigation';
    mobileNav.className = 'mobile-navigation';
    mobileNav.setAttribute('aria-label', 'Mobile navigation');
    mobileNav.innerHTML = '<a href="/#menu">Menu</a><a href="/#harbour">Harbour</a><a href="/reviews/">Reviews</a><a href="/contact/index.html">Contact</a>';

    headerActions.append(menuButton);
    header.append(mobileNav);
  }

  const closeMobileNav = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.classList.remove('open');
  };

  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
    mobileNav.classList.toggle('open', opening);
  });

  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileNav));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobileNav();
  });
  document.addEventListener('click', (event) => {
    if (!mobileNav.classList.contains('open')) return;
    if (header.contains(event.target)) return;
    closeMobileNav();
  });
}

const dialog = document.querySelector('#booking');
if (dialog) {
  document.querySelectorAll('[data-book]').forEach((button) => {
    button.addEventListener('click', () => dialog.showModal());
  });

  dialog.querySelector('.close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) dialog.close();
  });
}

const storyTitles = [
  'Fresh pasta,<br><em>made for the table.</em>',
  'From the sea,<br><em>served simply.</em>',
  'From the grill,<br><em>served with care.</em>'
];
const storyDescriptions = [
  'Sicilian pasta and risotto, from classic sauces to seafood.',
  'Mussels, calamari, prawns and fish with Mediterranean flavours.',
  'Rib-eye, tagliata, ribs and more for a relaxed meal by the harbour.'
];
const storyLabels = ['PASTA', 'SEAFOOD', 'MEAT'];
let currentSlide = 0;

function showSlide(nextSlide) {
  if (nextSlide === currentSlide) return;
  currentSlide = nextSlide;

  document.querySelectorAll('.story-img').forEach((image, index) => {
    image.classList.toggle('active', index === nextSlide);
  });

  document.querySelectorAll('[data-slide]').forEach((button, index) => {
    const selected = index === nextSlide;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  const title = document.querySelector('#story-title');
  const description = document.querySelector('#story-description');
  const counter = document.querySelector('.story-index');
  const label = document.querySelector('.story-copy .eyebrow');
  const category = document.querySelector('.story-category');
  if (title) title.innerHTML = storyTitles[nextSlide];
  if (description) description.textContent = storyDescriptions[nextSlide];
  if (counter) counter.textContent = `0${nextSlide + 1} / 03`;
  if (label && innerWidth <= 750 && !category) label.textContent = storyLabels[nextSlide];
  if (category) category.textContent = storyLabels[nextSlide];
}

const storyLabel = document.querySelector('.story-copy .eyebrow');
const storyCategory = document.querySelector('.story-category');
if (storyLabel && innerWidth <= 750 && !storyCategory) storyLabel.textContent = storyLabels[0];
if (storyCategory) storyCategory.textContent = storyLabels[0];

document.querySelectorAll('[data-slide]').forEach((button) => {
  button.addEventListener('click', () => showSlide(Number(button.dataset.slide)));
});

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches) {
  const storySection = document.querySelector('.food-story');
  let queued = false;

  if (storySection) {
    addEventListener('scroll', () => {
      if (queued) return;
      queued = true;

      requestAnimationFrame(() => {
        const rect = storySection.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= innerHeight) {
          const denominator = rect.height - innerHeight;
          if (denominator > 0) {
            const progress = Math.max(0, Math.min(0.9999, -rect.top / denominator));
            showSlide(Math.min(2, Math.floor(progress * 3)));
          }
        }
        queued = false;
      });
    }, { passive: true });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-heading, .harbour-copy, .visit > div, .reviews-widget').forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
