// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;

if (args.Titulo !== undefined) {
	$.lblTitulo.setText(args.Titulo);
}


if (args.Icono !== undefined) {
	$.addClass($.lblIcono, "icono " + args.Icono);
}

if (args.Imagen !== undefined) {
	var url = Alloy.Globals.APIURL_Documentos + args.Imagen;
	Ti.API.info("Imagen: " + url);
	$.imaImagen.setImage(url);
	$.lblIcono.setVisible(false);
	$.imaImagen.setVisible(true);
}

if (args.Tipo !== undefined) {
	$.lblTipo.setText("  " + args.Tipo + "  ");
}

if (args.Callback !== undefined) {
	$.lblIcono.addEventListener("click", args.Callback);
	$.viewDerecha.addEventListener("click", args.Callback);
	$.lblIcono.addEventListener("click", args.Callback);
}
