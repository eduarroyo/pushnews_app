DataManager = function() {};

/**
 * DataManager
 * Clase de manejo de datos
 */

function Info(mensaje) {
    Ti.API.info(mensaje);
}

DataManager.prototype.getOpciones = function() 
{
	 return Alloy.Globals.Menu;
};

DataManager.prototype.getCategorias = function(onSuccess, onError) 
{
		var Datos = Alloy.Globals.Categorias;
		
	    if (Alloy.Globals.CategoriasUltimoTimestamp == 0)
	    {
	    	// tenemos que obtener las categorías de la web
	    	if (Titanium.Network.online) 
		    {
		        try
		        {
		            var client = Ti.Network.createHTTPClient({
		                // function called when the response data is available
		                onload : function(e) {
		                    Info("LOGIN ---- STATUS: " + this.status);
		                    Info("LOGIN ---- TEXT:   " + this.responseText);
		                    
		                    Info("LOGIN ---- Antes del parseado a JSON");
		                    //alert("Descarga de comprobación terminada");
		                    try
		                    {
		                        var json = JSON.parse(this.responseText);
		                        Info("LOGIN ---- json: " + json);
		                        if (json != null)
		                        {
		                            
		                            // json.Results
		                            //onSuccess(json);
		                            Datos = json;
		                           	onSuccess(Datos);
		                        }
		                        else
		                        {
		                            Info("LOGIN ---- No se pudo parsear el json");
		                            //onError("Problema de Comunicaciones #0001");
		                            onError(Datos);
		                        }
		                    }
		                    catch(ex)
		                    {
		                        Info("LOGIN ---- Error al descargar la actualización: " + ex.message);
		                        //onError("Problema de Comunicaciones #0002");
		                        //Alerta(L('Atencion'), L('API.ErrorExcepcion') + ex);
		                        //self.fireEvent('MostrarMensaje', {Mensaje: "Error al obtener el dato: " + ex, Pagado: Ti.App.Pagado});
		                        onError(Datos);
		                    }                       
		                     
		                },
		                // function called when an error occurs, including a timeout
		                onerror : function(e) {
		                    
		                    //Ti.API.debug("Error al obtener la página del servidor: " + e.error);
		                    Info("LOGIN ---- Error al obtener la página del servidor: " + e.error);
		                    //onError("Problema de Comunicaciones #0003: " + e.error);
		
		                    // no hacemos nada
		                    //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
		                    onError(Datos);
		                },
		                timeout : 30000  // in milliseconds
		            });
		
		            //client.validatesSecureCertificate = ValidateSecureCert;
		            client.open("POST", Alloy.Globals.APIURL_Categorias); 
		            // Get the data
		            var params = { 
		               subdominio: Alloy.Globals.Subdominio,
		               apikey: Alloy.Globals.APIKEY,
		               UID: Titanium.Platform.id
		            };
					
		            client.send(params);
		            
		        }
		        catch(e)
		        {
		            Info("LOGIN ---- Error durante la carga de los datos: " + e);
		            //onError("Problema de Comunicaciones #0004: " + e.message);
		            // no hacemos nada
		            //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
		            onError(Datos);
		        }
		    }
		    else
		    {
		        Info("LOGIN ---- No hay acceso a internet");
		        //onError("No se encontró acceso a internet");
		        onError(Datos);
		    }
	    }
	    else
	    {
	    	// devolvemos las categorías cacheadas
	    	onSuccess(Datos);
	    }		
};

