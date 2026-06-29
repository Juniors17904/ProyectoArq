class ItemVale {
  #nro;
  #almacen;
  #codigo;
  #material;
  #unidadMedida;
  #cantidad;
  #ubicacion;

  constructor(nro, almacen, codigo, material, unidadMedida, cantidad, ubicacion) {
    this.#nro = nro;
    this.#almacen = almacen;
    this.#codigo = codigo;
    this.#material = material;
    this.#unidadMedida = unidadMedida;
    this.#cantidad = cantidad;
    this.#ubicacion = ubicacion;
  }

  get nro() { return this.#nro; }
  get almacen() { return this.#almacen; }
  get codigo() { return this.#codigo; }
  get material() { return this.#material; }
  get unidadMedida() { return this.#unidadMedida; }
  get cantidad() { return this.#cantidad; }
  get ubicacion() { return this.#ubicacion; }

  aObjeto() {
    return {
      nro: this.#nro,
      almacen: this.#almacen,
      codigo: this.#codigo,
      material: this.#material,
      unidadMedida: this.#unidadMedida,
      cantidad: this.#cantidad,
      ubicacion: this.#ubicacion
    };
  }
}
