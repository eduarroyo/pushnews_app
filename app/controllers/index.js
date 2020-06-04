//var Cloud = Alloy.Globals.CoreApp;
var coreApp = new Alloy.Globals.CoreApp();
    
var Parametros = Alloy.Globals.Parametros;

Alloy.Globals.Utils.Info("Inicio de IndexJS");

// get main and menu view as objects
var menuView = Alloy.createController('menuview');
var categoriasView = Alloy.createController('categoriasview');
var comunicacionesView = Alloy.createController('comunicacionesview', {
	VolverCallback: ActivarCategorias
});
var comunicacionView = Alloy.createController('comunicacionview');
var clientesView = Alloy.createController('clientesview');
var comollegarView = Alloy.createController('comollegarview');
var telefonosView = Alloy.createController('telefonosview');

// comunicacionesView.viewCabecera.init({
    // Titulo: "Sierra de Montanchez",
    // IconoIzquierda: "fa-bars",
    // IconoIzquierdaCallback: function() {
		// $.drawermenu.showhidemenu();
		// $.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	// }
// });

categoriasView.viewCabecera.init({
    Titulo: "Categorías",
    IconoIzquierda: "fa-bars",
    IconoIzquierdaCallback: function() {
		$.drawermenu.showhidemenu();
		$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	},
	IconoDerecha: "fa-refresh",
    IconoDerechaCallback: function() {
		categoriasView.Recargar();
	},
	Cabecera_Color_Letra: Alloy.Globals.Cabecera_Color_Letra,
	Cabecera_Color_Fondo: Alloy.Globals.Cabecera_Color_Fondo,
	Cabecera_Color_Icono: Alloy.Globals.Cabecera_Color_Icono
});

categoriasView.tableLista.addEventListener('click', function(e) {
	//alert("Click: " + e.row.CategoriaID);
	Alloy.Globals.Categoria = e.row.Categoria;
	
	comunicacionesView.Recargar();
	
	var Anterior = activeView;
	
	activeViewID = 'comunicaciones';
	
	activeView = comunicacionesView.getView();
 	$.drawermenu.drawermainview.add(activeView);
	
	$.drawermenu.drawermainview.remove(Anterior);
	
});

comunicacionesView.viewCabecera.init({
    Titulo: "",
    IconoIzquierda: "fa-arrow-circle-left",
    IconoIzquierdaCallback: ActivarCategorias,
	IconoDerecha: "fa-refresh",
    IconoDerechaCallback: function() {
		comunicacionesView.Recargar();
	},
	Cabecera_Color_Letra: Alloy.Globals.Cabecera_Color_Letra,
	Cabecera_Color_Fondo: Alloy.Globals.Cabecera_Color_Fondo,
	Cabecera_Color_Icono: Alloy.Globals.Cabecera_Color_Icono
});

function ActivarCategorias()
{
	
	var Anterior = activeView;

	activeViewID = 'menu_categorias';
	
	activeView = categoriasView.getView();
 	$.drawermenu.drawermainview.add(activeView);

	$.drawermenu.drawermainview.remove(Anterior);
}

comunicacionesView.tableLista.addEventListener('click', function(e) {
	//alert("Click: " + e.row.CategoriaID);
	
	Alloy.Globals.Comunicacion = e.row.Dato;
	Alloy.Globals.ComunicacionID = e.row.Dato.ComunicacionID;
	ActivarComunicacion();	
});

function ActivarComunicacionID(ID) {
	Alloy.Globals.Comunicacion = null;
	Alloy.Globals.ComunicacionID = ID;
	ActivarComunicacion();
}

function ActivarComunicacion() {
	
	comunicacionView.Recargar();
	
	var Anterior = activeView;

	// solo si la ventana no estaba abierta
	if (activeViewID != 'comunicacion')
	{
		activeViewID = 'comunicacion';
		activeView = comunicacionView.getView();
	 	$.drawermenu.drawermainview.add(activeView);
	
		$.drawermenu.drawermainview.remove(Anterior);		
	}
	
}



