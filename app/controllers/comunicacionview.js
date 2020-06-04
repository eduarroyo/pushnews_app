var args = arguments[0] || {};

var Cloud = Alloy.Globals.CoreApp;

var Utils = require('Utils');

function cleanup()
{
	var scrollview_children = $.viewDatos.getChildren();
	for (var b in scrollview_children)
	{
		if (undefined!==scrollview_children[b])
		{
			$.viewDatos.remove(scrollview_children[b]);
		}
	}
}


function Recargar()
{
	cleanup();

	Alloy.Globals.loading.show();
	
	var Comunicacion = Alloy.Globals.Comunicacion;
	var ComunicacionID = Alloy.Globals.ComunicacionID;
	var ConDatos = false;
	
	Ti.API.info("Comunicación: " + JSON.stringify(Comunicacion));
	
	
	if (Comunicacion != null)
	{
		ConDatos = true;
		MostrarComunicacion(Comunicacion);
		ComunicacionID = Comunicacion.ComunicacionID;
		Alloy.Globals.MostrandoPush = false;
	
	}
	else
	{
		Alloy.Globals.MostrandoPush = true;
	}
	
	// actualizamos la visita en el contenido
	var coreApp = new Cloud();
    coreApp.setComunicacion(ComunicacionID, onSuccess, onError);

    function onSuccess(e) {
        Titanium.API.info("setComunicacion:onSuccess");
		
		Alloy.Globals.Utils.Info("Acceso a la comunicación guardado");
		
		Ti.API.info("Con Datos: " + ConDatos);
		
		if (!ConDatos)
		{
			// estamos cargando la comunicación indicada, debemos mostrarla
			MostrarComunicacion(e);
		}
        Alloy.Globals.loading.hide();
    };
    
    function onError(e) {
        // Handle your errors in here
        Titanium.API.info("setComunicacion:onError");
        Titanium.API.info(e);
        // viene un string con el error
        //alert("Error: No se pudieron obtener las comunicaciones, por favor, inténtelo de nuevo");
        Alloy.Globals.loading.hide();
    };	

	

	
    
	
}

