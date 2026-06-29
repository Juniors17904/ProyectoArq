class GestorStorage {
  #claveVales;
  #claveSesion;
  #claveContador;
  #nombresProhibidos;

  constructor() {
    this.#claveVales = 'almacen_vales';
    this.#claveSesion = 'almacen_sesion';
    this.#claveContador = 'almacen_contador';
    this.#nombresProhibidos = ['whister', 'villanueva'];
    this.#limpiarSesionAntigua();
  }

  #limpiarSesionAntigua() {
    const claves = ['almacenpro_sesion', 'almacen_sesion'];
    claves.forEach(clave => {
      const data = localStorage.getItem(clave);
      if (!data) return;
      const sesion = JSON.parse(data);
      const nombre = (sesion.nombre || '').toLowerCase();
      const esAntigua = this.#nombresProhibidos.some(n => nombre.includes(n));
      if (esAntigua) localStorage.removeItem(clave);
    });
    localStorage.removeItem('almacenpro_sesion');
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
