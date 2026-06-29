class VistaValeGenerado extends VistaBase {
  #generadorQR;
  #onNuevo;
  #onInicio;

  constructor(onNuevo, onInicio) {
    super('pantalla-vale');
    this.#generadorQR = null;
    this.#onNuevo = onNuevo;
    this.#onInicio = onInicio;
    this.#vincular();
  }

  #vincular() {
    document.getElementById('btn-nuevo-desde-vale').addEventListener('click', () => this.#onNuevo());
    document.getElementById('btn-inicio-desde-vale').addEventListener('click', () => this.#onInicio());
    document.getElementById('btn-imprimir').addEventListener('click', () => window.print());
  }

  renderizar(vale) {
    const fmt = (d) => new Date(d).toLocaleString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    document.getElementById('vale-empresa').textContent = vale.empresa;
    document.getElementById('vale-nro').textContent = vale.nro;
    document.getElementById('vale-estado').textContent = vale.estado;
    document.getElementById('vale-fecha').textContent = fmt(vale.fecha);
    document.getElementById('vale-categoria').textContent = vale.categoria;
    document.getElementById('vale-responsable').textContent = vale.responsable;
    document.getElementById('vale-vence').textContent = fmt(vale.fechaVencimiento);
    document.getElementById('vale-justificacion').textContent = vale.justificacion;

    const tabla = document.getElementById('vale-tabla-items');
    tabla.innerHTML = vale.items.map((item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>CENTRAL</td>
        <td>${item.codigo}</td>
        <td>${item.material}</td>
        <td>${item.unidadMedida}</td>
        <td>${item.cantidad}.0000</td>
        <td>${item.ubicacion}</td>
      </tr>
    `).join('');

    document.getElementById('vale-qr-nombre').textContent = vale.responsable;
    document.getElementById('vale-qr-fecha').textContent = fmt(vale.fecha);

    this.#generadorQR = new GeneradorQR('contenedor-qr');
    this.#generadorQR.generar(vale);
  }
}
