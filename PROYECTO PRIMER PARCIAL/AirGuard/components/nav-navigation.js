export const setupSidebarNavigation = (sidebarElement) => {
  const menuItems = sidebarElement.shadowRoot.querySelectorAll('li[data-section]');
  
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      activateMenuItem(menuItems, e.currentTarget);
      scrollToSection(e.currentTarget.dataset.section);
      emitNavigationEvent(sidebarElement, e.currentTarget.dataset.section);

      // Cerrar menú móvil si está abierto
      if (window.innerWidth <= 768) {
        sidebarElement.closeMobile();
      }
    });
  });
};

const activateMenuItem = (menuItems, activeItem) => {
  menuItems.forEach(item => item.classList.remove('active'));
  activeItem.classList.add('active');
};

const scrollToSection = (sectionId) => {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const emitNavigationEvent = (sidebarElement, sectionId) => {
  const customEvent = new CustomEvent('sidebar-navigation', {
    detail: { section: sectionId },
    bubbles: true,
  });
  sidebarElement.dispatchEvent(customEvent);
};
