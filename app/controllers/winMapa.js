var args = arguments[0] || {};

var region = {
    latitude: args.Latitud,
    longitude: args.Longitud,
    latitudeDelta:0.03,
    longitudeDelta:0.03
};

$.mapview.setRegion(region);

function close() {
	Ti.API.info("Llamando a Close");
	$.index.close();	
}

function open() {
	$.index.open();
}


$.viewCabecera.init({
    Titulo: args.Cabecera,
    IconoIzquierda: "fa-arrow-circle-left",
    IconoIzquierdaCallback: args.Callback
});

var cli = Alloy.Globals.Map.createAnnotation({
    latitude: args.Latitud,
    longitude: args.Longitud,
    pincolor: Alloy.Globals.Map.ANNOTATION_RED,
    // Even though we are creating a button, it does not respond to Button events or animates.
    // Use the Map View's click event and monitor the clicksource property for 'leftPane'.
    //leftView: Ti.UI.createButton({title: 'Detail'}),
    // For eventing, use the Map View's click event
    // and monitor the clicksource property for 'rightPane'.  
    title: args.Titulo,
    subtitle: args.Subtitulo
});

$.mapview.addAnnotation(cli);


function pulso(evt) {
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.latitude);
}

exports.close = close;
exports.open = open;