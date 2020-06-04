var args = arguments[0] || {};
// $.row.title = args.Categoria || '';
$.row.Opcion = args;

$.lblTitulo.setText(args.Descripcion);
$.lblTelefono.setText(args.Numero);
//$.rowIcon.setClass(args.Icono);

  // {
    // "TelefonoID": 4,
    // "Numero": "927200001",
    // "Descripcion": "Ayuntamiento",
    // "Fecha": "2016-03-12T23:06:57.65",
    // "Activo": true
  // },