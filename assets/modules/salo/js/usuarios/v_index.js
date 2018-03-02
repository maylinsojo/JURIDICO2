//Variables globales
var xhr;

/*
	Evento document ready
*/
$(document).ready(function(){

   $.fn.data_inicial();

   //Evento focus sobre el campo
   $('#busc_nombre_usu').focusin(function(e){

		 //Evaluo si hay resultados previos
		 if($('#sugerencias .dropdown-item').length > 0){

			 //Agregamos la clase
			 $('#sugerencias').parent('.dropdown').addClass('show');
       $('#sugerencias').addClass('show');

		 };//Fin del if

   });//Fin del evento focus

   //Evento focus sobre el campo
   $('#busc_nombre_usu').focusout(function(e){

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
		Evento click sobre #nuevo_usuario
	*/
	$('#nuevo_usuario').unbind('click')
	$('#nuevo_usuario').click(function(){

		//Abrimos la ventana modal
		$.fn.modal_nuevo_usuario();

	});//Fin del evento click

	/*
		Evento keyup sobre #correo
	*/
	$('#correo').unbind('keyup');
	$('#correo').keyup(function(){

		//Obtenemos el valor
		var valor = $(this).val().trim();

		//Seteamos el valor
		$(this).val(valor);

		$.fn.eventos();

	});//Fin del evento keyup

	/*
		Evento keyup sobre #clave
	*/
	$('#clave').unbind('keyup');
	$('#clave').keyup(function(){

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
		$.fn.guardar_usuario();

	});//Fin del evento click

	/*
		Evento click sobre .editar_usuario
	*/
	$('.editar_usuario').unbind('click');
	$('.editar_usuario').click(function(){

		//Obtenemos el id del usuarii
		var id_usuario = $(this).attr('id');

		$.fn.modal_editar_usuario(id_usuario);

	});//Fin del evento click

	/*
		Evento click sobre .menu_usuario
	*/
	$('.menu_usuario').unbind('click');
	$('.menu_usuario').click(function(){

		//Obtenemos el id del usuarii
		var id_usuario = $(this).attr('id');

		$.fn.modal_menu_usuario(id_usuario);

	});//Fin del evento click

	/*
		Evento click sobre #guardar_editar_usuario
	*/
	$('#guardar_editar_usuario').unbind('click');
	$('#guardar_editar_usuario').click(function(){

		//Obtenemos le id del usuario
		var id_usuario = $(this).attr('id_usu');

		$.fn.editar_usuario(id_usuario);

	});//Fin del evento click

	/*
		Evento click sobre #guardar_menus
	*/
	$('#guardar_menus').unbind('click');
	$('#guardar_menus').click(function(){

		//Obtenemos le id del usuario
		var id_usuario = $(this).attr('id_usu');

		$.fn.guardar_menus(id_usuario);

	});//Fin del evento click

	/*
		Evento keyup sobre el campo #busc_nombre_usu
	*/
	$('#busc_nombre_usu').unbind('keyup');
	$('#busc_nombre_usu').keyup(function(){

		//Obtengo el valor
		var valor = $(this).val();

		//Evaluo
		if(valor.trim() == ''){

			$(this).val(valor.trim());

      $('#sugerencias').html('');

      $.fn.usuarios(0,0,1);

		}else{

			$.fn.buscar_usuario(valor);

		}//Fin del if

		$.fn.eventos();

	});//Fin del evento keyup
	/***********************/

	/*
		Evento click sobre #sugerencias .dropdown-item
	*/
	$('#sugerencias .dropdown-item').unbind('click');
	$('#sugerencias .dropdown-item').click(function(){

		//Obtenemos el id del usuario y el usuario
		var id_usuario = $(this).attr('id');
		var usuario    = $(this).children('.usuario').text();

		$('#busc_nombre_usu').val(usuario);
		$('#sugerencias').html('');

		$.fn.usuarios(id_usuario,0,1);

		$.fn.eventos();

	});//Fin del evento click
	/***********************/

	/*
		Evento click sobre .reiniciar_filtro
	*/
	$('.reiniciar_filtro').unbind('click');
	$('.reiniciar_filtro').click(function(){

		$.fn.usuarios(0,0,1);

		$.fn.eventos();

	});//Fin del evento click
	/***********************/

	/*
		Evento click sobre #confirm_eliminar_usuario
	*/
	$('#confirm_eliminar_usuario').unbind('click');
	$('#confirm_eliminar_usuario').click(function(){

		//Obtenemos el id del usuario
		var id_usuario = $(this).attr('id_usu');

		//Mostramos el mensaje de error
		$('#modal_editar_usuario .modal-footer')
		.html(`<div class="alert alert-danger" role="alert">
    				 <strong>¿Esta seguro de eliminar este usuario?</strong>
    				 <button type="button" class="btn btn-success cancelar_eliminar" id_usu="`+id_usuario+`">No</button>
    				 <button type="button" class="btn btn-danger eliminar_usuario" id_usu="`+id_usuario+`">Si</button>
  			   </div>`);

		$.fn.eventos();

	});//Fin del evento click
	/***********************/

	/*
		Evento click sobre .cancelar_eliminar
	*/
	$('.cancelar_eliminar').unbind('click');
	$('.cancelar_eliminar').click(function(){

		//Obtenemos el id del usuario
		var id_usuario = $(this).attr('id_usu');

		//Mostramos el mensaje de error
		$('#modal_editar_usuario .modal-footer')
		.html(`<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
			   <button id_usu="`+id_usuario+`" type="button" class="btn btn-danger" id="confirm_eliminar_usuario">Eliminar Usuario</button>
			   <button id_usu="`+id_usuario+`" type="button" class="btn btn-warning" id="guardar_editar_usuario">Guardar</button>`);

		$.fn.eventos();

	});//Fin del evento click
	/***********************/

	/*
		Evento click sobre .eliminar_usuario
	*/
	$('.eliminar_usuario').unbind('click');
	$('.eliminar_usuario').click(function(){

		//Obtenemos el id del usuario
		var id_usuario = $(this).attr('id_usu');

		$.fn.eliminar_usuario(id_usuario);

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

			$.fn.usuarios(0,rango,0);

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

		url: 'C_usuarios/data_inicial',
		type: 'POST',
		dataType: 'json',
		data: {
			   id_usuario : 0,
			   rango      : 0
			  },
		beforeSend: function(objeto){

			//Bloqueamos los siguientes elementos
			$('#busc_nombre_usu').attr('disabled',true);
			$('#buscar').attr('disabled',true);

			//Mostramos el icono de carga
			$('.wrapper_usuarios').html('');
			$('.wrapper_usuarios').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj){

			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_usu').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');

			//Ocultamos el icono de carga
			$('.wrapper_usuarios').html('');
			$('.wrapper_usuarios')
			.append(`<div class="alert alert-warning" role="alert">
			          <strong>Error al tratar de listar a los usuarios! Recarga nuevamente.</strong>
					 </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_usu').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');

			//Ocultamos el icono de carga
			$('.wrapper_usuarios').html('');

			//Evaluamos data
			if(data != null){

				//Evaluamos si hay usuarios
				if(data['usuarios'] != null){

					var tabla = `
								  <table class="table table-striped">
								    <thead>
										<tr>
											<th class="text-center">Foto</th>
											<th class="text-center">Nombre</th>
											<th class="text-center">Usuario</th>
											<th class="text-center">Tipo de usuario</th>
											<th class="text-center">Estatus</th>
											<th class="text-center"></th>
										</tr>
									</thead>
								    <tbody>`

					//Recorremos los resultados
					$(data['usuarios']).each(function(index, elemento){

						tabla += `
								  <tr>
								  	<th scope="row" class="text-center">
										<img src="../../assets/modules/salo/images/usuarios/`+elemento.avatar+`" height="100%" width="100%" class="img-fluid avatar">
									</th>
									<td>`+elemento.nombre+`</td>
									<td>`+elemento.pseudonimo+`</td>
									<td>`+elemento.tipo_usuario+`</td>
									<td>`+elemento.estatus+`</td>
									<td>
										<i id="`+elemento.id+`" class="fa fa-search editar_usuario" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Usuario"></i>
										<i id="`+elemento.id+`" class="fa fa-id-card-o menu_usuario" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Menús Asociados"></i>
									</td>
								  </tr>
						        `;

                    });//Fin del each



					tabla += `
						        </tbody>
							  </table>
						     `;

					//Obtenemos el número de usuarios
					var numUsu = data['num_usu'];
					var numPag = 1;
					var rango  = 0;

					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;

					//Recorremos
					for(var i = 1; i <= numUsu;){

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

					//Mostramos los usuario
					$('.wrapper_usuarios').append(tabla);

					//Mostramos el paginador
					$('.wrapper_paginador').append(paginador);

				}else{

					//Mostramos el mensaje
					$('.wrapper_usuarios')
				.append(`<div class="alert alert-warning" role="alert">
						  <strong>No hay usuario registrados!.</strong>
						 </div>`);

				}//Fin del if

			}else{

				//Mostramos el mensaje
				$('.wrapper_usuarios')
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
	Función que muestra la ventana modal para el regstro de un nuevo usuario
*/
$.fn.modal_nuevo_usuario = function(){

	var modal = `<div class="modal fade" id="modal_nuevo_usuario" tabindex="-1" role="dialog" aria-hidden="true">
      				  <div class="modal-dialog" role="document">
      					<div class="modal-content">
      					  <div class="modal-header">
      						<h5 class="modal-title">Registrar nuevo usuario</h5>
      						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
      						  <span aria-hidden="true">×</span>
      						</button>
      					  </div>
      					  <div class="modal-body">

      						<form>

      							<div class="form-group">
      								<label for="correo">Correo Electrónico</label>
      								<input type="text" class="form-control" id="correo" aria-describedby="correoHelp">
      								<div class="form-control-feedback"></div>
      								<small id="correoHelp" class="form-text text-muted">Correo que será usado para autenticarse en el sistema.</small>
      							</div>
      							<div class="form-group">
      								<label for="clave">Contraseña</label>
      								<input type="password" class="form-control" id="clave">
      								<div class="form-control-feedback"></div>
      							</div>
      							<div class="form-group">
      								<label for="tipo_usuario">Tipo de Usuario select</label>
      								<select class="form-control" id="tipo_usuario"></select>
      								<div class="form-control-feedback"></div>
      							</div>
      							<div class="form-group">
      								<label for="nombre">Nombre Completo</label>
      								<input type="text" class="form-control" id="nombre">
      								<div class="form-control-feedback"></div>
      								<small id="nombreHelp" class="form-text text-muted">Ejemplo: David Molina Ruíz.</small>
      							</div>
      							<div class="form-group">
      								<label for="correo2">Correo Electrónico Secundario</label>
      								<input type="text" class="form-control" id="correo2" aria-describedby="correoHelp">
      								<div class="form-control-feedback"></div>
      								<small id="correoHelp" class="form-text text-muted">Correo que será usado para recuperar contraseña de ser indicado.</small>
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
	$('#modal_nuevo_usuario').modal({backdrop : 'static'})

	//Evento cuando abra la modal
	$('#modal_nuevo_usuario').on('shown.bs.modal', function(e){

		$.fn.tipo_usuario();

		//Función que declaran todos los eventos
		$.fn.eventos()

	});

	//Evento cuando se cierre la modal
	$('#modal_nuevo_usuario').on('hidden.bs.modal', function(e){

		//Listamos los usuarios
		$.fn.usuarios(0,0,1);

		$(this).remove();

	});

	//Mostramos la modal
	$('#modal_nuevo_usuario').modal('show');

};//Fin de la función $.fn.modal_nuevo_usuario
/********************************************/

/*
	Función que lista los tipos de usuario
*/
$.fn.tipo_usuario = function(){

	$.ajax({

		url: 'C_usuarios/tipo_usuario',
		type: 'POST',
		dataType: 'json',
		beforeSend: function(objeto){

			//Muestro la opcion de carga
			$('#modal_nuevo_usuario #tipo_usuario').html('');
			$('#modal_nuevo_usuario #tipo_usuario')
			.append(`<option value="" disabled selected>Cargando...</option>`);

		},
		error: function(objeto, quepaso, otroobj){

			//Muestro la opción de error
			$('#modal_nuevo_usuario #tipo_usuario')
			.html(`<option value="">Error al cargar los tipos de datos</option>`);

			$.fn.eventos();

		},
		success: function(data){

			//Limpiamos
			$('#modal_nuevo_usuario #tipo_usuario').html('');

			//Evaluamos data
			if(data != null){

				$('#modal_nuevo_usuario #tipo_usuario')
				.append(`<option value="" disabled selected>Seleccione...</option>`);

				//Mostramos las opciones
				$(data).each(function(index, elemento){

					$('#modal_nuevo_usuario #tipo_usuario')
					.append(`<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

                });//Fin del each

			}else{

				//Muestro la opción de error
				$('#modal_nuevo_usuario #tipo_usuario')
				.html(`<option value="">Error al cargar los tipos de datos</option>`);

			}//Fin del if

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.tipo_usuario
/*************************************/

/*
	Función que lista los usuarios creados
*/
$.fn.usuarios = function(id_usuario, rango, remover_paginador){

	$.ajax({

		url: 'C_usuarios/usuarios_creados',
		type: 'POST',
		dataType: 'json',
		data: {
				id_usuario : id_usuario,
				rango      : rango
			  },
		beforeSend: function(objeto){

			//Bloqueamos los siguientes elementos
			$('#busc_nombre_usu').attr('disabled',true);
			$('#buscar').attr('disabled',true);

			//Mostramos el icono de carga
			$('.wrapper_usuarios').html('');
			$('.wrapper_usuarios').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

			//Ocultamos el paginador
			$('.wrapper_paginador').hide();

		},
		error: function(objeto, quepaso, otroobj){

			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_usu').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');

			//Ocultamos el icono de carga
			$('.wrapper_usuarios').html('');
			$('.wrapper_usuarios')
			.append(`<div class="alert alert-warning" role="alert">
					  <strong>Error al tratar de listar a los usuarios! Recarga nuevamente.</strong>
					 </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_usu').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');

			//Ocultamos el icono de carga
			$('.wrapper_usuarios').html('');

			//Evaluamos data
			if(data != null){

				//Evaluamos el id del usuario
				if(id_usuario != 0){

					//Mostramos el icono para reiniciar el filtro
					$('#busc_nombre_usu').parents('.dropdown').children('.input-group-prepend:eq(1)').children('.input-group-text')
					.html('<i class="fa fa-times-circle tips reiniciar_filtro" aria-hidden="true" title="Reiniciar filtro"></i>');

				}else{

					//Removemos los tooltips
					$('body .tooltip.bs-tether-element').remove();

					//Removemos el icono para reiniciar el filtro
					$('#busc_nombre_usu').parents('.dropdown').children('.input-group-prepend:eq(1)').children('.input-group-text')
			    .html('<i class="fa fa-search" aria-hidden="true"></i>');

					$('#busc_nombre_usu').val('');

				}//Fin del if

				var tabla = `
							  <table class="table table-striped">
								<thead>
									<tr>
										<th class="text-center">Foto</th>
										<th class="text-center">Nombre</th>
										<th class="text-center">Tipo de usuario</th>
										<th class="text-center">Estatus</th>
										<th class="text-center"></th>
									</tr>
								</thead>
								<tbody>
							`

				//Recorremos los resultados
				$(data['usuarios']).each(function(index, elemento){

					tabla += `
							  <tr>
								<th scope="row" class="text-center">
									<img src="../../assets/modules/salo/images/usuarios/`+elemento.avatar+`" height="100%" width="100%" class="img-fluid avatar">
								</th>
								<td>`+elemento.nombre+`</td>
								<td>`+elemento.tipo_usuario+`</td>
								<td>`+elemento.estatus+`</td>
								<td>
									<i id="`+elemento.id+`" class="fa fa-search editar_usuario" aria-hidden="true"></i>
									<i id="`+elemento.id+`" class="fa fa-id-card-o menu_usuario" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Menús Asociados"></i>
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

					//Obtenemos el número de usuarios
					var numUsu = data['num_usu'];
					var numPag = 1;
					var rango  = 0;

					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;

					//Recorremos
					for(var i = 1; i <= numUsu;){

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
				$('.wrapper_usuarios').append(tabla);

				//Ocultamos el paginador
			    $('.wrapper_paginador').show();

			}else{

				//Mostramos el mensaje
				$('.wrapper_usuarios')
				.append(`<div class="alert alert-danger" role="alert">
						  <strong>Error de conexión!.</strong>
						 </div>`);

			}//Fin del if

			//Tooltips
   			$('.tips').tooltip();

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

}//Fin de la función $.fn.usuarios
/********************************/

/*
	Función que guarda un nuevo usuario
*/
$.fn.guardar_usuario = function(){

	var validador = $.fn.validar_nuevo_usuario();

	//Evaluamos el validador
	if(validador){

		//Obtenemos valores
		var correo   = $('#correo').val();
		var correo2  = $('#correo2').val();
		var clave    = window.btoa($('#clave').val());
		var tipo_usu = $('#tipo_usuario').val();
		var nombre   = $('#nombre').val();

		$.ajax({

			url: 'C_usuarios/registrar_usuario',
			type: 'POST',
			dataType: 'json',
			data: {
				    correo     : correo,
					correo2    : correo2,
					clave      : clave,
					tipo_usu   : tipo_usu,
					nombre     : nombre,
					id_usuario : sessionStorage.getItem("ID_USUARIO")
				  },
			beforeSend: function(objeto){

				//Mostramos el icono de carga
				$('#modal_nuevo_usuario .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

			},
			error: function(objeto, quepaso, otroobj){

				//Mostramos el mensaje de error
				$('#modal_nuevo_usuario .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
				         <strong>Ocurrió un error!</strong>, intenta de nuevo.
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
						 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
					   </div>`);

				$.fn.eventos();

			},
			success: function(data){

				//Evaluamos si hay respusta
				if(data != null){

					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){

						//Mostramos el mensaje de error
						$('#modal_nuevo_usuario .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
							   </div>`);

					}else if(parseInt(data['CODIGO_RESPUESTA']) == 2){

						//Mostramos el mensaje de error
						$('#modal_nuevo_usuario .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
							   </div>`);

				    }else{

						//Mostramos el mensaje de error
						$('#modal_nuevo_usuario .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
							   </div>`);

					}//Fin del if

				}else{

					//Mostramos el mensaje de error
					$('#modal_nuevo_usuario .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
							 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
						   </div>`);

				}//Fin del if

				$.fn.eventos();

			}//Fin del success

		});//Fin del ajax

	}//Fin del if

};//Fin de la función $.fn.guardar_usuario
/****************************************/

/*
	Función que valida el formulario para un nuevo usuario
*/
$.fn.validar_nuevo_usuario = function(){

	var respuesta = false;

	//Obtenemos los campos
	var correo   = $('#correo');
	var correo2  = $('#correo2');
	var tipo_usu = $('#tipo_usuario');
	var clave    = $('#clave');
	var nombre   = $('#nombre');

	//Removemos los mensajes de error
	correo.parents('.form-group').removeClass('has-danger');
	correo2.parents('.form-group').removeClass('has-danger');
	tipo_usu.parents('.form-group').removeClass('has-danger');
	clave.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').removeClass('has-danger');
	correo.parents('.form-group').find('.form-control-feedback').html('');
	correo2.parents('.form-group').find('.form-control-feedback').html('');
	tipo_usu.parents('.form-group').find('.form-control-feedback').html('');
	clave.parents('.form-group').find('.form-control-feedback').html('');
	nombre.parents('.form-group').find('.form-control-feedback').html('');

	//validamos el correo
	var regla_correo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//Evaluamos
	if(!regla_correo.test(correo.val())){

		//Indicamos error
		correo.parents('.form-group').addClass('has-danger');
		correo.parents('.form-group').find('.form-control-feedback').html('Correo inválido!');

	}else{

		//Evaluamos que la clave no sea vacia
		if(clave.val().length < 8){

			//Indicamos error
			clave.parents('.form-group').addClass('has-danger');
			clave.parents('.form-group').find('.form-control-feedback').html('La Contraseña debe contener mínimo 8 caracteres');

		}else{

			//Evaluamos el tipo de usuario
			if(!tipo_usu.val()){

				//Indicamos error
				tipo_usu.parents('.form-group').addClass('has-danger');
				tipo_usu.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

			}else{

				//Evaluamos el nombre
				if(nombre.val().length < 3){

					//Indicamos error
					nombre.parents('.form-group').addClass('has-danger');
					nombre.parents('.form-group').find('.form-control-feedback').html('Mínimo 3 caracteres!');

				}else{

					//Evaluamos el correo2
					if(correo2.val().trim() != ''){

						//Evaluamos
						if(!regla_correo.test(correo2.val())){

							//Indicamos error
							correo2.parents('.form-group').addClass('has-danger');
							correo2.parents('.form-group').find('.form-control-feedback').html('Correo inválido!');

						}else{

							respuesta = true;

						}//Fin del if

					}else{

						respuesta = true;

					}//Fin del if

				}//Fin del if nombre

			}//Fin del if tipo_usu

		}//Fin del if clave

	}//Fin del if regla_correo

	return respuesta;

};//Fin de la función $.fn.validar_nuevo_usuario
/**********************************************/

/*
	Función que muestra la ventana modal para editar a un usuario
*/
$.fn.modal_editar_usuario = function(id_usuario){

	var modal = `<div class="modal fade" id="modal_editar_usuario" tabindex="-1" role="dialog" aria-hidden="true">
        				  <div class="modal-dialog" role="document">
        					<div class="modal-content">
        					  <div class="modal-header">
        						<h5 class="modal-title">Editar Usuario</h5>
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
	$('#modal_editar_usuario').modal({backdrop : 'static'})

	//Evento cuando abra la modal
	$('#modal_editar_usuario').on('shown.bs.modal', function(e){

		$.fn.info_usuario(id_usuario);

		//Función que declaran todos los eventos
		$.fn.eventos()

	});

	//Evento cuando se cierre la modal
	$('#modal_editar_usuario').on('hidden.bs.modal', function(e){

		//Obtenemos el rango
		var rango = $('.page-item.active').children('.page-link').attr('rango');

		//Listamos los usuarios
		$.fn.usuarios(0,rango,0);

		$(this).remove();

	});

	//Mostramos la modal
	$('#modal_editar_usuario').modal('show');

};//Fin de la función $.fn.modal_editar_usuario
/*********************************************/

/*
	Función que lista la información del usuario
*/
$.fn.info_usuario = function(id_usuario){

	$.ajax({

		url: 'C_usuarios/info_editar_usuario',
		type: 'POST',
		dataType: 'json',
		data: {
				id_usuario : id_usuario
			  },
		beforeSend: function(objeto){

		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#modal_editar_usuario .modal-body')
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
      									<label for="correo">Correo Electrónico</label>
      									<input type="text" class="form-control" id="correo" aria-describedby="correoHelp" value="`+data['INFO']['correo_principal']+`">
      									<div class="form-control-feedback"></div>
      									<small id="correoHelp" class="form-text text-muted">Correo que será usado para autenticarse en el sistema.</small>
      								</div>
      								<div class="form-group text-left">
      									<label for="clave">Contraseña</label>
      									<input type="password" class="form-control" id="clave">
      									<div class="form-control-feedback"></div>
      								</div>
      								<div class="form-group text-left">
      									<label for="tipo_usuario">Tipo de Usuario select</label>
      									<select class="form-control" id="tipo_usuario"></select>
      									<div class="form-control-feedback"></div>
      								</div>
      								<div class="form-group text-left">
      									<label for="nombre">Nombre Completo</label>
      									<input type="text" class="form-control" id="nombre" value="`+data['INFO']['nombre']+`">
      									<div class="form-control-feedback"></div>
      									<small id="nombreHelp" class="form-text text-muted">Ejemplo: David Molina Ruíz.</small>
      								</div>
      								<div class="form-group text-left">
      									<label for="correo2">Correo Electrónico Secundario</label>
      									<input type="text" class="form-control" id="correo2" aria-describedby="correoHelp" value="`+data['INFO']['correo_secundario']+`">
      									<div class="form-control-feedback"></div>
      									<small id="correoHelp" class="form-text text-muted">Correo que será usado para recuperar contraseña de ser indicado.</small>
      								</div>
      								<div class="form-group text-left">
      									<label for="estatus_usuario">Estatus</label>
      									<select class="form-control" id="estatus_usuario"></select>
      									<div class="form-control-feedback"></div>
      								</div>

      							</form>`;

				//Mostramos los datos del usuario
				$('#modal_editar_usuario .modal-body').html(form);

				//Mostramos el combo de tipo de usuario
				$('#modal_editar_usuario #tipo_usuario')
				.append(`<option value="" disabled>Seleccione...</option>`);

				//Mostramos las opciones
				$(data['TIPOS']).each(function(index, elemento){

					//Evaluamos si es el seleccionado
					if(elemento.id == data['INFO']['id_tipo_usuario']){

						$('#modal_editar_usuario #tipo_usuario')
						.append(`<option selected value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

					}else{

						$('#modal_editar_usuario #tipo_usuario')
						.append(`<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

					}//Fin del if

                });//Fin del each

				//Mostramos el combo de los estatus
				$('#modal_editar_usuario #estatus_usuario')
				.append(`<option value="" disabled>Seleccione...</option>`);

				//Mostramos las opciones
				$(data['ESTATUS']).each(function(index, elemento){

					//Evaluamos si es el seleccionado
					if(elemento.id == data['INFO']['id_estatus']){

						$('#modal_editar_usuario #estatus_usuario')
						.append(`<option selected value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

					}else{

						$('#modal_editar_usuario #estatus_usuario')
						.append(`<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

					}//Fin del if

                });//Fin del each

				//Mostramos los btn
				$('#modal_editar_usuario .modal-footer')
				.html(`<button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
				       <button id_usu="`+data['INFO']['id']+`" type="button" class="btn btn-danger" id="confirm_eliminar_usuario">Eliminar Usuario</button>
					     <button id_usu="`+data['INFO']['id']+`" type="button" class="btn btn-warning" id="guardar_editar_usuario">Guardar</button>`);

			}else{

				//Mostramos el mensaje de error
				$('#modal_editar_usuario .modal-body')
				.html(`<div class="alert alert-danger" role="alert">
						    <strong>Ocurrió un error!</strong>, intenta más tarde.
					     </div>`);

			}//Fin del if

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.info_usuario
/*************************************/

/*
	Función que guarda la edición del usuario
*/
$.fn.editar_usuario = function(id_usuario){

	var validador = $.fn.validar_editar_usuario();

	//Evaluamos el validador
	if(validador){

		//Obtenemos valores
		var correo   = $('#correo').val();
		var correo2  = $('#correo2').val();
		var clave    = window.btoa($('#clave').val());
		var tipo_usu = $('#tipo_usuario').val();
		var nombre   = $('#nombre').val();
		var estatus  = $('#estatus_usuario').val()

		$.ajax({

			url: 'C_usuarios/editar_usuario',
			type: 'POST',
			dataType: 'json',
			data: {
				    correo     : correo,
					correo2    : correo2,
					clave      : clave,
					tipo_usu   : tipo_usu,
					nombre     : nombre,
					id_usuario : id_usuario,
					estatus    : estatus
				  },
			beforeSend: function(objeto){

				//Mostramos el icono de carga
				$('#modal_editar_usuario .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

			},
			error: function(objeto, quepaso, otroobj){

				//Mostramos el mensaje de error
				$('#modal_editar_usuario .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
				         <strong>Ocurrió un error!</strong>, intenta de nuevo.
						 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
						 <button id_usu="`+id_usuario+`" type="button" class="btn btn-danger" id="confirm_eliminar_usuario">Eliminar Usuario</button>
					   	 <button type="button" class="btn btn-warning" id="guardar_editar_usuario" id_usu="`+id_usuario+`">Guardar</button>
					   </div>`);

				$.fn.eventos();

			},
			success: function(data){

				//Evaluamos si hay respusta
				if(data != null){

					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){

						//Mostramos el mensaje de error
						$('#modal_editar_usuario .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
								 <button id_usu="`+id_usuario+`" type="button" class="btn btn-danger" id="confirm_eliminar_usuario">Eliminar Usuario</button>
								 <button type="button" class="btn btn-warning" id="guardar_editar_usuario" id_usu="`+id_usuario+`">Guardar</button>
							   </div>`);

					}else{

						//Mostramos el mensaje de error
						$('#modal_editar_usuario .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
								 <button id_usu="`+id_usuario+`" type="button" class="btn btn-danger" id="confirm_eliminar_usuario">Eliminar Usuario</button>
								 <button type="button" class="btn btn-warning" id="guardar_editar_usuario" id_usu="`+id_usuario+`">Guardar</button>
							   </div>`);

					}//Fin del if

				}else{

					//Mostramos el mensaje de error
					$('#modal_editar_usuario .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
							 <button id_usu="`+id_usuario+`" type="button" class="btn btn-danger" id="confirm_eliminar_usuario">Eliminar Usuario</button>
							 <button type="button" class="btn btn-warning" id="guardar_editar_usuario" id_usu="`+id_usuario+`">Guardar</button>
						   </div>`);

				}//Fin del if

				$.fn.eventos();

			}//Fin del success

		});//Fin del ajax

	}//Fin del if

};//Fin de la función guardar_editar_usuario
/******************************************/

/*
	Función que valida el formulario para editar el usuario
*/
$.fn.validar_editar_usuario = function(){

	var respuesta = false;

	//Obtenemos los campos
	var correo   = $('#correo');
	var correo2  = $('#correo2');
	var tipo_usu = $('#tipo_usuario');
	var nombre   = $('#nombre');
	var estatus  = $('#estatus_usuario');

	//Removemos los mensajes de error
	correo.parents('.form-group').removeClass('has-danger');
	correo2.parents('.form-group').removeClass('has-danger');
	tipo_usu.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').removeClass('has-danger');
	estatus.parents('.form-group').removeClass('has-danger');
	correo.parents('.form-group').find('.form-control-feedback').html('');
	correo2.parents('.form-group').find('.form-control-feedback').html('');
	tipo_usu.parents('.form-group').find('.form-control-feedback').html('');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	estatus.parents('.form-group').find('.form-control-feedback').html('');

	//validamos el correo
	var regla_correo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	//Evaluamos
	if(!regla_correo.test(correo.val())){

		//Indicamos error
		correo.parents('.form-group').addClass('has-danger');
		correo.parents('.form-group').find('.form-control-feedback').html('Correo inválido!');

	}else{

		//Evaluamos el tipo de usuario
		if(!tipo_usu.val()){

			//Indicamos error
			tipo_usu.parents('.form-group').addClass('has-danger');
			tipo_usu.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

		}else{

			//Evaluamos el nombre
			if(nombre.val().length < 3){

				//Indicamos error
				nombre.parents('.form-group').addClass('has-danger');
				nombre.parents('.form-group').find('.form-control-feedback').html('Mínimo 3 caracteres!');

			}else{

				//Evaluamos el correo2
				if(correo2.val().trim() != ''){

					//Evaluamos
					if(!regla_correo.test(correo2.val())){

						//Indicamos error
						correo2.parents('.form-group').addClass('has-danger');
						correo2.parents('.form-group').find('.form-control-feedback').html('Correo inválido!');

					}else{

						respuesta = true;

					}//Fin del if

				}else{

					respuesta = true;

				}//Fin del if

				//Evaluamos respuesta
				if(respuesta == true){

					//Evaluamos el estatus
					if(estatus.val() == ''){

						//Indicamos error
						estatus.parents('.form-group').addClass('has-danger');
						estatus.parents('.form-group').find('.form-control-feedback').html('Requerido!');

						respuesta = false;

					}else{

						respuesta = true;

					}//Fin del if

				}//Fin del if respuesta

			}//Fin del if nombre

		}//Fin del if tipo_usu

	}//Fin del if regla_correo

	return respuesta;

};//Fin de la función $.fn.validar_editar_usuario
/***********************************************/

/*
	Función que muestra la ventana modal para ver los menús asociados al usuario
*/
$.fn.modal_menu_usuario = function(id_usuario){

	var modal = `<div class="modal fade" id="modal_menus_usuario" tabindex="-1" role="dialog" aria-hidden="true">
      				  <div class="modal-dialog" role="document">
      					<div class="modal-content">
      					  <div class="modal-header">
      						<h5 class="modal-title">Menús del Usuario</h5>
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
	$('#modal_menus_usuario').modal({backdrop : 'static'})

	//Evento cuando abra la modal
	$('#modal_menus_usuario').on('shown.bs.modal', function(e){

		$.fn.menu_usuario(id_usuario);

		//Función que declaran todos los eventos
		$.fn.eventos()

	});

	//Evento cuando se cierre la modal
	$('#modal_menus_usuario').on('hidden.bs.modal', function(e){

		$(this).remove();

	});

	//Mostramos la modal
	$('#modal_editar_usuario').modal('show');

};//Fin de la función $.fn.modal_menu_usuario
/*******************************************/

/*
	Función que lista los menús asociados del usuario
*/
$.fn.menu_usuario = function(id_usuario){

	$.ajax({

		url: 'C_usuarios/menu_usuario',
		type: 'POST',
		dataType: 'json',
		data: {
				   id_usuario : id_usuario
			    },
		beforeSend: function(objeto){

		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#modal_menus_usuario .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					     <strong>Ocurrió un error!</strong>, intenta más tarde.
				     </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Evaluamos si hay respusta
			if(data != null){

        var arbol = '<ul class="menus text-left">'+$.fn.menu_sistema(data['MENUS'])+'</ul>';

				//Mostramos los datos del usuario
				$('#modal_menus_usuario .modal-body').html(arbol);

				$('#modal_menus_usuario .modal-body .menus').treed();

				//Recorremos los menús asociados al usuario
				$(data['MENUS_USUARIO']).each(function(index2, menu2){

					//Chequeamos
					$('.menus').find('input#'+menu2.id).prop('checked',true);

				});//Fin del each

				//Mostramos los btn
				$('#modal_menus_usuario .modal-footer')
				.html(`<button id_usu="`+id_usuario+`" type="button" class="btn btn-success" id="guardar_menus">Guardar</button>`);

			}else{

				//Mostramos el mensaje de error
				$('#modal_menus_usuario .modal-body')
				.html(`<div class="alert alert-danger" role="alert">
						     <strong>Ocurrió un error!</strong>, intenta más tarde.
					     </div>`);

			}//Fin del if

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.menu_usuario
/*************************************/

/*
  Función que arma el string para mostrar los menus dl sistema
*/
$.fn.menu_sistema = function(jsonMenu){

  //Armo el menú
  var menu = '';

  //Evaluamos si hay respusta
  if(jsonMenu != null && $(jsonMenu).length > 0 ){

    //Recorremos los menus
    $(jsonMenu).each(function(indice, elemento){

      //Evaluamos si posee submenus
      if($(elemento.submenus).length > 0){

        menu += `<li>`+elemento.descripcion+`
                  <ul>`+$.fn.menu_sistema(elemento.submenus)+`</ul>
                 </li>`;

      }else{

        menu += `<li>`+elemento.descripcion+`
                  <input id="`+elemento.id+`" type="checkbox" class="menu">
                 </li>`;

      }//Fin del if $(elemento.submenus).length

    })//Fin del each

  }else{

    menu += `<li>Error al mostrar los menus del sistema!</li>`;

  }//Fin del if

  return menu;

}//Fin $.fn.menu_sistema
/**********************/

/*
	Función que asocia los menús al usuario
*/
$.fn.guardar_menus = function(id_usuario){

	var menus = [];

	//Recorremos todos los menus chequeados
	$('.menus .menu:checked').each(function(index, elemento) {

		menus.push(elemento.id);

    });//Fin del each

	//Evaluamos si no hay menús por asociar
	if(menus.length == 0){

		menus = '-1';

	}//Fin del if

	$.ajax({

		url: 'C_usuarios/asociar_menu_usuario',
		type: 'POST',
		dataType: 'json',
		data: {
				menus      : menus,
				id_usuario : id_usuario
			  },
		beforeSend: function(objeto){

			//Mostramos el icono de carga
			$('#modal_menus_usuario .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#modal_menus_usuario .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta de nuevo.
					 <button id_usu="`+id_usuario+`" type="button" class="btn btn-success" id="guardar_menus">Reintentar</button>
				   </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Evaluamos si hay respusta
			if(data != null){

				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){

					//Mostramos el mensaje de éxito
					$('#modal_menus_usuario .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);

					setTimeout(function(){

						//Mostramos el btn
						$('#modal_menus_usuario .modal-footer')
						.html(`<button id_usu="`+id_usuario+`" type="button" class="btn btn-success" id="guardar_menus">Guardar</button>`);

						$.fn.eventos();

					},3000);

				}else{

					//Mostramos el mensaje de error
					$('#modal_menus_usuario .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button id_usu="`+id_usuario+`" type="button" class="btn btn-success" id="guardar_menus">Reintentar</button>
						   </div>`);

				}//Fin del if

			}else{

				//Mostramos el mensaje de error
				$('#modal_menus_usuario .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
						 <button id_usu="`+id_usuario+`" type="button" class="btn btn-success" id="guardar_menus">Reintentar</button>
					   </div>`);

			}//Fin del if

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.guardar_menus
/**************************************/

/*
	Función que busca los usuario según el tipo del usuario
*/
$.fn.buscar_usuario = function(valor){

	//Evaluamos si hay una petición
	if(xhr != null){

		xhr.abort();

	}//Fin del if

	xhr = $.ajax({
		url: 'C_usuarios/buscar_usuario',
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
			$('#busc_nombre_usu').parents('.dropdown').children('.input-group-prepend:eq(1)').children('.input-group-text')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj) {

			xhr = null;

			//Ocultamos el icono de carga
			$('#busc_nombre_usu').parents('.dropdown').children('.input-group-prepend:eq(1)').children('.input-group-text')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');

			$.fn.eventos();

		},
		success: function(data){

			xhr = null;

			//Ocultamos el icono de carga
			$('#busc_nombre_usu').parents('.dropdown').children('.input-group-prepend:eq(1)').children('.input-group-text')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');

			//Evaluamos data
			if(data != null){

				if(data.length > 0){

					//Agregamos la clase
					$('#sugerencias').parent('.dropdown').children('.input-group-prepend:eq(1)').children('.input-group-text')
          $('#sugerencias').addClass('show');

					//Recorremos los usuario
					$(data).each(function(index, elemento){

						$('#sugerencias')
						.append(`<div id="`+elemento['id']+`" class="dropdown-item">
								  <div class="avatar">
									<img src="../../assets/modules/salo/images/usuarios/`+elemento['avatar']+`" height="100%" width="100%">
								  </div>
								  <span class="usuario">`+elemento['nombre']+`</span>
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

};//Fin de la función $.fn.buscar_usuario
/***************************************/

/*
	Función que elimina un usuario
*/
$.fn.eliminar_usuario = function(id_usuario){

	$.ajax({

		url: 'C_usuarios/eliminar_usuario',
		type: 'POST',
		dataType: 'json',
		data: {
				id_usuario : id_usuario
			  },
		beforeSend: function(objeto){

			//Mostramos el icono de carga
			$('#modal_editar_usuario .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#modal_editar_usuario .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta de nuevo. <br>
					 <button type="button" class="btn btn-success cancelar_eliminar" id_usu="`+id_usuario+`">Cancelar</button>
					 <button type="button" class="btn btn-danger eliminar_usuario" id_usu="`+id_usuario+`">Reintentar</button>
				   </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Evaluamos si hay respusta
			if(data != null){

				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){

					//Mostramos el mensaje de error
					$('#modal_editar_usuario .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-success" data-dismiss="modal">Ok!</button>
						   </div>`);

				}else{

					//Mostramos el mensaje de error
					$('#modal_editar_usuario .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-success cancelar_eliminar" id_usu="`+id_usuario+`">Cancelar</button>
					         <button type="button" class="btn btn-danger eliminar_usuario" id_usu="`+id_usuario+`">Reintentar</button>
						   </div>`);

				}//Fin del if

			}else{

				//Mostramos el mensaje de error
				$('#modal_editar_usuario .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
						 <button type="button" class="btn btn-success cancelar_eliminar" id_usu="`+id_usuario+`">Cancelar</button>
					     <button type="button" class="btn btn-danger eliminar_usuario" id_usu="`+id_usuario+`">Reintentar</button>
					   </div>`);

			}//Fin del if

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.eliminar_usuario
/*****************************************/
