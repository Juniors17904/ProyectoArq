class VistaLogin extends VistaBase {
  #onLogin;

  constructor(onLogin) {
    super('pantalla-login');
    this.#onLogin = onLogin;
    this.#vincular();
  }

  #vincular() {
    document.getElementById('formulario-login').addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('input-id').value.trim();
      const pass = document.getElementById('input-pass').value.trim();
      this.#onLogin(id, pass);
    });
  }

  mostrarError(mensaje) {
    const err = document.getElementById('error-login');
    err.textContent = mensaje;
    err.classList.remove('oculto');
    setTimeout(() => err.classList.add('oculto'), 3000);
  }

  limpiar() {
    document.getElementById('formulario-login').reset();
    document.getElementById('error-login').classList.add('oculto');
  }
}
