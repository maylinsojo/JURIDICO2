//Variables globales
var xhr;

/*
	Evento document ready
*/
$(document).ready(function(){
   
   $.fn.data_inicial();
   
   //Evento focus sobre el campo
   $('#busc_nombre_com').focusin(function(e){	
         
		 //Evaluo si hay resultados previos
		 if($('#sugerencias .dropdown-item').length > 0){
		
			 //Agregamos la clase
			 $('#sugerencias').parent('.dropdown').addClass('show');
			 
		 };//Fin del if
		 
   });//Fin del evento focus
   
   //Evento focus sobre el campo
   $('#busc_nombre_com').focusout(function(e){	
       
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
		Evento click sobre #nueva_comuna
	*/
	$('#nueva_comuna').unbind('click')
	$('#nueva_comuna').click(function(){
		
		//Abrimos la ventana modalnueva_comuna
		$.fn.modal_nueva_comuna();
		
	});//Fin del evento click
	
	/*
		Evento click sobre #guardar
	*/
	$('#guardar').unbind('click')
	$('#guardar').click(function(){
		
		//Función para guardar
		$.fn.guardar_comuna();
		
	});//Fin del evento click
	
	/*
		Evento click sobre .editar_comuna
	*/
	$('.editar_comuna').unbind('click');
	$('.editar_comuna').click(function(){
		
		//Obtenemos el id de la comuna
		var id_comuna = $(this).attr('id');
		
		$.fn.modal_editar_comuna(id_comuna);
		
	});//Fin del evento click
	
	/*
		Evento click sobre #guardar_editar_comuna
	*/
	$('#guardar_editar_comuna').unbind('click');
	$('#guardar_editar_comuna').click(function(){
		
		//Obtenemos le id de la comuna
		var id_comuna = $(this).attr('id_com');
		
		$.fn.editar_comuna(id_comuna);
		
	});//Fin del evento click
	
	
	/*
		Evento keyup sobre el campo #busc_nombre_com
	*/
	$('#busc_nombre_com').unbind('keyup');
	$('#busc_nombre_com').keyup(function(){
		
		//Obtengo el valor
		var valor = $(this).val();
		
		//Evaluo
		if(valor.trim() == ''){
			
			$(this).val(valor.trim());
			
		}else{
			
			$.fn.buscar_comuna(valor);
			
		}//Fin del if
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	/***********************/
	
	/*
		Evento click sobre #sugerencias .dropdown-item
	*/
	$('#sugerencias .dropdown-item').unbind('click');
	$('#sugerencias .dropdown-item').click(function(){
  
		//Obtenemos el id de la comuna 
		var id_comuna = $(this).attr('id');
		var comuna    = $(this).children('.comuna').text(); 
		
		$('#busc_nombre_com').val(comuna);
		$('#sugerencias').html('');
		
		
		$.fn.comunas(id_comuna,0,1);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .reiniciar_filtro
	*/
	$('.reiniciar_filtro').unbind('click');
	$('.reiniciar_filtro').click(function(){
  
		$.fn.comunas(0,0,1);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre #confirm_eliminar_comuna
	*/
	$('#confirm_eliminar_comuna').unbind('click');
	$('#confirm_eliminar_comuna').click(function(){
  
		//Obtenemos el id del comuna
		var id_comuna = $(this).attr('id_com');
        
		//Mostramos el mensaje de error
		$('#modal_editar_comuna .modal-footer')
		.html(`<div class="alert alert-danger" role="alert">
				 <strong>¿Está seguro de eliminar ésta región?</strong>
				 <button type="button" class="btn btn-success cancelar_eliminar" id_com="`+id_comuna+`">No</button>
				 <button type="button" class="btn btn-danger eliminar_comuna" id_com="`+id_comuna+`">Si</button>
			   </div>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .cancelar_eliminar
	*/
	$('.cancelar_eliminar').unbind('click');
	$('.cancelar_eliminar').click(function(){
 
		//Obtenemos el id del comuna
		var id_comuna = $(this).attr('id_com');
        
		//Mostramos el mensaje de error
		$('#modal_editar_comuna .modal-footer')
		.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			   <button id_com="`+id_comuna+`" type="button" class="btn btn-danger" id="confirm_eliminar_comuna">Eliminar comuna</button>
			   <button id_com="`+id_comuna+`" type="button" class="btn btn-warning" id="guardar_editar_comuna">Guardar</button>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .eliminar_comuna
	*/
	$('.eliminar_comuna').unbind('click');
	$('.eliminar_comuna').click(function(){
 
		//Obtenemos el id del comuna
		var id_comuna = $(this).attr('id_com');
        
		$.fn.eliminar_comuna(id_comuna);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .paginador .page-link
	*/
	$('.paginador .page-item').unbind('click');
	$('.paginador .page-item').click(function(){
 
		//Evaluamos si es es una pagina
		if($(this).hasClass('pagina')){
			
			//Seteams el activo
			$('.paginador .page-item').removeClass('active');
			$(this).addClass('active');
			
			//Obtenemos el rango
			var rango = $(this).children('.page-link').attr('rango');
			
			$.fn.comunas(0,rango,0);
			
		}else if($(this).hasClass('previo')){
			
			//Buscamos el previo
			$('.paginador .page-item.active').prev('.pagina').trigger('click');
			
		}else if($(this).hasClass('siguiente')){
			
			//Buscamos el siguiente
			$('.paginador .page-item.active').next('.pagina').trigger('click');
			
		}//Fin del if
		
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
				
		url: 'C_comunas/data_inicial',
		type: 'POST',
		dataType: 'json',	
		data:{
			  id_comuna : 0,
			  rango     : 0
			 },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_com').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_comunas').html('');
			$('.wrapper_comunas').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_com').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_comunas').html('');
			$('.wrapper_comunas')
			.append(`<div class="alert alert-warning" role="alert">
			          <strong>Error al tratar de listar las comunas! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_com').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_comunas').html('');
			
			//Evaluamos data
			if(data != null){
				
				//Evaluamos si hay comunas
				if(data['comunas'] != null){
					
					var tabla = `
								  <table class="table table-striped"s>
								    <thead>
										<tr>
											<th class="text-center">Nombre</th>
											<th class="text-center">Región</th>
											<th class="text-center">Estatus</th>
											<th class="text-center"></th>
										</tr>
									</thead>
								    <tbody>	
						        `
					
					//Recorremos los resultados
				    $(data['comunas']).each(function(index, elemento){
						
						tabla += `
								  <tr>
								 	<td>`+elemento.nombre+`</td>
									<td>`+elemento.region+`</td>
									<td>`+elemento.estatus+`</td>
									<td>
										<i id="`+elemento.id+`" class="fa fa-search editar_comuna" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Comuna"></i>
																		
									</td>
								  </tr>	
						        `
						
                    });//Fin del each
					
					tabla += `
						        </tbody>
							  </table>
						     `;
					
					//Obtenemos el número de regiones
					var numCom = data['num_com'];
					var numPag = 1;
					var rango  = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numCom;){
						
						//Evaluamos si es el primero
						if(i == 1){
						
							paginador += `<li class="page-item active pagina">
											 <a class="page-link" rango="`+rango+`">`+numPag+`</a>
										  </li>`;
										  
						}else{
							
							paginador += `<li class="page-item pagina">
											 <a class="page-link" rango="`+rango+`">`+numPag+`</a>
										  </li>`;
							
						}//Fin dle if
						
						i+= 5;
						rango+=5;
						numPag++;
						
					}//Fin del for
					
					paginador += `  <li class="page-item siguiente"><a class="page-link">Siguiente</a></li>
								   </ul>
								  </nav>`;
					
					//Mostramos las regiones
					$('.wrapper_comunas').append(tabla);
					
					//Mostramos el paginador
					$('.wrapper_paginador').append(paginador);
					
				}else{
					
					//Mostramos el mensaje
					$('.wrapper_comunas')
				.append(`<div class="alert alert-warning" role="alert">
						  <strong>No hay comunas registradas!.</strong>
						 </div>`);
					
				}//Fin del if
				
			}else{
			
				//Mostramos el mensaje
				$('.wrapper_comunas')
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
	Función que muestra la ventana modal para el registro de una nueva comuna
*/
$.fn.modal_nueva_comuna = function(){
	
	var modal = `<div class="modal fade" id="modal_nueva_comuna" tabindex="-1" role="dialog" aria-hidden="true">

				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Registrar nueva comuna</h5>
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
								<label for="region">Región select</label>
								<select class="form-control" id="region"></select>
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
	$('#modal_nueva_comuna').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_nueva_comuna').on('shown.bs.modal', function(e){
		
		$.fn.region();
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_nueva_comuna').on('hidden.bs.modal', function(e){
	    
		//Listamos las comunas
		$.fn.comunas(0,0,1);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_nueva_comuna').modal('show');
	
};//Fin de la función $.fn.modal_nueva_comuna
/********************************************/
/*
	Función que lista las regiones para registrar establecimiento
*/
$.fn.region = function(){
	
	$.ajax({
				
		url: 'C_comunas/region',
		type: 'POST',
		dataType: 'json',
		beforeSend: function(objeto){
			
			//Muestro la opcion de carga
			$('#modal_nueva_comuna #region').html('');
			$('#modal_nueva_comuna #region')
			.append(`<option value="" disabled selected>Cargando...</option>`);
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Muestro la opción de error
			$('#modal_nueva_comuna #region')
			.html(`<option value="">Error al cargar los tipos de datos</option>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Limpiamos
			$('#modal_nueva_comuna #region').html('');
			
			//Evaluamos data
			if(data != null){
				
				$('#modal_nueva_comuna #region')
				.append(`<option value="" disabled selected>Seleccione...</option>`);
				
				//Mostramos las opciones
				$(data).each(function(index, elemento){
                    
					$('#modal_nueva_comuna #region')
					.append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);
					
                });//Fin del each
				
			}else{
				
				//Muestro la opción de error
				$('#modal_nueva_comuna #region')
				.html(`<option value="">Error al cargar los tipos de datos</option>`);
				
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.region
/********************************/

/*
	Función que lista las comunas creadas
*/
$.fn.comunas = function(id_comuna, rango, remover_paginador){
	
	$.ajax({
				
		url: 'C_comunas/comunas_creadas',
		type: 'POST',
		dataType: 'json',
		data: {
				id_comuna : id_comuna,
				rango     : rango
			  },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_com').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_comunas').html('');
			$('.wrapper_comunas').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
			//Ocultamos el paginador
			$('.wrapper_paginador').hide();
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_com').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_comunas').html('');
			$('.wrapper_comunas')
			.append(`<div class="alert alert-warning" role="alert">
					  <strong>Error al tratar de listar las comunas! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_com').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_comunas').html('');
			
			//Evaluamos datas
			if(data != null){
				
				//Evaluamos el id de la comuna
				if(id_comuna != 0){
					
									
					//Mostramos el icono para reiniciar el filtro
					$('#busc_nombre_com').parents('.dropdown').children('.input-group-addon:eq(1)')
					.html('<i class="fa fa-times-circle tips reiniciar_filtro" aria-hidden="true" title="Reiniciar filtro"></i>');
					
				}else{
					
					//Removemos los tooltips
					$('body .tooltip.bs-tether-element').remove();
					
					//Removemos el icono para reiniciar el filtro
					$('#busc_nombre_com').parents('.dropdown').children('.input-group-addon:eq(1)')
			        .html('<i class="fa fa-search" aria-hidden="true"></i>');
					
					$('#busc_nombre_com').val('');
					
				}//Fin del if
				
				
				var tabla = `
							  <table class="table table-striped">
								<thead>
									<tr>
										<th class="text-center">Nombre</th>
										<th class="text-center">Región</th>
										<th class="text-center">Estatus</th>
										<th class="text-center"></th>
									</tr>
								</thead>
								<tbody>	
							`
				
				//Recorremos los resultados
				$(data['comunas']).each(function(index, elemento){
				  
					tabla += `
							  <tr>
								<td>`+elemento.nombre+`</td>
								<td>`+elemento.region+`</td>
								<td>`+elemento.estatus+`</td>
								<td>
									<i id="`+elemento.id+`" class="fa fa-search editar_comuna" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Comuna"></i>
									
								</td>
							  </tr>	
							`
					
				});//Fin del each
				
				tabla += `
							</tbody>
						  </table>
						 `;
				
				//Evaluamos si hay que armar nuevamente el paginador
				if(remover_paginador == 1){
				
					//Obtenemos el número de comunas
					var numCom= data['num_com'];
					var numPag = 1;
					var rango  = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numCom;){
						
						//Evaluamos si es el primero
						if(i == 1){
						
							paginador += `<li class="page-item active pagina">
											 <a class="page-link" rango="`+rango+`">`+numPag+`</a>
										  </li>`;
										  
						}else{
							
							paginador += `<li class="page-item pagina">
											 <a class="page-link" rango="`+rango+`">`+numPag+`</a>
										  </li>`;
							
						}//Fin dle if
						
						i+= 5;
						rango+=5;
						numPag++;
						
					}//Fin del for
					
					paginador += `  <li class="page-item siguiente"><a class="page-link">Siguiente</a></li>
								   </ul>
								  </nav>`;
					
					//Mostramos el paginador
				    $('.wrapper_paginador').html(paginador);
						  
				}//Fin del if
				
				//Mostramos los usuario
				$('.wrapper_comunas').append(tabla);
				
				//Ocultamos el paginador
			    $('.wrapper_paginador').show();

			}else{
			
				//Mostramos el mensaje
				$('.wrapper_comunas')
				.append(`<div class="alert alert-danger" role="alert">
						  <strong>Error de conexión!.</strong>
						 </div>`);
						 
			}//Fin del if
			
			//Tooltips
   			$('.tips').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
}//Fin de la función $.fn.comunas
/********************************/

/*
	Función que guarda un nueva comuna
*/
$.fn.guardar_comuna = function(){
	
	var validador = $.fn.validar_nueva_comuna();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		var nombre     = $('#nombre').val();
		var region     = $('#region').val();
		
		$.ajax({
				
			url: 'C_comunas/registrar_comuna',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre     : nombre,
				    region     : region
				    
				
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_nueva_comuna .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_nueva_comuna .modal-footer')
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
						$('#modal_nueva_comuna .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
							   </div>`);
						
					}else if(parseInt(data['CODIGO_RESPUESTA']) == 2){
						
						//Mostramos el mensaje de error
						$('#modal_nueva_comuna .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
							   </div>`);
						
				    }else{
						
						//Mostramos el mensaje de error
						$('#modal_nueva_comuna .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_nueva_comuna .modal-footer')
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
	
};//Fin de la función $.fn.guardar_comuna
/****************************************/

/*
	Función que valida el formulario para una nueva comuna
*/
$.fn.validar_nueva_comuna = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nombre    = $('#nombre');
	var region    = $('#region');
	
	
	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
    region.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	region.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){
		
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la comuna es requerido!');
		
	}else{

			if(!region.val()){
			
			//Indicamos error
			region.parents('.form-group').addClass('has-danger');
			region.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');
						
				}else{
				    
						respuesta = true;
						
					}//Fin del if
		
			
		}//Fin del if nombre

	return respuesta;
	
};//Fin de la función $.fn.validar_nueva_comuna
/**********************************************/


/*
	Función que muestra la ventana modal para editar a una comuna
*/
$.fn.modal_editar_comuna = function(id_comuna){
	
	var modal = `<div class="modal fade" id="modal_editar_comuna" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Editar Comuna</h5>
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
	$('#modal_editar_comuna').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_editar_comuna').on('shown.bs.modal', function(e){
		
		$.fn.info_comuna(id_comuna);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_editar_comuna').on('hidden.bs.modal', function(e){
	    
		//Obtenemos el rango
		var rango = $('.page-item.active').children('.page-link').attr('rango');
		
		//Listamos las comunas	
		$.fn.comunas(0,rango,0);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_editar_comuna').modal('show');
	
};//Fin de la función $.fn.modal_editar_comuna
/*********************************************/

/*
	Función que lista la información de la comuna
*/
$.fn.info_comuna = function(id_comuna){
	
	$.ajax({
				
		url: 'C_comunas/info_editar_comuna',
		type: 'POST',
		dataType: 'json',
		data: {
				id_comuna : id_comuna
			  },
		beforeSend: function(objeto){
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_comuna .modal-body')
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
								<div class="form-group text-left">
									<label for="region">Región select</label>
									<select class="form-control" id="region"></select>
								<div class="form-control-feedback"></div>
								</div>
								<div class="form-group text-left">
									<label for="estatus_comuna">Estatus</label>
									<select class="form-control" id="estatus_comuna"></select>
									<div class="form-control-feedback"></div>
								</div>
								</div>
							</form>`;
				
				//Mostramos los datos de la comuna
				$('#modal_editar_comuna .modal-body').html(form);
				
				//Mostramos el combo de regiones
				$('#modal_editar_comuna #region')
				.append(`<option value="" disabled>Seleccione...</option>`);
				
				//Mostramos las opciones
				$(data['REGION']).each(function(index, elemento){
                    
					//Evaluamos si es el seleccionado
					if(elemento.id == data['INFO']['id_region']){
					
						$('#modal_editar_comuna #region')
						.append(`<option selected value="`+elemento.id+`">`+elemento.nombre+`</option>`);
					
					}else{
						
						$('#modal_editar_comuna #region')
						.append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);
						
					}//Fin del if
					
                });//Fin del each
				
				//Mostramos las opciones
				$(data['ESTATUS']).each(function(index, elemento){
                    
					//Evaluamos si es el seleccionado
					if(elemento.valor == data['INFO']['id_estatus']){
					
						$('#modal_editar_comuna #estatus_comuna')
						.append(`<option selected value="`+elemento.valor+`">`+elemento.descripcion+`</option>`);
					
					}else{
						
						$('#modal_editar_comuna #estatus_comuna')
						.append(`<option value="`+elemento.valor+`">`+elemento.descripcion+`</option>`);
						
					}//Fin del if
					
                });//Fin del each
				
				//Mostramos los btn
				$('#modal_editar_comuna .modal-footer')
				.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
						<button id_com="`+data['INFO']['id']+`" type="button" class="btn btn-danger" id="confirm_eliminar_comuna">EliminarComuna</button>					   
						<button id_com="`+data['INFO']['id']+`" type="button" class="btn btn-warning" id="guardar_editar_comuna">Guardar</button>`);

			
			}else{
				
			//Mostramos el mensaje de error
			$('#modal_editar_comuna .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
	
};//Fin de la función $.fn.info_comuna 
/*************************************/

/*
	Función que guarda la edición de la comuna
*/

$.fn.editar_comuna = function(id_comuna){
	
	var validador = $.fn.validar_editar_comuna();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		var nombre   = $('#nombre').val();
		var region   = $('#region').val();
		var estatus  = $('#estatus_comuna').val()
		
		$.ajax({
				
			url: 'C_comunas/editar_comuna',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre     : nombre,
					region     : region,
					id_comuna : id_comuna,
				    estatus    : estatus
				
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_editar_comuna .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_editar_comuna .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
				         <strong>Ocurrió un error!</strong>, intenta de nuevo.
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	 <button type="button" class="btn btn-danger" id="guardar_editar_comuna" id_com="`+id_comuna+`">Guardar</button>
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
						$('#modal_editar_comuna .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	         <button type="button" class="btn btn-danger" id="guardar_editar_comuna" id_com="`+id_comuna+`">Guardar</button>
							   </div>`);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_editar_comuna .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	         <button type="button" class="btn btn-danger" id="guardar_editar_comuna" id_com="`+id_comuna+`">Guardar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_editar_comuna .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	     <button type="button" class="btn btn-danger" id="guardar_editar_comuna" id_com="`+id_comuna+`">Guardar</button>
						   </div>`);
							
				}//Fin del if
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
		
	}//Fin del if
	
};//Fin de la función guardar_editar_comuna*/
/******************************************/

/*
	Función que valida el formulario para editar la comuna
*/  
$.fn.validar_editar_comuna = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nombre   = $('#nombre');
	var region   = $('#region');
	var estatus  = $('#estatus_region');
		
	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
	region.parents('.form-group').removeClass('has-danger');
	estatus.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	region.parents('.form-group').find('.form-control-feedback').html('');
	estatus.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){
		
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la comuna es requerido!');
		
	}else{

		
			
		//Evaluamos que la region no sea vacia
		if(!region.val()){
			    	
					//Indicamos error
					region.parents('.form-group').addClass('has-danger');
					region.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');
						
							
				}else{
				    
					
		
				//Evaluamos el estatus
					if(estatus.val() == ''){
						
						//Indicamos error
						estatus.parents('.form-group').addClass('has-danger');
						estatus.parents('.form-group').find('.form-control-feedback').html('Requerido!');
						
						respuesta = false;
						
					}else{
						
						respuesta = true;
						
					}//Fin del if
	            
				}
			
		}//Fin del if nombres

	return respuesta;
	
};//Fin de la función $.fn.validar_editar_comuna   
/***********************************************/
/*
	Función que busca la comuna según el tipeo del comuna
*/
$.fn.buscar_comuna = function(valor){
	
	//Evaluamos si hay una petición
	if(xhr != null){
		
		xhr.abort();
			
	}//Fin del if
	
	xhr = $.ajax({
		url: 'C_comunas/buscar_comuna',
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
					
					//Recorremos los comuna
					$(data).each(function(index, elemento){
                        
						$('#sugerencias')
						.append(`<div id="`+elemento['id']+`" class="dropdown-item">
								  
								  <span class="comuna">`+elemento['nombre']+`</span>
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
	
};//Fin de la función $.fn.buscar_comuna
/***************************************/

/*
	Función que elimina una comuna
*/
$.fn.eliminar_comuna = function(id_comuna){
	
	$.ajax({
				
		url: 'C_comunas/eliminar_comuna',
		type: 'POST',
		dataType: 'json',
		data: {
				id_comuna : id_comuna
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#modal_editar_comuna .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_comuna .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta de nuevo.
					 <button type="button" class="btn btn-success eliminar_comuna" id_com="`+id_comuna+`">Reintentar</button>
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
					$('#modal_editar_comuna .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-success" data-dismiss="modal">Ok!</button>
						   </div>`);
					
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_editar_comuna .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							 <button type="button" class="btn btn-success eliminar_comuna" id_com="`+id_comuna+`">Reintentar</button>
						   </div>`);
					
				}//Fin del if
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_editar_comuna .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
						 <button type="button" class="btn btn-success eliminar_comuna" id_com="`+id_comuna+`">Reintentar</button>
					   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.eliminar_comuna
/*****************************************/

