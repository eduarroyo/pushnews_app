var args = arguments[0] || {};


var Cloud = Alloy.Globals.CoreApp;


//Recargar();

function Recargar()
{
	Alloy.Globals.loading.show('Cargando Teléfonos...', false);
	
	var coreApp = new Cloud();
    coreApp.getTelefonos(onSuccess, onError);

    function onSuccess(e) {
        Titanium.API.info("getTelefonos:onSuccess");
		var data = [];

		Alloy.Globals.Utils.Info("Datos: " + e.length);
				
		for (var i = 0; i < e.length; i++) {
		    var Opcion = e[i];
		    
		    data.push(Alloy.createController('rowTelefono', Opcion).getView());
		}
		
        $.telTable.setData(data);
        Alloy.Globals.loading.hide();
    };
    
    function onError(e) {
        // Handle your errors in here
        Titanium.API.info("login:onError");
        Titanium.API.info(e);
        // viene un string con el error
        alert("Error: No se pudieron obtener los teléfonos, por favor, inténtelo de nuevo");
        Alloy.Globals.loading.hide();
    };

	
}

function rowClick(e)
{
	var Objeto = e.row.Opcion;
	Alloy.Globals.Utils.AbrirTelefono(Objeto.Numero);
}


exports.Recargar = Recargar;





