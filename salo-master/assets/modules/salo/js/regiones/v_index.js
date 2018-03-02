//Variables globales
var xhr;

/*
	Evento document ready
*/
$(document).ready(function(){
   
   $.fn.data_inicial();
   
   //Evento focus sobre el campo
   $('#busc_nombre_reg').focusin(function(e){	
         
		 //Evaluo si hay resultados previos
		 if($('#sugerencias .dropdown-item').length > 0){
		
			 //Agregamos la clase
			 $('#sugerencias').parent('.dropdown').addClass('show');
			 
		 };//Fin del if
		 
   });//Fin del evento focus
   
   //Evento focus sobre el campo
   $('#busc_nombre_reg').focusout(function(e){	
       
		setTimeout(function(){
	
			//Agregamos la clase
		    $('#sugerencias').parent('.dropdown').removeClass('show');

		},200);		
		 
   });//Fin del evento focus
   
   $.fn.eventos();
   
});/*Fin del document ready*/
/***************************/

/*
	Función donde se declaran los eventos
*/
$.fn.eventos = function(){
	
	/*
		Evento click sobre #nueva_region
	*/
	$('#nueva_region').unbind('click')
	$('#nueva_region').click(function(){
		
		//Abrimos la ventana modalnueva_region
		$.fn.modal_nueva_region();
		
	});//Fin del evento click
	
	/*
		Evento keyup sobre #nombre
	*/
	$('#nombre').unbind('keyup');
	$('#nombre').keyup(function(){
		
		//Obtenemos el valor
		var valor = $(this).val().trim();
		
		//Seteamos el valor
		$(this).val(valor);
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	
	
	/*
		Evento keyup sobre #numero
	*/
	$('#numero').unbind('keyup');
	$('#numero').keyup(function(){
		
		//Obtenemos el valor
		var valor = $(this).val().trim();
		
		//Seteamos el valor
		$(this).val(valor);
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	
	/*
		Evento click sobre #guardar
	*/
	$('#guardar').unbind('click')
	$('#guardar').click(function(){
		
		//Función para guardar
		$.fn.guardar_region();
		
	});//Fin del evento click
	
	/*
		Evento click sobre .editar_region
	*/
	$('.editar_region').unbind('click');
	$('.editar_region').click(function(){
		
		//Obtenemos el id de la region
		var id_region = $(this).attr('id');
		
		$.fn.modal_editar_region(id_region);
		
	});//Fin del evento click
	
	/*
		Evento click sobre #guardar_editar_region
	*/
	$('#guardar_editar_region').unbind('click');
	$('#guardar_editar_region').click(function(){
		
		//Obtenemos le id de la region
		var id_region = $(this).attr('id_reg');
		
		$.fn.editar_region(id_region);
		
	});//Fin del evento click
	
	
	/*
		Evento keyup sobre el campo #busc_nombre_reg
	*/
	$('#busc_nombre_reg').unbind('keyup');
	$('#busc_nombre_reg').keyup(function(){
		
		//Obtengo el valor
		var valor = $(this).val();
		
		//Evaluo
		if(valor.trim() == ''){
			
			$(this).val(valor.trim());
			
		}else{
			
			$.fn.buscar_region(valor);
			
		}//Fin del if
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	/***********************/
	
	/*
		Evento click sobre #sugerencias .dropdown-item
	*/
	$('#sugerencias .dropdown-item').unbind('click');
	$('#sugerencias .dropdown-item').click(function(){
  
		//Obtenemos el id de la region 
		var id_region = $(this).attr('id');
		var region    = $(this).children('.region').text(); 
		
		$('#busc_nombre_reg').val(region);
		$('#sugerencias').html('');
		
		$.fn.regiones(id_region);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .reiniciar_filtro
	*/
	$('.reiniciar_filtro').unbind('click');
	$('.reiniciar_filtro').click(function(){
  
		$.fn.regiones(0);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre #confirm_eliminar_region
	*/
	$('#confirm_eliminar_region').unbind('click');
	$('#confirm_eliminar_region').click(function(){
  
		//Obtenemos el id del region
		var id_region = $(this).attr('id_reg');
        
		//Mostramos el mensaje de error
		$('#modal_editar_region .modal-footer')
		.html(`<div class="alert alert-danger" role="alert">
				 <strong>¿Está seguro de eliminar ésta región?</strong>
				 <button type="button" class="btn btn-success cancelar_eliminar" id_reg="`+id_region+`">No</button>
				 <button type="button" class="btn btn-danger eliminar_region" id_reg="`+id_region+`">Si</button>
			   </div>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .cancelar_eliminar
	*/
	$('.cancelar_eliminar').unbind('click');
	$('.cancelar_eliminar').click(function(){
 
		//Obtenemos el id del region
		var id_region = $(this).attr('id_reg');
        
		//Mostramos el mensaje de error
		$('#modal_editar_region .modal-footer')
		.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			   <button id_reg="`+id_region+`" type="button" class="btn btn-danger" id="confirm_eliminar_region">Eliminar region</button>
			   <button id_reg="`+id_region+`" type="button" class="btn btn-warning" id="guardar_editar_region">Guardar</button>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .eliminar_region
	*/
	$('.eliminar_region').unbind('click');
	$('.eliminar_region').click(function(){
 
		//Obtenemos el id del region
		var id_region = $(this).attr('id_reg');
        
		$.fn.eliminar_region(id_region);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
};//Fin de la función eventos
/***************************/

/*
	Función que obtiene la data inicial para armar la vista
*/
$.fn.data_inicial = function(){
	
	$.ajax({
				
		url: 'C_regiones/data_inicial',
		type: 'POST',
		dataType: 'json',	
		data:{
			  id_region : 0
			 },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_reg').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_regiones').html('');
			$('.wrapper_regiones').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_reg').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_regiones').html('');
			$('.wrapper_regiones')
			.append(`<div class="alert alert-warning" role="alert">
			          <strong>Error al tratar de listar las regiones! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_reg').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_regiones').html('');
			
			//Evaluamos data
			if(data != null){
				
				//Evaluamos si hay regiones
				if(data['regiones'] != null){
					
					var tabla = `
								  <table class="table table-striped"s>
								    <thead>
										<tr>
											<th class="text-center">Nombre</th>
											<th class="text-center">Número</th>
											<th class="text-center"></th>
										</tr>
									</thead>
								    <tbody>	
						        `
					
					//Recorremos los resultados
					$(data['regiones']).each(function(index, elemento){
                      
						tabla += `
								  <tr>
								 	
									<td>`+elemento.nombre+`</td>
									<td>`+elemento.numero+`</td>
									<td>
										<i id="`+elemento.id+`" class="fa fa-search editar_region" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Región"></i>
																		
									</td>
								  </tr>	
						        `
						
                    });//Fin del each
					
					tabla += `
						        </tbody>
							  </table>
						     `;
					
					//Mostramos el mensaje
					$('.wrapper_regiones').append(tabla);
					
				}else{
					
					//Mostramos el mensaje
					$('.wrapper_regiones')
				.append(`<div class="alert alert-warning" role="alert">
						  <strong>No hay regiones registradas!.</strong>
						 </div>`);
					
				}//Fin del if
				
			}else{
			
				//Mostramos el mensaje
				$('.wrapper_regiones')
				.append(`<div class="alert alert-danger" role="alert">
						  <strong>Error de conexión!.</strong>
						 </div>`);
						 
			}//Fin del if
			
			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip()
			
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.data_inicial
/*************************************/

/*
	Función que muestra la ventana modal para el registro de una nueva region
*/
$.fn.modal_nueva_region = function(){
	
	var modal = `<div class="modal fade" id="modal_nueva_region" tabindex="-1" role="dialog" aria-hidden="true">

				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Registrar nueva region</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						  <span aria-hidden="true">×</span>
						</button>
					  </div>
					  <div class="modal-body">
						<form>
							<div class="form-group">
								<label for="nombre">Nombre</label>
								<input type="text" class="form-control" id="nombre">
								<div class="form-control-feedback"></div>
							</div>
							<div class="form-group">
								<label for="numero">Número</label>
								<input type="text" class="form-control" id="numero">
								<div class="form-control-feedback"></div>
							</div>
						</form>
					  </div>
					  <div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						<button type="button" class="btn btn-primary" id="guardar">Guardar</button>
					  </div>
					</div>
				  </div>
				</div>`;
		
    //Agregamos la modal al body
	$('body').append(modal);
	
	//Opciones de la modal
	$('#modal_nueva_region').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_nueva_region').on('shown.bs.modal', function(e){
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_nueva_region').on('hidden.bs.modal', function(e){
	    
		//Listamos las regiones
		$.fn.regiones(0);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_nueva_region').modal('show');
	
};//Fin de la función $.fn.modal_nueva_region
/********************************************/

/*
	Función que guarda un nueva region
*/
$.fn.guardar_region = function(){
	
	var validador = $.fn.validar_nueva_region();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		var nombre   = $('#nombre').val();
		var numero   = $('#numero').val();
		
		$.ajax({
				
			url: 'C_regiones/registrar_region',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre     : nombre,
					numero     : numero
				    
				
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_nueva_region .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_nueva_region .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
				         <strong>Ocurrió un error!</strong>, intenta de nuevo.
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
						 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
					   </div>`);
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				xhr = null;
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Mostramos el mensaje de error
						$('#modal_nueva_region .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
							   </div>`);
						
					}else if(parseInt(data['CODIGO_RESPUESTA']) == 2){
						
						//Mostramos el mensaje de error
						$('#modal_nueva_region .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
							   </div>`);
						
				    }else{
						
						//Mostramos el mensaje de error
						$('#modal_nueva_region .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_nueva_region .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
						   </div>`);
							
				}//Fin del if
				
				$.fn.eventos();
				
				
			}//Fin del success
				
		});//Fin del ajax
		
	}//Fin del if
	
};//Fin de la función $.fn.guardar_region
/****************************************/

/*
	Función que valida el formulario para una nueva region
*/
$.fn.validar_nueva_region = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nombre   = $('#nombre');
	var numero   = $('#numero');
	
	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
    numero.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	numero.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){
		
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la región es requerido!');
		
	}else{

			//Evaluamos el numero de la region
				if(numero.val().trim() == ''){
			    	
					//Indicamos error
					numero.parents('.form-group').addClass('has-danger');
					numero.parents('.form-group').find('.form-control-feedback').html('El número de la región es requerido!');
						
				}else{
				    
						respuesta = true;
						
					}//Fin del if
		
			
		}//Fin del if nombre

	return respuesta;
	
};//Fin de la función $.fn.validar_nueva_region
/**********************************************/

/*
	Función que lista las regiones creadas
*/
$.fn.regiones = function(id_region){
	
	$.ajax({
				
		url: 'C_regiones/regiones_creadas',
		type: 'POST',
		dataType: 'json',
		data: {
				id_region : id_region
			  },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_reg').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_regiones').html('');
			$('.wrapper_regiones').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_reg').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_regiones').html('');
			$('.wrapper_regiones')
			.append(`<div class="alert alert-warning" role="alert">
					  <strong>Error al tratar de listar las regiones! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_reg').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_regiones').html('');
			
			//Evaluamos datas
			if(data != null){
				
				//Evaluamos el id de la region
				if(id_region != 0){
					
					//Mostramos el icono para reiniciar el filtro
					$('#busc_nombre_reg').parents('.dropdown').children('.input-group-addon:eq(1)')
					.html('<i class="fa fa-times-circle tips reiniciar_filtro" aria-hidden="true" title="Reiniciar filtro"></i>');
					
				}else{
					
					//Removemos los tooltips
					$('body .tooltip.bs-tether-element').remove();
					
					//Removemos el icono para reiniciar el filtro
					$('#busc_nombre_reg').parents('.dropdown').children('.input-group-addon:eq(1)')
			        .html('<i class="fa fa-search" aria-hidden="true"></i>');
					
					$('#busc_nombre_reg').val('');
					
				}//Fin del if
				
				var tabla = `
							  <table class="table table-striped">
								<thead>
									<tr>
										<th class="text-center">Nombre</th>
										<th class="text-center">Numero</th>
										<th class="text-center"></th>
									</tr>
								</thead>
								<tbody>	
							`
				
				//Recorremos los resultados
				$(data).each(function(index, elemento){
				  
					tabla += `
							  <tr>
								
								<td>`+elemento.nombre+`</td>
								<td>`+elemento.numero+`</td>
								<td>
									<i id="`+elemento.id+`" class="fa fa-search editar_region" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Región"></i>
									
								</td>
							  </tr>	
							`
					
				});//Fin del each
				
				tabla += `
							</tbody>
						  </table>
						 `;
				
				//Mostramos el mensaje
				$('.wrapper_regiones').append(tabla);
				
			}else{
			
				//Mostramos el mensaje
				$('.wrapper_regiones')
				.append(`<div class="alert alert-danger" role="alert">
						  <strong>Error de conexión!.</strong>
						 </div>`);
						 
			}//Fin del if
			
			//Tooltips
   			$('.tips').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
}//Fin de la función $.fn.regiones
/********************************/

/*
	Función que muestra la ventana modal para editar a una region
*/
$.fn.modal_editar_region = function(id_region){
	
	var modal = `<div class="modal fade" id="modal_editar_region" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Editar Región</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						  <span aria-hidden="true">×</span>
						</button>
					  </div>
					  <div class="modal-body text-center">
						
						<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
						
					  </div>
					  <div class="modal-footer"></div>
					</div>
				  </div>
				</div>`;
				
    //Agregamos la modal al body
	$('body').append(modal);
	
	
	//Opciones de la modal
	$('#modal_editar_region').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_editar_region').on('shown.bs.modal', function(e){
		
		$.fn.info_region(id_region);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_editar_region').on('hidden.bs.modal', function(e){
	    
		//Listamos las regiones
		$.fn.regiones(0);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_editar_region').modal('show');
	
};//Fin de la función $.fn.modal_editar_region
/*********************************************/

/*
	Función que lista la información de la region
*/
$.fn.info_region = function(id_region){
	
	$.ajax({
				
		url: 'C_regiones/info_editar_region',
		type: 'POST',
		dataType: 'json',
		data: {
				id_region : id_region
			  },
		beforeSend: function(objeto){
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_region .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			    
				var form = `<form>	 
								<div class="form-group text-left">
									<label for="nombre">Nombre</label>
									<input type="text" class="form-control" id="nombre" value="`+data['INFO']['nombre']+`">
									<div class="form-control-feedback"></div>
								</div>
								
								<div class="form-group text-left">
									<label for="numero">Numero</label>
									<input type="text" class="form-control" id="numero" value="`+data['INFO']['numero']+`">
									<div class="form-control-feedback"></div>
								</div>
							</form>`;
				
				//Mostramos los datos de la region
				$('#modal_editar_region .modal-body').html(form);
				
				//Mostramos los btn
				$('#modal_editar_region .modal-footer')
				.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
						<button id_reg="`+data['INFO']['id']+`" type="button" class="btn btn-danger" id="confirm_eliminar_region">EliminarRegion</button>					   
						<button id_reg="`+data['INFO']['id']+`" type="button" type="button" class="btn btn-warning" id="guardar_editar_region">Guardar</button>`);

			}else{
				
			//Mostramos el mensaje de error
			$('#modal_editar_region .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
	
};//Fin de la función $.fn.info_region 
/*************************************/

/*
	Función que guarda la edición de la region
*/

$.fn.editar_region = function(id_region){
	
	var validador = $.fn.validar_editar_region();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		var nombre   = $('#nombre').val();
		var numero   = $('#numero').val()
		
		$.ajax({
				
			url: 'C_regiones/editar_region',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre     : nombre,
					numero     : numero,
					id_region : id_region
				
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_editar_region .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_editar_region .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
				         <strong>Ocurrió un error!</strong>, intenta de nuevo.
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	 <button type="button" class="btn btn-danger" id="guardar_editar_region" id_reg="`+id_region+`">Guardar</button>
					   </div>`);
								
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				xhr = null;
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Mostramos el mensaje de error
						$('#modal_editar_region .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	         <button type="button" class="btn btn-danger" id="guardar_editar_region" id_reg="`+id_region+`">Guardar</button>
							   </div>`);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_editar_region .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	         <button type="button" class="btn btn-danger" id="guardar_editar_region" id_reg="`+id_region+`">Guardar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_editar_region .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	     <button type="button" class="btn btn-danger" id="guardar_editar_region" id_reg="`+id_region+`">Guardar</button>
						   </div>`);
							
				}//Fin del if
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
		
	}//Fin del if
	
};//Fin de la función guardar_editar_region*/
/******************************************/

/*
	Función que valida el formulario para editar la region
*/  
$.fn.validar_editar_region = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nombre   = $('#nombre');
	var numero   = $('#numero');
		
	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
	numero.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	numero.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){
		
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la región es requerido!');
		
	}else{

		
			//Evaluamos el numero de la region
				if(numero.val().trim() == ''){
			    	
					//Indicamos error
					numero.parents('.form-group').addClass('has-danger');
					numero.parents('.form-group').find('.form-control-feedback').html('El número de la región es requerido!');
						
				}else{
				    
						respuesta = true;
						
					}//Fin del if
			
		}//Fin del if nombre

	return respuesta;
	
};//Fin de la función $.fn.validar_editar_region   
/***********************************************/

/*
	Función que busca la region según el tipeo del region
*/
$.fn.buscar_region = function(valor){
	
	//Evaluamos si hay una petición
	if(xhr != null){
		
		xhr.abort();
			
	}//Fin del if
	
	xhr = $.ajax({
		url: 'C_regiones/buscar_region',
		type: "POST",
		dataType: 'json',
		data: {
			   descripcion : valor
			  },
		beforeSend: function(objeto) {
            
			//Limpiamos las sugerencias
			$('#sugerencias').parent('.dropdown').removeClass('show');
			$('#sugerencias').html('');
			
			//Mostramos el icono de carga
			$('#busc_nombre_reg').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');
                
		},
		error: function(objeto, quepaso, otroobj) {
			
			xhr = null;
			
			//Ocultamos el icono de carga
			$('#busc_nombre_reg').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			xhr = null;
			
			//Ocultamos el icono de carga
			$('#busc_nombre_reg').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');
			
			//Evaluamos data
			if(data != null){
				
				if(data.length > 0){
					
					//Agregamos la clase
					$('#sugerencias').parent('.dropdown').addClass('show');
					
					//Recorremos los region
					$(data).each(function(index, elemento){
                        
						$('#sugerencias')
						.append(`<div id="`+elemento['id']+`" class="dropdown-item">
								  
								  <span class="region">`+elemento['nombre']+`</span>
								</div>`);
						
                    });//Fin del each
					
				}//Fin del if data.length
				
			}else{
				
				//Removemos la clase
				$('#sugerencias').parent('.dropdown').removeClass('show');
				
			}//Fin del if data
			
			$.fn.eventos();
			
		}//Fin del success
	});//Ajax
	
};//Fin de la función $.fn.buscar_region
/***************************************/

/*
	Función que elimina un region
*/
$.fn.eliminar_region = function(id_region){
	
	$.ajax({
				
		url: 'C_regiones/eliminar_region',
		type: 'POST',
		dataType: 'json',
		data: {
				id_region : id_region
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#modal_editar_region .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_region .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta de nuevo.
					 <button type="button" class="btn btn-success eliminar_region" id_reg="`+id_region+`">Reintentar</button>
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			xhr = null;
			
			//Evaluamos si hay respusta
			if(data != null){
			
				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){
					
					//Mostramos el mensaje de error
					$('#modal_editar_region .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-success" data-dismiss="modal">Ok!</button>
						   </div>`);
					
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_editar_region .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							 <button type="button" class="btn btn-success eliminar_region" id_reg="`+id_region+`">Reintentar</button>
						   </div>`);
					
				}//Fin del if
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_editar_region .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
						 <button type="button" class="btn btn-success eliminar_region" id_reg="`+id_region+`">Reintentar</button>
					   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.eliminar_region
/*****************************************/

