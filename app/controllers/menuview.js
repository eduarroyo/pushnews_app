var args = arguments[0] || {};

var coreApp = new Alloy.Globals.CoreApp();

//$.lblPoblacion.setText(Alloy.Globals.Negocio);

var data = [];
var datos = coreApp.getOpciones();

Alloy.Globals.Utils.Info("Datos: " + datos.length);

for (var i = 0; i < datos.length; i++) {
    var Opcion = datos[i];
    // alert('id: ' + Categoria.id + '\n' +
        // 'Categoria: ' + Categoria.Categoria + '\n' +
        // 'Icono: ' + Categoria.Icono + '\n' +
        // 'Activo: ' + Categoria.Activo + '\n' +
        // 'created_at: ' + Categoria.created_at);
	data.push(Alloy.createController('rowMenu', Opcion).getView());
}
$.menuTable.setData(data);