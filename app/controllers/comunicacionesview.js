var args = arguments[0] || {};

var Cloud = Alloy.Globals.CoreApp;

function Recargar()
{
	$.tableLista.hide();
	var Categoria = Alloy.Globals.Categoria;
	
	$.viewCabecera.setTitulo(Categoria.Nombre);
	Titanium.API.info("Categoria: " + Categoria.Nombre);
	
	Alloy.Globals.loading.show('Cargando ' + Categoria.Nombre + '...', false);
	
	var coreApp = new Cloud();
    coreApp.getComunicaciones(Categoria.CategoriaID, onSuccess, onError);

    function onSuccess(e) {
        Titanium.API.info("getComunicaciones:onSuccess");
		var data = [];

		Alloy.Globals.Utils.Info("Comunicaciones: " + e.length);
				
		for (var i = 0; i < e.length; i++) {
		    var Opcion = e[i];
		    var item = { Dato: Opcion };
		    
		    data.push(Alloy.createController('rowComunicacion', item).getView());
			//data.push(item);
		}
		
        $.tableLista.setData(data);
        $.tableLista.show();
        Alloy.Globals.loading.hide();
    };
    
    function onError(e) {
        // Handle your errors in here
        Titanium.API.info("getComunicaciones:onError");
        Titanium.API.info(e);
        // viene un string con el error
        alert("Error: No se pudieron obtener las comunicaciones, por favor, inténtelo de nuevo");
        Alloy.Globals.loading.hide();
    };

	
}


function Volver()
{
	args.VolverCallback;
}

exports.Volver = Volver;
exports.Recargar = Recargar;