DataManager.prototype.setComunicacion = function(ComunicacionID, onSuccess, onError) 
{
	// tenemos que obtener las categorías de la web
	if (Titanium.Network.online) 
    {
        try
        {
            var client = Ti.Network.createHTTPClient({
                // function called when the response data is available
                onload : function(e) {
                    Info("setComunicacion ---- STATUS: " + this.status);
                    Info("setComunicacion ---- TEXT:   " + this.responseText);
                    
                    Info("setComunicacion ---- Antes del parseado a JSON");
                    //alert("Descarga de comprobación terminada");
                    try
                    {
                        var json = JSON.parse(this.responseText);
                        Info("setComunicacion ---- json: " + json);
                        if (json != null)
                        {
                            
                            // json.Results
                            onSuccess(json);
                            //Datos = json;
                           	//onSuccess("OK");
                        }
                        else
                        {
                            Info("setComunicacion ---- No se pudo parsear el json");
                            //onError("Problema de Comunicaciones #0001");
                            onError(null);
                        }
                    }
                    catch(ex)
                    {
                        Info("setComunicacion ---- Error al descargar la actualización: " + ex.message);
                        //onError("Problema de Comunicaciones #0002");
                        //Alerta(L('Atencion'), L('API.ErrorExcepcion') + ex);
                        //self.fireEvent('MostrarMensaje', {Mensaje: "Error al obtener el dato: " + ex, Pagado: Ti.App.Pagado});
                        onError(null);
                    }                       
                     
                },
                // function called when an error occurs, including a timeout
                onerror : function(e) {
                    
                    //Ti.API.debug("Error al obtener la página del servidor: " + e.error);
                    Info("setComunicacion ---- Error al obtener la página del servidor: " + e.error);
                    //onError("Problema de Comunicaciones #0003: " + e.error);

                    // no hacemos nada
                    //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
                    onError(null);
                },
                timeout : 30000  // in milliseconds
            });

            //client.validatesSecureCertificate = ValidateSecureCert;
            client.open("POST", Alloy.Globals.APIURL_Comunicacion); 
            // Get the data
            var params = { 
            	subdominio: Alloy.Globals.Subdominio,
            	apikey: Alloy.Globals.APIKEY,
            	ComunicacionID: ComunicacionID,
            	UID: Titanium.Platform.id
            };
			
            client.send(params);
            
        }
        catch(e)
        {
            Info("setComunicacion ---- Error durante la carga de los datos: " + e);
            //onError("Problema de Comunicaciones #0004: " + e.message);
            // no hacemos nada
            //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
            onError(null);
        }
    }
    else
    {
        Info("setComunicacion ---- No hay acceso a internet");
        //onError("No se encontró acceso a internet");
        onError(null);
    }
};

DataManager.prototype.getComunicaciones = function(CategoriaID, onSuccess, onError) 
{
	Info("getComunicaciones ---- CategoriaID: " + CategoriaID);
		var Datos = Alloy.Globals.Comunicaciones;
		
	    if (Alloy.Globals.ComunicacionesUltimoTimestamp == 0)
	    {
	    	// tenemos que obtener las categorías de la web
	    	if (Titanium.Network.online) 
		    {
		        try
		        {
		            var client = Ti.Network.createHTTPClient({
		                // function called when the response data is available
		                onload : function(e) {
		                    Info("LOGIN ---- STATUS: " + this.status);
		                    Info("LOGIN ---- TEXT:   " + this.responseText);
		                    
		                    Info("LOGIN ---- Antes del parseado a JSON");
		                    //alert("Descarga de comprobación terminada");
		                    try
		                    {
		                        var json = JSON.parse(this.responseText);
		                        Info("LOGIN ---- json: " + json);
		                        if (json != null)
		                        {
		                            
		                            // json.Results
		                            //onSuccess(json);
		                            Datos = json;
		                           	onSuccess(Datos);
		                        }
		                        else
		                        {
		                            Info("LOGIN ---- No se pudo parsear el json");
		                            //onError("Problema de Comunicaciones #0001");
		                            onError(Datos);
		                        }
		                    }
		                    catch(ex)
		                    {
		                        Info("LOGIN ---- Error al descargar la actualización: " + ex.message);
		                        //onError("Problema de Comunicaciones #0002");
		                        //Alerta(L('Atencion'), L('API.ErrorExcepcion') + ex);
		                        //self.fireEvent('MostrarMensaje', {Mensaje: "Error al obtener el dato: " + ex, Pagado: Ti.App.Pagado});
		                        onError(Datos);
		                    }                       
		                     
		                },
		                // function called when an error occurs, including a timeout
		                onerror : function(e) {
		                    
		                    //Ti.API.debug("Error al obtener la página del servidor: " + e.error);
		                    Info("LOGIN ---- Error al obtener la página del servidor: " + e.error);
		                    //onError("Problema de Comunicaciones #0003: " + e.error);
		
		                    // no hacemos nada
		                    //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
		                    onError(Datos);
		                },
		                timeout : 30000  // in milliseconds
		            });
		
		            //client.validatesSecureCertificate = ValidateSecureCert;
		            client.open("POST", Alloy.Globals.APIURL_Comunicaciones); 
		            // Get the data
		            var params = { 
		               subdominio: Alloy.Globals.Subdominio,
		               apikey: Alloy.Globals.APIKEY,
		               UID: Titanium.Platform.id
		            };
					
					if (CategoriaID != 0)
					{
						params.categoriaid = CategoriaID;
					}
					
					Info("getComunicaciones ---- Params: " + params);
					
		            client.send(params);
		            
		        }
		        catch(e)
		        {
		            Info("LOGIN ---- Error durante la carga de los datos: " + e);
		            //onError("Problema de Comunicaciones #0004: " + e.message);
		            // no hacemos nada
		            //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
		            onError(Datos);
		        }
		    }
		    else
		    {
		        Info("LOGIN ---- No hay acceso a internet");
		        //onError("No se encontró acceso a internet");
		        onError(Datos);
		    }
	    }
	    else
	    {
	    	// devolvemos las categorías cacheadas
	    	onSuccess(Datos);
	    }		
};

