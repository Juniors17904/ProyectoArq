class Material {
  #codigo;
  #nombre;
  #unidadMedida;
  #ubicacion;
  #categoria;

  constructor(codigo, nombre, unidadMedida, ubicacion, categoria) {
    this.#codigo = codigo;
    this.#nombre = nombre;
    this.#unidadMedida = unidadMedida;
    this.#ubicacion = ubicacion;
    this.#categoria = categoria;
  }

  get codigo() { return this.#codigo; }
  get nombre() { return this.#nombre; }
  get unidadMedida() { return this.#unidadMedida; }
  get ubicacion() { return this.#ubicacion; }
  get categoria() { return this.#categoria; }
}