function MostrarComunicacion(Comunicacion) {
	
	var titulo = Alloy.Globals.Utils.cortar(Comunicacion.Titulo, 30);

	$.viewCabecera.setTitulo(titulo);
	
	var fecha = Alloy.Globals.Utils.isoDate(Comunicacion.FechaPublicacion);

	$.lblCategoria.setText(' ' + Comunicacion.Categoria + ' ');
	$.lblFecha.date = fecha;

	// Inicializamos la carga de forma manual
	var lblTitulo = Ti.UI.createLabel({
		left: "5dp",
		right: "5dp",
	  	color: Alloy.Globals.Comunicacion_Color_Titulo_Letra,
	  	font: { 
	  		fontFamily: "Lato",
			fontSize: '24dp' 
	  	},
	  	// shadowColor: '#aaa',
	  	// shadowOffset: {x:1, y:1},
	  	// shadowRadius: 3,
	  	text: Comunicacion.Titulo,
	  	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  	top: 0,
	  	width: Ti.UI.FILL, 
	  	height: Ti.UI.SIZE
	});
	$.viewDatos.add(lblTitulo);
	
	if ((Comunicacion.Autor != "") && (Comunicacion.Autor != ".") && (Comunicacion.Autor != null))
	{
		var lblAutor = Ti.UI.createLabel({
			top: "5dp",
			left: "5dp",
		  	color: Alloy.Globals.Comunicacion_Color_Letra,
		  	font: { 
		  		fontFamily: "Lato",
				fontSize: '10dp' 
		  	},
		  	text: 'Autor: ' + Comunicacion.Autor,
		  	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		  	width: Ti.UI.FILL, 
		  	height: Ti.UI.SIZE
		});
		$.viewDatos.add(lblAutor);
	}

	if (OS_ANDROID)
	{
		var compartirView = Alloy.createController('rowCompartir', {
			Comunicacion: Comunicacion
		});		
		$.viewDatos.add(compartirView.getView());
	}
	
	

	var lblTexto = Ti.UI.createLabel({
		top: "15dp",
		bottom: "15dp",
		left: "5dp",
		right: "5dp",
	  	color: Alloy.Globals.Comunicacion_Color_Letra,
	  	font: { 
	  		fontFamily: "Lato",
			fontSize: '18dp' 
	  	},
	  	text: Comunicacion.Descripcion,
	  	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	  	width: Ti.UI.FILL, 
	  	height: Ti.UI.SIZE
	});
	$.viewDatos.add(lblTexto);
	
	
	// ya hemos mostrado la categoria, fecha, titulo, autor y texto
	
	// Enlace --------------------------------------------------
    // Enlace = "<null>";
    // EnlaceTitulo = "<null>";
    Alloy.Globals.Utils.Info("Enlace: " + Comunicacion.Enlace);
    if ((Comunicacion.Enlace != null) && (Comunicacion.Enlace != ""))
    {
		var enlaceView = Alloy.createController('rowEnlaces', {
			Titulo: Comunicacion.EnlaceTitulo,
			Tipo: "Enlace a Web",
			Icono: "fa-external-link",
			Callback: PulsoEnlace
		});
	
		function PulsoEnlace()
		{
			Alloy.Globals.Utils.AbrirURL(Comunicacion.Enlace);
		}
	
		$.viewDatos.add(enlaceView.getView());    	
    }

	// Adjunto --------------------------------------------------
    // AdjuntoTitulo = "Nota de Prensa";
    // AdjuntoUrl = "Home/Documento/17";
    Alloy.Globals.Utils.Info("Adjunto Documento ID: " + Comunicacion.AdjuntoDocumentoID);
	if ((Comunicacion.AdjuntoDocumentoID != null) && (Comunicacion.AdjuntoDocumentoID != ""))
    {
		var adjuntoView = Alloy.createController('rowEnlaces', {
			Titulo: Comunicacion.AdjuntoTitulo,
			Tipo: "Archivo Adjunto",
			Icono: "fa-cloud-download",
			Callback: PulsoAdjunto
		});
	
		function PulsoAdjunto()
		{
			Alloy.Globals.Utils.AbrirURL(Alloy.Globals.APIURL_Documentos + Comunicacion.AdjuntoUrl);
		}
	
		$.viewDatos.add(adjuntoView.getView());    	
    }	
	
	
	
	// Imagen --------------------------------------------------
    // ImagenTitulo = "Cartel de la Feria";
    // ImagenUrl = "Home/Imagen/17";
    Alloy.Globals.Utils.Info("ImagenDocumentoID: " + Comunicacion.ImagenDocumentoID);
	if ((Comunicacion.ImagenDocumentoID != null) && (Comunicacion.ImagenDocumentoID != ""))
    {
		var imagenView = Alloy.createController('rowEnlaces', {
			Titulo: Comunicacion.ImagenTitulo,
			Tipo: "Imagen",
			Imagen: Comunicacion.ImagenUrl,
			Callback: PulsoImagen
		});
	
		function PulsoImagen()
		{
			var TituloImagen = Comunicacion.ImagenTitulo;
			if (TituloImagen == "") TituloImagen = " ";
			//Alloy.Globals.Utils.AbrirURL(Alloy.Globals.APIURL_Documentos + Comunicacion.ImagenUrl);
			var url = Alloy.Globals.APIURL_Documentos + Comunicacion.ImagenUrl;
			//alert("pulso en imagen");
			
			// Anterior a poner el nuevo view de imágenes con zoom
			// var tilter = Alloy.createWidget('com.caffeinalab.titanium.tiltimageview', { 
				// image: url,
				// title: TituloImagen,
				// subtitle: ' ',
				// closeOnClick: CerrarImagen
			// });
			
			// view con zoom
			var tilter = Alloy.createWidget('it.apra.tiimageviewer', { 
				image: url,
				title: TituloImagen,
				subtitle: ' ',
				closeOnClick: true,
				lowerGradientHidden: true
			});
			tilter.open();
		}
	
		$.viewDatos.add(imagenView.getView());    	
    }	

	// Youtube --------------------------------------------------	
    // Youtube = "<null>";
    // YoutubeTitulo = "<null>";
    Alloy.Globals.Utils.Info("Youtube: " + Comunicacion.Youtube);
	// if ((Comunicacion.Youtube != null) && (Comunicacion.Youtube != ""))
    // {
		// var youtubeView = Alloy.createController('rowEnlaces', {
			// Titulo: Comunicacion.YoutubeTitulo,
			// Tipo: "Video",
			// Icono: "fa-youtube-play",
			// Callback: PulsoYoutube
		// });
// 	
		// function PulsoYoutube()
		// {
			// //Alloy.Globals.Utils.AbrirURL(Alloy.Globals.APIURL_Documentos + Comunicacion.Youtube);
			// //alert("pulso en youtube");
			// Alloy.createWidget('com.caffeinalab.titanium.videoplayer');
		// }
// 	
		// $.viewDatos.add(youtubeView.getView());    	
    // }	




	// Geoposicion ---------------------------------------------
    // GeoPosicionDireccion = "<null>";
    // GeoPosicionLatitud = "<null>";
    // GeoPosicionLocalidad = "<null>";
    // GeoPosicionLongitud = "<null>";
    // GeoPosicionPais = "<null>";
    // GeoPosicionProvincia = "<null>";
    // GeoPosicionTitulo = "<null>";
    Alloy.Globals.Utils.Info("GeoLatitud: " + Comunicacion.GeoPosicionLatitud);
	if ((Comunicacion.GeoPosicionLatitud != null) && (Comunicacion.GeoPosicionLatitud != ""))
    {
		var mapView = Alloy.createController('rowEnlaces', {
			Titulo: Comunicacion.GeoPosicionTitulo,
			Tipo: "Ubicación",
			Icono: "fa-map-marker",
			Callback: PulsoMapa
		});
			
		function PulsoMapa()
		{
			//Alloy.Globals.Utils.AbrirURL(Alloy.Globals.APIURL_Documentos + Comunicacion.Youtube);
			//alert("pulso en mapa");
			
			var Titulo = Comunicacion.GeoPosicionTitulo;
			var Subtitulo = "";
			if ((Comunicacion.GeoPosicionDireccion != "") && (Comunicacion.GeoPosicionDireccion != null))
			{
				Titulo = Comunicacion.GeoPosicionDireccion;
			}
			if ((Comunicacion.GeoPosicionLocalidad != "") && (Comunicacion.GeoPosicionLocalidad != null))
			{
				Subtitulo = Comunicacion.GeoPosicionLocalidad;
			}
			if ((Comunicacion.GeoPosicionProvincia != "") && (Comunicacion.GeoPosicionProvincia != null))
			{
				if (Subtitulo != "") 
				{
					Subtitulo = Subtitulo + "(" + Comunicacion.GeoPosicionProvincia + ")";	
				}
				else
				{
					Subtitulo = Comunicacion.GeoPosicionProvincia;	
				}
			}
			var mapa = Alloy.createController('winMapa', {
				Cabecera: Comunicacion.Titulo,
				Titulo: Titulo,
				Subtitulo: Subtitulo,
				Latitud: Comunicacion.GeoPosicionLatitud,
				Longitud: Comunicacion.GeoPosicionLongitud,
				Callback: CerrarMapa
			});
			
			mapa.open();
			
			function CerrarMapa() {
				Alloy.Globals.Utils.Info("Cerrando Mapa");
				mapa.close();
			}

		}
	
		$.viewDatos.add(mapView.getView());    	
    }	


}

exports.Recargar = Recargar;

// {
    // Activo = 1;
    // AdjuntoDocumentoID = 10;
    // AdjuntoTitulo = "Nota de Prensa";
    // AdjuntoUrl = "Home/Documento/17";
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
