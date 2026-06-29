class ControladorLogin {
  #vistaLogin;
  #gestorStorage;
  #onExito;
  #supervisores;

  constructor(vistaLogin, gestorStorage, onExito) {
    this.#vistaLogin = vistaLogin;
    this.#gestorStorage = gestorStorage;
    this.#onExito = onExito;
    this.#supervisores = this.#cargarSupervisores();
  }

  #cargarSupervisores() {
    return [
      new Supervisor('SUP-001', 'Daniel Córdova', '1234', false, 'Empresa Demo S.A.C.'),
      new Supervisor('SUP-002', 'Andrés Paredes', '1234', true, 'Empresa Demo S.A.C.'),
      new Supervisor('SUP-003', 'Rosa Medina', '1234', true, 'Empresa Demo S.A.C.'),
    ];
  }

  intentarLogin(id, contrasena) {
    const supervisor = this.#supervisores.find(s => s.id === id);
    if (!supervisor || !supervisor.verificarContrasena(contrasena)) {
      this.#vistaLogin.mostrarError('ID o contraseña incorrectos.');
      return;
    }
    this.#gestorStorage.guardarSesion(supervisor);
    this.#vistaLogin.limpiar();
    this.#onExito(supervisor);
  }

  verificarSesionActiva() {
    const sesion = this.#gestorStorage.obtenerSesion();
    if (!sesion) return null;
    return this.#supervisores.find(s => s.id === sesion.id) || null;
  }
}
