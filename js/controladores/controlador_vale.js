class ControladorVale {
  #gestorStorage;
  #onValeCreado;

  constructor(gestorStorage, onValeCreado) {
    this.#gestorStorage = gestorStorage;
    this.#onValeCreado = onValeCreado;
  }

  generarVale(datos, supervisor) {
    const nro = this.#gestorStorage.generarNroVale();
    const items = datos.items.map((item, idx) =>
      new ItemVale(idx + 1, 'CENTRAL', item.codigo, item.nombre, item.unidad, item.cantidad, item.ubicacion)
    );
    const vale = new Vale(
      nro,
      supervisor.nombre,
      datos.empresa,
      datos.categoria,
      items,
      datos.justificacion,
      datos.horasValidez
    );
    vale.aprobar();
    this.#gestorStorage.guardarVale(vale);
    this.#onValeCreado(vale);
  }

  obtenerTodos() {
    return this.#gestorStorage.obtenerVales();
  }
}
