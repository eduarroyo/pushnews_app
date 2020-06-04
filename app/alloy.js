// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// Loads the map module, which can be referenced by Alloy.Globals.Map
Alloy.Globals.Map = require('ti.map');
Alloy.Globals.loading = Alloy.createWidget("nl.fokkezb.loading");
Alloy.Globals.Utils = require('AppUtils');


Alloy.Globals.CoreApp = require('DataManager');
Alloy.Globals.Notificacion = null;
Alloy.Globals.NotificacionID = 0;

Alloy.Globals.Negocio = "AppBando";
Alloy.Globals.Subdominio = "appbando";
Alloy.Globals.APIURL_Documentos = "http://" + Alloy.Globals.Subdominio + ".appbando.com/";
Alloy.Globals.APIURL_Info = Alloy.Globals.APIURL_Documentos + "clientes/" + Alloy.Globals.Subdominio + "/info.html";

Alloy.Globals.APIURL = "https://api.tecnologiasdemovilidad.com/appbando/";
Alloy.Globals.APIURL_Categorias = Alloy.Globals.APIURL + "categorias/lista";
Alloy.Globals.APIURL_Comunicaciones = Alloy.Globals.APIURL + "comunicaciones/lista";
Alloy.Globals.APIURL_Comunicacion =  Alloy.Globals.APIURL + "comunicaciones/detalle";
Alloy.Globals.APIURL_Localizaciones =  Alloy.Globals.APIURL + "localizaciones";
Alloy.Globals.APIURL_Telefonos =  Alloy.Globals.APIURL + "telefonos";

Alloy.Globals.APIKEY = 'GkQmlvOcW7Wu2TD83AjE';
Alloy.Globals.APIURL_RAW = "{ subdominio: '" + Alloy.Globals.Subdominio + "', apikey: '" + Alloy.Globals.APIKEY +"' }";

// Menu lateral
Alloy.Globals.Menu_Color_Arriba = "white";
Alloy.Globals.Menu_Color_Abajo = "#92c13e";
Alloy.Globals.Menu_Color_Letra = "black";
Alloy.Globals.Menu_Color_Icono = "#fcb040";
Alloy.Globals.Menu_Color_Fondo_Seleccionado = "#fcb040";

// Cabecera
Alloy.Globals.Cabecera_Color_Letra = "white";
Alloy.Globals.Cabecera_Color_Fondo = "#92c13e";
Alloy.Globals.Cabecera_Color_Icono = "white";

// Categorías
Alloy.Globals.Categorias_Color_Letra = "black";
Alloy.Globals.Categorias_Color_Icono = "#92c13e";
Alloy.Globals.Categorias_Color_Fondo_Seleccionado = "#fcb040";

// Comunicaciones
Alloy.Globals.Comunicaciones_Color_Letra = "black";
Alloy.Globals.Comunicaciones_Categoria_Color_Letra = "white";
Alloy.Globals.Comunicaciones_Categoria_Color_Fondo = "#fcb040"; 
Alloy.Globals.Comunicaciones_Color_Fondo_Seleccionado = "#fcb040";

// Comunicacion
Alloy.Globals.Comunicacion_Color_Letra = "black";
Alloy.Globals.Comunicacion_Color_Titulo_Letra = "#fcb040"; 
Alloy.Globals.Comunicacion_Color_Icono = "#92c13e"; 
Alloy.Globals.Comunicacion_Categoria_Color_Letra = "white";
Alloy.Globals.Comunicacion_Categoria_Color_Fondo = "#fcb040";
Alloy.Globals.Comunicacion_Destacado_Color_Icono = "#fcb040";

// Telefonos
Alloy.Globals.Telefonos_Color_Letra = "black";
Alloy.Globals.Telefonos_Color_Titulo_Letra = "#92c13e"; 


Alloy.Globals.Categoria = null;
Alloy.Globals.Comunicacion = null;
Alloy.Globals.ComunicacionID = 0;
Alloy.Globals.MostrandoPush = false;


Alloy.Globals.Categorias = [];
Alloy.Globals.CategoriasUltimoTimestamp = 0;

Alloy.Globals.Comunicaciones = [];
Alloy.Globals.ComunicacionesUltimoTimestamp = 0;

Alloy.Globals.Localizaciones = [];
Alloy.Globals.LocalizacionesUltimoTimestamp = 0;

Alloy.Globals.Telefonos = [];
Alloy.Globals.TelefonosUltimoTimestamp = 0;

Alloy.Globals.Menu =  [
    { id: "menu_cliente", icon: "fa-home", title: "Nosotros", vista: true },
    { id: "menu_categorias", icon: "fa-tags", title: "Comunicaciones", vista: true },
    { id: "menu_contactar", icon: "fa-envelope-o", title: "E-Mail", vista: false },
    { id: "menu_facebook", icon: "fa-facebook", title: "Facebook", vista: false },
    { id: "menu_twitter", icon: "fa-twitter", title: "Twitter", vista: false },
    { id: "menu_web", icon: "fa-globe", title: "Web", vista: false },
    { id: "menu_telefono", icon: "fa-phone", title: "Teléfonos", vista: true },
    { id: "menu_comollegar", icon: "fa-map-marker", title: "Cómo llegar", vista: true }
];

