//Variables globales
var xhr;
var cursMatAsig = [];

/*
	Evento document ready
*/
$(document).ready(function(){

	//Creamos el formato autonumerico para los siguientes elementos
	$('.cantidad, .eval, .hr, .pag, .t').autoNumeric('init',{
		aDec   : ',',
		aSep   : '.',
		mDec   : 0,
		vMin   : '0'
	});

	//Creamos el formato autonumerico para los siguientes elementos
	$('#form_planificar .precio, #form_planificar .subtotal, #form_planificar .total, #coste_imprenta').autoNumeric('init',{
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
	$.fn.eventos();

});/*Fin del document ready*/
/***************************/

/*
	Función donde se declaran los eventos
*/
$.fn.eventos = function(){

	/*
		Evento keyup sobre el campo #establecimiento
	*/
	$('#establecimiento').unbind('keyup');
	$('#establecimiento').keyup(function(){

		//Removemos el id del ee
		$(this).removeAttr('id_ee');

		//Ocultamos el mensaje de error
		$('#wrapper_establecimiento').parent('.form-group').removeClass('has-danger');
		$('#wrapper_establecimiento').parent('.form-group').children('.form-control-feedback').html('');

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

		//Buscamos los cursos asociados
		$.fn.cursosEE(id_ee);

		$.fn.eventos();

	});//Fin del evento click
	/***********************/

	/*
		Evento keyup sobre .eval, .hr, .pag, .t
	*/
	$('.eval, .hr, .pag, .t').unbind('keyup')
	$('.eval, .hr, .pag, .t').keyup(function(){

		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		const contexto = $(this).parents('.wrapper_item');

		$.fn.calcularT(contexto);

		$.fn.eventos();

	});//Fin del evento keyup
	/***********************/

	/*
		Evento change sobre #form_planificar #imprenta
	*/
	$('#form_planificar .imprenta').unbind('change')
	$('#form_planificar .imprenta').change(function(){

		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		//Obtenemos el coste
		const coste = $('#form_planificar .imprenta option:selected').attr('coste');

		//Seteamos
		$('#coste_imprenta').autoNumeric('set',coste);

		$.fn.eventos();

	});//Fin del evento change
	/************************/

	/*
		Evento keyup sobre #coste_imprenta
	*/
	$('#coste_imprenta').unbind('keyup')
	$('#coste_imprenta').keyup(function(){

		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		//Obtenemos la cantidad
		var precio = $(this).autoNumeric('get');

		//Recoremos cada items del despacho
		$('.wrapper_item').each(function(){

			//Obtenemos la cantidad de pág
			const t = $(this).find('.t').autoNumeric('get');

			//Evaluamos si hay una cantidad
			if(isNaN(t)){

				t = 0;

			}//Fin del if

			var subtotal = precio * t;
			$(this).find('.subtotal').autoNumeric('set',subtotal);

		})

		$.fn.calcular_total();

		$.fn.eventos();

	});//Fin del evento keyup
	/***********************/

	/*
		Evento change sobre .t
	*/
	$('.t').unbind('keyup')
	$('.t').keyup(function(){

		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		//Obtenemos la cantidad
		var t = $(this).autoNumeric('get');

		//Obtenemos el precio
		var precio = $('#coste_imprenta').autoNumeric('get');

		//Evaluamos si hay precio
		if(isNaN(precio)){

			precio = 0;

		}//Fin del if

		//Multiplicamos
		var subtotal = precio * t;

		//Seteamos el subtotal
		$(this).parents('.wrapper_item').find('.subtotal').autoNumeric('set', subtotal);

		$.fn.calcular_total();

		$.fn.eventos();

	});//Fin del evento keyup
	/***********************/

	/*
		Evento change sobre #form_planificar .curso
	*/
	$('#form_planificar .curso').unbind('change')
	$('#form_planificar .curso').change(function(){

		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		//Obtengo la cantidad de num_alumnos
		const numAlum = $(this).children('option:selected').attr('alumnos');

		//Seteamos valor
		$(this).parents('.wrapper_item').find('.eval').autoNumeric('set',numAlum);

		$.fn.eventos();

	});//Fin del evento change
	/************************/

	/*
		Evento change sobre #form_planificar #imprenta,
		#form_planificar .productoServ
	*/
	$('#form_planificar .productoServ').unbind('change')
	$('#form_planificar .productoServ').change(function(){

		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		$.fn.eventos();

	});//Fin del evento change
	/************************/

	/*
		Evento change sobre #form_planificar .modulo
	*/
	$('#form_planificar .modulo').unbind('change')
	$('#form_planificar .modulo').change(function(){

		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		//Obtenemos el id del modulo seleccionado
		var id_modulo = $(this).val();
		var contexto  = $(this).parents('.row');

		//Evaluamos el id del modulo
		if(id_modulo != ''){

			//Función que lista asignaturas según el módulo seleccionado
			//$.fn.datos_prelatorios_modulo(id_modulo,contexto);

		}else{

			//Mostramos los mensajes de error
			$(this).parents('.form-group').addClass('has-danger');
			$(this).parents('.form-group').find('.form-control-feedback').html('Seleccione un módulo');

		}//Fin del if

	});//Fin del evento change
	/************************/

	/*
		Evento change sobre #form_planificar .asignatura
	*/
	$('#form_planificar .asignatura').unbind('change');
	$('#form_planificar .asignatura').change(function(){

		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');

		//Contexto
		var contexto = $(this).parents('.row');

		//Recorremos cada fila
		$('.fila_item_desp').each(function(index, elemento){

			//Evaluamos que no sea el mismo que desencadeno el evento
			if(contexto.index() != $(this).index()){

				//Evaluamos que sea el mismo modulo
				if(contexto.find('.modulo').val() == $(this).find('.modulo').val()){

					//Obtenemos la asignatura seleccionada
					var asignatura = contexto.find('.asignatura').val();

					//Deshabilitamos la opcion
					$(this).find('.asignatura').children('option[value="'+asignatura+'"]').attr('disabled',true);

					//Recorremos todas las opciones
					$(this).find('.asignatura').children('option').each(function(index, elemento){

						//Evaluamos si es el seleccione
						if($(this).val() != '' && $(this).val() != null && $(this).is(':selected') == false && $(this).val() != asignatura){

							//Habilitamos la opcion
							$(this).removeAttr('disabled');

						}//Fin del if

          });//Fin del each

				}//Fin del if

			}//Fin del if

		});//Fin del each

		$.fn.eventos();

	});//Fin del evento change
	/************************/

	/*
		Evento click sobre .agregarItem
	*/
	$('.agregarItem').unbind('click')
	$('.agregarItem').click(function(){

		//Obtenemos el contexto
		var contexto = $(this).parents('.wrapper_item');

		$.fn.agregar_item_dep(contexto);

	});//Fin del evento click
	/***********************/

	/*
		Evento click sobre .eliminarItem
	*/
	$('.eliminarItem').unbind('click')
	$('.eliminarItem').click(function(){

		//Removemos la fila
		$(this).parents('.wrapper_item').remove();

		//Contamos el n° de filas que quedan
		var numFilas = $('.wrapper_item').length;

		//Evaluamos
		if(numFilas > 1){

			//Mostramos la opcion para eliminar
			$('.wrapper_item').find('.opcion_despacho')
			.html(`<label>&nbsp;</label>
				     <button type="button" class="btn btn-danger eliminarItem">Eliminar item</button>`);

			//Mostramos la opcion para agregar
			$('.wrapper_item:last').find('.opcion_despacho')
			.html(`<label>&nbsp;</label>
				     <button type="button" class="btn btn-danger eliminarItem">Eliminar item</button>
				     <button type="button" class="btn btn-primary agregarItem">Agregar item</button>`);

		}else{

			//Mostramos la opcion para agregar
			$('.wrapper_item').find('.opcion_despacho')
			.html(`<label>&nbsp;</label>
				     <button type="button" class="btn btn-primary agregarItem">Agregar item</button>`);

		}//Fin del if

		//$.fn.calcular_total();

		//Blanqueamos el array
		cursMatAsig = [];

		//Evaluamos si volvemos armar el array
		if($('.wrapper_item').length > 1){

			//Recorremos cada wrapper_item
			$('.wrapper_item').each(function(){

				//Obtenemos valores
				let idCurso   = $(this).find('.curso').val();
				let idAsig    = $(this).find('.asignatura').val();
				let idMat     = $(this).find('.modulo').val();
				let stringIds = idCurso+idAsig+idMat

				cursMatAsig.push(stringIds)

			});//Fin del each

		}//Fin del if

		$.fn.eventos();

	});//Fin del evento click
	/************************/

	/*
		Evento change sobre #form_planificar .transportistas
	*/
	$('#form_planificar .transportistas').unbind('change');
	$('#form_planificar .transportistas').change(function(){

		$(this).parents('.form-group').removeClass('has-danger');
	  $(this).parents('.form-group').find('.form-control-feedback').html('');

		//Obtengo el id del transportista
		var id_trasportista = $(this).val();

		$.fn.conductores(id_trasportista);

	});//Fin del evento change
	/************************/

	/*
		Evento change sobre #form_planificar .conductor
	*/
	$('#form_planificar .conductor, #form_planificar #calendario').unbind('change');
	$('#form_planificar .conductor, #form_planificar #calendario').change(function(){

		$(this).parents('.form-group').removeClass('has-danger');
	  $(this).parents('.form-group').find('.form-control-feedback').html('');

		$.fn.eventos();

	});//Fin del evento change
	/************************/

	/*
		Evento click sobre #guardar_despacho
	*/
	$('#guardar_despacho').unbind('click')
	$('#guardar_despacho').click(function(){

		$.fn.crear_despacho();

	});//Fin del evento click
	/***********************/

};//Fin de la función eventos
/***************************/

/*
	Función que lista la data para armar un nuevo despacho
*/
$.fn.data_nuevo_despacho = function(){

	$.ajax({

		url: 'data_nuevo_despacho',
		type: 'POST',
		dataType: 'json',
		beforeSend: function(objeto){

			//Muestro la opcion de carga
			$('#modal_nueva_planificacion .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#modal_nueva_planificacion .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
			         <strong>Error al tratar de listar los módulos pedagógicos.</strong>
					     <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
				     </div>`);

			$.fn.eventos();

		},
		success: function(data){

			//Ocultamos el icono de carga
			$('#modal_nueva_planificacion .modal-footer')
			.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
				     <button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>`);

			//Evaluamos si hay módulos
			if(data['modulos'] != null){

				$('#form_planificar .modulo')
				.html(`<option value="" selected disabled>Seleccione</option>`);

				//Mostramos las opciones
				$(data['modulos']).each(function(index, elemento){

					$('#form_planificar .modulo')
					.append(`<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

        });//Fin del each

			}else{

				//Muestro la opción de error
				$('#form_planificar .modulo')
				.html(`<option value="">Error al cargar los módulos</option>`);

			}//Fin del if

			//Evaluamos si hay transportistas
			if(data['transportistas'] != null){

				$('#form_planificar .transportistas')
				.append(`<option value="" selected disabled>Seleccione</option>`);

				//Mostramos las opciones
				$(data['transportistas']).each(function(index, elemento){

					$('#form_planificar .transportistas')
					.append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);

        });//Fin del each

			}else{

				//Muestro la opción de error
				$('#form_planificar .transportistas')
				.html(`<option value="">Error al cargar los transportistas</option>`);

			}//Fin del if

			//Evaluamos si hay imprentas
			if(data['imprentas'] != null){

				$('#form_planificar .imprenta')
				.append(`<option value="" selected disabled>Seleccione</option>`);

				//Mostramos las opciones
				$(data['imprentas']).each(function(index, elemento){

					$('#form_planificar .imprenta')
					.append(`<option value="`+elemento.id+`" coste="`+elemento.precio+`">`+elemento.nombre+`</option>`);

        });//Fin del each

			}else{

				//Muestro la opción de error
				$('#form_planificar .imprenta')
				.html(`<option value="">Error al cargar las imprentas</option>`);

			}//Fin del if

			//Evaluamos si hay módulos
			if(data['asignaturas'] != null){

				$('#form_planificar .asignatura')
				.html(`<option value="" disabled selected>Seleccione</option>`);

				//Mostramos las opciones
				$(data['asignaturas']).each(function(index, elemento){

					$('#form_planificar .asignatura')
					.append(`<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

        });//Fin del each

			}//Fin del if

			//Evaluamos si hay productos
			if(data['productoServ'] != null){

				$('#form_planificar .productoServ')
				.html(`<option value="" selected disabled>Seleccione</option>`);

				//Mostramos las opciones
				$(data['productoServ']).each(function(index, elemento){

					$('#form_planificar .productoServ')
					.append(`<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

        });//Fin del each

			}else{

				//Muestro la opción de error
				$('#form_planificar .productoServ')
				.html(`<option value="">Error al cargar los productos</option>`);

			}//Fin del if

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.data_nuevo_despacho
/********************************************/

/*
	Función que sugiere los establecimientos según el nombre
*/
$.fn.buscar_establecimiento = function(nombre_ee){

	//Evaluamos si hay una petición
	if(xhr != null){

		xhr.abort();

	}//Fin del if

	xhr = $.ajax({
		url: 'buscar_establecimiento',
		type: "POST",
		dataType: 'json',
		data: {
			   nombre_ee : nombre_ee
			  },
		beforeSend: function(objeto) {

			//Limpiamos las sugerencias
			$('#wrapper_establecimiento').removeClass('show');
			$('#wrapper_establecimiento').children('#sugerencias').removeClass('show');
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
					$('#wrapper_establecimiento').children('#sugerencias').addClass('show');

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
					 $('#wrapper_establecimiento #sugerencias').addClass('show');

				 };//Fin del if

		    });//Fin del evento focus

		    //Evento focus sobre el campo
		    $('#establecimiento').focusout(function(e){

				setTimeout(function(){

					//Agregamos la clase
					$('#wrapper_establecimiento').removeClass('show');
					$('#wrapper_establecimiento #sugerencias').removeClass('show');

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

/*
	Función que lista los cursos asociados al establecimiento
*/
$.fn.cursosEE = function(id_ee){

	$.ajax({

		url: 'cursosAsociados',
		type: 'POST',
		dataType: 'json',
		data: {
			id_ee : id_ee
		},
		beforeSend: function(objeto){

			//Muestro la opcion de carga
			$('#cursoHelp')
			.html('<span>Buscando cursos asociados</span><i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj){

			$('#cursoHelp')
			.html('<span class="text-danger">Ocurrio un error!</span>');

			$.fn.eventos();

		},
		success: function(data){

			//Evaluamos
			if(data != null && data.length > 0){

				$('.curso')
				.html('<option value="" selected disabled>Seleccione</option>')

				//Recorremos los resultados
				$.each(data,function(index,elemento){

					$('.curso')
					.append('<option value="'+elemento.id+'" alumnos="'+elemento.num_alumnos+'">'+elemento.descripcion+'</option>')

				})//Fin del each

				$('#cursoHelp').html('');

			}else{

				$('.curso')
				.html('<option value="">No posee ningun curso asociado</option>')

				$('#cursoHelp')
				.html('<span class="text-danger">No posee cursos asociados!</span>');

			}//Fin del if

			$.fn.resetarDetalle();

		}
	});

};//Fin de la función $.fn.cursosEE
/*********************************/

/*
	Función que reinicia los items del despacho
*/
$.fn.resetarDetalle = function(){

	//Limpiamos los siguientes campos
	$('.total, .eval, .hr, .pag, .t, .subtotal, .modulo, .asignatura').val('');

	//Removemos todos los items menos el primero
  $(".wrapper_item ~ .wrapper_item").remove();

	$('.opcion_despacho').html('<label>&nbsp;</label><button type="button" class="btn btn-primary agregarItem">Agregar item</button>');

	$.fn.eventos();

};//Fin de la función $.fn.resetarDetalle
/***************************************/

/*
	Función que lista las asignaturas asociadas al modulo
*/
$.fn.datos_prelatorios_modulo = function(id_modulo,contexto){

	$.ajax({

		url: 'datos_prelatorios_modulo',
		type: 'POST',
		dataType: 'json',
		data: {
			id_modulo : id_modulo
		},
		beforeSend: function(objeto){

			//Muestro la opcion de carga
			$('#modal_nueva_planificacion .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

			//Mostramos una opción por defecto
			contexto.find('.asignatura')
			.html(`<option value="" disabled selected>Cargando</option>`);

			//Ocultamos el mensaje de error
			contexto.find('.mensaje_asignatura').parent('.form-group').removeClass('has-danger');
			contexto.find('.mensaje_asignatura').html('');

		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			contexto.find('.mensaje_asignatura').parent('.form-group').addClass('has-danger');
			contexto.find('.mensaje_asignatura').html('Error al mostrar las aignaturas.');

			//Ocultamos el icono de carga
			$('#modal_nueva_planificacion .modal-footer')
			.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
				   <button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>`);

			$.fn.eventos();

		},
		success: function(data){

			//Ocultamos el icono de carga
			$('#modal_nueva_planificacion .modal-footer')
			.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
				   <button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>`);

			//Evaluamos si hay módulos
			if(data['asignaturas'] != null){

				contexto.find('.asignatura')
				.html(`<option value="" disabled selected>Seleccione</option>`);

				//Mostramos las opciones
				$(data['asignaturas']).each(function(index, elemento){

					contexto.find('.asignatura')
					.append(`<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`);

                });//Fin del each

				//Recorremos cada fila dode este el modulo presente
				$('.fila_item_desp').each(function(index, elemento){

					//Evaluamos que no sea el mismo que desencadeno el evento
					if(contexto.index() != $(this).index()){

						//Evaluamos que sea el mismo modulo
						if(contexto.find('.modulo').val() == $(this).find('.modulo').val()){

							//Obtenemos la asignatura seleccionada
							var asignatura = $(this).find('.asignatura').val();

							//Deshabilitamos la opcion
							contexto.find('.asignatura').children('option[value="'+asignatura+'"]').attr('disabled',true)

						}//Fin del if

					}//Fin del if

				});//Fin del each

			}else{

				//Muestro la opción de error
				contexto.find('.asignatura')
				.html(`<option value="">Error al cargar las asignaturas</option>`);

			}//Fin del if

			//Mostramos el monto de las guias
			contexto.find('.precio').val(data['precio_guia']);

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.datos_prelatorios_modulo
/*************************************************/

/*
	Función que agrega una nuevo item para el despacho
*/
$.fn.agregar_item_dep = function(contexto){

	//Validamos si puede agregar un nuevo item
	var validador = $.fn.validar_item_desp(contexto);

	//Evaluamos el validador
	if(validador){

		//Obtenemos valores
		let idCurso   = contexto.find('.curso').val();
		let idAsig    = contexto.find('.asignatura').val();
		let idMat     = contexto.find('.modulo').val();
		let stringIds = idCurso+idAsig+idMat

		//Evaluamos si ya existe la combinación de curso asignatura material
		if(cursMatAsig.indexOf(stringIds) == '-1'){

			cursMatAsig.push(stringIds)

			//Mostramos el icono para eliminar
			contexto.find('.opcion_despacho')
			.html(`<label>&nbsp;</label>
				     <button type="button" class="btn btn-danger eliminarItem">Eliminar item</button>`);

			//Obtenemos los módulos
			var curso       = contexto.find('.curso').html();
			var asignaturas = contexto.find('.asignatura').html();
	    var materiales  = contexto.find('.modulo').html();

			//Html para la nueva fila
			var nueva_fila = `<div class="row wrapper_item">
													<div class="col-12">
														<div class="row fila_item_desp">
															<div class="form-group col-4">
																<label>Curso</label>
																<select class="form-control curso">
																	`+curso+`
																</select>
																<div class="form-control-feedback"></div>
																<small id="cursoHelp" class="form-text text-muted">Debe seleccionar un establecimiento.</small>
															</div>
															<div class="form-group col-4">
															<label>Materiales</label>
																<select class="form-control modulo">
																	`+materiales+`
																</select>
																<div class="form-control-feedback"></div>
															</div>
															<div class="form-group col-1">
																<label>Eval.</label>
																<input type="text" class="form-control eval" autocomplete="off">
																<div class="form-control-feedback"></div>
															</div>
															<div class="form-group col-1">
																<label>H.R</label>
																<input type="text" class="form-control hr" autocomplete="off">
																<div class="form-control-feedback"></div>
															</div>
															<div class="form-group col-1">
																<label>Pag.</label>
																<input type="text" class="form-control pag" autocomplete="off">
																<div class="form-control-feedback"></div>
															</div>
															<div class="form-group col-1">
																<label>T</label>
																<input type="text" class="form-control t" autocomplete="off" disabled>
																<div class="form-control-feedback"></div>
															</div>
														</div>
														<div class="row fila_item_desp">
															<div class="form-group col-4">
																<label>Asignatura</label>
																<select class="form-control asignatura">
																	`+asignaturas+`
																</select>
																<div class="form-control-feedback mensaje_asignatura"></div>
															</div>
															<div class="form-group col-4">
																<label>Sub-total</label>
																<input type="text" class="form-control subtotal" disabled autocomplete="off">
																<div class="form-control-feedback"></div>
															</div>
															<div class="form-group col-4 opcion_despacho">
																<label>&nbsp;</label>
																<button type="button" class="btn btn-danger eliminarItem">Eliminar item</button>
																<button type="button" class="btn btn-primary agregarItem">Agregar item</button>
															</div>
														</div>
													</div>
												</div>`

			//Mostramos la nueva fila
			$('.wrapper_item:last').after(nueva_fila);

			//Creamos el formato autonumerico para los siguientes elementos
			$('.wrapper_item:last .eval, .wrapper_item:last .hr, .wrapper_item:last .pag, .wrapper_item:last .t').autoNumeric('init',{
				aDec   : ',',
				aSep   : '.',
				mDec   : 0,
				vMin   : '0'
			});

			//Creamos el formato autonumerico para los siguientes elementos
			$('.wrapper_item:last .subtotal').autoNumeric('init',{
				aDec   : ',',
				aSep   : '.',
				aSign  : '$',
				mDec   : 2,
				vMin   : '0.00'
			});

		}else{

			let html = contexto.find('.opcion_despacho').html();
			contexto.find('.opcion_despacho')
			.html(`<div class="alert alert-danger" role="alert">
	    				 <strong>Ya existe la combinación curso - materiales - asignatura</strong>
	  			   </div>`);//Fin del if

			setTimeout(function(){

				contexto.find('.opcion_despacho')
				.html(html)

 				$.fn.eventos();

 			},3000);

		}//Fin del if

	}//Fin del if

	$.fn.eventos();

};//Fin de la función $.fn.agregar_item_dep
/*****************************************/

/*
	Función que evalua si son validos todos los items del despacho
*/
$.fn.validar_item_desp = function(contexto){

	var respuesta = false;

	//Obtenemos los campos
	var curso      = contexto.find('.curso');
	var eval       = contexto.find('.eval');
	var hr         = contexto.find('.hr');
	var pag        = contexto.find('.pag');
	var t          = contexto.find('.t');
	var modulo     = contexto.find('.modulo');
	var asignatura = contexto.find('.asignatura');
	var cantidad   = contexto.find('.cantidad');
	var precio     = contexto.find('.precio');

	//Removemos los mensajes de error
	$('#coste_imprenta').parents('.form-group').removeClass('has-danger');
	curso.parents('.form-group').removeClass('has-danger');
	asignatura.parents('.form-group').removeClass('has-danger');
  eval.parents('.form-group').removeClass('has-danger');
	hr.parents('.form-group').removeClass('has-danger');
	pag.parents('.form-group').removeClass('has-danger');
  t.parents('.form-group').removeClass('has-danger');
	modulo.parents('.form-group').removeClass('has-danger');

	$('#coste_imprenta').parents('.form-group').find('.form-control-feedback').html('');
	curso.parents('.form-group').find('.form-control-feedback').html('');
	asignatura.parents('.form-group').find('.form-control-feedback').html('');
  eval.parents('.form-group').find('.form-control-feedback').html('');
	hr.parents('.form-group').find('.form-control-feedback').html('');
	pag.parents('.form-group').find('.form-control-feedback').html('');
  t.parents('.form-group').find('.form-control-feedback').html('');
	modulo.parents('.form-group').find('.form-control-feedback').html('');

	//Evaluamos el coste de la imprentas
	if($('#coste_imprenta').autoNumeric('get') == ''){

		//Indicamos error
		$('#coste_imprenta').parents('.form-group').addClass('has-danger');
		$('#coste_imprenta').parents('.form-group').find('.form-control-feedback').html('Debe indicar el coste!');

	}else{

		//Evaluamos el curso
		if(!curso.val()){

			//Indicamos error
			curso.parents('.form-group').addClass('has-danger');
			curso.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

		}else{

			//Evaluamos los modulos
			if(!modulo.val()){

				//Indicamos error
				modulo.parents('.form-group').addClass('has-danger');
				modulo.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

			}else{

				//Evaluamos eval
				if(eval.autoNumeric('get') == ''){

					//Indicamos error
					eval.parents('.form-group').addClass('has-danger');
					eval.parents('.form-group').find('.form-control-feedback').html('Requerido!');

				}else{

					//Evaluamos hr
					if(hr.autoNumeric('get') == ''){

						//Indicamos error
						hr.parents('.form-group').addClass('has-danger');
						hr.parents('.form-group').find('.form-control-feedback').html('Requerido!');

					}else{

						//Evaluamos pag
						if(pag.autoNumeric('get') == ''){

							//Indicamos error
							pag.parents('.form-group').addClass('has-danger');
							pag.parents('.form-group').find('.form-control-feedback').html('Requerido!');

						}else{

							//Evaluamos t
							if(t.autoNumeric('get') == ''){

								//Indicamos error
								t.parents('.form-group').addClass('has-danger');
								t.parents('.form-group').find('.form-control-feedback').html('Requerido!');

							}else{

								//Evaluamos las asignaturas
								if(!asignatura.val()){

									//Indicamos error
									asignatura.parents('.form-group').addClass('has-danger');
									asignatura.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

								}else{

									return true;

								}//Fin !asignatura.val()

							}//Fin t.autoNumeric('get')

						}//Fin pag.autoNumeric('get')

					}//Fin hr.autoNumeric('get')

				}//Fin eval.autoNumeric('get')

			}//Fin modulo.val()

		}//Fin !curso.val()

	}//Fin $('#coste_imprenta').autoNumeric('get')

	return respuesta;

};//Fin de la función $.fn.validar_nuevo_item
/*******************************************/

/*
	Función que calcula el valor de T
*/
$.fn.calcularT = function(contexto){

	let eval = parseInt((contexto.find('.eval').autoNumeric('get') == '') ? 0 : contexto.find('.eval').autoNumeric('get'));
	let hr   = parseInt((contexto.find('.hr').autoNumeric('get') == '') ? 0 : contexto.find('.hr').autoNumeric('get'));
	let pag  = parseInt((contexto.find('.pag').autoNumeric('get') == '') ? 0 : contexto.find('.pag').autoNumeric('get'));

	let t = (eval * pag) + hr;

	//Asignamos el valor
	contexto.find('.t').autoNumeric('set',t);

	contexto.find('.t').trigger('keyup')

};//Fin $.fn.calcularT
/********************/

/*
	Función que calcula el total para el despacho
*/
$.fn.calcular_total = function(){

	var total = 0;

	//Recorremos todos los subtotales
	$('.wrapper_item').each(function(index, elemento){

		//Subamos los subtotales
		total += parseFloat($(this).find('.subtotal').autoNumeric('get'));

  });//Fin del each

	//Seteamos el total
	$('#form_planificar .total').autoNumeric('set',total);

};//Fin de la función $.fn.calcular_total

/*
	Función que lista los condutores asociados a la transportista
*/
$.fn.conductores = function(id_trasportista){

	$.ajax({

		url: 'conductores',
		type: 'POST',
		dataType: 'json',
		data: {
			id_trasportista : id_trasportista
		},
		beforeSend: function(objeto){

			//Muestro la opcion de carga
			$('#modal_nueva_planificacion .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

			//Mostramos una opción por defecto
			$('#form_planificar .conductor')
			.html(`<option value="" disabled selected>Cargando</option>`);

			//Ocultamos el mensaje de error
			$('#form_planificar .conductor').parent('.form-group').removeClass('has-danger');
			$('#form_planificar .conductor').parent('.form-group').children('.form-control-feedback').html('');

		},
		error: function(objeto, quepaso, otroobj){

			//Mostramos el mensaje de error
			$('#form_planificar .conductor').parent('.form-group').addClass('has-danger');
			$('#form_planificar .conductor').parent('.form-group').children('.form-control-feedback').html('Error al mostrar los conductores.');

			//Ocultamos el icono de carga
			$('#modal_nueva_planificacion .modal-footer')
			.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
				   <button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>`);

			$.fn.eventos();

		},
		success: function(data){

			//Ocultamos el icono de carga
			$('#modal_nueva_planificacion .modal-footer')
			.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
				   <button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>`);

			//Evaluamos si hay transportistas
			if(data != null){

				//Muestro las opciones
				$('#form_planificar .conductor')
				.html(`<option value="" disabled selected>Seleccione</option>`);

				//Mostramos las opciones
				$(data).each(function(index, elemento){

					$('#form_planificar .conductor')
					.append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);

				});//Fin del each

			}else{

				//Muestro la opción de error
				$('#form_planificar .conductor')
				.html(`<option value="">Error al mostrar los conductores.</option>`);

			}//Fin del if

			$.fn.eventos();

		}//Fin del success

	});//Fin del ajax

};//Fin de la función $.fn.conductores
/************************************/

/*
	Función que crea un nuevo despacho
*/
$.fn.crear_despacho = function(){

	//Validamos si puede agregar un nuevo item
	var validador = $.fn.validar_despacho();

    //Evaluamos el validador
	if(validador){

		//Recorremos los items de despacho
		var arrayItems = [];

		$('.wrapper_item').each(function(index, elemento){

			//Obtenemos valores
			var curso      = $(this).find('.curso').val();
			var asignatura = $(this).find('.asignatura').val();
			var eval       = $(this).find('.eval').autoNumeric('get');
			var hr         = $(this).find('.hr').autoNumeric('get');
			var pag        = $(this).find('.pag').autoNumeric('get');
			var t          = $(this).find('.t').autoNumeric('get');
			var materiales = $(this).find('.modulo').val();
			var subtotal   = $(this).find('.subtotal').autoNumeric('get');

			arrayItems.push('{"materiales":"'+materiales+'","asignatura":"'+asignatura+'","curso":"'+curso+'","eval":"'+eval+'","hr":"'+hr+'","pag":"'+pag+'","t":"'+t+'","subtotal":"'+subtotal+'"}');

    });//Fin del each

		//Obtenemos los demas valores para crear el despacho
		var establecimiento = $('#form_planificar #establecimiento').attr('id_ee');
		var transportista   = $('#form_planificar .transportistas').val();
		var conductor       = $('#form_planificar .conductor').val();
		var fecha           = $('#form_planificar #calendario').val();
		var coste_imprenta  = $('#form_planificar #coste_imprenta').autoNumeric('get');
		var productoServ    = $('#form_planificar .productoServ').val();
		var imprenta        = $('#form_planificar .imprenta').val();

		//Ajax
		$.ajax({

			url: 'nuevo_despacho',
			type: 'POST',
			dataType: 'json',
			data: {
				arrayItems      : arrayItems,
				establecimiento : establecimiento,
				transportista   : transportista,
				conductor       : conductor,
				fecha           : fecha,
				coste_imprenta  : coste_imprenta,
				productoServ    : productoServ,
				imprenta        : imprenta
			},
			beforeSend: function(objeto){

				//Muestro la opcion de carga
				$('.wrapper_btn_desp')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

			},
			error: function(objeto, quepaso, otroobj){

				//Mostramoe el mensaje
				$('.wrapper_btn_desp')
				.html(`<div class="alert alert-danger" role="alert">
							 	<strong>Error al crear el despacho!</strong>, intente más tarde.
						   </div>`);


				setTimeout(function(){

					$('.wrapper_btn_desp')
					.html(`<button id="guardar_despacho" type="button" class="btn btn-success">Despachar</button>`);

					$.fn.eventos();

				},3500);

			},
			success: function(data){

				//Evaluamos si hay transportistas
				if(data != null){

					//Evaluamos el codigo de respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){

						//Mostramoe el mensaje
						$('.wrapper_btn_desp')
						.html(`<div class="alert alert-success" role="alert">
									 	<strong>`+data['MENSAJE_RESPUESTA']+`</strong>
								   </div>`);


						setTimeout(function(){

							location.reload();

						},3000);

					}else{

						//Mostramoe el mensaje
						$('.wrapper_btn_desp')
						.html(`<div class="alert alert-danger" role="alert">
									 	<strong>`+data['MENSAJE_RESPUESTA']+`</strong>
								   </div>`);


						setTimeout(function(){

							$('.wrapper_btn_desp')
							.html(`<button id="guardar_despacho" type="button" class="btn btn-success">Despachar</button>`);

							$.fn.eventos();

						},3500);

					}//Fin del if

				}else{

					//Mostramoe el mensaje
					$('.wrapper_btn_desp')
					.html(`<div class="alert alert-danger" role="alert">
								 	<strong>Error al crear el despacho!</strong>, intente más tarde.
							   </div>`);


					setTimeout(function(){

						$('.wrapper_btn_desp')
						.html(`<button id="guardar_despacho" type="button" class="btn btn-success">Despachar</button>`);

						$.fn.eventos();

					},3500);

				}//Fin del if

			}//Fin del success

		});//Fin del ajax

	}//Fin del if

};//Fin de la función $.fn.crear_despacho
/***************************************/

/*
	Función que valida los datos para el despacho
*/
$.fn.validar_despacho = function(){

	var respuesta = false;

	//Elementos
	const establecimiento = $('#form_planificar #establecimiento');
	const transportista   = $('#form_planificar .transportistas');
	const conductor       = $('#form_planificar .conductor');
	const fecha           = $('#form_planificar #calendario');
	const imprenta        = $('#form_planificar .imprenta');
	const coste_imprenta  = $('#form_planificar #coste_imprenta');
	const productoServ    = $('#form_planificar .productoServ');

	//Removemos los mensajes de error
	establecimiento.parents('.form-group').removeClass('has-danger');
	transportista.parents('.form-group').removeClass('has-danger');
	conductor.parents('.form-group').removeClass('has-danger');
	fecha.parents('.form-group').removeClass('has-danger');
	imprenta.parents('.form-group').removeClass('has-danger');
	coste_imprenta.parents('.form-group').removeClass('has-danger');
	productoServ.parents('.form-group').removeClass('has-danger');

	establecimiento.parents('.form-group').find('.form-control-feedback').html('');
	transportista.parents('.form-group').find('.form-control-feedback').html('');
	conductor.parents('.form-group').find('.form-control-feedback').html('');
	fecha.parents('.form-group').find('.form-control-feedback').html('');
	imprenta.parents('.form-group').find('.form-control-feedback').html('');
	coste_imprenta.parents('.form-group').find('.form-control-feedback').html('');
	coste_imprenta.parents('.form-group').find('.form-control-feedback').html('');

	//Evaluamos establecimiento
	if(typeof establecimiento.attr('id_ee') == "undefined" || establecimiento.attr('id_ee').trim() == ''){

		//Indicamos error
		establecimiento.parents('.form-group').addClass('has-danger');
		establecimiento.parents('.form-group').find('.form-control-feedback').html('Seleccione una Establecimiento!');

	}else{

		//Evaluamos las transportista
		if(!transportista.val()){

			//Indicamos error
			transportista.parents('.form-group').addClass('has-danger');
			transportista.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

		}else{

			//Evaluamos la conductor
			if(!conductor.val()){

				//Indicamos error
				conductor.parents('.form-group').addClass('has-danger');
				conductor.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

			}else{

				//Evaluamos el precio
				if(fecha.val().trim() == ''){

					//Indicamos error
					fecha.parents('.form-group').addClass('has-danger');
					fecha.parents('.form-group').find('.form-control-feedback').html('Indique una fecha!');

				}else{

					//Evaluamos la imprenta
					if(!imprenta.val()){

						//Indicamos error
						imprenta.parents('.form-group').addClass('has-danger');
						imprenta.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

					}else{

						//Evaluamos coste_imprenta
						if(coste_imprenta.autoNumeric('get') == ''){

							//Indicamos error
							coste_imprenta.parents('.form-group').addClass('has-danger');
							coste_imprenta.parents('.form-group').find('.form-control-feedback').html('Indique el coste!');

						}else{

							if(!productoServ.val()){

								//Indicamos error
								productoServ.parents('.form-group').addClass('has-danger');
								productoServ.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');

							}else{

								$('.wrapper_item').each(function(index, elemento){

									//Obtenemos el contexto
									var contexto = $(this);

									respuesta = $.fn.validar_item_desp(contexto);

								});//Fin del each

							}//Fin !productoServ.val()

						}//Fin coste_imprenta.autoNumeric('get')

					}//Fin !imprenta.val()

				}//Fin del if cantidad

			}//Fin del if cantidad

		}//Fin del if asignatura

	}//Fin del if establecimiento

	return respuesta;

};//Fin de la función $.fn.validar_despacho
/*****************************************/
