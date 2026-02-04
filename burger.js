 const burger = document.getElementById("burger");
    const menu = document.getElementById("menu");
    const overlay = document.querySelector('.overlay');

    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      menu.classList.toggle("active");
    });

    document.addEventListener('click', (e) => {
    // Если клик не по меню и не по бургеру
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      menu.classList.remove('active');
    }
  });

