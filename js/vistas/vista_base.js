class VistaBase {
  #idPantalla;

  constructor(idPantalla) {
    this.#idPantalla = idPantalla;
  }

  mostrar() {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    const pantalla = document.getElementById(this.#idPantalla);
    if (pantalla) pantalla.classList.add('activa');
  }

  ocultar() {
    const pantalla = document.getElementById(this.#idPantalla);
    if (pantalla) pantalla.classList.remove('activa');
  }

  get idPantalla() { return this.#idPantalla; }
}
