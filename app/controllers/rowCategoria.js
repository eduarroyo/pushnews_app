var args = arguments[0] || {};
// $.row.title = args.Categoria || '';
$.row.Categoria = args.Dato;
$.row.CategoriaID = args.id;

$.rowTitulo.setText(args.title);
//$.rowIcon.setClass(args.Icono);

$.addClass($.rowIcon, "rowIcon " + args.icon);
