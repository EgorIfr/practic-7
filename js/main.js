const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const header = document.querySelector('header');

let lastScroll = 0;

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    burger.classList.remove('open');
  });
});

// Обработка скрытия header при скролле
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove('header-hidden');
    return;
  }

  if (
    currentScroll > lastScroll &&
    !header.classList.contains('header-hidden')
  ) {
    // Скролл вниз
    header.classList.add('header-hidden');
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains('header-hidden')
  ) {
    // Скролл вверх
    header.classList.remove('header-hidden');
  }

  lastScroll = currentScroll;
});

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const filterButton = document.querySelector('.filter-button');
  const resetButton = document.querySelector('.filter-button.reset');
  const checkboxes = document.querySelectorAll(
    '.filter-list input[type="checkbox"]'
  );
  const productCards = document.querySelectorAll('.product-card');

  filterButton.addEventListener('click', () => {
    const selectedCategories = Array.from(checkboxes)
      .filter(
        (cb) =>
          cb.checked && cb.parentElement.textContent.trim() !== 'Все товары'
      )
      .map((cb) => cb.parentElement.textContent.trim());

    productCards.forEach((card) => {
      const category = card
        .querySelector('.product-category')
        .textContent.trim();
      if (
        selectedCategories.length === 0 ||
        selectedCategories.includes(category)
      ) {
        card.classList.remove('hidden-card');
      } else {
        card.classList.add('hidden-card');
      }
    });
  });

  resetButton.addEventListener('click', () => {
    checkboxes.forEach(
      (cb) =>
        (cb.checked = cb.parentElement.textContent.trim() === 'Все товары')
    );
    productCards.forEach((card) => card.classList.remove('hidden-card'));
  });
});
