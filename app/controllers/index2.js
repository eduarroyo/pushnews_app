// var Cloud = require('ti.cloud');

$.vAI.toggle(false);
$.lblTitulo.setText(Alloy.Globals.Negocio);

// mostramos el fondo
$.imgFondo.setWidth(Alloy.Globals.FondoAncho);
$.imgFondo.setHeight(Alloy.Globals.FondoAlto);
$.imgFondo.setTop(Alloy.Globals.FondoTop);
$.imgFondo.setLeft(Alloy.Globals.FondoLeft);

// 
// 
// function ObtenerDatos() {
// 	
	// // // show AI with default message
// $.vAI.toggle(true, "Cargando Categorías");
// // 
// // // show AI with custom message
// // $.vAI.toggle(true, 'Loading...');
// // 
// // // show AI, auto hide after 5 seconds
// // $.vAI.toggle(true, null, 5000);
// // 
// // // hide AI
// // $.vAI.toggle(false);
// 
// 
    // Cloud.Objects.query(
		// {
	    	// classname: 'Categorias',
	    	// order: "Orden"
		// }, 
		// function (e) 
		// {
	    	// if (e.success) 
	    	// {
		        // //alert('Success:\nCount: ' + e.Categorias.length);
	            // var data = [];
		        // for (var i = 0; i < e.Categorias.length; i++) {
		            // var Categoria = e.Categorias[i];
		            // // alert('id: ' + Categoria.id + '\n' +
		                // // 'Categoria: ' + Categoria.Categoria + '\n' +
		                // // 'Icono: ' + Categoria.Icono + '\n' +
		                // // 'Activo: ' + Categoria.Activo + '\n' +
		                // // 'created_at: ' + Categoria.created_at);
		        	// data.push(Alloy.createController('row', Categoria).getView());
		        // }
		        // $.table.setData(data);
		    // } 
		    // else 
		    // {
		        // alert('Error:\n' +
		            // ((e.error && e.message) || JSON.stringify(e)));
		    // }
			// $.vAI.toggle(false);
		// }
	// );
// }
// 
// function handleClick(e) {
//    
// }

// var data = [];
// for (var i = 0; i < 15; i++) {
    // data.push(Alloy.createController('row').getView());
// }
// $.table.setData(data);


function handleClick (id) {
    alert("Menu " + id + "clicked!");
}

// ajustes de margenes y tamaño de botones
var margenes = 0;
var anchoBoton = 0;
var margenesPorcentaje = 5;
var botonesPorLinea = 2;

margenes = parseInt(Alloy.Globals.device.width * margenesPorcentaje / 100); // un 10% de cada lado 
anchoBoton = parseInt((Alloy.Globals.device.width - (margenes * (botonesPorLinea+1))) / botonesPorLinea);


$.prettyMenu.init(
    [
        { id: "menu:profile", icon: "fa-eye", title: "Mon profil", onClick: handleClick },
        { id: "menu:question", icon: "fa-question", title: "Questions", onClick: handleClick },
        { id: "menu:help", icon: "fa-help", title: "Aide", onClick: handleClick },
        { id: "menu:logout", icon: "fa-flag-o", title: "Deconnexion", onClick: handleClick },
        { id: "menu:profile2", icon: "fa-eye", title: "Mon profil", onClick: handleClick }     
    ], {
        margins: {
        	horizontal: margenes,
        	vertical: margenes
        },
        perRow: botonesPorLinea,
        width: anchoBoton,
        border: {
        	radius: 5,
        	color: 'green',
        	width: 1
        },
        backgroundColor: "white"
    }
);

// ObtenerDatos();

$.window.open();

// Ti.API.info(Alloy.Globals.Negocio);

