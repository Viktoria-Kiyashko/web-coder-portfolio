const cards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const close = modal.querySelector('.modal-close');

cards.forEach(card => {
  card.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  });
});

close.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
});
