class Vale {
  #nro;
  #responsable;
  #empresa;
  #estado;
  #fecha;
  #categoria;
  #items;
  #justificacion;
  #horasValidez;
  #fechaVencimiento;

  constructor(nro, responsable, empresa, categoria, items, justificacion, horasValidez) {
    this.#nro = nro;
    this.#responsable = responsable;
    this.#empresa = empresa;
    this.#estado = 'Pendiente';
    this.#fecha = new Date();
    this.#categoria = categoria;
    this.#items = items;
    this.#justificacion = justificacion;
    this.#horasValidez = horasValidez;
    this.#fechaVencimiento = new Date(this.#fecha.getTime() + horasValidez * 60 * 60 * 1000);
  }

  aprobar() { this.#estado = 'Aprobado'; }
  despachar() { this.#estado = 'Despachado'; }

  estaVencido() {
    return new Date() > this.#fechaVencimiento;
  }

  get nro() { return this.#nro; }
  get responsable() { return this.#responsable; }
  get empresa() { return this.#empresa; }
  get estado() { return this.#estado; }
  get fecha() { return this.#fecha; }
  get categoria() { return this.#categoria; }
  get items() { return [...this.#items]; }
  get justificacion() { return this.#justificacion; }
  get fechaVencimiento() { return this.#fechaVencimiento; }

  aObjeto() {
    return {
      nro: this.#nro,
      responsable: this.#responsable,
      empresa: this.#empresa,
      estado: this.#estado,
      fecha: this.#fecha.toISOString(),
      categoria: this.#categoria,
      items: this.#items.map(i => i.aObjeto()),
      justificacion: this.#justificacion,
      horasValidez: this.#horasValidez,
      fechaVencimiento: this.#fechaVencimiento.toISOString()
    };
  }

  static desdeObjeto(obj) {
    const items = obj.items.map(i =>
      new ItemVale(i.nro, i.almacen, i.codigo, i.material, i.unidadMedida, i.cantidad, i.ubicacion)
    );
    const vale = new Vale(obj.nro, obj.responsable, obj.empresa, obj.categoria, items, obj.justificacion, obj.horasValidez);
    if (obj.estado === 'Aprobado') vale.aprobar();
    if (obj.estado === 'Despachado') vale.despachar();
    return vale;
  }
}
