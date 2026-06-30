class GestorPWA {
  #boton;

  constructor(idBoton) {
    this.#boton = document.getElementById(idBoton);
    this.#escucharEvento();
    this.#actualizarVisibilidad();
  }

  #escucharEvento() {
    window.addEventListener('pwa-instalable', () => this.#actualizarVisibilidad());
    window.addEventListener('appinstalled', () => {
      window.__promptInstalar = null;
      if (this.#boton) this.#boton.classList.add('oculto');
    });
  }

  #actualizarVisibilidad() {
    if (!this.#boton) return;
    const yaInstalada = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (yaInstalada) this.#boton.classList.add('oculto');
    else this.#boton.classList.remove('oculto');
  }

  instalar() {
    const prompt = window.__promptInstalar;
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then(() => { window.__promptInstalar = null; });
      return;
    }
    this.#mostrarInstrucciones();
  }

  #mostrarInstrucciones() {
    const esIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const mensaje = esIOS
      ? 'Para instalar:\n1. Toca el botón Compartir (cuadro con flecha) abajo.\n2. Elige "Agregar a inicio".'
      : 'Para instalar:\n1. Toca los 3 puntitos (⋮) arriba a la derecha.\n2. Elige "Instalar app" o "Agregar a la pantalla principal".';
    alert(mensaje);
  }
}
