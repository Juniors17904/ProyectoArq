class VistaHistorial extends VistaBase {
  #onVolver;
  #todosLosVales;

  constructor(onVolver) {
    super('pantalla-historial');
    this.#onVolver = onVolver;
    this.#todosLosVales = [];
    this.#vincular();
  }

  #vincular() {
    document.getElementById('btn-volver-historial').addEventListener('click', () => this.#onVolver());
    document.getElementById('filtro-buscar').addEventListener('input', () => this.#filtrar());
    document.getElementById('filtro-estado').addEventListener('change', () => this.#filtrar());
  }

  mostrar(vales) {
    super.mostrar();
    this.#todosLosVales = [...vales].reverse();
    this.#renderizar(this.#todosLosVales);
  }

  #filtrar() {
    const texto = document.getElementById('filtro-buscar').value.toLowerCase();
    const estado = document.getElementById('filtro-estado').value;
    const filtrados = this.#todosLosVales.filter(v => {
      const coincideTexto = v.responsable.toLowerCase().includes(texto) || String(v.nro).includes(texto);
      const coincideEstado = !estado || v.estado === estado;
      return coincideTexto && coincideEstado;
    });
    this.#renderizar(filtrados);
  }

  #renderizar(vales) {
    const lista = document.getElementById('lista-historial');
    if (vales.length === 0) {
      lista.innerHTML = '<p class="vacio">No se encontraron vales.</p>';
      return;
    }
    const fmt = (d) => new Date(d).toLocaleString('es-PE', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
    lista.innerHTML = vales.map(v => `
      <div class="card-historial estado-${v.estado.toLowerCase()}">
        <div class="historial-header">
          <div>
            <span class="historial-nro">Vale #${v.nro}</span>
            <span class="badge-estado badge-${v.estado.toLowerCase()}">${v.estado}</span>
          </div>
          <span class="historial-fecha">${fmt(v.fecha)}</span>
        </div>
        <div class="historial-responsable">👤 ${v.responsable}</div>
        <div class="historial-items">${v.items.length} ítem(s) — ${v.categoria}</div>
        <div class="historial-vence">Vence: ${fmt(v.fechaVencimiento)}</div>
      </div>
    `).join('');
  }
}
