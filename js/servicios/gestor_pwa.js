class GestorPWA {
  #promptInstalacion;
  #boton;

  constructor(idBoton) {
    this.#promptInstalacion = null;
    this.#boton = document.getElementById(idBoton);
    this.#escucharEvento();
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

  instalar() {
    if (!this.#promptInstalacion) return;
    this.#promptInstalacion.prompt();
    this.#promptInstalacion.userChoice.then(() => {
      this.#promptInstalacion = null;
    });
  }
}
