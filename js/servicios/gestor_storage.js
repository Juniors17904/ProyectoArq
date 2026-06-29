class GestorStorage {
  #claveVales;
  #claveSesion;
  #claveContador;

  constructor() {
    this.#claveVales = 'almacen_vales';
    this.#claveSesion = 'almacen_sesion';
    this.#claveContador = 'almacen_contador';
  }

  guardarVale(vale) {
    const vales = this.obtenerVales();
    vales.push(vale.aObjeto());
    localStorage.setItem(this.#claveVales, JSON.stringify(vales));
  }

  obtenerVales() {
    const data = localStorage.getItem(this.#claveVales);
    return data ? JSON.parse(data) : [];
  }

  actualizarEstadoVale(nro, nuevoEstado) {
    const vales = this.obtenerVales();
    const idx = vales.findIndex(v => v.nro === nro);
    if (idx !== -1) {
      vales[idx].estado = nuevoEstado;
      localStorage.setItem(this.#claveVales, JSON.stringify(vales));
    }
  }

  guardarSesion(supervisor) {
    localStorage.setItem(this.#claveSesion, JSON.stringify(supervisor.aObjeto()));
  }

  obtenerSesion() {
    const data = localStorage.getItem(this.#claveSesion);
    return data ? JSON.parse(data) : null;
  }

  cerrarSesion() {
    localStorage.removeItem(this.#claveSesion);
  }

  generarNroVale() {
    const contador = parseInt(localStorage.getItem(this.#claveContador) || '33076');
    const siguiente = contador + 1;
    localStorage.setItem(this.#claveContador, String(siguiente));
    return siguiente;
  }
}
