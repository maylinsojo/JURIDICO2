//Variables globales
var xhr           = null;
var alto_pantalla;
var alto_menu;

/*
	Evento document ready
*/
$(document).ready(function(){
   
   //Evaluamos si existen los sessionStorages
   if(sessionStorage.getItem("ID_USUARIO") == null || typeof sessionStorage.getItem("ID_USUARIO") == 'undefined'){
	   
	   //Redireccionamos
	   window.location.href = "salo";
	   
   }else{//Fin del if
   
	   //Obtenemos el alto de la pantalla y del menú
	       alto_pantalla  = $(window).height();
	       alto_menu      = $('#menu_principal').outerHeight();
	   var alto_contenido = alto_pantalla - alto_menu - 10;
	
	   //Seteamos el alto de la capa #wrapper_login
	   $('.contenido').height(alto_contenido);
	   
	   //Mostramos el seudonimo
	   $('#mi_cuenta')
	   .html(sessionStorage.getItem("SEUDONIMO")
	         +`<img src="assets/modules/salo/images/usuarios/`+sessionStorage.getItem("AVATAR_USUARIO")+`" height="100%" width="100%" class="img-fluid avatar">`);
	   
	   //Buscamos los menus asociados al usuario
	   $.fn.menu_asociado();
	   
	   $.fn.eventos();
	   
   }//Fin del if
   
});/*Fin del document ready*/
/***************************/

/*
	Función donde se declaran los eventos
*/
$.fn.eventos = function(){
	
	//Evento click sobre #logout
	$('#logout').unbind('click');
	$('#logout').click(function(){
		
		$.fn.logout();
		
	});//Fin del evento click
	
	//Evento click sobre #mi_cuenta
	$('#mi_cuenta').unbind('click');
	$('#mi_cuenta').click(function(){
		
		//Seteamos la ruta al iframe
		$('.contenido iframe').attr('src','cuenta_usuario');
		
	});//Fin del evento click
	
	//Evento click sobre .items_menu
	$('.items_menu .item').unbind('click');
	$('.items_menu .item').click(function(){
		
		//Obtenemos la url
		var url = $(this).attr('url');
		
		//Seteamos la ruta al iframe
		$('.contenido iframe').attr('src',url);
		
		$.fn.eventos();
		
	});//Fin del evento click
	
};//Fin de la función eventos
/***************************/

/*
	Función para desloguear al usuario
*/
$.fn.logout = function(){
	
	//Limpiamos la sessionStorages
	sessionStorage.clear();
	
	//Redireccionamos
	window.location.href = "salo";
	
};//Fin de la función $.fn.logout
/*******************************/

/*
	Función que lista los menus asociados del usuario
*/
$.fn.menu_asociado = function(){
	
	$.ajax({
				
		url: 'salo/c_index/menu_usuario',
		type: 'POST',
		dataType: 'json',	
		data:{
			  id_usuario : sessionStorage.getItem("ID_USUARIO")
			 },
		beforeSend: function(objeto){

			//Mostramos el icono de carga
			$('.items_menu')
			.html(`<li class="nav-item cargando">
			       	<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
				   </li>`);
			
		},
		error: function(objeto, quepaso, otroobj){

			//Ocultamos el icono de carga
			$('.items_menu')
			.html('<div class="alert alert-danger" role="alert"><strong>Ocurrio un error!</strong>, intenta de nuevo recargando la página.</div>');
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
				
				//Evauamos si posee menus asociados
				if($(data).length > 0){
					
					var isDropdown = false;
					var id_padre   = 0;
					var menu       = '';
					
					//Recorremos los menus
					$(data).each(function(indice, elemento){
						
						//Evaluamos el id padre
						if(parseInt(elemento.id_padre) == 0){
							
							//Evaluamos si posee hijos
							if(parseInt(elemento.numHijos) > 0){
								
								menu += `<li class="nav-item dropdown">
										   <a class="nav-link dropdown-toggle" id="`+elemento.id+`" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">`+elemento.descripcion+`</a>
										   <div class="dropdown-menu">`;
										   
								//Recorremos los submenus
								$(elemento.submenus).each(function(index, elemento){
                                    
									menu += `<a id="`+elemento.id+`" class="dropdown-item item" url="`+elemento.url+`">`+elemento.descripcion+`</a>`;
									
                                });//Fin del each
								
								menu += `  </div>
								         </li>`;
								
							}else{
								
								menu += `<li class="nav-item">
											<a id="`+elemento.id+`" class="nav-link item" url="`+elemento.url+`">`+elemento.descripcion+`</a>
										 </li>`;
								
							}//Fin del if parseInt(elemento.numHijos)
							
						}//Fin del if parseInt(elemento.id_padre)
						
					})//Fin del each
					
					//Mostramos los menus
					$('.items_menu').html(menu);
					
				}else{
					
					//Ocultamos el icono de carga
					$('.items_menu')
					.html('<div class="alert alert-danger" role="alert"><strong>No posees menus asociados!</strong></div>');
					
				}//Fin del if
			
			}else{
				
				//Ocultamos el icono de carga
				$('.items_menu')
				.html('<div class="alert alert-danger" role="alert"><strong>No tiene menus asociados!</strong></div>');
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.menu_asociado
/**************************************/