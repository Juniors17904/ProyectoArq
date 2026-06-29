class Categoria {
  #id;
  #nombre;
  #icono;
  #materiales;

  constructor(id, nombre, icono) {
    this.#id = id;
    this.#nombre = nombre;
    this.#icono = icono;
    this.#materiales = [];
  }

  agregarMaterial(material) {
    this.#materiales.push(material);
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get icono() { return this.#icono; }
  get materiales() { return [...this.#materiales]; }
}
