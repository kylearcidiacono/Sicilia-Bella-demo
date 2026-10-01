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
  if (title) title.innerHTML = storyTitles[nextSlide];
  if (description) description.textContent = storyDescriptions[nextSlide];
  if (counter) counter.textContent = `0${nextSlide + 1} / 03`;
}

document.querySelectorAll('[data-slide]').forEach((button) => {
  button.addEventListener('click', () => showSlide(Number(button.dataset.slide)));
});

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches) {
  const storySection = document.querySelector('.food-story');
  let queued = false;

  if (storySection) {
    addEventListener('scroll', () => {
      if (queued || innerWidth <= 750) return;
      queued = true;

      requestAnimationFrame(() => {
        const rect = storySection.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= innerHeight) {
          const denominator = rect.height - innerHeight;
          if (denominator > 0) {
            const progress = Math.max(0, Math.min(1, -rect.top / denominator));
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
