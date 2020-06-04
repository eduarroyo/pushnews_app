var args = arguments[0] || {};


var Cloud = Alloy.Globals.CoreApp;

var region = {
    latitude: Alloy.Globals.Parametros.Latitud,
    longitude: Alloy.Globals.Parametros.Longitud,
    latitudeDelta:0.03,
    longitudeDelta:0.03
};
// 
// $.mapview.setRegion(region);


function Recargar()
{
	Alloy.Globals.loading.show('Cargando Localizaciones...', false);
	
	$.mapview.removeAllAnnotations();
	
	var coreApp = new Cloud();
    coreApp.getLocalizaciones(onSuccess, onError);

    function onSuccess(e) {
        Titanium.API.info("getLocalizaciones:onSuccess");
		var data = [];
		var points = [];

		Alloy.Globals.Utils.Info("Datos: " + e.length);
		
		for (var i = 0; i < e.length; i++) {
		    var Opcion = e[i];
		    
		    
  // {
    // "LocalizacionID": 2,
    // "Longitud": -6.274726,
    // "Latitud": 39.437205,
    // "Descripcion": "Ayuntamiento",
    // "Fecha": "2016-03-12T23:09:18.327",
    // "Activo": true
  // },		    
  
		    var cli = Alloy.Globals.Map.createAnnotation({
		    	Dato: Opcion,
			    latitude: Opcion.Latitud,
			    longitude: Opcion.Longitud,
			    pincolor: Alloy.Globals.Map.ANNOTATION_RED,
			    // Even though we are creating a button, it does not respond to Button events or animates.
			    // Use the Map View's click event and monitor the clicksource property for 'leftPane'.
			    //leftView: Ti.UI.createButton({title: 'Detail'}),
			    // For eventing, use the Map View's click event
			    // and monitor the clicksource property for 'rightPane'.  
			    title: Opcion.Descripcion,
			    subtitle: ''
			});
			
			points.push({
                latitude : Opcion.Latitud,
                longitude : Opcion.Longitud
            });
		
			data.push(cli);
		    
		}
		
		Ti.API.info("Puntos: " + JSON.stringify(points));
		
		var region2 = Alloy.Globals.Utils.findZoomRegion(points);
		
		
		if (points.length > 1)
		{
			region2 = Alloy.Globals.Utils.findZoomRegion(points);
		}
		else if (points.length == 1)
		{
			region2 = {
			    latitude: points[0].latitude,
			    longitude: points[0].longitude,
			    latitudeDelta:0.03,
			    longitudeDelta:0.03
			};
		}
		else
		{
			region2 = region;
		}
		
		
		Ti.API.info("Region Ajustada: " + JSON.stringify(region2));

        $.mapview.setRegion(region2);
		$.mapview.addAnnotations(data);
		
        Alloy.Globals.loading.hide();
    };
    
    function onError(e) {
        // Handle your errors in here
        Titanium.API.info("getLocalizaciones:onError");
        Titanium.API.info(e);
        // viene un string con el error
        alert("Error: No se pudieron obtener las localizaciones, por favor, inténtelo de nuevo");
        Alloy.Globals.loading.hide();
    };

	
}

function pulso(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.latitude);
}

exports.Recargar = Recargar;

