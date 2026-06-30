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
    new DiagnosticoPwa().ejecutar();
  }
}
