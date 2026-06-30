class DiagnosticoPwa {
  #overlay;

  async ejecutar() {
    const puntos = await this.#recolectar();
    this.#render(puntos);
  }

  async #recolectar() {
    const puntos = [];

    puntos.push({ ok: window.isSecureContext === true, texto: 'Conexión segura HTTPS' });

    const soportaSW = 'serviceWorker' in navigator;
    puntos.push({ ok: soportaSW, texto: 'El navegador soporta Service Worker' });

    let swActivo = false;
    if (soportaSW) {
      try {
        const reg = await navigator.serviceWorker.getRegistration();
        swActivo = !!(reg && reg.active);
      } catch (e) { swActivo = false; }
    }
    puntos.push({ ok: swActivo, texto: 'Service Worker instalado y activo' });

    const linkManifest = document.querySelector('link[rel="manifest"]');
    puntos.push({ ok: !!linkManifest, texto: 'Manifest enlazado en la página' });

    let manifest = null;
    try {
      const resp = await fetch('/manifest.json', { cache: 'no-store' });
      manifest = await resp.json();
    } catch (e) { manifest = null; }
    puntos.push({ ok: !!manifest, texto: 'El manifest se puede cargar' });
    puntos.push({ ok: !!(manifest && (manifest.name || manifest.short_name)), texto: 'Manifest tiene nombre' });
    puntos.push({ ok: !!(manifest && manifest.start_url), texto: 'Manifest tiene start_url' });
    puntos.push({ ok: !!(manifest && ['standalone', 'fullscreen', 'minimal-ui'].includes(manifest.display)), texto: 'Modo app (display standalone)' });

    const icono192 = manifest && manifest.icons ? manifest.icons.find(i => (i.sizes || '').includes('192')) : null;
    const icono512 = manifest && manifest.icons ? manifest.icons.find(i => (i.sizes || '').includes('512')) : null;
    puntos.push({ ok: !!icono192, texto: 'Ícono 192x192 declarado' });
    puntos.push({ ok: !!icono512, texto: 'Ícono 512x512 declarado' });

    let carga192 = false;
    if (icono192) carga192 = await this.#imagenCarga(icono192.src);
    puntos.push({ ok: carga192, texto: 'El ícono 192 carga de verdad' });

    let carga512 = false;
    if (icono512) carga512 = await this.#imagenCarga(icono512.src);
    puntos.push({ ok: carga512, texto: 'El ícono 512 carga de verdad' });

    puntos.push({ ok: window.__promptInstalar != null, texto: 'Chrome ofrece instalación automática' });

    const ua = navigator.userAgent;
    const esChromeReal = /Chrome\/\d+/.test(ua) && !/(EdgA|EdgiOS|OPR|OPiOS|SamsungBrowser|MiuiBrowser|HeyTapBrowser|YaBrowser|UCBrowser|DuckDuckGo|FxiOS|CriOS|Brave)/i.test(ua);
    puntos.push({ ok: esChromeReal, texto: esChromeReal ? 'Es Chrome (permite instalar)' : 'NO es Chrome: ' + this.#nombreNavegador(ua) });

    const ahorroDatos = !!(navigator.connection && navigator.connection.saveData);
    puntos.push({ ok: !ahorroDatos, texto: ahorroDatos ? 'Ahorro de datos ACTIVADO (bloquea instalar)' : 'Ahorro de datos desactivado' });

    const yaInstalada = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    puntos.push({ ok: yaInstalada, texto: yaInstalada ? 'Abierta como app instalada' : 'Abierta en navegador (aún no instalada)', info: true });

    puntos.push({ texto: 'Navegador: ' + this.#nombreNavegador(ua), info: true });

    return puntos;
  }

  #nombreNavegador(ua) {
    if (/MiuiBrowser/i.test(ua)) return 'Mi Browser (Xiaomi)';
    if (/HeyTapBrowser/i.test(ua)) return 'Navegador Oppo/Realme';
    if (/SamsungBrowser/i.test(ua)) return 'Samsung Internet';
    if (/(OPR|OPiOS)/i.test(ua)) return 'Opera';
    if (/(EdgA|EdgiOS)/i.test(ua)) return 'Edge';
    if (/YaBrowser/i.test(ua)) return 'Yandex';
    if (/UCBrowser/i.test(ua)) return 'UC Browser';
    if (/Brave/i.test(ua)) return 'Brave';
    if (/CriOS/i.test(ua)) return 'Chrome iOS';
    if (/FxiOS|Firefox/i.test(ua)) return 'Firefox';
    if (/Chrome\/\d+/.test(ua)) return 'Chrome';
    return 'Desconocido';
  }

  #imagenCarga(src) {
    return new Promise(res => {
      const img = new Image();
      img.onload = () => res(true);
      img.onerror = () => res(false);
      img.src = src + (src.includes('?') ? '&' : '?') + 'v=' + Date.now();
    });
  }

  #render(puntos) {
    if (this.#overlay) this.#overlay.remove();

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;overflow:auto;';

    const panel = document.createElement('div');
    panel.style.cssText = 'background:#161b22;border:1px solid #30363d;border-radius:12px;max-width:460px;width:100%;max-height:90vh;overflow-y:auto;padding:20px;color:#e6edf3;font-family:monospace;';

    const titulo = document.createElement('h2');
    titulo.textContent = 'Diagnóstico de instalación';
    titulo.style.cssText = 'font-size:1.1rem;margin:0 0 4px;';
    panel.appendChild(titulo);

    const sub = document.createElement('p');
    sub.style.cssText = 'font-size:0.78rem;color:#8b949e;margin:0 0 16px;';
    sub.textContent = 'Requisitos para instalar la app (revisados en tu teléfono):';
    panel.appendChild(sub);

    const lista = document.createElement('div');
    panel.appendChild(lista);

    overlay.appendChild(panel);

    const cerrar = document.createElement('button');
    cerrar.textContent = 'Cerrar';
    cerrar.style.cssText = 'margin-top:18px;width:100%;background:#1f6feb;color:#fff;border:none;border-radius:8px;padding:12px;font-size:0.95rem;font-weight:600;font-family:inherit;cursor:pointer;';
    cerrar.addEventListener('click', () => overlay.remove());
    panel.appendChild(cerrar);

    document.body.appendChild(overlay);
    this.#overlay = overlay;

    puntos.forEach((p, i) => {
      setTimeout(() => {
        const fila = document.createElement('div');
        fila.style.cssText = 'display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #21262d;font-size:0.86rem;opacity:0;transition:opacity 0.25s;';
        const icono = p.info ? 'ℹ️' : (p.ok ? '✅' : '❌');
        const color = p.info ? '#58a6ff' : (p.ok ? '#3fb950' : '#ff7b72');
        fila.innerHTML = `<span style="font-size:1.1rem;">${icono}</span><span style="color:${color};">${p.texto}</span>`;
        lista.appendChild(fila);
        requestAnimationFrame(() => { fila.style.opacity = '1'; });
      }, i * 280);
    });

    setTimeout(() => {
      const fallas = puntos.filter(p => !p.ok && !p.info).length;
      const resumen = document.createElement('div');
      resumen.style.cssText = 'margin-top:14px;padding:12px;border-radius:8px;font-size:0.85rem;font-weight:600;text-align:center;';
      if (fallas === 0) {
        resumen.style.background = 'rgba(63,185,80,0.15)';
        resumen.style.color = '#3fb950';
        resumen.textContent = '✓ Cumple todo. Si Chrome aún no instala, usa el menú ⋮.';
      } else {
        resumen.style.background = 'rgba(218,54,51,0.15)';
        resumen.style.color = '#ff7b72';
        resumen.textContent = `Faltan ${fallas} requisito(s) (los marcados con ❌).`;
      }
      lista.appendChild(resumen);
    }, puntos.length * 280 + 100);
  }
}
