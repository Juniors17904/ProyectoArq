class CatalogoMateriales {
  #categorias;

  constructor() {
    this.#categorias = [];
    this.#cargar();
  }

  #cargar() {
    const datos = [
      {
        id: 'consumibles', nombre: 'Consumibles', icono: '🪣',
        materiales: [
          { codigo: '0702080010', nombre: 'Base Epóxica (Incl. Catalizador y Diluyente)', unidad: 'Und', ubicacion: '8.5.1' },
          { codigo: '0702080011', nombre: 'Pintura Esmalte', unidad: 'Gal', ubicacion: '8.5.2' },
          { codigo: '0702080012', nombre: 'Masilla Plástica', unidad: 'Kg', ubicacion: '8.5.3' },
          { codigo: '0702080013', nombre: 'Diluyente Estándar', unidad: 'Gal', ubicacion: '8.5.4' },
          { codigo: '0702080014', nombre: 'Sellador Epoxi', unidad: 'Gal', ubicacion: '8.5.5' },
          { codigo: '0702080015', nombre: 'Cinta Aislante', unidad: 'Rollo', ubicacion: '8.6.1' },
          { codigo: '0702080016', nombre: 'Cinta Teflón', unidad: 'Rollo', ubicacion: '8.6.2' },
          { codigo: '0702080017', nombre: 'Brocha 4"', unidad: 'Und', ubicacion: '8.6.3' },
          { codigo: '0702080018', nombre: 'Rodillo de Pintura', unidad: 'Und', ubicacion: '8.6.4' },
          { codigo: '0702080019', nombre: 'Lija #80', unidad: 'Pliego', ubicacion: '8.6.5' },
          { codigo: '0702080020', nombre: 'Lija #120', unidad: 'Pliego', ubicacion: '8.6.6' },
          { codigo: '0702080021', nombre: 'Waipe / Trapo Industrial', unidad: 'Kg', ubicacion: '8.7.1' },
        ]
      },
      {
        id: 'epps', nombre: 'EPPs', icono: '🦺',
        materiales: [
          { codigo: '0801010001', nombre: 'Casco de Seguridad', unidad: 'Und', ubicacion: '2.1.1' },
          { codigo: '0801010002', nombre: 'Chaleco Reflectivo', unidad: 'Und', ubicacion: '2.1.2' },
          { codigo: '0801010003', nombre: 'Guantes de Cuero', unidad: 'Par', ubicacion: '2.1.3' },
          { codigo: '0801010004', nombre: 'Guantes de Nitrilo', unidad: 'Par', ubicacion: '2.1.4' },
          { codigo: '0801010005', nombre: 'Botas de Seguridad Punta de Acero', unidad: 'Par', ubicacion: '2.2.1' },
          { codigo: '0801010006', nombre: 'Lentes de Protección', unidad: 'Und', ubicacion: '2.2.2' },
          { codigo: '0801010007', nombre: 'Careta Facial', unidad: 'Und', ubicacion: '2.2.3' },
          { codigo: '0801010008', nombre: 'Mascarilla N95', unidad: 'Und', ubicacion: '2.3.1' },
          { codigo: '0801010009', nombre: 'Tapones de Oído', unidad: 'Par', ubicacion: '2.3.2' },
          { codigo: '0801010010', nombre: 'Barbiquejo', unidad: 'Und', ubicacion: '2.3.3' },
          { codigo: '0801010011', nombre: 'Arnés de Seguridad', unidad: 'Und', ubicacion: '2.4.1' },
          { codigo: '0801010012', nombre: 'Línea de Vida', unidad: 'Und', ubicacion: '2.4.2' },
        ]
      },
      {
        id: 'maquinas', nombre: 'Máquinas', icono: '⚙️',
        materiales: [
          { codigo: '0901020001', nombre: 'Amoladora 4½"', unidad: 'Und', ubicacion: '5.1.1' },
          { codigo: '0901020002', nombre: 'Amoladora 7"', unidad: 'Und', ubicacion: '5.1.2' },
          { codigo: '0901020003', nombre: 'Taladro Percutor', unidad: 'Und', ubicacion: '5.1.3' },
          { codigo: '0901020004', nombre: 'Taladro de Banco', unidad: 'Und', ubicacion: '5.1.4' },
          { codigo: '0901020005', nombre: 'Esmeril de Banco', unidad: 'Und', ubicacion: '5.2.1' },
          { codigo: '0901020006', nombre: 'Compresora', unidad: 'Und', ubicacion: '5.2.2' },
          { codigo: '0901020007', nombre: 'Soldadora MIG', unidad: 'Und', ubicacion: '5.3.1' },
          { codigo: '0901020008', nombre: 'Cortadora de Plasma', unidad: 'Und', ubicacion: '5.3.2' },
          { codigo: '0901020009', nombre: 'Sierra Circular', unidad: 'Und', ubicacion: '5.3.3' },
        ]
      },
      {
        id: 'herramientas', nombre: 'Herramientas', icono: '🔧',
        materiales: [
          { codigo: '0901010001', nombre: 'Disco de Corte 4½"', unidad: 'Und', ubicacion: '4.1.1' },
          { codigo: '0901010002', nombre: 'Disco de Desbaste 4½"', unidad: 'Und', ubicacion: '4.1.2' },
          { codigo: '0901010003', nombre: 'Disco de Corte 7"', unidad: 'Und', ubicacion: '4.1.3' },
          { codigo: '0901010004', nombre: 'Broca para Concreto ½"', unidad: 'Und', ubicacion: '4.2.1' },
          { codigo: '0901010005', nombre: 'Broca para Metal ½"', unidad: 'Und', ubicacion: '4.2.2' },
          { codigo: '0901010006', nombre: 'Juego de Llaves Mixtas', unidad: 'Juego', ubicacion: '4.3.1' },
          { codigo: '0901010007', nombre: 'Juego de Destornilladores', unidad: 'Juego', ubicacion: '4.3.2' },
          { codigo: '0901010008', nombre: 'Extensión Eléctrica 20m', unidad: 'Und', ubicacion: '4.4.1' },
          { codigo: '0901010009', nombre: 'Nivel de Burbuja', unidad: 'Und', ubicacion: '4.4.2' },
          { codigo: '0901010010', nombre: 'Wincha 5m', unidad: 'Und', ubicacion: '4.4.3' },
        ]
      },
      {
        id: 'general', nombre: 'General', icono: '🧰',
        materiales: [
          { codigo: '1001010001', nombre: 'Tornillos Autorroscantes', unidad: 'Caja', ubicacion: '9.1.1' },
          { codigo: '1001010002', nombre: 'Pernos 3/8"', unidad: 'Caja', ubicacion: '9.1.2' },
          { codigo: '1001010003', nombre: 'Tuercas y Arandelas', unidad: 'Caja', ubicacion: '9.1.3' },
          { codigo: '1001010004', nombre: 'Cable Eléctrico 2.5mm', unidad: 'mt', ubicacion: '9.2.1' },
          { codigo: '1001010005', nombre: 'Tubería PVC 1"', unidad: 'mt', ubicacion: '9.2.2' },
          { codigo: '1001010006', nombre: 'Cemento', unidad: 'Bol', ubicacion: '9.3.1' },
          { codigo: '1001010007', nombre: 'Arena Fina', unidad: 'm3', ubicacion: '9.3.2' },
        ]
      }
    ];

    datos.forEach(d => {
      const cat = new Categoria(d.id, d.nombre, d.icono);
      d.materiales.forEach(m => cat.agregarMaterial(new Material(m.codigo, m.nombre, m.unidad, m.ubicacion, d.id)));
      this.#categorias.push(cat);
    });
  }

  get categorias() { return [...this.#categorias]; }

  buscarMaterial(codigo) {
    for (const cat of this.#categorias) {
      const m = cat.materiales.find(m => m.codigo === codigo);
      if (m) return m;
    }
    return null;
  }
}
