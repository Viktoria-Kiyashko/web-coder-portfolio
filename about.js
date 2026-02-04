const posts = document.querySelectorAll('.post');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalImages = document.getElementById('modalImages');
const modalText = document.getElementById('modalText');
const body = document.body;

document.querySelectorAll('.post').forEach(post => {
  post.addEventListener('click', () => {
    modal.classList.add('active');
    body.classList.add('modal-open'); // блокировка скролла
  });
});

document.querySelector('.modal-close').addEventListener('click', () => {
  modal.classList.remove('active');
  body.classList.remove('modal-open'); // возврат скролла
});

posts.forEach(post => {
  post.addEventListener('click', () => {
    // Заголовок из тегов 
    const tags = Array.from(post.querySelectorAll('.tag')).map(t => t.textContent).join(' ');
    modalTitle.textContent = tags;

    // Копирование изображения
    modalImages.innerHTML = '';
    post.querySelectorAll('img').forEach(img => {
      const modalImg = document.createElement('img');
      modalImg.src = img.src;
      modalImages.appendChild(modalImg);
    });

    // Текст
    modalText.textContent = post.querySelector('p').textContent;

    // Показ модалки
    modal.classList.add('active');
  });
});

// Закрытие модалки
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

// Закрытие кликом по фону
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});
