const sideBtn = document.querySelector('.side-button');
const mobileBtn = document.querySelector('.mobile-button');
const portfolioMenu = document.getElementById('portfolioMenu');
const items = document.querySelectorAll('.portfolio-item');
const menuOverlay = document.querySelector('.menu-overlay');

let activeIndex = 1;
let isScrolling = false;

// Открытие / закрытие меню на десктопе
if (sideBtn) {
  sideBtn.addEventListener('click', () => {
    portfolioMenu.classList.toggle('active');
  });
}

// Закрытие по клику вне
document.addEventListener('click', (e) => {
  if (!portfolioMenu.contains(e.target) && !sideBtn?.contains(e.target) && !mobileBtn.contains(e.target)) {
    portfolioMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  }
});

// Скролл на десктопе
document.getElementById('portfolioList').addEventListener('wheel', (e) => {
  if (window.innerWidth > 768) {
    e.preventDefault();
    if (isScrolling) return;

    if (e.deltaY > 0 && activeIndex < items.length - 1) {
      activeIndex++;
    } else if (e.deltaY < 0 && activeIndex > 0) {
      activeIndex--;
    }
    updateActive();

    isScrolling = true;
    setTimeout(() => (isScrolling = false), 250);
  }
});

function updateActive() {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === activeIndex);
  });
}

// Клик по мобильной кнопке
mobileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  portfolioMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active');
});

// Клик по фону закрыть
menuOverlay.addEventListener('click', () => {
  portfolioMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
});