comunicacionView.viewCabecera.init({
    Titulo: "",
    IconoIzquierda: "fa-arrow-circle-left",
    IconoIzquierdaCallback: ActivarComunicaciones,
	Cabecera_Color_Letra: Alloy.Globals.Cabecera_Color_Letra,
	Cabecera_Color_Fondo: Alloy.Globals.Cabecera_Color_Fondo,
	Cabecera_Color_Icono: Alloy.Globals.Cabecera_Color_Icono //,
	// IconoDerecha: "fa-refresh",
    // IconoDerechaCallback: function() {
		// comunicacionView.Recargar();
	// }	
});

function ActivarComunicaciones()
{
	if (Alloy.Globals.MostrandoPush)
	{
		Alloy.Globals.MostrandoPush = false;
		// si está mostrando un push vamos del tirón a la ventana de incio (categorías)
		ActivarCategorias();
	}
	else
	{
		var Anterior = activeView;

		activeViewID = 'comunicaciones';
		
		activeView = comunicacionesView.getView();
	 	$.drawermenu.drawermainview.add(activeView);

		$.drawermenu.drawermainview.remove(Anterior);

	}
}

clientesView.viewCabecera.init({
    Titulo: Alloy.Globals.Negocio,
    IconoIzquierda: "fa-bars",
    IconoIzquierdaCallback: function() {
		$.drawermenu.showhidemenu();
		$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	},
	Cabecera_Color_Letra: Alloy.Globals.Cabecera_Color_Letra,
	Cabecera_Color_Fondo: Alloy.Globals.Cabecera_Color_Fondo,
	Cabecera_Color_Icono: Alloy.Globals.Cabecera_Color_Icono
});

comollegarView.viewCabecera.init({
    Titulo: "Cómo llegar",
    IconoIzquierda: "fa-bars",
    IconoIzquierdaCallback: function() {
		$.drawermenu.showhidemenu();
		$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	},
	Cabecera_Color_Letra: Alloy.Globals.Cabecera_Color_Letra,
	Cabecera_Color_Fondo: Alloy.Globals.Cabecera_Color_Fondo,
	Cabecera_Color_Icono: Alloy.Globals.Cabecera_Color_Icono
});

telefonosView.viewCabecera.init({
    Titulo: "Teléfonos",
    IconoIzquierda: "fa-bars",
    IconoIzquierdaCallback: function() {
		$.drawermenu.showhidemenu();
		$.drawermenu.menuOpen=!$.drawermenu.menuOpen;
	},
	IconoDerecha: "fa-refresh",
    IconoDerechaCallback: function() {
		telefonosView.Recargar();
	},
	Cabecera_Color_Letra: Alloy.Globals.Cabecera_Color_Letra,
	Cabecera_Color_Fondo: Alloy.Globals.Cabecera_Color_Fondo,
	Cabecera_Color_Icono: Alloy.Globals.Cabecera_Color_Icono
});


$.drawermenu.init({
    menuview: menuView.getView(),
    mainview: categoriasView.getView(),
    duration:200,
    parent: $.index
});

//variable to controler de open/close slide

var activeViewID = "menu_categorias";
var activeView = categoriasView.getView();

