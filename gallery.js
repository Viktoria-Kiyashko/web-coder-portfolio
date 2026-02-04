document.querySelectorAll('.gallery').forEach(gallery => {
  const images = gallery.querySelectorAll('img');
  const dots = gallery.querySelectorAll('.gallery-controls span');

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      images[i].classList.add('active');
      dot.classList.add('active');
    });
  });
});
