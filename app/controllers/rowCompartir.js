// Arguments passed into this controller can be accessed off of the `$.args` object directly or:
var args = $.args;

var Comunicacion = args.Comunicacion;

if (OS_ANDROID)
{
	$.lblCompartir.addEventListener('click', function() {
		//alert("Comunicacion: " + Comunicacion.Titulo);
		
		var activity = Ti.Android.currentActivity;
		var intent = Ti.Android.createIntent({
	        action: Ti.Android.ACTION_SEND,
	        type: 'text/plain'
	    });
		
		// twitter --> Extra_Text
		
		// mail: asunto --> extra subject --- texto --> extra_text
		
		var url = Alloy.Globals.APIURL_Documentos + Comunicacion.ComunicacionID;
		
		intent.putExtra(Ti.Android.EXTRA_TEXT, url);
		intent.putExtra(Ti.Android.EXTRA_SUBJECT, Comunicacion.Titulo);
		activity.startActivity(Ti.Android.createIntentChooser(intent,'Share'));  
	
	});	
}
else
{
	$.lblFacebook.addEventListener('click', function() {
		alert("Compartir Facebook");
	});
	
	$.lblTwitter.addEventListener('click', function() {
		alert("Compartir Twitter");
	});
	
	$.lblEmail.addEventListener('click', function() {
		alert("Compartir EMail");
	});
}