DataManager.prototype.getParametros = function()
{
	return Alloy.Globals.Parametros;
};

DataManager.prototype.getLocalizaciones = function(onSuccess, onError) 
{
	var Datos = Alloy.Globals.Localizaciones;
	
    if (Alloy.Globals.LocalizacionesUltimoTimestamp == 0)
    {
    	// tenemos que obtener las categorías de la web
    	if (Titanium.Network.online) 
	    {
	        try
	        {
	            var client = Ti.Network.createHTTPClient({
	                // function called when the response data is available
	                onload : function(e) {
	                    Info("getLocalizaciones ---- STATUS: " + this.status);
	                    Info("getLocalizaciones ---- TEXT:   " + this.responseText);
	                    
	                    Info("getLocalizaciones ---- Antes del parseado a JSON");
	                    //alert("Descarga de comprobación terminada");
	                    try
	                    {
	                        var json = JSON.parse(this.responseText);
	                        Info("getLocalizaciones ---- json: " + json);
	                        if (json != null)
	                        {
	                            
	                            // json.Results
	                            //onSuccess(json);
	                            Datos = json;
	                           	onSuccess(Datos);
	                        }
	                        else
	                        {
	                            Info("getLocalizaciones ---- No se pudo parsear el json");
	                            //onError("Problema de Comunicaciones #0001");
	                            onError(Datos);
	                        }
	                    }
	                    catch(ex)
	                    {
	                        Info("getLocalizaciones ---- Error al descargar la actualización: " + ex.message);
	                        //onError("Problema de Comunicaciones #0002");
	                        //Alerta(L('Atencion'), L('API.ErrorExcepcion') + ex);
	                        //self.fireEvent('MostrarMensaje', {Mensaje: "Error al obtener el dato: " + ex, Pagado: Ti.App.Pagado});
	                        onError(Datos);
	                    }                       
	                     
	                },
	                // function called when an error occurs, including a timeout
	                onerror : function(e) {
	                    
	                    //Ti.API.debug("Error al obtener la página del servidor: " + e.error);
	                    Info("getLocalizaciones ---- Error al obtener la página del servidor: " + e.error);
	                    //onError("Problema de Comunicaciones #0003: " + e.error);
	
	                    // no hacemos nada
	                    //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
	                    onError(Datos);
	                },
	                timeout : 30000  // in milliseconds
	            });
	
	            //client.validatesSecureCertificate = ValidateSecureCert;
	            client.open("POST", Alloy.Globals.APIURL_Localizaciones); 
	            // Get the data
	            var params = { 
	               subdominio: Alloy.Globals.Subdominio,
	               apikey: Alloy.Globals.APIKEY,
	               UID: Titanium.Platform.id
	            };
				
	            client.send(params);
	            
	        }
	        catch(e)
	        {
	            Info("getLocalizaciones ---- Error durante la carga de los datos: " + e);
	            //onError("Problema de Comunicaciones #0004: " + e.message);
	            // no hacemos nada
	            //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
	            onError(Datos);
	        }
	    }
	    else
	    {
	        Info("getLocalizaciones ---- No hay acceso a internet");
	        //onError("No se encontró acceso a internet");
	        onError(Datos);
	    }
    }
    else
    {
    	// devolvemos las categorías cacheadas
    	onSuccess(Datos);
    }		
};

