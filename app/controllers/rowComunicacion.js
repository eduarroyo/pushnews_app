var args = arguments[0] || {};

var Comunicacion = args.Dato;
Ti.API.info("Comunicacion: " + Comunicacion.Titulo);

var fecha = Alloy.Globals.Utils.isoDate(Comunicacion.FechaPublicacion);
Ti.API.info("Comunicacion2: " + fecha);

$.row.Dato = Comunicacion;
$.row.id = Comunicacion.ComunicacionID;

$.lblCategoria.setText(' ' + Comunicacion.Categoria + ' ');
//$.lblFecha.setText(fecha);
$.lblFecha.date = fecha;

var titulo = Alloy.Globals.Utils.cortar(Comunicacion.Titulo, 50);

$.lblTitulo.setText(titulo);


// asignación de la imagen o el icono
Ti.API.info("Imagen Documento: " + Comunicacion.ImagenDocumentoID);
if (Comunicacion.ImagenDocumentoID == null)
{
	// icono
	$.imaImagen.setImage('/ima/Escudo.png');
}
else
{
	// imagen
	var url = Alloy.Globals.APIURL_Documentos + Comunicacion.ImagenUrl;
	Ti.API.info("Imagen: " + url);
	$.imaImagen.setImage(url);
}

if (Comunicacion.Destacado)
{
	$.lblDestacado.setVisible(true);
}

// {
    // Activo = 1;
    // AdjuntoDocumentoID = 10;
    // AdjuntoTitulo = "Nota de Prensa";
    // AdjuntoUrl = "Home/Documento/17";
    // Destacado = true;
    // Autor = ".";
    // Categoria = "Ferias y Fiestas";
    // CategoriaID = 8;
    // ComunicacionID = 17;
    // Descripcion = "La XVII Feria Agroalimentaria de Valdefuentes se celebrar\U00e1 los pr\U00f3ximos d\U00edas 11, 12 y 13 de Marzo.\n\nM\U00e1s informaci\U00f3n en la nota de prensa del Ayuntamiento de Valdefuentes.";
    // Enlace = "<null>";
    // EnlaceTitulo = "<null>";
    // FechaPublicacion = "2016-01-27T19:04:14.257";
    // GeoPosicionDireccion = "<null>";
    // GeoPosicionLatitud = "<null>";
    // GeoPosicionLocalidad = "<null>";
    // GeoPosicionLongitud = "<null>";
    // GeoPosicionPais = "<null>";
    // GeoPosicionProvincia = "<null>";
    // GeoPosicionTitulo = "<null>";
    // Icono = "fa-comments-o";
    // ImagenDocumentoID = 11;
    // ImagenTitulo = "Cartel de la Feria";
    // ImagenUrl = "Home/Imagen/17";
    // Orden = 3;
    // TimeStamp = 1453921488;
    // Titulo = "XVII FERIA AGROALIMENTARIA EN VALDEFUENTES";
    // Youtube = "<null>";
    // YoutubeTitulo = "<null>";
// }