// add event listener in this context
menuView.menuTable.addEventListener('click',function(e){
    $.drawermenu.showhidemenu();
    $.drawermenu.menuOpen = false; //update menuOpen status to prevent inconsistency.

	if (e.row.id != activeViewID)
	{
		Ti.API.info(e.row.vista);

		var Anterior = activeView;		
		if (e.row.vista)
		{
			activeViewID = e.row.id;
		}

	    switch(e.row.id)
	    {
	    	 case "menu_cliente":
	    	 	activeView = clientesView.getView();
	    	 	$.drawermenu.drawermainview.add(activeView);
	    	 	break;
	    	 	
	    	 case "menu_categorias":
	    	 	activeView = categoriasView.getView();
	    	 	$.drawermenu.drawermainview.add(activeView);
	    	 	break;
	    	 
	    	 case "menu_comollegar":
	    	 	activeView = comollegarView.getView();
	    	 	comollegarView.Recargar();
	    	 	$.drawermenu.drawermainview.add(activeView);
	    	 	break;

	    	 case "menu_telefono":
	    		// alert(Parametros.Telefono);
	    	 	//Util.AbrirTelefono(Parametros.Telefono);
	    	 	activeView = telefonosView.getView();
	    	 	telefonosView.Recargar();
	    	 	$.drawermenu.drawermainview.add(activeView);
	    	 	break;

	    	 case "menu_facebook":
	    	 	// alert(Parametros.Facebook);
	    	 	Alloy.Globals.Utils.AbrirURL(Parametros.Facebook);
	    	 	break;
	    	 	
	    	 case "menu_twitter":
	    	 	// alert(Parametros.Facebook);
	    	 	Alloy.Globals.Utils.AbrirURL(Parametros.Twitter);
	    	 	break;

	    	 case "menu_web":
	    	 	// alert(Parametros.Web);
	    	 	Alloy.Globals.Utils.AbrirURL(Parametros.Web);
	    	 	break;
	    	 		    
	    	 case "menu_contactar":
	    	 	Alloy.Globals.Utils.EnviarEmail("Escriba su mensaje", "Contactar", Parametros.EMail);
	    	 	break;
	    	 		 	
	    	 default:
	    	 	activeView = comunicacionesView.getView();
	    	 	$.drawermenu.drawermainview.add(activeView);
	    	 	break;
	    	 
	    }		

		if (e.row.vista)
		{
		 	$.drawermenu.drawermainview.remove(Anterior);
		}

	}

    Ti.API.info(e.row.id); 
});

$.index.open();


if (Alloy.Globals.Notificacion != null)
{
	alert("Con Notificación e ID: " + Alloy.Globals.Notificacion.ID);
}




Alloy.Globals.Cloud = require("ti.cloud");
Alloy.Globals.Cloud.debug = true;

