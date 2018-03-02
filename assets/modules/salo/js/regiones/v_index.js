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
       $('#sugerencias').addClass('show');

		 };//Fin del if

   });//Fin del evento focus

   //Evento focus sobre el campo
   $('#busc_nombre_reg').focusout(function(e){

		setTimeout(function(){

			//Agregamos la clase
		  $('#sugerencias').parent('.dropdown').removeClass('show');
      $('#sugerencias').removeClass('show');

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
	$('#guardar').unbind('click');
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
	
	
	/*
		Evento click sobre .lista_comuna
	*/
	$('.lista_comuna').unbind('click');
	$('.lista_comuna').click(function(){

		//Obtenemos le id de la región y su nombre
		var id_reg   = $(this).attr('id');
		var desc_reg = $(this).parents('tr').children('td').eq(0).text().toLowerCase();

		$.fn.modal_lista_comuna(id_reg,desc_reg);

	});//Fin del evento click

	/*
		Evento click sobre .agregar_comuna
	*/
	$('.agregar_comuna').unbind('click');
	$('.agregar_comuna').click(function(){

		//Verificamos la cantidad de comunas
		if($('.comuna').length < 3){

			//Obtenemos le id de la region
			var id_reg = $(this).attr('id_reg');
			
			$.fn.agregar_comuna(id_reg);

		}else{

			//Mostramos el mensaje de éxito
			$('#modal_comunas .modal-footer')
			.html(`<div class="alert alert-warning" role="alert">
					 <strong>Solo se pueden agregar hasta 3 comunas</strong>
				   </div>`);

			setTimeout(function(){

				//Mostramos el btn
				$('#modal_comunas .modal-footer')
				.html(``);

				$.fn.eventos();

			},3000);

		}//Fin del if

	});//Fin del evento click
	
	/*
		Evento click sobre .eliminar_comuna
	*/
	$('.eliminar_comuna').unbind('click');
	$('.eliminar_comuna').click(function(){

		//Obtenemos el id de la region y de la comunas
		var id     = $(this).attr('id');
		var id_reg = $(this).attr('id_reg');

		$.fn.eliminar_comuna(id,id_reg);

	});//Fin del evento click


	
	/*
		Evento click sobre .editar_comuna
	*/
	$('.editar_comuna').unbind('click');
	$('.editar_comuna').click(function(){

		//Obtenemos el id de la transportista y del comuna
		var id        = $(this).attr('id');
		var id_reg = $(this).attr('id_reg');

		var contexto = $(this);

		$.fn.info_editar_comuna(id,id_reg,contexto);

	});//Fin del evento click

	/*
		Evento click sobre .cancelar_editar_comuna
	*/
	$('.cancelar_editar_comuna').unbind('click');
	$('.cancelar_editar_comuna').click(function(){

		//Obtenemos el id del establecimiento
		var id_reg = $(this).attr('id_reg');

		//Seteamos valores
		$('#nombre_comuna').val('');


		//Mostramos los nuevos botones
		$('.wrapper_btn_agregar')
		.html(`<button type="button" class="btn btn-success agregar_comuna" id_reg="`+id_reg+`">Agregar</button>`);

		$.fn.eventos();

		
	});//Fin del evento click


	/*
		Evento click sobre .guardar_editar_comuna
	*/
	$('.guardar_editar_comuna').unbind('click');
	$('.guardar_editar_comuna').click(function(){
		
		//Obtenemos el id de la región y de la comuna
		var id        = $(this).attr('id');
		var id_reg = $(this).attr('id_reg');
		
		$.fn.editar_comuna(id,id_reg);

	});//Fin del evento click

	/*
		Evento keyup sobre el campo #nombre_comuna
	*/
	$('#nombre_comuna').unbind('keyup');
	$('#nombre_comuna').keyup(function(){

		//Removemos el mensaje de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		$.fn.eventos();

	});//Fin del evento keyup

	
	
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

					var tabla = `<table class="table table-striped"s>
      								  <thead>
      										<tr>
      											<th class="text-center">Nombre</th>
      											<th class="text-center">Número</th>
      											<th class="text-center"></th>
      										</tr>
      									</thead>
      								  <tbody>`;

					//Recorremos los resultados
					$(data['regiones']).each(function(index, elemento){

						tabla += `<tr>
      									<td>`+elemento.nombre+`</td>
      									<td>`+elemento.numero+`</td>
      									<td>
      										<i id="`+elemento.id+`" class="fa fa-search editar_region" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Región"></i>
      										<i id="`+elemento.id+`" class="fa fa-map-marker lista_comuna" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Comunas Asociadas"></i>
      									</td>
      								</tr>`

                    });//Fin del each
					
					

					tabla += ` </tbody>
							      </table>`;

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
						<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
						<button type="button" class="btn btn-success" id="guardar">Guardar</button>
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
					$('#busc_nombre_reg').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
					.html('<i class="fa fa-times-circle tips reiniciar_filtro" aria-hidden="true" title="Reiniciar filtro"></i>');

				}else{

					//Removemos los tooltips
					$('body .tooltip.bs-tether-element').remove();

					//Removemos el icono para reiniciar el filtro
					$('#busc_nombre_reg').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
			    .html('<i class="fa fa-search" aria-hidden="true"></i>');

					$('#busc_nombre_reg').val('');

				}//Fin del if

				var tabla = `<table class="table table-striped">
      								<thead>
      									<tr>
      										<th class="text-center">Nombre</th>
      										<th class="text-center">Numero</th>
      										<th class="text-center"></th>
      									</tr>
      								</thead>
      								<tbody>`;

				//Recorremos los resultados
				$(data).each(function(index, elemento){

					tabla += `<tr>
      								<td>`+elemento.nombre+`</td>
      								<td>`+elemento.numero+`</td>
      								<td>
      									<i id="`+elemento.id+`" class="fa fa-search editar_region" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Región"></i>
      									<i id="`+elemento.id+`" class="fa fa-map-marker lista_comuna" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Comunas Asociadas"></i>
      								</td>
      							  </tr>`;

				});//Fin del each

				tabla += `  </tbody>
						      </table>`;

				//Mostramos el mensaje
				$('.wrapper_regiones').append(tabla);

			}else{

				//Mostramos el mensaje
				$('.wrapper_regiones')
				.append(`<div class="alert alert-warning" role="alert">
                  <strong>No hay regiones registradas!.</strong>
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

		//Obtenemos el rango
		var rango = $('.page-item.active').children('.page-link').attr('rango');

		//Listamos los regions
		$.fn.regiones(0,rango,0);

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
				.html(`<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
						<button id_reg="`+data['INFO']['id']+`" type="button" class="btn btn-danger" id="confirm_eliminar_region">Eliminar Region</button>
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
      $('#sugerencias').removeClass('show');
			$('#sugerencias').html('');

			//Mostramos el icono de carga
			$('#busc_nombre_reg').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj) {

			xhr = null;

			//Ocultamos el icono de carga
			$('#busc_nombre_reg').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');

			$.fn.eventos();

		},
		success: function(data){

			xhr = null;

			//Ocultamos el icono de carga
			$('#busc_nombre_reg').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');

			//Evaluamos data
			if(data != null){

				if(data.length > 0){

					//Agregamos la clase
					$('#sugerencias').parent('.dropdown').addClass('show');
          $('#sugerencias').addClass('show');

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
        $('#sugerencias').removeClass('show');

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

/*
	Función que muestra la ventana modal para ver los contatcos asociados al establecimiento
*/
$.fn.modal_lista_comuna = function(id_reg,desc_reg){

	var modal = `<div class="modal fade" id="modal_comunas" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Comunas Asociadas a la región <span class="text-capitalize">`+desc_reg+`</span></h5>
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
	$('#modal_comunas').modal({backdrop : 'static'})

	//Evento cuando abra la modal
	$('#modal_comunas').on('shown.bs.modal', function(e){

		$.fn.info_comuna(id_reg);

		//Función que declaran todos los eventos
		$.fn.eventos()

	});

	//Evento cuando se cierre la modal
	$('#modal_comunas').on('hidden.bs.modal', function(e){

		$(this).remove();

	});

	//Mostramos la modal
	$('#modal_comunas').modal('show');

};//Fin de la función $.fn.modal_lista_comuna
/********************************************/

/*
	Función que lista la información de la comuna asociada a la región
*/
$.fn.info_comuna = function(id_reg){

	$.ajax({

		url: 'C_regiones/info_comunas',
		type: 'POST',
		dataType: 'json',
		data: {
				id_reg : id_reg
			  },
		beforeSend: function(objeto){

			//Mostramos el icono de carga
			$('#modal_comunas .modal-body')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#modal_comunas .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Evaluamos si hay comunas asociados
			if(data['COMUNAS'] != null){

				var comunas = ``;

				//Recorremos los resultados
				$(data['COMUNAS']).each(function(index, elemento){

					comunas += `<tr class="comuna">
									<td>`+elemento.nombre+`</td>
									<td>`+elemento.estatus+`</td>

									<td>
										<i id_reg="`+id_reg+`" id="`+elemento.id+`" class="fa fa-pencil editar_comuna" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar"></i>
										<i id_reg="`+id_reg+`" id="`+elemento.id+`" class="fa fa-trash eliminar_comuna" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
									</td>
								  </tr>`;

				});//Fin del

			}else{

				var comunas = `<tr>
				                 	<td colspan="5">
										<div class="alert alert-warning" role="alert">
										  <strong>No hay comunas registradas!.</strong>
										</div>
									</td>
								 </tr>`;

			}//Fin del if

			//Ocultamos el icono de carga
			$('#modal_comunas .modal-body')
			.html(`
			       <form class="form">
			          <div class="row">
						  <div class="form-group col-6">
							<input type="text" class="form-control text-capitalize" id="nombre_comuna" placeholder="Nombre">
							<div class="form-control-feedback text-left"></div>
						  </div>

						  <div class="form-group col-12 wrapper_btn_agregar">
						    <button type="button" class="btn btn-success agregar_comuna" id_reg="`+id_reg+`">Agregar</button>
						  </div>
					  </div>
				   </form>


				   <table id="tabla_comunas" class="table table-striped">
						<thead>
						    <tr>
								<th class="text-center" colspan="5">Comunas Asociadas</th>
							</tr>
							<tr>
								<th class="text-center">Nombre</th>
								<th class="text-center">Estatus</th>
								<th class="text-center"></th>
							</tr>
						</thead>
						<tbody>
							`+comunas+`
						</tbody>
				    </table>
				   `);


			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip();

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.info_comuna
/**************************************/


/*
	Función que asocia a una comuna a una región
*/
$.fn.agregar_comuna = function(id_reg){

	var validador = $.fn.validar_comuna();

	//Evaluamos el validador
	if(validador){

		$.ajax({

			url: 'C_regiones/asociar_comuna',
			type: 'POST',
			dataType: 'json',
			data: {
					id_reg   : id_reg,
					nombre   : $('#nombre_comuna').val()

				  },
			beforeSend: function(objeto){

				//Mostramos el icono de carga
				$('.wrapper_btn_agregar')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

			},
			error: function(objeto, quepaso, otroobj){

				//Ocultamos el icono de carga
				$('.wrapper_btn_agregar').html('<button type="button" class="btn btn-success agregar_comuna" id_reg="'+id_reg+'">Agregar</button>');

				//Mostramos el mensaje de error
				$('#modal_comunas .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al agregar la comuna!</strong>, intenta de nuevo.
					   </div>`);

				$.fn.eventos();

			},
			success: function(data){

				//Ocultamos el icono de carga
				$('.wrapper_btn_agregar').html('<button type="button" class="btn btn-success agregar_comuna" id_reg="'+id_reg+'">Agregar</button>');

				//Evaluamos si hay respusta
				if(data != null){

					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){

						//Limpiamos los campos
						$('#nombre_comuna').val('');

						//Mostramos el mensaje de éxito
						$('#modal_comunas .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);

						$.fn.comunas_reg(id_reg);

					}else{

						//Mostramos el mensaje de error
						$('#modal_comunas .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);

					}//Fin del if

				}else{

					//Mostramos el mensaje de error
					$('#modal_comunas .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Ocurrió un error al agregar la comuna!</strong>, intenta de nuevo.
						   </div>`);

				}//Fin del if

				//Ocultamos el mensaje
				setTimeout(function(){

					//Mostramos el btn
					$('#modal_comunas .modal-footer')
					.html(``);

				},3000);

				$.fn.eventos();

			}//Fin del success

		});//Fin del ajax

	}//Fin del if validador

};//Fin de la función $.fn.agregar_comuna
/*****************************************/

/*
	Función que valida el formulario para una nueva comuna
*/
$.fn.validar_comuna = function(){

	var respuesta = false;

	//Obtenemos los campos
	var nombre   = $('#nombre_comuna');
	
	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
 	nombre.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){

		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la comuna es requerido!');

	}else{

		
			respuesta = true;



		}//Fin del if nombre

	return respuesta;

};//Fin de la función $.fn.validar_nueva_region
/**********************************************/


/*

	Función que lista las comunas asociadas a la región
*/
$.fn.comunas_reg = function(id_reg){

	$.ajax({

		url: 'C_regiones/comunas_region',
		type: 'POST',
		dataType: 'json',
		data: {
				id_reg : id_reg
			  },
		beforeSend: function(objeto){



		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#modal_comunas .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al mostrar las comunas!</strong>, intenta de nuevo.
				   </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Evaluamos si hay comunas
			if(data != null){

				var comunas = ``;

				//Recorremos los resultados
				$(data).each(function(index, elemento){

					comunas += `<tr class="comuna">
									<td>`+elemento.nombre+`</td>
									<td>`+elemento.estatus+`</td>
									<td>
										<i idreg="`+id_reg+`" id="`+elemento.id+`" class="fa fa-pencil editar_comuna" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar"></i>
										<i id_reg="`+id_reg+`" id="`+elemento.id+`" class="fa fa-trash eliminar_comuna" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
									</td>
								  </tr>`;

				});//Fin del

			}else{

				var comunas = `<tr>
				                 	<td colspan="5">
										<div class="alert alert-warning" role="alert">
										  <strong>No hay comunas registradas!.</strong>
										</div>
									</td>
								 </tr>`;

			}//Fin del if

			//Removemos los tooltips
			$('.tooltips').remove();

			$('#tabla_comunas tbody').html(comunas);


			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip();

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.comunas_reg
/*************************************/


/*
	Función que elimina una comuna de la region
*/
$.fn.eliminar_comuna = function(id,id_reg){

	$.ajax({

		url: 'C_regiones/eliminar_comuna',
		type: 'POST',
		dataType: 'json',
		data: {
				id : id
			  },
		beforeSend: function(objeto){

			//Mostramos el icono de carga
			$('#modal_comunas .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#modal_comunas .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al agregar la comuna!</strong>, intenta de nuevo.
				   </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Evaluamos si hay respusta
			if(data != null){

				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){

					//Mostramos el mensaje de éxito
					$('#modal_comunas .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);

					$.fn.comunas_reg(id_reg);

				}else{

					//Mostramos el mensaje de error
					$('#modal_comunas .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);

				}//Fin del if

			}else{

				//Mostramos el mensaje de error
				$('#modal_comunas .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al eliminar la comuna!</strong>, intenta de nuevo.
					   </div>`);

			}//Fin del if

			//Ocultamos el mensaje
			setTimeout(function(){

				//Mostramos el btn
				$('#modal_comunas .modal-footer')
				.html(``);

			},3000);

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función .fn.eliminar_comuna
/*****************************************/


/*
	Función que lista los datos que puede ser editados de la comuna
*/
$.fn.info_editar_comuna = function(id,id_reg,contexto){

	//Obtenemos la fila
	var fila = contexto.parents('.comuna');

	//Obtenemos los valores
	var nombre   = fila.children('td').eq(0).text().toLowerCase();
	

	//Seteamos valores
	$('#nombre_comuna').val(nombre).css("text-transform","capitalize");
	
	//Mostramos los nuevos botones
	$('.wrapper_btn_agregar')
	.html(`<button type="button" class="btn btn-danger cancelar_editar_comuna" id_reg="`+id_reg+`">Cancelar</button>
	       <button type="button" class="btn btn-success guardar_editar_comuna" id="`+id+`" id_reg="`+id_reg+`">Guardar</button>`);

	$.fn.eventos();

};//Fin de la función $.fn.info_editar_comuna
/********************************************/

/*
	Función que edita los datos de un comuna
*/
$.fn.editar_comuna = function(id_comuna,id_reg){
		
	var validador = $.fn.validar_comuna();

	//Evaluamos el validador
	if(validador){
		
		$.ajax({

			url: 'C_regiones/editar_comuna',
			type: 'POST',
			dataType: 'json',
			data: {
					id_comuna : id_comuna,
					nombre    : $('#nombre_comuna').val()

				  },
			beforeSend: function(objeto){

				//Mostramos el icono de carga
				$('#modal_comunas .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

			},
			error: function(objeto, quepaso, otroobj){

				//Mostramos el mensaje de error
				$('#modal_comunas .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al editar el comuna!</strong>, intenta de nuevo.
					   </div>`);

				$.fn.eventos();

			},
			success: function(data){

				//Evaluamos si hay respusta
				if(data != null){

					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){

						//Mostramos el mensaje de éxito
						$('#modal_comunas .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);

						$.fn.comunas_reg(id_reg);

						//Seteamos valores
						$('#nombre_comuna').val('');


						//Mostramos los nuevos botones
						$('.wrapper_btn_agregar')
						.html(`<button type="button" class="btn btn-success agregar_comuna" id_reg="`+id_reg+`">Agregar</button>`);

						setTimeout(function(){

							//Mostramos el btn
							$('#modal_comunas .modal-footer')
							.html(``);

							$.fn.eventos();

						},3000);

					}else{

						//Mostramos el mensaje de error
						$('#modal_comunas .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);

					}//Fin del if

				}else{

					//Mostramos el mensaje de error
					$('#modal_comunas .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Ocurrió un error al editar la comuna!</strong>, intenta de nuevo.
						   </div>`);

				}//Fin del if

				$.fn.eventos();

			}//Fin del success

		});//Fin del ajax

	}//Fin del if

};//Fin de la función $.fn.editar_comuna
/****************************************/