Alloy.Globals.Parametros = {
	"Facebook": "https://www.facebook.com/AppBando-163605260662086",
	"Twitter": "https://twitter.com/appbando",
	"Web": "http://www.appbando.com",
	"EMail": "info@appbando.com",
	"Telefono": "670491631",
	"Direccion": "Carmen Conde, 1, 2, E",
	"Localidad": "Sevilla",
	"Provincia": "Sevilla",
	"CodigoPostal": "41019",
	"Latitud": 37.412575,
	"Longitud": -5.922912,
	"Telefonos": [
		{
			Titulo: "Comercial",
			Telefono: "670491631"
		}]
};

Alloy.Globals.FondoAnchoOriginal = 2592;
Alloy.Globals.FondoAltoOriginal = 3872;

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

// Get Device specifics
Alloy.Globals.device = {

	isHandheld:           Alloy.isHandheld,
	isTablet:             Alloy.isTablet,
	type:                 Alloy.isHandheld ? "handheld" : "tablet",
	os:                   null,
	name:                 null,
	version:              Ti.Platform.version,
	versionMajor:         parseInt(Ti.Platform.version.split(".")[0], 10),
	versionMinor:         parseInt(Ti.Platform.version.split(".")[1], 10),
	width:                Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
	height:               Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformHeight,
	dpi:                  Ti.Platform.displayCaps.dpi,
	orientation:          Ti.Gesture.orientation == Ti.UI.LANDSCAPE_LEFT || Ti.Gesture.orientation == Ti.UI.LANDSCAPE_RIGHT ? "LANDSCAPE" : "PORTRAIT",
	statusBarOrientation: null
};

Ti.API.info("--" + Alloy.Globals.Utils.CalcularAltoConAnchoFijo);

// ajuste de imagen de fondo
// el ancho es fijo, el alto cambiará y será superior al alto de la pantalla, con lo que tenemos que ajustar el top
// para que la imagen quede centrada

var Calculo = Alloy.Globals.Utils.CalcularAltoConAnchoFijo(Alloy.Globals.FondoAnchoOriginal, Alloy.Globals.FondoAltoOriginal, Alloy.Globals.device.width);
Alloy.Globals.FondoAncho = Calculo.width;
Alloy.Globals.FondoAlto = Calculo.height;
Alloy.Globals.FondoTop = -1 * (Alloy.Globals.FondoAlto - Alloy.Globals.device.height)/2; 
Alloy.Globals.FondoLeft = 0;
// comprobamos si el alto es el adecuado (mayor que el alto del dispositivo)
if (Calculo.height < Alloy.Globals.device.height)
{
	// es mayor, tenemos que hacer el calculo al reves, en lugar de el ancho fijo, ponemos el alto fijo
	Calculo = Alloy.Globals.Utils.CalcularAltoConAltoFijo(Alloy.Globals.FondoAnchoOriginal, Alloy.Globals.FondoAltoOriginal, Alloy.Globals.device.height);
	Alloy.Globals.FondoAncho = Calculo.width;
	Alloy.Globals.FondoAlto = Calculo.height;
	Alloy.Globals.FondoTop = 0;
	Alloy.Globals.FondoLeft = -1 * (Alloy.Globals.FondoAncho - Alloy.Globals.device.width)/2; 
}



Alloy.Globals.Utils.Info("Calculo Ancho: " + Alloy.Globals.FondoAncho);
Alloy.Globals.Utils.Info("Calculo Alto: " + Alloy.Globals.FondoAlto);
Alloy.Globals.Utils.Info("Calculo Top: " + Alloy.Globals.FondoTop);
Alloy.Globals.Utils.Info("Calculo Left: " + Alloy.Globals.FondoLeft);

Alloy.Globals.Utils.Info("Device Alto: " + Alloy.Globals.device.height);
Alloy.Globals.Utils.Info("Device Ancho: " + Alloy.Globals.device.width);

if (OS_IOS) {

	Alloy.Globals.device.os = "IOS";

	if (Ti.Platform.osname.toUpperCase() == "IPHONE") {

		Alloy.Globals.device.name = "IPHONE";
	}
	else if (Ti.Platform.osname.toUpperCase() == "IPAD") {

		Alloy.Globals.device.name = "IPAD";
	}

}
else if (OS_ANDROID) {
	Alloy.Globals.device.os = "ANDROID";

	Alloy.Globals.device.name = Ti.Platform.model.toUpperCase();

	// Fix the display values
	Alloy.Globals.device.width = (Alloy.Globals.device.width / (Alloy.Globals.device.dpi / 160));
	Alloy.Globals.device.height = (Alloy.Globals.device.height / (Alloy.Globals.device.dpi / 160));

	Alloy.Globals.appArgumentsURL = Ti.Android.currentActivity.intent.data;
}


// Custom Query Styles
Alloy.Globals.isIOS7Plus = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 7);
Alloy.Globals.isIOS8Plus = (OS_IOS && parseInt(Ti.Platform.version.split(".")[0]) >= 8);
Alloy.Globals.isAndroid4 = (OS_ANDROID && parseInt(Ti.Platform.version.split(".")[0]) === 4);

Ti.App.Properties.setBool("VentanaAbierta", true);
Ti.API.info("Alloy Ventana Abierta = true");
		

Alloy.Globals.Utils.Info("Fin del AlloyJS");