// detección del botón back
if (OS_ANDROID) {

	// Require the module
	Alloy.Globals.CloudPush = require('ti.cloudpush');
	Alloy.Globals.CloudPush.debug = true;
	Alloy.Globals.CloudPush.enabled = true;
	Alloy.Globals.CloudPush.showTrayNotificationsWhenFocused = true;
	Alloy.Globals.CloudPush.focusAppOnPush = false;


	$.index.addEventListener("open", function(e) {
	 
		Ti.API.info("************************************** open");
		Ti.API.info(Ti.App.Notificacion);
		Alloy.Globals.Utils.Info("ID: " + Alloy.Globals.NotificacionID);
		Ti.App.Properties.setBool("VentanaAbierta", true);
		Ti.API.info("Ventana Abierta = true");
		
	    $.index.activity.addEventListener("resume", function() {
	 
	        Ti.API.info("*********************** resume");
	        Ti.API.info(Ti.App.Notificacion);
	        Alloy.Globals.Utils.Info("ID: " + Alloy.Globals.NotificacionID);
	        
	    });
	    $.index.activity.addEventListener("pause", function() {
	        
	        Ti.API.info("************************************** pause");
			Ti.API.info(Ti.App.Notificacion);
			Alloy.Globals.Utils.Info("ID: " + Alloy.Globals.NotificacionID);
			Ti.App.Properties.setBool("VentanaAbierta", false);
			Ti.API.info("Ventana Abierta = false");
	    });
	 
	});
	
	$.index.addEventListener('android:back', function(e) {
	    
	    // controlamos el volver de las vistas:
	    // menu_telefono, menu_comollegar, menu_cliente, comunicaciones --> van a menu_categorias
	    // comunicacion --> va a comunicaciones
	    switch(activeViewID)
	    {
	    	case "comunicacion":
	    		ActivarComunicaciones();
	    		break;
	    	case "menu_categorias":
	    		var dialog = Ti.UI.createAlertDialog({
                    cancel: 0,
                    buttonNames: ['Si', 'No'],
                    message: '¿Está seguro de salir de ' + Alloy.Globals.Negocio + '?',
                    title: 'Cerrar aplicación'
                });
                
                dialog.addEventListener('click', function(e){
                	Ti.API.info('e.cancel: ' + e.index);
                    if (e.index == 0){
						// salir
						$.index.close();
                    }
                    // Ti.API.info('e.cancel: ' + e.cancel);
                    // Ti.API.info('e.source.cancel: ' + e.source.cancel);
                    // Ti.API.info('e.index: ' + e.index);
                });
                dialog.show();  
	    		break;
	    	default:
	    		ActivarCategorias();
	    		break;
	    }
	    e.cancelBubble = true;
	});

	// Android PUSH
	
	

	Alloy.Globals.deviceToken = null;
	// Initialize the module
	Alloy.Globals.CloudPush.retrieveDeviceToken({
		success: deviceTokenSuccess,
		error: deviceTokenError
	});
	// Enable push notifications for this device
	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
		Alloy.Globals.Utils.Info("Device Token Success");
		Alloy.Globals.deviceToken = e.deviceToken;
		
		// Require the Cloud module
		subscribeToChannel();
		
	}
	
	function deviceTokenError(e) {
		Alloy.Globals.Utils.Info("Device Token Error");
		//alert('Failed to register for push notifications! ' + e.error);
	}
	
	function ProcesarNotificacion(evt)
	{
		Alloy.Globals.Utils.Info("Notificación recibida:");
		Alloy.Globals.Utils.Info(evt.payload);
		Ti.App.Notificacion = JSON.parse(evt.payload);
		Alloy.Globals.NotificacionID = Ti.App.Notificacion.ID;
		Alloy.Globals.Utils.Info("ID: " + Alloy.Globals.NotificacionID);
		
		//alert("Notification received: " + evt.payload);
		
		Alloy.Globals.Utils.Info("Ventana Abierta: " + Ti.App.Properties.getBool("VentanaAbierta"));
		
		Alloy.Globals.Utils.Info("ID: " + Alloy.Globals.NotificacionID);
		Alloy.Globals.Utils.Info("Aqui deberíamos abrir la comunicación");
		ActivarComunicacionID(Alloy.Globals.NotificacionID);
		
		// Ejemplo de Notificación
		// El ID de la comunicación está al final con el parámetro ID
		//{
		//	"android":
		//	{
		//		"title":"Publicación de Prueba",
		//		"sound":"default",
		//		"alert":"Publicación de Prueba",
		//		"vibrate":true,
		//		"badge":1
		//	},
		//	"ID":"36"
		//}
	}

	Alloy.Globals.CloudPush.addEventListener('trayClickLaunchedApp', function (evt) {
	    Ti.API.info('Tray Click Launched App (app was not running)');
	    ProcesarNotificacion(evt);
	});

	Alloy.Globals.CloudPush.addEventListener('trayClickFocusedApp', function (evt) {
	    Ti.API.info('Tray Click Focused App (app was already running)');
	    ProcesarNotificacion(evt);
	});
	// Process incoming push notifications
	Alloy.Globals.CloudPush.addEventListener('callback', function (evt) {
		ProcesarNotificacion(evt);
	});	
}



function subscribeToChannel() {
	Ti.API.info("Suscribir");
	// Subscribes the device to the 'news_alerts' channel
	// Specify the push type as either 'android' for Android or 'ios' for iOS
	Alloy.Globals.Cloud.PushNotifications.subscribeToken({
		device_token: Alloy.Globals.deviceToken,
		channel: 'appbando',
		type: Ti.Platform.name == 'android' ? 'android' : 'ios'
	}, 
		function (e) {
			Ti.API.info("Respuesta de Suscribe: " + JSON.stringify(e));
			if (e.success) {
				//alert('Subscribed');
			} 
			else 
			{
				//alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
			}
	});
}

