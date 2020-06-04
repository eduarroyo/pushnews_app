/**
 * FavoritesManager
 * Utility class for managing application favorites
 */
var AppUtils = {

	// centra y zoom de un grupo de annotations de maps
	findZoomRegion: function(points) {
	    var nbPtToShow = points.length-1;
        var tmpDeltatLat = 0, tmpDeltatLong = 0, maxDeltatLat = 0, maxDeltatLong = 0, centerLat = 0, centerLong = 0;
 
        for(var i = 0; i <= Math.floor(points.length / 2); i++) {
            for(var j = nbPtToShow; j >= Math.floor(points.length / 2); j--) {
                if(j != i) {
                    tmpDeltatLat = Math.abs(Math.abs(points[i].latitude) - Math.abs(points[j].latitude));
                    if(tmpDeltatLat > maxDeltatLat) {
                        maxDeltatLat = tmpDeltatLat;
                        centerLat = Math.min(points[i].latitude, points[j].latitude) + maxDeltatLat / 2;
                    }
                    tmpDeltatLong = Math.abs(Math.abs(points[i].longitude) - Math.abs(points[j].longitude));
                    if(tmpDeltatLong > maxDeltatLong) {
                        maxDeltatLong = tmpDeltatLong;
                        centerLong = Math.min(points[i].longitude, points[j].longitude) + maxDeltatLong / 2;
                    }
                }
            }
        }
        
        maxDeltatLat = maxDeltatLat + maxDeltatLat * 10 / 100;
        maxDeltatLong = maxDeltatLong + maxDeltatLong * 10 / 100;
        
        var region = {
            latitude : centerLat,
            longitude : centerLong,
            latitudeDelta : maxDeltatLat + 0.001,
            longitudeDelta : maxDeltatLong + 0.001
        };
        return region;
	},
	MesTexto: function(mes) {
		switch(mes)
		{
			case 1:
				return "Ene";
				break;
			case 2:
				return "Feb";
				break;
			case 3:
				return "Mar";
				break;
			case 4:
				return "Abr";
				break;
			case 5:
				return "May";
				break;
			case 6:
				return "Jun";
				break;
			case 7:
				return "Jul";
				break;
			case 8:
				return "Ago";
				break;
			case 9:
				return "Sep";
				break;
			case 10:
				return "Oct";
				break;
			case 11:
				return "Nov";
				break;
			case 12:
				return "Dic";
				break;
		}
	},
	cortar: function(str, n)
	{
		if (str.length > n)
		{
			str = AppUtils.left(str, n) + "...";
		}
		return str;
	},
	left: function(str, n)
	{
		if (n <= 0)
		    return "";
		else if (n > String(str).length)
		    return str;
		else
		    return String(str).substring(0,n);	
	},
	// Devuelve el alto calculado para un ancho fijo y los datos de alto y ancho de la imagen
	CalcularAltoConAnchoFijo: function(OriginalAncho, OriginalAlto, AnchoFijo)
	{
	    var Proporcion = AnchoFijo * 100 / OriginalAncho;
	    var NuevoAlto = OriginalAlto * Proporcion / 100;
	
	    return {width: AnchoFijo, height: NuevoAlto};
	},
	// Devuelve el ancho calculado para un alto fijo y los datos de alto y ancho de la imagen
	CalcularAltoConAltoFijo: function(OriginalAncho, OriginalAlto, AltoFijo)
	{
	    var Proporcion = AltoFijo * 100 / OriginalAlto;
	    var Nuevo = OriginalAncho * Proporcion / 100;
	
	    return {width: Nuevo, height: AltoFijo};
	},
	Info: function(mensaje) {
		Ti.API.info(mensaje);
	},
	AbrirTelefono: function(telefono)
	{
		Ti.Platform.openURL("tel:" + telefono);
	},
	AbrirURL: function(url)
	{
		Ti.Platform.openURL(url);
	},
	AbrirURLSinHTTP: function(url)
	{
	    Ti.Platform.openURL(url);
	},
	VerificaURL: function(url)
	{
		if ((!url.startsWith('http')) || (!url.startsWith('https')))
		{
			url = "http://" + url;
		}
		
		return url;
	},
	Alerta: function(Titulo, Mensaje)
	{
		var alertDialog = Titanium.UI.createAlertDialog({
		    title: Titulo,
		    message: Mensaje,
		    buttonNames: ['Aceptar']
		});	
		alertDialog.show();
	},
	replaceAll: function( text, busca, reemplaza )
	{
		while (text.toString().indexOf(busca) != -1)
			text = text.toString().replace(busca,reemplaza);
		return text;
	},
	EnviarEmail: function(Texto, Asunto, Destinatario)
	{
	    
	    var emailDialog = Ti.UI.createEmailDialog({
	        html: true
	    });
	    emailDialog.subject = Asunto;
	    emailDialog.toRecipients = [Destinatario];
	    // Info("Texto:");
	    // Info(texto);
	    emailDialog.messageBody = Texto;
	    emailDialog.open();
	},
	isoDate: function(value) {
	  if (typeof value === 'string') {
	    var a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(?:([\+-])(\d{2})\:(\d{2}))?Z?$/.exec(value);
	      if (a) {
	        var utcMilliseconds = Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]);
	        return new Date(utcMilliseconds);
	      }
	  }
	  return value;
	}

};
module.exports = AppUtils;