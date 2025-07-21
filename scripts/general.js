  const toggleBtn = document.getElementById('toggle-btn');
  const linksNav = document.getElementById('links-nav');

  toggleBtn.addEventListener('click', () => {
    linksNav.classList.toggle('show');
  });
