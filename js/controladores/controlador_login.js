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
      new Supervisor('SUP-001', 'Whister Villanueva', '1234', false, 'CONSORCIO DHMONT & CG & M SAC'),
      new Supervisor('SUP-002', 'Carlos Quispe', '1234', true, 'CONSORCIO DHMONT & CG & M SAC'),
      new Supervisor('SUP-003', 'Luis Mamani', '1234', true, 'CONSORCIO DHMONT & CG & M SAC'),
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
