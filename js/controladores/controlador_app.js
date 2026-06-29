class ControladorApp {
  #supervisorActual;
  #gestorStorage;
  #catalogo;
  #vistaLogin;
  #vistaDashboard;
  #vistaFormulario;
  #vistaVale;
  #vistaHistorial;
  #controladorLogin;
  #controladorVale;
  #gestorPWA;

  constructor() {
    this.#supervisorActual = null;
    this.#gestorStorage = new GestorStorage();
    this.#catalogo = new CatalogoMateriales();

    this.#vistaLogin = new VistaLogin((id, pass) => this.#controladorLogin.intentarLogin(id, pass));
    this.#vistaDashboard = new VistaDashboard(
      () => this.#irAFormulario(),
      () => this.#irAHistorial(),
      () => this.#cerrarSesion()
    );
    this.#vistaFormulario = new VistaFormularioVale(
      this.#catalogo,
      (datos) => this.#controladorVale.generarVale(datos, this.#supervisorActual),
      () => this.#irADashboard()
    );
    this.#vistaVale = new VistaValeGenerado(
      () => this.#irAFormulario(),
      () => this.#irADashboard()
    );
    this.#vistaHistorial = new VistaHistorial(() => this.#irADashboard());

    this.#controladorLogin = new ControladorLogin(
      this.#vistaLogin,
      this.#gestorStorage,
      (supervisor) => this.#alIniciarSesion(supervisor)
    );
    this.#controladorVale = new ControladorVale(
      this.#gestorStorage,
      (vale) => this.#alGenerarVale(vale)
    );

    this.#gestorPWA = new GestorPWA('btn-instalar');
    document.getElementById('btn-instalar').addEventListener('click', () => this.#gestorPWA.instalar());
  }

  iniciar() {
    const supervisor = this.#controladorLogin.verificarSesionActiva();
    if (supervisor) {
      this.#supervisorActual = supervisor;
      this.#irADashboard();
    } else {
      this.#vistaLogin.mostrar();
    }
  }

  #alIniciarSesion(supervisor) {
    this.#supervisorActual = supervisor;
    this.#irADashboard();
  }

  #irADashboard() {
    const vales = this.#controladorVale.obtenerTodos();
    this.#vistaDashboard.mostrar();
    this.#vistaDashboard.renderizar(this.#supervisorActual, vales);
  }

  #irAFormulario() {
    this.#vistaFormulario.mostrar();
  }

  #irAHistorial() {
    const vales = this.#controladorVale.obtenerTodos();
    this.#vistaHistorial.mostrar(vales);
  }

  #alGenerarVale(vale) {
    this.#vistaVale.mostrar();
    this.#vistaVale.renderizar(vale);
  }

  #cerrarSesion() {
    this.#gestorStorage.cerrarSesion();
    this.#supervisorActual = null;
    this.#vistaLogin.mostrar();
  }
}
