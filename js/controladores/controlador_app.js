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
  #pila;
  #pantallaActual;

  constructor() {
    this.#supervisorActual = null;
    this.#gestorStorage = new GestorStorage();
    this.#catalogo = new CatalogoMateriales();
    this.#pila = [];
    this.#pantallaActual = null;

    this.#vistaLogin = new VistaLogin((id, pass) => this.#controladorLogin.intentarLogin(id, pass));
    this.#vistaDashboard = new VistaDashboard(
      () => this.#abrir('formulario'),
      () => this.#abrir('historial'),
      () => this.#cerrarSesion()
    );
    this.#vistaFormulario = new VistaFormularioVale(
      this.#catalogo,
      (datos) => this.#controladorVale.generarVale(datos, this.#supervisorActual),
      () => history.back()
    );
    this.#vistaVale = new VistaValeGenerado(
      () => this.#abrir('formulario'),
      () => this.#irInicio()
    );
    this.#vistaHistorial = new VistaHistorial(
      () => history.back(),
      (valeObj) => this.#abrirVale(valeObj)
    );

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
    window.addEventListener('popstate', (e) => this.#alRetroceder(e));
    const supervisor = this.#controladorLogin.verificarSesionActiva();
    if (supervisor) {
      this.#supervisorActual = supervisor;
      this.#entrarDashboard();
    } else {
      this.#vistaLogin.mostrar();
    }
  }

  #alIniciarSesion(supervisor) {
    this.#supervisorActual = supervisor;
    this.#entrarDashboard();
  }

  #entrarDashboard() {
    this.#pila = [];
    this.#pantallaActual = 'dashboard';
    history.replaceState({ pantalla: 'dashboard' }, '');
    history.pushState({ pantalla: 'dashboard' }, '');
    this.#renderizarDashboard();
  }

  #renderizarDashboard() {
    const vales = this.#controladorVale.obtenerTodos();
    this.#vistaDashboard.mostrar();
    this.#vistaDashboard.renderizar(this.#supervisorActual, vales);
  }

  #abrir(pantalla) {
    this.#pila.push(this.#pantallaActual);
    this.#pantallaActual = pantalla;
    history.pushState({ pantalla }, '');
    this.#mostrar(pantalla);
  }

  #abrirVale(valeObj) {
    const vale = Vale.desdeObjeto(valeObj);
    this.#vistaVale.renderizar(vale);
    this.#abrir('vale');
  }

  #mostrar(pantalla) {
    if (pantalla === 'dashboard') this.#renderizarDashboard();
    else if (pantalla === 'formulario') this.#vistaFormulario.mostrar();
    else if (pantalla === 'historial') this.#vistaHistorial.mostrar(this.#controladorVale.obtenerTodos());
    else if (pantalla === 'vale') this.#vistaVale.mostrar();
  }

  #irInicio() {
    this.#pila = [];
    this.#pantallaActual = 'dashboard';
    history.pushState({ pantalla: 'dashboard' }, '');
    this.#renderizarDashboard();
  }

  #alGenerarVale(vale) {
    this.#vistaVale.renderizar(vale);
    this.#abrir('vale');
  }

  #alRetroceder() {
    if (!this.#supervisorActual) return;
    if (this.#pila.length === 0) {
      if (confirm('¿Quieres cerrar sesión?')) {
        this.#cerrarSesion();
      } else {
        history.pushState({ pantalla: 'dashboard' }, '');
      }
      return;
    }
    const anterior = this.#pila.pop();
    this.#pantallaActual = anterior;
    this.#mostrar(anterior);
  }

  #cerrarSesion() {
    this.#gestorStorage.cerrarSesion();
    this.#supervisorActual = null;
    this.#pila = [];
    this.#pantallaActual = null;
    this.#vistaLogin.mostrar();
  }
}