function unsubscribeToChannel() 
{
	Ti.API.info("Desuscribir");
	// Unsubscribes the device from the 'test' channel
	Alloy.Globals.Cloud.PushNotifications.unsubscribeToken(
	{
		device_token: Alloy.Globals.deviceToken,
		channel: 'appbando'
	}, 
	function (e) 
	{
		Ti.API.info("Recibida la Respuesta");
		if (e.success) {
			//alert('Unsubscribed');
		} 
		else 
		{
			//alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
		}
	});
}

// IOS PUSH
if (OS_IOS) {
	Ti.API.info("Es un IOS - Iniciamos servicio de cloud push");
	
	
	if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
 
		// Wait for user settings to be registered before registering for push notifications
	    Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
	 
	        // Remove event listener once registered for push notifications
	        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
	 
	        Ti.Network.registerForPushNotifications({
	            success: deviceTokenSuccess,
	            error: deviceTokenError,
	            callback: receivePush
	        });
	    });
	 
	    // Register notification types to use
	    Ti.App.iOS.registerUserNotificationSettings({
		    types: [
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
	            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
	        ]
	    });
	}
	 
	// For iOS 7 and earlier
	else {
	    Ti.Network.registerForPushNotifications({
	        // Specifies which notifications to receive
	        types: [
	            Ti.Network.NOTIFICATION_TYPE_BADGE,
	            Ti.Network.NOTIFICATION_TYPE_ALERT,
	            Ti.Network.NOTIFICATION_TYPE_SOUND
	        ],
	        success: deviceTokenSuccess,
	        error: deviceTokenError,
	        callback: receivePush
	    });
	}
	// Process incoming push notifications
	function receivePush(e) {
	    //alert('Received push: ' + JSON.stringify(e));
	    Ti.API.info("------------------------------------------");
	    Ti.API.info("Push Recibido: " + JSON.stringify(e));
	    
	    
	    // {
	    	// "success":true,
	    	// "data":
	    		// {
	    			// "badge":1,
	    			// "aps":
	    				// {
	    					// "alert":"test 2",
	    					// "badge":1,
	    					// "sound":"default"
	    				// },
	    			// "title":"Push IOS 2",
	    			// "vibrate":true,
	    			// "sound":"default",
	    			// "alert":"test 2",
	    			// "ID":"232",
	    			// "icon":"appicon"
	    		// },
	    	// "code":0,
	    	// "source":{},
	    	// "type":"remote",
	    	// "inBackground":true
	    // }



	    Alloy.Globals.Utils.Info("Notificación recibida:");
		//Alloy.Globals.Utils.Info(e.data);
		Ti.App.Notificacion = e.data;
		Alloy.Globals.NotificacionID = Ti.App.Notificacion.ID;
		Alloy.Globals.Utils.Info("ID: " + Alloy.Globals.NotificacionID);
		
		//alert("Notification received: " + evt.payload);
		
		Alloy.Globals.Utils.Info("Ventana Abierta: " + Ti.App.Properties.getBool("VentanaAbierta"));
		
		Alloy.Globals.Utils.Info("ID: " + Alloy.Globals.NotificacionID);
		Alloy.Globals.Utils.Info("Aqui deberíamos abrir la comunicación");
		ActivarComunicacionID(Alloy.Globals.NotificacionID);

		Titanium.UI.iPhone.appBadge=0;
	}
	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
	    Alloy.Globals.deviceToken = e.deviceToken;
	    
	    Ti.API.info("DeviceTokenSuccess");
	    // Require the Cloud module
		subscribeToChannel();
		
	}
	function deviceTokenError(e) {
	    alert('No se pudo registrar el servicio de notificaciones push: ' + e.error);
	}
}
