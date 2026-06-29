class GestorPWA {
  #promptInstalacion;
  #boton;

  constructor(idBoton) {
    this.#promptInstalacion = null;
    this.#boton = document.getElementById(idBoton);
    this.#escucharEvento();
    this.#mostrarSiCorresponde();
  }

  #escucharEvento() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.#promptInstalacion = e;
      if (this.#boton) this.#boton.classList.remove('oculto');
    });

    window.addEventListener('appinstalled', () => {
      if (this.#boton) this.#boton.classList.add('oculto');
    });
  }

  #mostrarSiCorresponde() {
    if (!this.#boton) return;
    const yaInstalada = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (yaInstalada) {
      this.#boton.classList.add('oculto');
    } else {
      this.#boton.classList.remove('oculto');
    }
  }

  instalar() {
    if (this.#promptInstalacion) {
      this.#promptInstalacion.prompt();
      this.#promptInstalacion.userChoice.then(() => {
        this.#promptInstalacion = null;
      });
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
