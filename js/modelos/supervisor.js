class Supervisor {
  #id;
  #nombre;
  #contrasena;
  #esTemporal;
  #empresa;

  constructor(id, nombre, contrasena, esTemporal, empresa) {
    this.#id = id;
    this.#nombre = nombre;
    this.#contrasena = contrasena;
    this.#esTemporal = esTemporal;
    this.#empresa = empresa;
  }

  verificarContrasena(intento) {
    return intento === this.#contrasena;
  }

  get id() { return this.#id; }
  get nombre() { return this.#nombre; }
  get esTemporal() { return this.#esTemporal; }
  get empresa() { return this.#empresa; }

  aObjeto() {
    return { id: this.#id, nombre: this.#nombre, esTemporal: this.#esTemporal, empresa: this.#empresa };
  }
}
