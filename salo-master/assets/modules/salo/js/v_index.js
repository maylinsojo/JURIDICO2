//Variables globales
var xhr           = null;
var alto_pantalla;

/*
	Evento document ready
*/
$(document).ready(function(){
   
   //Obtenemos el alto de la pantalla
   alto_pantalla = $(window).height();
   
   //Seteamos el alto de la capa #wrapper_login
   $('#wrapper_login').height(alto_pantalla);
   
   $.fn.eventos();
   
});/*Fin del document ready*/
/***************************/

/*
	Función donde se declaran los eventos
*/
$.fn.eventos = function(){
	
	//Evento keyup sobre campo #correo
	$('#correo').unbind('keypress');
	$('#correo').keypress(function(){
		
		//Obtemos el valor
		var valor = $(this).val().trim();
		
		$(this).val(valor);
		
		$.fn.eventos();
		
	});//Fin del evento keypress
	
	//Evento click sobre el btn #ingresar
	$('#ingresar').unbind('click');
	$('#ingresar').click(function(){
		
		$.fn.logueo();
		
	});//Fin del evento click
	
};//Fin de la función eventos
/***************************/

/*
	Función para el logueo del usuario
*/
$.fn.logueo = function(){
	
	var validador = validar_form_logueo();
	
	//Evaluamos la validación
	if(validador){
		
		//Evaluamos xhr
		if(xhr != null){
			
			xhr.abort();
			
		}//Fin dle if
		
		//Ajax
		xhr = $.ajax({
				
			url: 'salo/c_index/login',
			type: 'POST',
			dataType: 'json',	
			data:{
				  correo : $('#correo').val(),
				  clave  : window.btoa($('#clave').val())
				 },
			beforeSend: function(objeto){
				
				//Bloqueamos los siguientes campos
				$('#correo').attr('disabled',true);
				$('#clave').attr('disabled',true);
				
				//Mostramos el icono de carga
				$('#ingresar').css('display','none');
				$('#ingresar').parent('.form-group').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				$('#ingresar').siblings('.alert').remove();
				
			},
			error: function(objeto, quepaso, otroobj){
	            
				xhr = null;
				
				//Desbloqueamos los siguientes campos
				$('#correo').removeAttr('disabled');
				$('#clave').removeAttr('disabled');
				
				//Ocultamos el icono de carga
				$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
                $('#ingresar').css('display','inherit');
				$('#ingresar').after('<div class="alert alert-danger" role="alert"><strong>Ocurrió un error!</strong>, intenta de nuevo.</div>');
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				xhr = null;
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').after('<div class="alert alert-success" role="alert"><strong>Autenticado con éxito!</strong>, redireccionando <i class="fa fa-circle-o-notch fa-spin fa-fw"></i></div>');
						
						//Creamos las sessionStorages
						sessionStorage.setItem("ID_USUARIO", data['ID_USUARIO']);
						sessionStorage.setItem("AVATAR_USUARIO", data['AVATAR_USUARIO']);
						sessionStorage.setItem("SEUDONIMO", data['SEUDONIMO']);
						
						window.location.href = "panel_principal";
						
					}else if(parseInt(data['CODIGO_RESPUESTA']) == 2){
						
						//Desbloqueamos los siguientes campos
						$('#correo').removeAttr('disabled');
						$('#clave').removeAttr('disabled');
						
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').css('display','inherit');
						
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').css('display','inherit');
						$('#ingresar').after('<div class="alert alert-danger" role="alert">'+data['MENSAJE_RESPUESTA']+'</div>');
						
				    }else if(parseInt(data['CODIGO_RESPUESTA']) == 3){
						
						//Desbloqueamos los siguientes campos
						$('#correo').removeAttr('disabled');
						$('#clave').removeAttr('disabled');
						
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').css('display','inherit');
						
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').css('display','inherit');
						$('#ingresar').after('<div class="alert alert-danger" role="alert">'+data['MENSAJE_RESPUESTA']+'</div>');
						
				    }else if(parseInt(data['CODIGO_RESPUESTA']) == 4){
						
						//Desbloqueamos los siguientes campos
						$('#correo').removeAttr('disabled');
						$('#clave').removeAttr('disabled');
						
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').css('display','inherit');
						
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').css('display','inherit');
						$('#ingresar').after('<div class="alert alert-danger" role="alert">'+data['MENSAJE_RESPUESTA']+'</div>');
						
				    }else{
						
						//Desbloqueamos los siguientes campos
						$('#correo').removeAttr('disabled');
						$('#clave').removeAttr('disabled');
						
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').css('display','inherit');
					    
						//Ocultamos el icono de carga
						$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
						$('#ingresar').css('display','inherit');
						$('#ingresar').after('<div class="alert alert-danger" role="alert"><strong>Ocurrió un error!</strong>, intenta de nuevo.</div>');
						
					}//Fin del if
				
				}else{
					
					//Desbloqueamos los siguientes campos
					$('#correo').removeAttr('disabled');
					$('#clave').removeAttr('disabled');
				    
					//Ocultamos el icono de carga
					$('#ingresar').parent('.form-group').find('.fa-circle-o-notch').remove();
					$('#ingresar').css('display','inherit');
					$('#ingresar').after('<div class="alert alert-danger" role="alert"><strong>Ocurrió un error!</strong>, intenta de nuevo.</div>');
							
				}//Fin del if
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
		
	}else{
		
		$.fn.eventos();
		
	}//Fin del if
	
};//Fin de la función $.fn.logueo
/*******************************/

/*
	Función que valida el formulario de logueo
*/
validar_form_logueo = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var correo = $('#correo');
	var clave  = $('#clave');
	
	//Removemos los mensajes de error
	correo.parents('.form-group').removeClass('has-danger');
	clave.parents('.form-group').removeClass('has-danger');
	correo.parents('.form-group').find('.form-control-feedback').html('');
	clave.parents('.form-group').find('.form-control-feedback').html('');
	
	//validamos el correo
	var regla_correo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
	//Evaluamos
	if(!regla_correo.test(correo.val())){
		
		//Indicamos error
		correo.parents('.form-group').addClass('has-danger');
		correo.parents('.form-group').find('.form-control-feedback').html('Correo inválido!');
		
	}else{
		
		//Evaluamos que la clave no sea vacia
		if(clave.val().trim() == ''){
			
			//Indicamos error
			clave.parents('.form-group').addClass('has-danger');
			clave.parents('.form-group').find('.form-control-feedback').html('La Contraseña es requerida!.');
			
		}else{
			
			respuesta = true;
			
		}//Fin del if
		
	}//Fin del if
	
	return respuesta;
	
};//Fin de la función validar_form_logueo
/***************************************/