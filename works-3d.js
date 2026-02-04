document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalGallery = document.getElementById('modalGallery');
  const closeBtn = document.querySelector('.modal-close');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;

      modalGallery.innerHTML = '';
      const images = card.dataset.images.split(',');

      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
          img.addEventListener('click', () => {
    window.open(src, '_blank');
  });
        modalGallery.appendChild(img);
      });

      modal.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});
