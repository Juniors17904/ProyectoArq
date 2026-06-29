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
    document.getElementById('btn-imprimir').addEventListener('click', () => this.#compartir());
  }

  async #compartir() {
    const btn = document.getElementById('btn-imprimir');
    const textoOriginal = btn.textContent;
    btn.textContent = 'Generando imagen...';
    btn.disabled = true;
    try {
      const elemento = document.getElementById('vale-documento');
      const canvas = await html2canvas(elemento, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
      canvas.toBlob(async (blob) => {
        const nro = document.getElementById('vale-nro').textContent;
        const archivo = new File([blob], `vale-${nro}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
          await navigator.share({ files: [archivo], title: `Vale de Salida N° ${nro}` });
        } else if (navigator.share) {
          const url = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = url;
          link.download = `vale-${nro}.png`;
          link.click();
        } else {
          window.print();
        }
        btn.textContent = textoOriginal;
        btn.disabled = false;
      }, 'image/png');
    } catch {
      btn.textContent = textoOriginal;
      btn.disabled = false;
      window.print();
    }
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
