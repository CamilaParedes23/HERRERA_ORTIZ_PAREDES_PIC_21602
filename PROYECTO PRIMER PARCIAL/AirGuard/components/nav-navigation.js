export const setupSidebarNavigation = (sidebarElement) => {
  const menuItems = sidebarElement.shadowRoot.querySelectorAll('li[data-section]');
  
  //Se recorre cada elemento del menú para asignarle eventos individuales
  menuItems.forEach(item => {
    //se añade eventListener al hacer clic sobre ese item
    item.addEventListener('click', (e) => {
      e.preventDefault();
      //llama a la función activateMenuItem para resaltar el ítem seleccionado
      //y quitar la clase activa a los demás
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
//Función que resalta visualmente el ítem activo
const activateMenuItem = (menuItems, activeItem) => {
  menuItems.forEach(item => item.classList.remove('active'));
  activeItem.classList.add('active');
};

//Función que realiza el desplazamiento hacia una sección del documento
const scrollToSection = (sectionId) => {
  //Busca el elemento HTML cuyo id coincida con el valor de SectionID
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
