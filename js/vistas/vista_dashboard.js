class VistaDashboard extends VistaBase {
  #onNuevoPedido;
  #onVerHistorial;
  #onCerrarSesion;

  constructor(onNuevoPedido, onVerHistorial, onCerrarSesion) {
    super('pantalla-dashboard');
    this.#onNuevoPedido = onNuevoPedido;
    this.#onVerHistorial = onVerHistorial;
    this.#onCerrarSesion = onCerrarSesion;
    this.#vincular();
  }

  #vincular() {
    document.getElementById('btn-nuevo-vale').addEventListener('click', () => this.#onNuevoPedido());
    document.getElementById('btn-ver-historial').addEventListener('click', () => this.#onVerHistorial());
    document.getElementById('btn-cerrar-sesion').addEventListener('click', () => this.#onCerrarSesion());
    document.getElementById('btn-menu').addEventListener('click', () => this.#toggleMenu());
    document.getElementById('overlay-menu').addEventListener('click', () => this.#cerrarMenu());
  }

  #toggleMenu() {
    document.getElementById('menu-lateral').classList.toggle('abierto');
    document.getElementById('overlay-menu').classList.toggle('oculto');
  }

  #cerrarMenu() {
    document.getElementById('menu-lateral').classList.remove('abierto');
    document.getElementById('overlay-menu').classList.add('oculto');
  }

  renderizar(supervisor, vales) {
    document.getElementById('nombre-supervisor').textContent = supervisor.nombre;
    document.getElementById('menu-nombre').textContent = supervisor.nombre;
    document.getElementById('menu-rol').textContent = supervisor.esTemporal ? 'Supervisor Temporal' : 'Supervisor';

    const badge = document.getElementById('badge-temporal');
    if (supervisor.esTemporal) badge.classList.remove('oculto');
    else badge.classList.add('oculto');

    const hoy = new Date().toDateString();
    const valeshoy = vales.filter(v => new Date(v.fecha).toDateString() === hoy);
    const pendientes = valeshoy.filter(v => v.estado === 'Pendiente' || v.estado === 'Aprobado');
    const despachados = valeshoy.filter(v => v.estado === 'Despachado');

    document.getElementById('stat-total').textContent = valeshoy.length;
    document.getElementById('stat-pendientes').textContent = pendientes.length;
    document.getElementById('stat-despachados').textContent = despachados.length;

    this.#renderizarRecientes(vales.slice(-5).reverse());
  }

  #renderizarRecientes(vales) {
    const lista = document.getElementById('lista-recientes');
    if (vales.length === 0) {
      lista.innerHTML = '<p class="vacio">Sin vales aún. ¡Crea el primero!</p>';
      return;
    }
    lista.innerHTML = vales.map(v => `
      <div class="item-reciente estado-${v.estado.toLowerCase()}">
        <div class="reciente-izq">
          <span class="reciente-nro">Vale #${v.nro}</span>
          <span class="reciente-responsable">${v.responsable}</span>
        </div>
        <div class="reciente-der">
          <span class="badge-estado">${v.estado}</span>
          <span class="reciente-fecha">${new Date(v.fecha).toLocaleTimeString('es-PE', {hour:'2-digit',minute:'2-digit'})}</span>
        </div>
      </div>
    `).join('');
  }
}
