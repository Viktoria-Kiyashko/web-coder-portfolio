const ul = document.querySelector('section > ul');
const cards = ul.querySelectorAll('li');


let startX = 0;
let scrollLeft = 0;

ul.addEventListener('scroll', () => {
  let center = ul.scrollLeft + ul.offsetWidth / 2;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;
    if (Math.abs(cardCenter - ul.offsetWidth / 2) < rect.width / 2) {
      const color = getComputedStyle(card).getPropertyValue('--card-color');
      ul.style.setProperty('--scroll-thumb-color', color);
    }
  });
});

ul.addEventListener('mousedown', (e) => {
  ul.classList.add('grabbing');
  startX = e.pageX - ul.offsetLeft;
  scrollLeft = ul.scrollLeft;
});

ul.addEventListener('mouseleave', () => ul.classList.remove('grabbing'));
ul.addEventListener('mouseup', () => ul.classList.remove('grabbing'));
ul.addEventListener('mousemove', (e) => {
  if(!ul.classList.contains('grabbing')) return;
  e.preventDefault();
  const x = e.pageX - ul.offsetLeft;
  const walk = (x - startX) * 2; 
  ul.scrollLeft = scrollLeft - walk;
});

ul.addEventListener('wheel', (e) => {
  // Проверка курсора наведен ли
  if (ul.matches(':hover')) {
    e.preventDefault(); // отмена обычного вертикального скролла
    ul.scrollBy({
      left: e.deltaY < 0 ? -100 : 100, // направление
      behavior: 'smooth'
    });
  }
});