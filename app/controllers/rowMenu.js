var args = arguments[0] || {};
// $.row.title = args.Categoria || '';
$.row.Opcion = args;
$.row.id = args.id;
$.row.vista = args.vista;

$.rowTitulo.setText(args.title);
//$.rowIcon.setClass(args.Icono);

$.addClass($.rowIcon, "rowIcon " + args.icon);
