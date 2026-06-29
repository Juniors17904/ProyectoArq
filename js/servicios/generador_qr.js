class GeneradorQR {
  #contenedor;

  constructor(idContenedor) {
    this.#contenedor = document.getElementById(idContenedor);
  }

  generar(vale) {
    if (!this.#contenedor) return;
    this.#contenedor.innerHTML = '';
    const datos = JSON.stringify({
      nro: vale.nro,
      responsable: vale.responsable,
      fecha: vale.fecha.toISOString(),
      vence: vale.fechaVencimiento.toISOString()
    });
    new QRCode(this.#contenedor, {
      text: datos,
      width: 140,
      height: 140,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }
}
