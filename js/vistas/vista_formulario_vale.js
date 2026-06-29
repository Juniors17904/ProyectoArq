class VistaFormularioVale extends VistaBase {
  #catalogo;
  #onGenerar;
  #onVolver;
  #itemsSeleccionados;
  #categoriaActiva;

  constructor(catalogo, onGenerar, onVolver) {
    super('pantalla-formulario');
    this.#catalogo = catalogo;
    this.#onGenerar = onGenerar;
    this.#onVolver = onVolver;
    this.#itemsSeleccionados = [];
    this.#categoriaActiva = 'consumibles';
  }

  mostrar() {
    super.mostrar();
    this.#itemsSeleccionados = [];
    this.#renderizarCategorias();
    this.#renderizarMateriales(this.#categoriaActiva);
    this.#vincular();
  }

  #vincular() {
    document.getElementById('btn-volver-formulario').addEventListener('click', () => this.#onVolver());
    document.getElementById('formulario-vale').addEventListener('submit', (e) => {
      e.preventDefault();
      this.#enviar();
    });
  }

  #renderizarCategorias() {
    const tabs = document.getElementById('tabs-categorias');
    tabs.innerHTML = this.#catalogo.categorias.map(cat => `
      <button class="tab-categoria ${cat.id === this.#categoriaActiva ? 'activa' : ''}" data-id="${cat.id}">
        <span>${cat.icono}</span>
        <span>${cat.nombre}</span>
      </button>
    `).join('');

    tabs.querySelectorAll('.tab-categoria').forEach(btn => {
      btn.addEventListener('click', () => {
        this.#categoriaActiva = btn.dataset.id;
        tabs.querySelectorAll('.tab-categoria').forEach(b => b.classList.remove('activa'));
        btn.classList.add('activa');
        this.#renderizarMateriales(this.#categoriaActiva);
      });
    });
  }

  #renderizarMateriales(categoriaId) {
    const cat = this.#catalogo.categorias.find(c => c.id === categoriaId);
    const grid = document.getElementById('grid-materiales');
    grid.innerHTML = cat.materiales.map(m => `
      <div class="tarjeta-material ${this.#estaSeleccionado(m.codigo) ? 'seleccionada' : ''}" data-codigo="${m.codigo}">
        <div class="material-nombre">${m.nombre}</div>
        <div class="material-meta">
          <span class="material-codigo">${m.codigo}</span>
          <span class="material-unidad">${m.unidadMedida}</span>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.tarjeta-material').forEach(card => {
      card.addEventListener('click', () => this.#toggleMaterial(card.dataset.codigo, cat));
    });
  }

  #estaSeleccionado(codigo) {
    return this.#itemsSeleccionados.some(i => i.codigo === codigo);
  }

  #toggleMaterial(codigo, cat) {
    const idx = this.#itemsSeleccionados.findIndex(i => i.codigo === codigo);
    if (idx !== -1) {
      this.#itemsSeleccionados.splice(idx, 1);
    } else {
      const m = cat.materiales.find(m => m.codigo === codigo);
      if (m) this.#itemsSeleccionados.push({ codigo: m.codigo, nombre: m.nombre, unidad: m.unidadMedida, ubicacion: m.ubicacion, cantidad: 1 });
    }
    this.#renderizarMateriales(this.#categoriaActiva);
    this.#renderizarResumen();
  }

  #renderizarResumen() {
    const resumen = document.getElementById('resumen-items');
    const contador = document.getElementById('contador-items');
    contador.textContent = this.#itemsSeleccionados.length;

    if (this.#itemsSeleccionados.length === 0) {
      resumen.innerHTML = '<p class="vacio-resumen">Selecciona materiales del catálogo</p>';
      return;
    }

    resumen.innerHTML = this.#itemsSeleccionados.map((item, idx) => `
      <div class="fila-resumen">
        <span class="resumen-nombre">${item.nombre}</span>
        <div class="resumen-cantidad">
          <button class="btn-cant" data-idx="${idx}" data-op="menos">−</button>
          <span>${item.cantidad}</span>
          <button class="btn-cant" data-idx="${idx}" data-op="mas">+</button>
        </div>
        <button class="btn-quitar" data-idx="${idx}">✕</button>
      </div>
    `).join('');

    resumen.querySelectorAll('.btn-cant').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        if (btn.dataset.op === 'mas') this.#itemsSeleccionados[idx].cantidad++;
        else if (this.#itemsSeleccionados[idx].cantidad > 1) this.#itemsSeleccionados[idx].cantidad--;
        this.#renderizarResumen();
      });
    });

    resumen.querySelectorAll('.btn-quitar').forEach(btn => {
      btn.addEventListener('click', () => {
        this.#itemsSeleccionados.splice(parseInt(btn.dataset.idx), 1);
        this.#renderizarMateriales(this.#categoriaActiva);
        this.#renderizarResumen();
      });
    });
  }

  #enviar() {
    if (this.#itemsSeleccionados.length === 0) {
      alert('Selecciona al menos un material.');
      return;
    }
    const datos = {
      responsable: document.getElementById('input-responsable').value.trim(),
      empresa: document.getElementById('input-empresa').value.trim() || 'CONSORCIO DHMONT & CG & M SAC',
      categoria: document.getElementById('select-categoria').value,
      justificacion: document.getElementById('input-justificacion').value.trim(),
      horasValidez: parseInt(document.getElementById('select-validez').value),
      items: this.#itemsSeleccionados
    };
    this.#onGenerar(datos);
  }
}
