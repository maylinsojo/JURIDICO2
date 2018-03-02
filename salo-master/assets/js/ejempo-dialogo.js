//Armo los parametros para el dialogo
var objeto    = $('#contacto .caption:nth-child(4) > div:nth-child(2) > div:nth-child(2)');
var titulo    = 'Error';
var alto      = 200;
var ancho     = 300;
var contenido = 'Prueba';

//Llamamos la función que arma el dialogo 
$.fn.dialogo(objeto,titulo,alto,ancho,contenido);

/**********************************************/
/* Función que muestra la ventana del dialogo */
/**********************************************/
$.fn.dialogo = function(objeto,titulo,alto,ancho,contenido){
	
	//Armo el dialogo
	objeto.dialog({
				   title     : titulo,
				   resizable : true,
				   height    : alto,
				   width     : ancho,
				   modal     : true,
				   buttons   : {
							    "Ok": function(){}
				               },
				   show : {
						   effect   : "fade",
						   duration : 300
						  },
				   hide : {
						   effect   : "fade",
						   duration : 300
						  }
			    });//Fin del dialog
		 
	$('.ui-dialog-content').append(contenido);
	
};//Fin de la función
/*******************/