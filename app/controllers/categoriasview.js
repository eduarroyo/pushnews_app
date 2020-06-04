var args = arguments[0] || {};

var Cloud = Alloy.Globals.CoreApp;

RecargarCategorias();

function RecargarCategorias()
{
	Alloy.Globals.loading.show('Cargando Categorías...', false);
	
	var coreApp = new Cloud();
    coreApp.getCategorias(onSuccess, onError);

    function onSuccess(e) {
        Titanium.API.info("getCategorias:onSuccess");
		var data = [];

		Alloy.Globals.Utils.Info("Datos: " + e.length);
		
		var itemTodas = { CategoriaID: 0, Nombre: 'Todas las Comunicaciones' };
		
		var Todas = { id: 0, icon: "fa-bookmark", title: "Todas las Comunicaciones", Dato: itemTodas };
		
	    data.push(Alloy.createController('rowCategoria', Todas).getView());
		
		for (var i = 0; i < e.length; i++) {
		    var Opcion = e[i];
		    var item = { id: Opcion.CategoriaID, icon: Opcion.Icono, title: Opcion.Nombre, Dato: Opcion };
		    
		    data.push(Alloy.createController('rowCategoria', item).getView());
			//data.push(item);
		}
		
        $.tableLista.setData(data);
        Alloy.Globals.loading.hide();
    };
    
    function onError(e) {
        // Handle your errors in here
        Titanium.API.info("login:onError");
        Titanium.API.info(e);
        // viene un string con el error
        alert("Error: No se pudieron obtener las categorías, por favor, inténtelo de nuevo");
        Alloy.Globals.loading.hide();
    };

	
}

exports.Recargar = RecargarCategorias;