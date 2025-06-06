document.addEventListener("DOMContentLoaded", () => {
  fetch("menu.html")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      // Inserta el fragmento del menú en el contenedor
      document.getElementById("menuContainer").innerHTML = html;

      // Asigna el comportamiento para el botón de toggle
      const sidebar = document.getElementById('sidebar');
      const toggleBtn = document.getElementById('toggleSidebarBtn');
      const mainContent = document.querySelector('.main-content');

      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          sidebar.classList.toggle('expanded');
          if (mainContent) {
            mainContent.classList.toggle('shifted');
          }
        });
      } else {
        console.error("No se encontró el botón toggle");
      }
    })
    .catch(error => console.error("Error al cargar el menú: ", error));
});
