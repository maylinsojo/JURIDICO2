 //Evento focus sobre el campo
   $('#busc_nombre_impren').focusin(function(e){	
         
		 //Evaluo si hay resultados previos
		 if($('#sugerencias .dropdown-item').length > 0){
		
			 //Agregamos la clase
			 $('#sugerencias').parent('.dropdown').addClass('show');
			 
		 };//Fin del if
		 
   });//Fin del evento focus
   
   //Evento focus sobre el campo
   $('#busc_nombre_impren').focusout(function(e){	
       
		setTimeout(function(){
	
			//Agregamos la clase
		    $('#sugerencias').parent('.dropdown').removeClass('show');

		},200);		
		 
   });//Fin del evento focus
   
  
 /*
		Evento click sobre #nueva_imprenta
	*/
	$('#nueva_imprenta').unbind('click')
	$('#nueva_imprenta').click(function(){
		
		//Abrimos la ventana modalnueva_imprenta
		$.fn.modal_nueva_imprenta();
		
	});//Fin del evento click
	
	/*
		Evento click sobre #guardar
	*/
	$('#guardar').unbind('click')
	$('#guardar').click(function(){
		
		//Función para guardar
		$.fn.guardar_imprenta();
		
	});//Fin del evento click
	
	/*
		Evento click sobre .editar_imprenta
	*/
	$('.editar_imprenta').unbind('click');
	$('.editar_imprenta').click(function(){
		
		//Obtenemos el id de la imprenta
		var id_imprenta = $(this).attr('id');
		
		$.fn.modal_editar_imprenta(id_imprenta);
		
	});//Fin del evento click
	
	/*
		Evento click sobre #guardar_editar_imprenta
	*/
	$('#guardar_editar_imprenta').unbind('click');
	$('#guardar_editar_imprenta').click(function(){
		
		//Obtenemos le id de la imprenta
		var id_imprenta = $(this).attr('id_impren');
		
		$.fn.editar_imprenta(id_imprenta);
		
	});//Fin del evento click
	
	
	/*
		Evento keyup sobre el campo #busc_nombre_impren
	*/
	$('#busc_nombre_impren').unbind('keyup');
	$('#busc_nombre_impren').keyup(function(){
		
		//Obtengo el valor
		var valor = $(this).val();
		
		//Evaluo
		if(valor.trim() == ''){
			
			$(this).val(valor.trim());
			
		}else{
			
			$.fn.buscar_imprenta(valor);
			
		}//Fin del if
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	/***********************/
	
	/*
		Evento click sobre #sugerencias .dropdown-item
	*/
	$('#sugerencias .dropdown-item').unbind('click');
	$('#sugerencias .dropdown-item').click(function(){
  
		//Obtenemos el id de la imprenta 
		var id_imprenta = $(this).attr('id');
		var imprenta    = $(this).children('.imprenta').text(); 
		
		$('#busc_nombre_impren').val(imprenta);
		$('#sugerencias').html('');
		
		
		$.fn.imprentas(id_imprenta,0,1);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .reiniciar_filtro
	*/
	$('.reiniciar_filtro').unbind('click');
	$('.reiniciar_filtro').click(function(){
  
		$.fn.imprentas(0,0,1);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre #confirm_eliminar_imprenta
	*/
	$('#confirm_eliminar_imprenta').unbind('click');
	$('#confirm_eliminar_imprenta').click(function(){
  
		//Obtenemos el id del imprenta
		var id_imprenta = $(this).attr('id_impren');
        
		//Mostramos el mensaje de error
		$('#modal_editar_imprenta .modal-footer')
		.html(`<div class="alert alert-danger" role="alert">
				 <strong>¿Está seguro de eliminar ésta región?</strong>
				 <button type="button" class="btn btn-success cancelar_eliminar" id_impren="`+id_imprenta+`">No</button>
				 <button type="button" class="btn btn-danger eliminar_imprenta" id_impren="`+id_imprenta+`">Si</button>
			   </div>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .cancelar_eliminar
	*/
	$('.cancelar_eliminar').unbind('click');
	$('.cancelar_eliminar').click(function(){
 
		//Obtenemos el id del imprenta
		var id_imprenta = $(this).attr('id_impren');
        
		//Mostramos el mensaje de error
		$('#modal_editar_imprenta .modal-footer')
		.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			   <button id_impren="`+id_imprenta+`" type="button" class="btn btn-danger" id="confirm_eliminar_imprenta">Eliminar imprenta</button>
			   <button id_impren="`+id_imprenta+`" type="button" class="btn btn-warning" id="guardar_editar_imprenta">Guardar</button>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .eliminar_imprenta
	*/
	$('.eliminar_imprenta').unbind('click');
	$('.eliminar_imprenta').click(function(){
 
		//Obtenemos el id del imprenta
		var id_imprenta = $(this).attr('id_impren');
        
		$.fn.eliminar_imprenta(id_imprenta);
		
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
			
			$.fn.imprentas(0,rango,0);
			
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
	






/*
	Función que muestra la ventana modal para el registro de una nueva imprenta
*/
$.fn.modal_nueva_imprenta = function(){
	
	var modal = `<div class="modal fade" id="modal_nueva_imprenta" tabindex="-1" role="dialog" aria-hidden="true">

				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Registrar nueva imprenta</h5>
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
							<div class="form-group col-4">
								<label for="precio">$Precio Imprenta</label>
								<input type="text" class="form-control" id="costo_imprenta" autocomplete="off">
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
	$('#modal_nueva_imprenta').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_nueva_imprenta').on('shown.bs.modal', function(e){
		
		//$.fn.region();
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_nueva_imprenta').on('hidden.bs.modal', function(e){
	    
		//Listamos las imprentas
		$.fn.imprentas(0,0,1);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_nueva_imprenta').modal('show');
	
};//Fin de la función $.fn.modal_nueva_imprenta
/********************************************/
/*
	Función que lista las regiones para registrar establecimiento
*/
$.fn.region = function(){
	
	$.ajax({
				
		url: 'C_imprentas/region',
		type: 'POST',
		dataType: 'json',
		beforeSend: function(objeto){
			
			//Muestro la opcion de carga
			$('#modal_nueva_imprenta #region').html('');
			$('#modal_nueva_imprenta #region')
			.append(`<option value="" disabled selected>Cargando...</option>`);
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Muestro la opción de error
			$('#modal_nueva_imprenta #region')
			.html(`<option value="">Error al cargar los tipos de datos</option>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Limpiamos
			$('#modal_nueva_imprenta #region').html('');
			
			//Evaluamos data
			if(data != null){
				
				$('#modal_nueva_imprenta #region')
				.append(`<option value="" disabled selected>Seleccione...</option>`);
				
				//Mostramos las opciones
				$(data).each(function(index, elemento){
                    
					$('#modal_nueva_imprenta #region')
					.append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);
					
                });//Fin del each
				
			}else{
				
				//Muestro la opción de error
				$('#modal_nueva_imprenta #region')
				.html(`<option value="">Error al cargar los tipos de datos</option>`);
				
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.region
/********************************/

/*
	Función que lista las imprentas creadas
*/
$.fn.imprentas = function(id_imprenta, rango, remover_paginador){
	
	$.ajax({
				
		url: 'C_imprentas/imprentas_creadas',
		type: 'POST',
		dataType: 'json',
		data: {
				id_imprenta : id_imprenta,
				rango     : rango
			  },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_impren').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_imprentas').html('');
			$('.wrapper_imprentas').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
			//Ocultamos el paginador
			$('.wrapper_paginador').hide();
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_impren').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_imprentas').html('');
			$('.wrapper_imprentas')
			.append(`<div class="alert alert-warning" role="alert">
					  <strong>Error al tratar de listar las imprentas! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_impren').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_imprentas').html('');
			
			//Evaluamos datas
			if(data != null){
				
				//Evaluamos el id de la imprenta
				if(id_imprenta != 0){
					
									
					//Mostramos el icono para reiniciar el filtro
					$('#busc_nombre_impren').parents('.dropdown').children('.input-group-addon:eq(1)')
					.html('<i class="fa fa-times-circle tips reiniciar_filtro" aria-hidden="true" title="Reiniciar filtro"></i>');
					
				}else{
					
					//Removemos los tooltips
					$('body .tooltip.bs-tether-element').remove();
					
					//Removemos el icono para reiniciar el filtro
					$('#busc_nombre_impren').parents('.dropdown').children('.input-group-addon:eq(1)')
			        .html('<i class="fa fa-search" aria-hidden="true"></i>');
					
					$('#busc_nombre_impren').val('');
					
				}//Fin del if
				
				
				var tabla = `
							  <table class="table table-striped">
								<thead>
									<tr>
										<th class="text-center">Nombre</th>
										<th class="text-center">Costo</th>
										<th class="text-center">Estatus</th>
										<th class="text-center"></th>
									</tr>
								</thead>
								<tbody>	
							`
				
				//Recorremos los resultados
				$(data['imprentas']).each(function(index, elemento){
				  
					tabla += `
							  <tr>
								<td>`+elemento.nombre+`</td>
								<td>`+elemento.precio+`</td>
								<td>`+elemento.estatus+`</td>
								<td>
									<i id="`+elemento.id+`" class="fa fa-search editar_imprenta" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar imprenta"></i>
									
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
				
					//Obtenemos el número de imprentas
					var numImp= data['num_imp'];
					var numPag = 1;
					var rango  = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numImp;){
						
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
				$('.wrapper_imprentas').append(tabla);
				
				//Ocultamos el paginador

			    $('.wrapper_paginador').show();

			}else{
			
				//Mostramos el mensaje
				$('.wrapper_imprentas')
				.append(`<div class="alert alert-danger" role="alert">
						  <strong>Error de conexión!.</strong>
						 </div>`);
						 
			}//Fin del if
			
			//Tooltips
   			$('.tips').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
}//Fin de la función $.fn.imprentas
/********************************/

/*
	Función que guarda un nueva imprenta
*/
$.fn.guardar_imprenta = function(){
	
	var validador = $.fn.validar_nueva_imprenta();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		var nombre      = $('#nombre').val();
		var precio      = $('#precio').val();
		
		$.ajax({
				
			url: 'C_imprentas/registrar_imprenta',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre     : nombre,
				    precio     : precio
				    
				
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_nueva_imprenta .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_nueva_imprenta .modal-footer')
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
						$('#modal_nueva_imprenta .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
							   </div>`);
						
					}else if(parseInt(data['CODIGO_RESPUESTA']) == 2){
						
						//Mostramos el mensaje de error
						$('#modal_nueva_imprenta .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
							   </div>`);
						
				    }else{
						
						//Mostramos el mensaje de error
						$('#modal_nueva_imprenta .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_nueva_imprenta .modal-footer')
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
	
};//Fin de la función $.fn.guardar_imprenta
/****************************************/

/*
	Función que valida el formulario para una nueva imprenta
*/
$.fn.validar_nueva_imprenta = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nombre    = $('#nombre');
	var precio    = $('#precio');
	
	
	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
    precio.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	precio.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){
		
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la imprenta es requerido!');
		
	}else{

			if(!precio.val()){
			
			//Indicamos error
			precio.parents('.form-group').addClass('has-danger');
			precio.parents('.form-group').find('.form-control-feedback').html('Debe ingresar valor de  imprenta!');
						
				}else{
				    
						respuesta = true;
						
					}//Fin del if
		
			
		}//Fin del if nombre

	return respuesta;
	
};//Fin de la función $.fn.validar_nueva_imprenta
/**********************************************/


/*
	Función que muestra la ventana modal para editar a una imprenta
*/
$.fn.modal_editar_imprenta = function(id_imprenta){
	
	var modal = `<div class="modal fade" id="modal_editar_imprenta" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Editar imprenta</h5>
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
	$('#modal_editar_imprenta').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_editar_imprenta').on('shown.bs.modal', function(e){
		
		$.fn.info_imprenta(id_imprenta);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_editar_imprenta').on('hidden.bs.modal', function(e){
	    
		//Obtenemos el rango
		var rango = $('.page-item.active').children('.page-link').attr('rango');
		
		//Listamos las imprentas	
		$.fn.imprentas(0,rango,0);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_editar_imprenta').modal('show');
	
};//Fin de la función $.fn.modal_editar_imprenta
/*********************************************/

/*
	Función que lista la información de la imprenta
*/
$.fn.info_imprenta = function(id_imprenta){
	
	$.ajax({
				
		url: 'C_imprentas/info_editar_imprenta',
		type: 'POST',
		dataType: 'json',
		data: {
				id_imprenta : id_imprenta
			  },
		beforeSend: function(objeto){
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_imprenta .modal-body')
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
									<label for="estatus_imprenta">Estatus</label>
									<select class="form-control" id="estatus_imprenta"></select>
									<div class="form-control-feedback"></div>
								</div>
								</div>
							</form>`;
				
				//Mostramos los datos de la imprenta
				$('#modal_editar_imprenta .modal-body').html(form);
				
				//Mostramos el imprenbo de regiones
				$('#modal_editar_imprenta #region')
				.append(`<option value="" disabled>Seleccione...</option>`);
				
				//Mostramos las opciones
				$(data['REGION']).each(function(index, elemento){
                    
					//Evaluamos si es el seleccionado
					if(elemento.id == data['INFO']['id_region']){
					
						$('#modal_editar_imprenta #region')
						.append(`<option selected value="`+elemento.id+`">`+elemento.nombre+`</option>`);
					
					}else{
						
						$('#modal_editar_imprenta #region')
						.append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);
						
					}//Fin del if
					
                });//Fin del each
				
				//Mostramos las opciones
				$(data['ESTATUS']).each(function(index, elemento){
                    
					//Evaluamos si es el seleccionado
					if(elemento.valor == data['INFO']['id_estatus']){
					
						$('#modal_editar_imprenta #estatus_imprenta')
						.append(`<option selected value="`+elemento.valor+`">`+elemento.descripcion+`</option>`);
					
					}else{
						
						$('#modal_editar_imprenta #estatus_imprenta')
						.append(`<option value="`+elemento.valor+`">`+elemento.descripcion+`</option>`);
						
					}//Fin del if
					
                });//Fin del each
				
				//Mostramos los btn
				$('#modal_editar_imprenta .modal-footer')
				.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
						<button id_impren="`+data['INFO']['id']+`" type="button" class="btn btn-danger" id="confirm_eliminar_imprenta">Eliminarimprenta</button>					   
						<button id_impren="`+data['INFO']['id']+`" type="button" class="btn btn-warning" id="guardar_editar_imprenta">Guardar</button>`);

			
			}else{
				
			//Mostramos el mensaje de error
			$('#modal_editar_imprenta .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
	
};//Fin de la función $.fn.info_imprenta 
/*************************************/

/*
	Función que guarda la edición de la imprenta
*/

$.fn.editar_imprenta = function(id_imprenta){
	
	var validador = $.fn.validar_editar_imprenta();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		var nombre   = $('#nombre').val();
		var region   = $('#region').val();
		var estatus  = $('#estatus_imprenta').val()
		
		$.ajax({
				
			url: 'C_imprentas/editar_imprenta',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre     : nombre,
					region     : region,
					id_imprenta : id_imprenta,
				    estatus    : estatus
				
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_editar_imprenta .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_editar_imprenta .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
				         <strong>Ocurrió un error!</strong>, intenta de nuevo.
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	 <button type="button" class="btn btn-danger" id="guardar_editar_imprenta" id_impren="`+id_imprenta+`">Guardar</button>
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
						$('#modal_editar_imprenta .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	         <button type="button" class="btn btn-danger" id="guardar_editar_imprenta" id_impren="`+id_imprenta+`">Guardar</button>
							   </div>`);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_editar_imprenta .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	         <button type="button" class="btn btn-danger" id="guardar_editar_imprenta" id_impren="`+id_imprenta+`">Guardar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_editar_imprenta .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					   	     <button type="button" class="btn btn-danger" id="guardar_editar_imprenta" id_impren="`+id_imprenta+`">Guardar</button>
						   </div>`);
							
				}//Fin del if
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
		
	}//Fin del if
	
};//Fin de la función guardar_editar_imprenta*/
/******************************************/

/*
	Función que valida el formulario para editar la imprenta
*/  
$.fn.validar_editar_imprenta = function(){
	
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
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la imprenta es requerido!');
		
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
	
};//Fin de la función $.fn.validar_editar_imprenta   
/***********************************************/
/*
	Función que busca la imprenta según el tipeo del imprenta
*/
$.fn.buscar_imprenta = function(valor){
	
	//Evaluamos si hay una petición
	if(xhr != null){
		
		xhr.abort();
			
	}//Fin del if
	
	xhr = $.ajax({
		url: 'C_imprentas/buscar_imprenta',
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
					
					//Recorremos los imprenta
					$(data).each(function(index, elemento){
                        
						$('#sugerencias')
						.append(`<div id="`+elemento['id']+`" class="dropdown-item">
								  
								  <span class="imprenta">`+elemento['nombre']+`</span>
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
	
};//Fin de la función $.fn.buscar_imprenta
/***************************************/

/*
	Función que elimina una imprenta
*/
$.fn.eliminar_imprenta = function(id_imprenta){
	
	$.ajax({
				
		url: 'C_imprentas/eliminar_imprenta',
		type: 'POST',
		dataType: 'json',
		data: {
				id_imprenta : id_imprenta
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#modal_editar_imprenta .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_imprenta .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta de nuevo.
					 <button type="button" class="btn btn-success eliminar_imprenta" id_impren="`+id_imprenta+`">Reintentar</button>
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
					$('#modal_editar_imprenta .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-success" data-dismiss="modal">Ok!</button>
						   </div>`);
					
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_editar_imprenta .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							 <button type="button" class="btn btn-success eliminar_imprenta" id_impren="`+id_imprenta+`">Reintentar</button>
						   </div>`);
					
				}//Fin del if
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_editar_imprenta .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
						 <button type="button" class="btn btn-success eliminar_imprenta" id_impren="`+id_imprenta+`">Reintentar</button>
					   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.eliminar_imprenta
/*****************************************/
















modelo del webervice



	
	
	
	
	/*
		Descripción : Método que registra a una  nueva imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre    , Tipo => Varchar, Obligatorio => Si,
					  Nombre => region     , Tipo => Varchar, Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_imprenta($datos){
		
		//Query para el tipo de imprenta
	    $sql = "SELECT COUNT(1) existe
		        FROM imprenta i
				WHERE nombre = '".$datos['nombre']."'";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		//Evaluamos si ya hay una imprenta con esa misma imprenta
		if(intval($resultado['existe']) == 0){
			
			//Iniciamos una transaccion
		    $this->db->trans_begin();
			
			$respuesta = array(
								   'CODIGO_RESPUESTA'  => 1, 
								   'MENSAJE_RESPUESTA' => 'Imprenta registrada!'
								  );
			
			//Parametros para insertar la imprenta
			$parametros = array(
								'nombre'           => $datos['nombre'],
							    'precio_imprenta'  => $datos['precio_imprenta'],
				                'id_estatus' => 1
				
							
						  );
			
			//Evaluamos si se creo la imprenta
			if($this->db->insert('imprenta', $parametros)){
				
				$this->db->trans_commit();
					
					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1, 
									   'MENSAJE_RESPUESTA' => 'imprenta registrada!'
									  );
									  
				
			}else{
				
				$this->db->trans_rollback();
				
				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0, 
								   'MENSAJE_RESPUESTA' => 'No se pudo registrar la imprenta!'
								  );
				
			}//Fin del if
			
		}else{
			
			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2, 
							   'MENSAJE_RESPUESTA' => 'La imprenta ya se encuentra registrada!'
							  );
			
		}//Fin del if
		
		
		return $respuesta;
		
	}//Fin del método registrar_imprenta
	/*********************************/
	
	/*
		Descripción : Método que lista la información de la imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							NOMBRE            => Varchar,
							REGION            => Int
							
					  ) 
	*/
	public function info_imprenta($datos){
		
		//Query para el tipo de imprenta
		$sql = "SELECT rc.id,
		               rc.nombre,
					   rc.id_region
			      FROM region_imprenta rc
				  WHERE rc.id = ".$datos['id_imprenta'];
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
	
		return $resultado;
		
	}//Fin del método info_imprenta
	/****************************/
	
	/*
		Descripción : Método que lista los estatus de  la imprenta
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     ID          => Int, 
		                     DESCRIPCION => Varchar
						   ). 
	*/
	public function estatus_imprenta(){
		
		//Query para el estatus de la imprenta
		$sql = "SELECT valor,
		               descripcion
		        FROM estatus
				WHERE tabla = 'region_imprenta'
				ORDER BY descripcion ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método estatus_imprenta
	/*******************************/
	
	/*
		Descripción : Método que edita la información del usuario
		Parametros  : Nombre => id_imprenta  , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => region     , Tipo => Int     , Obligatorio => Si,
					
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_imprenta($datos){
		
		//Parametros para insertar los cambios en los datos de la imprenta
		$parametros = array(
								
						'nombre'    => $datos['nombre'],
						'id_region' => $datos['region'],
						'id_estatus' => $datos['estatus']
						  );
			//var_dump ($parametros)	; exit(); 
		
		
		//Iniciamos una transaccion
		$this->db->trans_begin();
		
		$this->db->where('id', $datos['id_imprenta']);
		
		//Evaluamos si se creo la imprenta
		if($this->db->update('region_imprenta', $parametros)){
			
			$this->db->trans_commit();
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'imprenta actualizada!'
							  );
								  
		}else{
			
			$this->db->trans_rollback();
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar la imprenta!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método editar_imprenta
	/******************************/
	
	/*
		Descripción : Método que busca a una imprenta por nombre 
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_imprenta($datos){
		
		//Query para el nombre de la imprenta
		 $sql = "SELECT rc.id,
					    rc.nombre
				   FROM region_imprenta rc
				  WHERE LOWER(rc.nombre) LIKE LOWER('%".$datos['descripcion']."%')
				ORDER BY nombre ASC
				LIMIT 0,6";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método buscar_imprenta
	/******************************/
	
	/*
		Descripción : Método que elimina la imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_imprenta($datos){
		
		$this->db->where('id', $datos['id_imprenta']);
		
		//Evaluamos si se elimina
        if($this->db->delete('region_imprenta')){
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'imprenta Eliminada!'
							  );
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método eliminar_imprenta
	/********************************/
	