//Variables globales
var xhr;

/*
	Evento document ready
*/
$(document).ready(function(){

   $.fn.data_inicial();

	//Evento focus sobre el campo
   $('#busc_nombre_impr').focusin(function(e){

		 //Evaluo si hay resultados previos
		 if($('#sugerencias .dropdown-item').length > 0){

			 //Agregamos la clase
			 $('#sugerencias').parent('.dropdown').addClass('show');
       $('#sugerencias').addClass('show');

		 };//Fin del ifº

   });//Fin del evento focus

   //Evento focus sobre el campo
   $('#busc_nombre_impr').focusout(function(e){

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
		Evento keyup sobre #form_imprenta .precio
	*/
	/*$('#form_imprenta .precio').unbind('keyup')
	$('#form_imprenta .precio').keyup(function(){

		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		//Obtenemos la cantidad
		var precio = $(this).autoNumeric('get');

		//Obtenemos el precio
		var cantidad = $(this).parents('.row').find('.cantidad').autoNumeric('get');

		//Evaluamos si hay cantidad
		if(isNaN(cantidad)){

			cantidad = 0;

		}//Fin del if

		$.fn.eventos();

	});*///Fin del evento keyup
	/***********************/


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
		var id_imprenta = $(this).attr('id_imp');

		$.fn.editar_imprenta(id_imprenta);

	});//Fin del evento click


	/*
		Evento click sobre #orden_imprenta
	*/
	$('.orden_imprenta').unbind('click');
	$('.orden_imprenta').click(function(){

		//Obtenemos el id de la imprenta
		var id_imprenta = $(this).attr('id');

		//Abrimos la ventana modal
		$.fn.modal_orden_imprenta(id_imprenta);

	});//Fin del evento click



	/*
		Evento keyup sobre el campo #busc_nombre_imp
	*/
	$('#busc_nombre_imp').unbind('keyup');
	$('#busc_nombre_imp').keyup(function(){

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

		$('#busc_nombre_imp').val(imprenta);
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
		var id_imprenta = $(this).attr('id_imp');

		//Mostramos el mensaje de error
		$('#modal_editar_imprenta .modal-footer')
		.html(`<div class="alert alert-danger" role="alert">
				 <strong>¿Está seguro de eliminar ésta imprenta?</strong>
				 <button type="button" class="btn btn-success cancelar_eliminar" id_imp="`+id_imprenta+`">No</button>
				 <button type="button" class="btn btn-danger eliminar_imprenta" id_imp="`+id_imprenta+`">Si</button>
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
		var id_imprenta = $(this).attr('id_imp');

		//Mostramos el mensaje de error
		$('#modal_editar_imprenta .modal-footer')
		.html(`<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
			     <button id_imp="`+id_imprenta+`" type="button" class="btn btn-danger" id="confirm_eliminar_imprenta">Eliminar imprenta</button>
			     <button id_imp="`+id_imprenta+`" type="button" class="btn btn-warning" id="guardar_editar_imprenta">Guardar</button>`);

		$.fn.eventos();

	});//Fin del evento click
	/***********************/

	/*
		Evento click sobre .eliminar_imprenta
	*/
	$('.eliminar_imprenta').unbind('click');
	$('.eliminar_imprenta').click(function(){

		//Obtenemos el id del imprenta
		var id_imprenta = $(this).attr('id_imp');

		$.fn.eliminar_imprenta(id_imprenta);

		$.fn.eventos();

	});//Fin del evento click
	/***********************/

	/*
		Evento keyup sobre el campo #establecimiento
	*/
	$('#establecimiento').unbind('keyup');
	$('#establecimiento').keyup(function(){

		//Removemos el id del ee
		$(this).removeAttr('id_ee');

		//Ocultamos el mensaje de error
		$('#wrapper_establecimiento').parent('.form-group').removeClass('has-danger');
		$('#wrapper_establecimiento').parent('.form-group').children('.form-control-feedback')
		.html('');

		//Obtengo el valor
		var valor = $(this).val();

		//Evaluamos si hay valores seleccionados
		if($(this).attr('seleccionado')){

			//Removemos los atributos
			$(this).removeAttr('seleccionado');
			$(this).removeAttr('id_ee');

			//Mostramos la ayuda por defecto
			$('#eeHelp')
			.html('Escriba el nombre del establecimiento.');

		}//Fin del if

		//Evaluo
		if(valor.trim() == ''){

			$(this).val(valor.trim());

		}else{

			$.fn.buscar_establecimiento(valor);

		}//Fin del if

		$.fn.eventos();

	});//Fin del evento keyup
	/***********************/

	/*
		Evento click sobre #wrapper_establecimiento #sugerencias .dropdown-item
	*/
	$('#wrapper_establecimiento #sugerencias .dropdown-item').unbind('click');
	$('#wrapper_establecimiento #sugerencias .dropdown-item').click(function(){

		//Obtenemos los datos del establecimiento
		var id_ee  = $(this).attr('id');
		var ee     = $(this).children('.item_establecimiento').children('span:eq(0)').text();
		var region = $(this).children('.item_establecimiento').attr('region');
		var comuna = $(this).children('.item_establecimiento').attr('comuna');

		//Seteamos el atributo
		$('#establecimiento').attr('seleccionado',true);
		$('#establecimiento').attr('id_ee',id_ee);

		//Mostramos la región donde se ubica
		$('#eeHelp')
		.html('<b><u>Ubicación:</u></b> '+ region+' - '+comuna);

		$('#establecimiento').val(ee);
		$('#wrapper_establecimiento #sugerencias').html('');

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


};//Fin de la función eventos
/***************************/

/*
	Función que obtiene la data inicial para armar la vista
*/
$.fn.data_inicial = function(){

	$.ajax({

		url: 'C_imprentas/data_inicial',
		type: 'POST',
		dataType: 'json',
		data:{
  			  id_imprenta : 0,
  			  rango       : 0
  			 },
		beforeSend: function(objeto){

			//Bloqueamos los siguientes elementos
			$('#busc_nombre_imp').attr('disabled',true);
			$('#buscar').attr('disabled',true);

			//Mostramos el icono de carga
			$('.wrapper_imprentas').html('');
			$('.wrapper_imprentas').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj){

			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_imp').removeAttr('disabled');
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
			$('#busc_nombre_imp').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');

			//Ocultamos el icono de carga
			$('.wrapper_imprentas').html('');

			//Evaluamos data
			if(data != null){

				//Evaluamos si hay imprentas
				if(data['imprentas'] != null){

					var tabla = `
								  <table class="table table-striped"s>
								    <thead>
										<tr>
											<th class="text-center">Nombre</th>
											<th class="text-center">Precio</th>
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
										<i id="`+elemento.id+`" class="fa fa-search editar_imprenta" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Imprenta"></i>


										<i id="`+elemento.id+`" class="fa fa-drivers-license orden_imprenta" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Orden"></i>

									</td>
								  </tr>
						        `

                    });//Fin del each

					tabla += `
						        </tbody>
							  </table>
						     `;

					//Obtenemos el número de imprentas
					var numImp = data['num_imp'];
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

					//Mostramos las imprentas
					$('.wrapper_imprentas').append(tabla);

					//Mostramos el paginador
					$('.wrapper_paginador').append(paginador);

				}else{

					//Mostramos el mensaje
					$('.wrapper_imprentas')
				.append(`<div class="alert alert-warning" role="alert">
						  <strong>No hay imprentas registradas!.</strong>
						 </div>`);

				}//Fin del if

			}else{

				//Mostramos el mensaje
				$('.wrapper_imprentas')
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
						<form id="form_imprenta">
							<div class="form-group">
								<label for="nombre">Nombre</label>
								<input type="text" class="form-control" id="nombre">
								<div class="form-control-feedback"></div>
							</div>
							<div class="form-group">
								<label for="direccion">Dirección</label>
								<input type="text" class="form-control" id="direccion">
								<div class="form-control-feedback"></div>
							</div>
							<div class="form-group col-2">
								<label for="precio">Precio x Impresión</label>
								<input type="text" class="form-control" id="precio">
								<div class="form-control-feedback"></div>
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
	$('#modal_nueva_imprenta').modal({backdrop : 'static'})

	//Evento cuando abra la modal
	$('#modal_nueva_imprenta').on('shown.bs.modal', function(e){

		//Creamos el formato autonumerico para los siguientes elementos
	/*	$('#form_imprenta .precio').autoNumeric('init',{
			aDec   : ',',
			aSep   : '.',
			aSign  : '$',
			mDec   : 2,
			vMin   : '0.00'
		});		*/

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
/**********************************************/

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
			$('#busc_nombre_imp').attr('disabled',true);
			$('#buscar').attr('disabled',true);

			//Mostramos el icono de carga
			$('.wrapper_imprentas').html('');
			$('.wrapper_imprentas').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

			//Ocultamos el paginador
			$('.wrapper_paginador').hide();

		},
		error: function(objeto, quepaso, otroobj){

			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_imp').removeAttr('disabled');
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
			$('#busc_nombre_imp').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');

			//Ocultamos el icono de carga
			$('.wrapper_imprentas').html('');

			//Evaluamos datas
			if(data != null){

				//Evaluamos el id de la imprenta
				if(id_imprenta != 0){


					//Mostramos el icono para reiniciar el filtro
					$('#busc_nombre_imp').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
					.html('<i class="fa fa-times-circle tips reiniciar_filtro" aria-hidden="true" title="Reiniciar filtro"></i>');

				}else{

					//Removemos los tooltips
					$('body .tooltip.bs-tether-element').remove();

					//Removemos el icono para reiniciar el filtro
					$('#busc_nombre_imp').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
			    .html('<i class="fa fa-search" aria-hidden="true"></i>');

					$('#busc_nombre_imp').val('');

				}//Fin del if


				var tabla = `
							  <table class="table table-striped">
								<thead>
									<tr>
										<th class="text-center">Nombre</th>
										<th class="text-center">Precio</th>
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

									<i id="`+elemento.id+`" class="fa fa-drivers-license orden_imprenta" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Orden"></i>

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
		var nombre     = $('#nombre').val();
		var direccion  = $('#direccion').val();
		var precio     = $('#precio').val();
		//alert(nombre+' '+precio);
		$.ajax({

			url: 'C_imprentas/registrar_imprenta',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre        : nombre,
				    direccion     : direccion,
				    precio        : precio


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
						 <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
						 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
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
								 <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
							   </div>`);

				    }else{

						//Mostramos el mensaje de error
						$('#modal_nueva_imprenta .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
							   </div>`);

					}//Fin del if

				}else{

					//Mostramos el mensaje de error
					$('#modal_nueva_imprenta .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
							 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
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
	var direccion = $('#direccion');
	var precio    = $('#precio');


	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
    direccion.parents('.form-group').removeClass('has-danger');
	precio.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	direccion.parents('.form-group').find('.form-control-feedback').html('');
	precio.parents('.form-group').find('.form-control-feedback').html('');

	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){

		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la imprenta es requerido!');

	}else{

			//Evaluamos la dirección
			if(direccion.val().trim() == ''){

				//Indicamos error
				direccion.parents('.form-group').addClass('has-danger');
				direccion.parents('.form-group').find('.form-control-feedback').html('La dirección de la imprenta es requerida!');

			}else{


				//Evaluamos el precio
				if(precio.val() == ''){

					//Indicamos error
					precio.parents('.form-group').addClass('has-danger');
					precio.parents('.form-group').find('.form-control-feedback').html('Campo Requerido!');

				}else{

					respuesta = true;

				}//Fin del if

			}//fin del if de la dirección

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
									<label for="precio">Precio x Imprenta</label>
									<input type="text" class="form-control" id="precio" value="`+data['INFO']['precio']+`">
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

				//Mostramos el impbo de precioes
				$('#modal_editar_imprenta #precio')
				.append(`<option value="" disabled>Seleccione...</option>`);

				//Mostramos las opciones
				$(data['precio']).each(function(index, elemento){

					//Evaluamos si es el seleccionado
					if(elemento.id == data['INFO']['id_precio']){

						$('#modal_editar_imprenta #precio')
						.append(`<option selected value="`+elemento.id+`">`+elemento.nombre+`</option>`);

					}else{

						$('#modal_editar_imprenta #precio')
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
				.html(`<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
						   <button id_imp="`+data['INFO']['id']+`" type="button" class="btn btn-danger" id="confirm_eliminar_imprenta">Eliminar imprenta</button>
						   <button id_imp="`+data['INFO']['id']+`" type="button" class="btn btn-warning" id="guardar_editar_imprenta">Guardar</button>`);


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
		var precio   = $('#precio').val();
		var estatus  = $('#estatus_imprenta').val()

		$.ajax({

			url: 'C_imprentas/editar_imprenta',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre      : nombre,
					precio      : precio,
					id_imprenta : id_imprenta,
				    estatus     : estatus

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
						     <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
					   	   <button type="button" class="btn btn-danger" id="guardar_editar_imprenta" id_imp="`+id_imprenta+`">Guardar</button>
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
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
					   	         <button type="button" class="btn btn-danger" id="guardar_editar_imprenta" id_imp="`+id_imprenta+`">Guardar</button>
							   </div>`);

					}else{

						//Mostramos el mensaje de error
						$('#modal_editar_imprenta .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
					   	         <button type="button" class="btn btn-danger" id="guardar_editar_imprenta" id_imp="`+id_imprenta+`">Guardar</button>
							   </div>`);

					}//Fin del if

				}else{

					//Mostramos el mensaje de error
					$('#modal_editar_imprenta .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
					   	     <button type="button" class="btn btn-danger" id="guardar_editar_imprenta" id_imp="`+id_imprenta+`">Guardar</button>
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
	var precio   = $('#precio');
	var estatus  = $('#estatus_precio');

	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
	precio.parents('.form-group').removeClass('has-danger');
	estatus.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	precio.parents('.form-group').find('.form-control-feedback').html('');
	estatus.parents('.form-group').find('.form-control-feedback').html('');

	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){

		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la imprenta es requerido!');

	}else{



		//Evaluamos que la precio no sea vacia
		if(!precio.val()){

					//Indicamos error
					precio.parents('.form-group').addClass('has-danger');
					precio.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');


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
        $('#sugerencias').removeClass('show');

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
					 <button type="button" class="btn btn-success eliminar_imprenta" id_imp="`+id_imprenta+`">Reintentar</button>
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
							 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
							 <button type="button" class="btn btn-success eliminar_imprenta" id_imp="`+id_imprenta+`">Reintentar</button>
						   </div>`);

				}//Fin del if

			}else{

				//Mostramos el mensaje de error
				$('#modal_editar_imprenta .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
						 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
						 <button type="button" class="btn btn-success eliminar_imprenta" id_imp="`+id_imprenta+`">Reintentar</button>
					   </div>`);

			}//Fin del if

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.eliminar_imprenta
/*****************************************/

/*
	Función que muestra la ventana modal para realizar una orden a la imprenta
*/
$.fn.modal_orden_imprenta = function(){

	var modal = `<div class="modal fade" id="modal_orden_imprenta" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Orden Imprenta</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						  <span aria-hidden="true">×</span>
						</button>
					  </div>
					  <div class="modal-body">

						<form id="orden_imprenta">

							<div class="row">
								<div class="form-group col-12">
									<label for="establecimiento">Establecimiento Escolar</label>
									<div id="wrapper_establecimiento" class="dropdown">
										<input type="text" class="form-control" id="establecimiento" aria-describedby="eeHelp">
										<div id="sugerencias" class="dropdown-menu"></div>
									</div>
									<div class="form-control-feedback"></div>
									<small id="eeHelp" class="form-text text-muted">Escriba el nombre del establecimiento.</small>
								</div>
							</div>
							<div class="row">

								<div class="form-group col-4">
									<label for="fecha_despacho">Fecha </label>
									<div class="input-group">
										<input id="calendario" type="text" class="form-control" id="fecha_despacho">
										<span class="input-group-addon">
											<i class="fa fa-calendar" aria-hidden="true"></i>
										</span>
									</div>
									<div class="form-control-feedback"></div>
								</div>
							</div>
							<div class="row fila_item_desp_titulo">
								<div class="form-group col-2">
									<label>Módulo</label>
								</div>
								<div class="form-group col-3">
									<label>Asignatura</label>
								</div>
								<div class="form-group col-2">
									<label>Cant. Guías</label>
								</div>
								<div class="form-group col-2">
									<label>Precio x Guía</label>
								</div>
								<div class="form-group col-2">
									<label>Sub-total</label>
								</div>
								<div class="form-group col-1"></div>
							</div>
							<div class="row fila_item_desp">
								<div class="form-group col-2">
									<select class="form-control modulo">
										<option value="" selected disabled>Seleccione</option>
									</select>
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-3">
									<select class="form-control asignatura">
										<option value="" selected>Seleccione Módulo</option>
									</select>
									<div class="form-control-feedback mensaje_asignatura"></div>
								</div>
								<div class="form-group col-2">
									<input type="text" class="form-control cantidad">
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-2">
									<input type="text" class="form-control precio">
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-2">
									<input type="text" class="form-control subtotal" disabled>
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-1 opcion_despacho">
									<i class="fa fa-plus agregar_item_desp" aria-hidden="true"></i>
								</div>
							</div>
							<div class="row">
								<div class="form-group col-9"></div>
								<div class="form-group col-2">
									<label>Total</label>
									<input type="text" class="form-control total" disabled>
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-1"></div>
							</div>

						</form>

					  </div>
					  <div class="modal-footer">
						<button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
						<button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>
					  </div>
					</div>
				  </div>
				</div>`;

    //Agregamos la modal al body
	$('body').append(modal);

	//Opciones de la modal
	$('#modal_orden_imprenta').modal({backdrop : 'static'})

	//Evento cuando abra la modal
	$('#modal_orden_imprenta').on('shown.bs.modal', function(e){

		//Creamos el formato autonumerico para los siguientes elementos
		$('#orden_imprenta .cantidad').autoNumeric('init',{
			aDec   : ',',
			aSep   : '.',
			mDec   : 0,
			vMin   : '0'
		});

		//Creamos el formato autonumerico para los siguientes elementos
		$('#orden_imprenta .precio, #orden_imprenta .subtotal, #orden_imprenta .total').autoNumeric('init',{
			aDec   : ',',
			aSep   : '.',
			aSign  : '$',
			mDec   : 2,
			vMin   : '0.00'
		});

		var hoy = Date();

		$('#calendario').datepicker({
            format: 'dd/mm/yyyy',
			language: 'es',
            startDate: hoy
        });

		$.fn.data_nuevo_despacho();

		//Función que declaran todos los eventos
		$.fn.eventos()

	});

	//Evento cuando se cierre la modal
	$('#modal_orden_imprenta').on('hidden.bs.modal', function(e){

		//Listamos los despachos
		//$.fn.despachos(0,0);

		$(this).remove();

	});

	//Mostramos la modal
	$('#modal_orden_imprenta').modal('show');

};//Fin de la función $.fn.modal_orden_imprenta
/**********************************************/

/*
	Función que sugiere los establecimientos según el nombre
*/
$.fn.buscar_establecimiento = function(nombre_ee){

	//Evaluamos si hay una petición
	if(xhr != null){

		xhr.abort();

	}//Fin del if

	xhr = $.ajax({
		url: 'C_imprentas/buscar_establecimiento',
		type: "POST",
		dataType: 'json',
		data: {
			   nombre_ee : nombre_ee
			  },
		beforeSend: function(objeto) {

			//Limpiamos las sugerencias
			$('#wrapper_establecimiento').removeClass('show');
			$('#wrapper_establecimiento').children('#sugerencias').html('');

			//Mostramos el icono de carga
			$('#wrapper_establecimiento .fa-circle-o-notch').remove();
			$('#wrapper_establecimiento')
			.append('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj) {

			xhr = null;

			//Ocultamos el icono de carga
			$('#wrapper_establecimiento .fa-circle-o-notch').remove();

			$.fn.eventos();

		},
		success: function(data){

			xhr = null;

			//Ocultamos el icono de carga
			$('#wrapper_establecimiento .fa-circle-o-notch').remove();

			//Evaluamos data
			if(data != null){

				if(data.length > 0){

					//Agregamos la clase
					$('#wrapper_establecimiento').addClass('show');

					//Recorremos los usuario
					$(data).each(function(index, elemento){

						$('#wrapper_establecimiento').children('#sugerencias')
						.append(`<div id="`+elemento['id']+`" class="dropdown-item">
								  <div class="item_establecimiento" region="`+elemento['region']+`" comuna="`+elemento['comuna']+`">
								  	<span>`+elemento['establecimiento']+`</span><br>
									<span class="text-muted">(`+elemento['region']+` - `+elemento['comuna']+`)</span>
								  </div>
								</div>`);

                    });//Fin del each

				}//Fin del if data.length

				//Evento focus sobre el campo
			    $('#establecimiento').focusin(function(e){

					 //Evaluo si hay resultados previos
					 if($('#wrapper_establecimiento').children('#sugerencias').children('.dropdown-item').length > 0){

						 //Agregamos la clase
						 $('#wrapper_establecimiento').addClass('show');

					 };//Fin del if

			    });//Fin del evento focus

			    //Evento focus sobre el campo
			    $('#establecimiento').focusout(function(e){

					setTimeout(function(){

						//Agregamos la clase
						$('#wrapper_establecimiento').removeClass('show');

					},200);

			    });//Fin del evento focus

			}else{

				//Removemos la clase
				$('#wrapper_establecimiento').removeClass('show');

			}//Fin del if data

			$.fn.eventos();

		}//Fin del success
	});//Ajax

};//Fin de la función $.fn.buscar_establecimiento
/***********************************************/
