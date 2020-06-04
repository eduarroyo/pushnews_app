function init(config) {
	// debe venir:
	// config.Titulo
	// config.IconoDerecha
	// config.IconoIzquierda
	
	if (config.Titulo !== undefined) {
		$.lblTitulo.setText(config.Titulo);
	}
	// if (config.SubTitulo !== undefined) {
		// $.lblSubtitulo.setText(config.SubTitulo);
	// }
	
	if (config.IconoIzquierda !== undefined) {
		$.addClass($.lblOpcionIzquierda, "icono " + config.IconoIzquierda);
		$.lblOpcionIzquierda.addEventListener("click", config.IconoIzquierdaCallback);
	}
	
	if (config.IconoDerecha !== undefined) {
		$.addClass($.lblOpcionDerecha, "icono " + config.IconoDerecha);	
		$.lblOpcionDerecha.addEventListener("click", config.IconoDerechaCallback);
	}
	
	
	// Cabecera_Color_Letra: Alloy.Globals.Cabecera_Color_Letra,
	// Cabecera_Color_Fondo: Alloy.Globals.Cabecera_Color_Fondo,
	// Cabecera_Color_Icono: Alloy.Globals.Cabecera_Color_Icono
	
	if (config.Cabecera_Color_Fondo !== undefined) {
		$.viewCabecera.setBackgroundGradient({
	        type: 'linear',
	        colors: [ config.Cabecera_Color_Fondo, config.Cabecera_Color_Fondo ],
	        backfillStart: true
		});
	}
	
	if (config.Cabecera_Color_Icono !== undefined) {
		$.lblOpcionDerecha.setColor(config.Cabecera_Color_Icono);
		$.lblOpcionIzquierda.setColor(config.Cabecera_Color_Icono);
	}
		
	if (config.Cabecera_Color_Letra !== undefined) {
		$.lblTitulo.setColor(config.Cabecera_Color_Letra);
	}
}

function setTitulo(Titulo) {
	$.lblTitulo.setText(Titulo);
}

exports.init = init;
exports.setTitulo = setTitulo;