DataManager.prototype.getTelefonos = function(onSuccess, onError) 
{
	var Datos = Alloy.Globals.Telefonos;
	
    if (Alloy.Globals.TelefonosUltimoTimestamp == 0)
    {
    	// tenemos que obtener las categorías de la web
    	if (Titanium.Network.online) 
	    {
	        try
	        {
	            var client = Ti.Network.createHTTPClient({
	                // function called when the response data is available
	                onload : function(e) {
	                    Info("getTelefonos ---- STATUS: " + this.status);
	                    Info("getTelefonos ---- TEXT:   " + this.responseText);
	                    
	                    Info("getTelefonos ---- Antes del parseado a JSON");
	                    //alert("Descarga de comprobación terminada");
	                    try
	                    {
	                        var json = JSON.parse(this.responseText);
	                        Info("getTelefonos ---- json: " + json);
	                        if (json != null)
	                        {
	                            
	                            // json.Results
	                            //onSuccess(json);
	                            Datos = json;
	                           	onSuccess(Datos);
	                        }
	                        else
	                        {
	                            Info("getTelefonos ---- No se pudo parsear el json");
	                            //onError("Problema de Comunicaciones #0001");
	                            onError(Datos);
	                        }
	                    }
	                    catch(ex)
	                    {
	                        Info("getTelefonos ---- Error al descargar la actualización: " + ex.message);
	                        //onError("Problema de Comunicaciones #0002");
	                        //Alerta(L('Atencion'), L('API.ErrorExcepcion') + ex);
	                        //self.fireEvent('MostrarMensaje', {Mensaje: "Error al obtener el dato: " + ex, Pagado: Ti.App.Pagado});
	                        onError(Datos);
	                    }                       
	                     
	                },
	                // function called when an error occurs, including a timeout
	                onerror : function(e) {
	                    
	                    //Ti.API.debug("Error al obtener la página del servidor: " + e.error);
	                    Info("getTelefonos ---- Error al obtener la página del servidor: " + e.error);
	                    //onError("Problema de Comunicaciones #0003: " + e.error);
	
	                    // no hacemos nada
	                    //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
	                    onError(Datos);
	                },
	                timeout : 30000  // in milliseconds
	            });
	
	            //client.validatesSecureCertificate = ValidateSecureCert;
	            client.open("POST", Alloy.Globals.APIURL_Telefonos); 
	            // Get the data
	            var params = { 
	               subdominio: Alloy.Globals.Subdominio,
	               apikey: Alloy.Globals.APIKEY,
	               UID: Titanium.Platform.id
	            };
				
	            client.send(params);
	            
	        }
	        catch(e)
	        {
	            Info("getTelefonos ---- Error durante la carga de los datos: " + e);
	            //onError("Problema de Comunicaciones #0004: " + e.message);
	            // no hacemos nada
	            //self.fireEvent('MostrarMensaje', {Mensaje: "Error al conectar con el servidor: " + e.error, Pagado: Ti.App.Pagado});
	            onError(Datos);
	        }
	    }
	    else
	    {
	        Info("getTelefonos ---- No hay acceso a internet");
	        //onError("No se encontró acceso a internet");
	        onError(Datos);
	    }
    }
    else
    {
    	// devolvemos las categorías cacheadas
    	onSuccess(Datos);
    }		
};

module.exports = DataManager;