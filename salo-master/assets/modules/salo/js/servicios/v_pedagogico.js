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
			 
		 };//Fin del if
		 
   });//Fin del evento focus
   
   //Evento focus sobre el campo
   $('#busc_nombre_usu').focusout(function(e){	
       
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
		Evento click sobre #nueva_planificacion
	*/
	$('#nueva_planificacion').unbind('click')
	$('#nueva_planificacion').click(function(){
		
		//Abrimos la ventana modal
		$.fn.modal_nueva_planificacion();
		
	});//Fin del evento click
	
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
		Evento change sobre #form_planificar .modul
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
			$.fn.datos_prelatorios_modulo(id_modulo,contexto);
		
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
		Evento keyup sobre #form_planificar .cantidad
	*/
	$('#form_planificar .cantidad').unbind('keyup')
	$('#form_planificar .cantidad').keyup(function(){
		
		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		//Obtenemos la cantidad
		var cantidad = $(this).autoNumeric('get');
		
		//Obtenemos el precio
		var precio = $(this).parents('.row').find('.precio').autoNumeric('get');
		
		//Evaluamos si hay precio
		if(isNaN(precio)){
			
			precio = 0;
			
		}//Fin del if
		
		//Multiplicamos
		var subtotal = cantidad * precio;
		
		//Seteamos el subtotal
		$(this).parents('.row').find('.subtotal').autoNumeric('set', subtotal);
		
		$.fn.calcular_total();
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	/***********************/
	
	/*
		Evento keyup sobre #form_planificar .precio
	*/
	$('#form_planificar .precio').unbind('keyup')
	$('#form_planificar .precio').keyup(function(){
		
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
		
		//Multiplicamos
		var subtotal = cantidad * precio;
		
		//Seteamos el subtotal
		$(this).parents('.row').find('.subtotal').autoNumeric('set', subtotal);
		
		$.fn.calcular_total();
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	/***********************/
	
	/*
		Evento click sobre .agregar_item_desp
	*/
	$('.agregar_item_desp').unbind('click')
	$('.agregar_item_desp').click(function(){
		
		//Obtenemos el contexto
		var contexto = $(this);
		
		$.fn.agregar_item_dep(contexto);
		
	});//Fin del evento click
	/************************/
	
	/*
		Evento click sobre .eliminar_item_desp
	*/
	$('.eliminar_item_desp').unbind('click')
	$('.eliminar_item_desp').click(function(){
		
		//Removemos la fila
		$(this).parents('.row').remove();
		
		//Contamos el n° de filas que quedan
		var numFilas = $('.fila_item_desp').length;
		
		//Evaluamos
		if(numFilas > 1){
			
			//Mostramos la opcion para eliminar
			$('.fila_item_desp').find('.opcion_despacho')
			.html(`<i class="fa fa-times eliminar_item_desp" aria-hidden="true"></i>`);
			
			//Mostramos la opcion para agregar
			$('.fila_item_desp:last').find('.opcion_despacho').children('.eliminar_item_desp')
			.after(`<i class="fa fa-plus agregar_item_desp" aria-hidden="true"></i>`);
			
		}else{
			
			//Mostramos la opcion para agregar
			$('.fila_item_desp').find('.opcion_despacho')
			.html(`<i class="fa fa-plus agregar_item_desp" aria-hidden="true"></i>`);
			
		}//Fin del if
		
		$.fn.calcular_total();
		
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
	
	/*
		Evento click sobre .editar_despacho
	*/
	$('.editar_despacho').unbind('click')
	$('.editar_despacho').click(function(){
		
		//Obtenemso el id del despacho
		var id_desp = $(this).attr('id');
		
		$.fn.modal_editar_despacho(id_desp);
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre #editar_despacho
	*/
	$('#editar_despacho').unbind('click')
	$('#editar_despacho').click(function(){
		
		//Obtenemos el id del despacho
		var id_desp = $(this).attr('id_desp');
		
		$.fn.editar_despacho(id_desp);
		
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
			
			$.fn.despachos(rango,0);
			
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
				
		url: 'C_pedagogico/data_inicial',
		type: 'POST',
		dataType: 'json',
		data: {
			   rango : 0
			  },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_despachos').html('');
			$('.wrapper_despachos').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_despachos').html('');
			$('.wrapper_despachos')
			.append(`<div class="alert alert-warning" role="alert">
			          <strong>Error al tratar de listar los despachos! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_despachos').html('');
			
			//Evaluamos data
			if(data != null){
				
				//Evaluamos si hay despachos
				if(data['despachos'] != null){
					
					var tabla = `
								  <table class="table table-striped">
								    <thead>
										<tr>
											<th class="text-center">Establecimiento</th>
											<th class="text-center">Región</th>
											<th class="text-center">Comuna</th>
											<th class="text-center">Fecha de Despacho</th>
											<th class="text-center">Estatus</th>
											<th class="text-center"></th>
										</tr>
									</thead>
								    <tbody>`;
	 	 		
					//Recorremos los resultados
					$(data['despachos']).each(function(index, elemento){
                      
						tabla += `
								  <tr>
									<td>`+elemento.establecimiento+`</td>
									<td>`+elemento.region+`</td>
									<td>`+elemento.comuna+`</td>
									<td>`+elemento.fecha_despacho+`</td>
									<td>`+elemento.estatus+`</td>
									<td>
										<i id="`+elemento.id_despacho+`" class="fa fa-search editar_despacho" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Ver Más"></i>
									</td>
								  </tr>	
						        `;
						
                    });//Fin del each
	
					tabla += `
						        </tbody>
							  </table>
						     `;
					
					//Obtenemos el número de despachos
					var numDesp = parseInt(data['numDesp']);
					var numPag  = 1;
					var rango   = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numDesp;){
						
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
					
					//Mostramos los despachos
					$('.wrapper_despachos').append(tabla);
					
					//Mostramos el paginador
					$('.wrapper_paginador').append(paginador);
					
				}else{
					
					//Mostramos el mensaje
					$('.wrapper_despachos')
					.append(`<div class="alert alert-warning" role="alert">
							  <strong>No hay despachos registrados!.</strong>
							 </div>`);
					
				}//Fin del if
				
			}else{
			
				//Mostramos el mensaje
				$('.wrapper_despachos')
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
	Función que muestra la ventana modal para realizar una nueva planificación
*/
$.fn.modal_nueva_planificacion = function(){
	
	var modal = `<div class="modal fade" id="modal_nueva_planificacion" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Nueva planificación de despacho</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						  <span aria-hidden="true">&times;</span>
						</button>
					  </div>
					  <div class="modal-body">
						
						<form id="form_planificar">
							
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
									<label for="transportistas">Transportista</label>
									<select class="form-control transportistas">
										<option value="" selected disabled>Seleccione</option>
									</select>
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-4">
									<label for="conductor">Conductor</label>
									<select class="form-control conductor">
										<option value="" selected disabled>Seleccione Transportista</option>
									</select>
									<div class="form-control-feedback"></div>
								</div>
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
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						<button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>
					  </div>
					</div>
				  </div>
				</div>`;
		
    //Agregamos la modal al body
	$('body').append(modal);
	
	//Opciones de la modal
	$('#modal_nueva_planificacion').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_nueva_planificacion').on('shown.bs.modal', function(e){
		
		//Creamos el formato autonumerico para los siguientes elementos
		$('#form_planificar .cantidad').autoNumeric('init',{
			aDec   : ',', 
			aSep   : '.',
			mDec   : 0,
			vMin   : '0'
		});
		
		//Creamos el formato autonumerico para los siguientes elementos
		$('#form_planificar .precio, #form_planificar .subtotal, #form_planificar .total').autoNumeric('init',{
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
	$('#modal_nueva_planificacion').on('hidden.bs.modal', function(e){
	    
		//Listamos los despachos
		$.fn.despachos(0,0);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_nueva_planificacion').modal('show');
	
};//Fin de la función $.fn.modal_nueva_planificacion
/**************************************************/

/*
	Función que sugiere los establecimientos según el nombre
*/
$.fn.buscar_establecimiento = function(nombre_ee){
	
	//Evaluamos si hay una petición
	if(xhr != null){
		
		xhr.abort();
			
	}//Fin del if
	
	xhr = $.ajax({
		url: 'C_pedagogico/buscar_establecimiento',
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

/*
	Función que lista la data para armar un nuevo despacho
*/
$.fn.data_nuevo_despacho = function(){
	
	$.ajax({
				
		url: 'C_pedagogico/data_nuevo_despacho',
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
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.data_nuevo_despacho
/********************************************/

/*
	Función que lista las asignaturas asociadas al modulo
*/
$.fn.datos_prelatorios_modulo = function(id_modulo,contexto){
	
	$.ajax({
				
		url: 'C_pedagogico/datos_prelatorios_modulo',
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
		
		//Mostramos el icono para eliminar
		contexto.parents('.opcion_despacho')
		.html(`<i class="fa fa-times eliminar_item_desp" aria-hidden="true"></i>`);
		
		//Obtenemos los módulos
		var modulo = $('#form_planificar .modulo:first').html();
		
		//Html para la nueva fila
		var nueva_fila = `<div class="row fila_item_desp">
							<div class="form-group col-2">
								<select class="form-control modulo">
									`+modulo+`
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
								<i class="fa fa-times eliminar_item_desp" aria-hidden="true"></i>
								<i class="fa fa-plus agregar_item_desp" aria-hidden="true"></i>
							</div>
						</div>`
		
		//Mostramos la nueva fila
		$('.fila_item_desp:last').after(nueva_fila);
		
		$('.fila_item_desp:last').find('.modulo').children('option').removeAttr('selected');
		$('.fila_item_desp:last').find('.modulo').children('option:eq(0)').attr('selected',true);
		
		//Creamos el formato autonumerico para los siguientes elementos
		$('#form_planificar .cantidad:last').autoNumeric('init',{
			aDec   : ',', 
			aSep   : '.',
			mDec   : 0,
			vMin   : '0'
		});
		
		//Creamos el formato autonumerico para los siguientes elementos
		$('#form_planificar .precio:last, #form_planificar .subtotal:last').autoNumeric('init',{
			aDec   : ',', 
			aSep   : '.',
			aSign  : '$',
			mDec   : 2,
			vMin   : '0.00'
		});
		
	}//Fin del if
	
	$.fn.eventos();
	
};//Fin de la función $.fn.agregar_item_dep
/*****************************************/

/*
	Función que evalua si son validos todos los items del despacho
*/
$.fn.validar_item_desp = function(contexto){
	
	var respuesta = false;
	
	var fila = contexto.parents('.row');
	
	//Obtenemos los campos
	var modulo     = fila.find('.modulo');
	var asignatura = fila.find('.asignatura');
	var cantidad   = fila.find('.cantidad');
	var precio     = fila.find('.precio');
	
	//Removemos los mensajes de error
	modulo.parents('.form-group').removeClass('has-danger');
	asignatura.parents('.form-group').removeClass('has-danger');
	cantidad.parents('.form-group').removeClass('has-danger');
	precio.parents('.form-group').removeClass('has-danger');
	modulo.parents('.form-group').find('.form-control-feedback').html('');
	asignatura.parents('.form-group').find('.form-control-feedback').html('');
	cantidad.parents('.form-group').find('.form-control-feedback').html('');
	precio.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos los modulos
	if(!modulo.val()){
		
		//Indicamos error
		modulo.parents('.form-group').addClass('has-danger');
		modulo.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');
		
	}else{
		
		//Evaluamos las asignaturas
		if(!asignatura.val()){
			
			//Indicamos error
			asignatura.parents('.form-group').addClass('has-danger');
			asignatura.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');
				
		}else{
			
			//Evaluamos la cantidad
			if(isNaN(cantidad.autoNumeric('get')) || cantidad.val() == ''){
				
				//Indicamos error
				cantidad.parents('.form-group').addClass('has-danger');
				cantidad.parents('.form-group').find('.form-control-feedback').html('Campo Requerido!');
				
			}else{
				
				//Evaluamos el precio
				if(isNaN(precio.autoNumeric('get')) || precio.val() == ''){
					
					//Indicamos error
					precio.parents('.form-group').addClass('has-danger');
					precio.parents('.form-group').find('.form-control-feedback').html('Campo Requerido!');
					
				}else{
					
					respuesta = true;
					
				}//Fin del if cantidad
				
			}//Fin del if cantidad
			
		}//Fin del if asignatura
	
	}//Fin del if modulo
	
	return respuesta;
	
};//Fin de la función $.fn.validar_nuevo_item
/*******************************************/

/*
	Función que calcula el total para el despacho
*/
$.fn.calcular_total = function(){
	
	var total = 0;
	
	//Recorremos todos los subtotales
	$('#form_planificar .subtotal').each(function(index, elemento){
        
		//Subamos los subtotales
		total += parseFloat($(this).autoNumeric('get'));
		
    });//Fin del each
	
	//Seteamos el total
	$('#form_planificar .total').autoNumeric('set',total);
	
};//Fin de la función $.fn.calcular_total

/*
	Función que lista los condutores asociados a la transportista
*/
$.fn.conductores = function(id_trasportista){
	
	$.ajax({
				
		url: 'C_pedagogico/conductores',
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
		
		$('.fila_item_desp').each(function(index, elemento){
            
			//Obtenemos valores
			var modulo     = $(this).find('.modulo').val();
			var asignatura = $(this).find('.asignatura').val();
			var cantidad   = $(this).find('.cantidad').autoNumeric('get');
			var precio     = $(this).find('.precio').autoNumeric('get');
			
			arrayItems.push('{"modulo":"'+modulo+'","asignatura":"'+asignatura+'","cantidad":"'+cantidad+'","precio":"'+precio+'"}');
			
        });//Fin del each
		
		//Obtenemos los demas valores para crear el despacho
		var establecimiento = $('#form_planificar #establecimiento').attr('id_ee');
		var transportista   = $('#form_planificar .transportistas').val();
		var conductor       = $('#form_planificar .conductor').val();
		var fecha           = $('#form_planificar #calendario').val();
		
		//Ajax
		$.ajax({
				
			url: 'C_pedagogico/nuevo_despacho',
			type: 'POST',
			dataType: 'json',
			data: {
				arrayItems      : arrayItems,
				establecimiento : establecimiento,
				transportista   : transportista,
				conductor       : conductor,
				fecha           : fecha
			},
			beforeSend: function(objeto){
				 
				//Muestro la opcion de carga
				$('#modal_nueva_planificacion .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramoe el mensaje
				$('#modal_nueva_planificacion .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error al crear el despacho!</strong>, intente más tarde.
					   </div>`);
					   
					   
				setTimeout(function(){ 
			
					$('#modal_nueva_planificacion .modal-footer')
					.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						   <button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>`);
						 
					$.fn.eventos();	   
					
				},3500);
				
			},
			success: function(data){
				
				//Evaluamos si hay transportistas
				if(data != null){
					
					//Evaluamos el codigo de respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
					    
						//Mostramoe el mensaje
						$('#modal_nueva_planificacion .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
							   
						setTimeout(function(){ 
					        
							//Cerramos la modal
							$('#modal_nueva_planificacion').modal('hide');
														
						},3000);
							   
					}else{
						
						//Mostramoe el mensaje
						$('#modal_nueva_planificacion .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
							   
						setTimeout(function(){ 
					
							$('#modal_nueva_planificacion .modal-footer')
							.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
								   <button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>`);
							
						},3500);
						
					}//Fin del if
					
				}else{
					
					//Mostramoe el mensaje
					$('#modal_nueva_planificacion .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error al crear el despacho!</strong>, intente más tarde.
						   </div>`);
						   
						   
					setTimeout(function(){ 
				
						$('#modal_nueva_planificacion .modal-footer')
						.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
							   <button type="button" class="btn btn-success" id="guardar_despacho">Guardar</button>`);
						
					},3500);
					
				}//Fin del if
				
				$.fn.eventos();
				
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
	var establecimiento = $('#form_planificar #establecimiento');
	var transportista   = $('#form_planificar .transportistas');
	var conductor       = $('#form_planificar .conductor');
	var fecha           = $('#form_planificar #calendario');
	
	//Removemos los mensajes de error
	establecimiento.parents('.form-group').removeClass('has-danger');
	transportista.parents('.form-group').removeClass('has-danger');
	conductor.parents('.form-group').removeClass('has-danger');
	fecha.parents('.form-group').removeClass('has-danger');
	
	establecimiento.parents('.form-group').find('.form-control-feedback').html('');
	transportista.parents('.form-group').find('.form-control-feedback').html('');
	conductor.parents('.form-group').find('.form-control-feedback').html('');
	fecha.parents('.form-group').find('.form-control-feedback').html('');
	
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
					
					//Recorremos todos las fila de items para el despacho
					$('.opcion_despacho').each(function(index, elemento){
                        
						//Obtenemos el contexto
						var contexto = $(this);
						
						respuesta = $.fn.validar_item_desp(contexto);
						
                    });//Fin del each
					
				}//Fin del if cantidad
				
			}//Fin del if cantidad
			
		}//Fin del if asignatura
	
	}//Fin del if establecimiento
	
	return respuesta;
	
};//Fin de la función $.fn.validar_despacho
/*****************************************/

/*
	Función que muestra la modal para editar el despacho
*/
$.fn.modal_editar_despacho = function(id_desp){
	
	var modal = `<div class="modal fade" id="modal_editar_despacho" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Editar despacho</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						  <span aria-hidden="true">&times;</span>
						</button>
					  </div>
					  <div class="modal-body text-center">
						
						<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
						
					  </div>
					  <div class="modal-footer"></div>
					</div>
				  </div>
				</div>`;
		
    //Agregamos la modal al body
	$('body').append(modal);
	
	//Opciones de la modal
	$('#modal_editar_despacho').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_editar_despacho').on('shown.bs.modal', function(e){
		
		$.fn.data_despacho(id_desp);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_editar_despacho').on('hidden.bs.modal', function(e){
	    
		//Obtenemos el rango
		var rango = $('.page-item.active').children('.page-link').attr('rango');
		
		//Listamos los despachos
		$.fn.despachos(rango,0);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_editar_despacho').modal('show');
	
};//Fin de la función $.fn.modal_editar_despacho
/**********************************************/

/*
	Función que lista la data del despacho
*/
$.fn.data_despacho = function(id_desp){
	
	$.ajax({
				
		url: 'C_pedagogico/data_despacho',
		type: 'POST',
		dataType: 'json',
		data: {
			   id_desp : id_desp
			  },
		beforeSend: function(objeto){
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_despacho .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
			          <strong>Error al mostrar los datos del despacho.</strong> Intente más tarde.
				   </div>`);
			$('#modal_editar_despacho .modal-footer')
			.html(`<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay módulos
			if(data['datos'] != null){
			    
				//Obtenemos el n° de intems del despacho
				var numItems = data['datos']['items'].length - 1;
				var items    = '';
				var total    = 0;
				
				var estatus = '<option value="" disabled>Seleccione</option>';
					
				//Mostramos las opciones
				$(data['estatus']).each(function(index, estatus_e){
				      
					//Evaluamos si es el seleccionado
					if(data['datos']['id_estatus'] == estatus_e.valor){
				  
					   estatus += `<option value="`+estatus_e.valor+`" selected>`+estatus_e.descripcion+`</option>`;
					  
					}else{
					  
					   estatus += `<option value="`+estatus_e.valor+`">`+estatus_e.descripcion+`</option>`;
					  
					}//Fin del if
				
				});//Fin del each
				
				//Recorremos los items
				$(data['datos']['items']).each(function(index, elemento){
                    
					var modulos = '<option value="" disabled>Seleccione</option>';
					
					//Mostramos las opciones
				    $(data['modulos']).each(function(index, modulo){
					  
					    //Evaluamos si es el seleccionado
					    if(elemento.id_modulo_peda == modulo.id){
					  
						   modulos += `<option value="`+modulo.id+`" selected>`+modulo.descripcion+`</option>`;
						  
					    }else{
						  
						   modulos += `<option value="`+modulo.id+`">`+modulo.descripcion+`</option>`;
						  
					    }//Fin del if
					
				    });//Fin del each
					
					//Evaluamos si es el ultimo item
					if(numItems == index){
						
						var opciones = `<i class="fa fa-times eliminar_item_desp" aria-hidden="true"></i>
						                <i class="fa fa-plus agregar_item_desp" aria-hidden="true"></i>`;
						
					}else{
						
						var opciones = `<i class="fa fa-times eliminar_item_desp" aria-hidden="true"></i>`;
						
					}//Fin del if
					
					//Calculamos el subtotal
					var subtotal = elemento.cantidad * elemento.precio;
					    total    = total + subtotal;
						
					items += `<div class="row fila_item_desp">
								<div class="form-group col-2">
									<select class="form-control modulo">
										`+modulos+`
									</select>
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-3">
									<select class="form-control asignatura">
										<option value="`+elemento.id_asignatura+`">`+elemento.asignatura+`</option>
									</select>
									<div class="form-control-feedback mensaje_asignatura"></div>
								</div>
								<div class="form-group col-2">
									<input type="text" class="form-control cantidad" value="`+elemento.cantidad+`">
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-2">
									<input type="text" class="form-control precio" value="`+elemento.precio+`">
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-2">
									<input type="text" class="form-control subtotal" disabled value="`+subtotal+`">
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group col-1 opcion_despacho">
									`+opciones+`
								</div>
							</div>`;
					
                });//Fin del each
				
				//Html
				var html = `<form id="form_planificar" class="text-left">
							
								<div class="row">
									<div class="form-group col-12">
										<label for="establecimiento">Establecimiento Escolar</label>
										<div id="wrapper_establecimiento" class="dropdown">
											<input type="text" class="form-control" id="establecimiento" aria-describedby="eeHelp" value="`+data['datos']['establecimiento']+`" id_ee="`+data['datos']['id_establecimiento']+`">
											<div id="sugerencias" class="dropdown-menu"></div>
										</div>
										<div class="form-control-feedback"></div>
										<small id="eeHelp" class="form-text text-muted"><b><u>Ubicación:</u></b> `+data['datos']['region']+` - `+data['datos']['comuna']+`</small>
									</div>
								</div>
								<div class="row">
									<div class="form-group col-3">
										<label for="transportistas">Transportista</label>
										<select class="form-control transportistas">
											<option value="" selected disabled>Seleccione</option>
										</select>
										<div class="form-control-feedback"></div>
									</div>
									<div class="form-group col-3">
										<label for="conductor">Conductor</label>
										<select class="form-control conductor">
											<option value="" selected disabled>Seleccione Transportista</option>
										</select>
										<div class="form-control-feedback"></div>
									</div>
									<div class="form-group col-3">
										<label for="fecha_despacho">Fecha</label>
										<div class="input-group">
											<input id="calendario" type="text" class="form-control" id="fecha_despacho" value="`+data['datos']['fecha_despacho']+`">
											<span class="input-group-addon">
												<i class="fa fa-calendar" aria-hidden="true"></i>
											</span>
										</div>
										<div class="form-control-feedback"></div>
									</div>
									<div class="form-group col-3">
										<label for="estatus">Estatus</label>
										<select id="estatus" class="form-control estatus">
											`+estatus+`
										</select>
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
								`+items+`
								<div class="row">
									<div class="form-group col-9"></div>
									<div class="form-group col-2">
										<label>Total</label>
										<input type="text" class="form-control total" disabled value="`+total+`">
										<div class="form-control-feedback"></div>
									</div>
									<div class="form-group col-1"></div>
								</div>
								
							</form>
							
						  </div>`;
						  
				  //Ocultamos el icono de carga
				  $('#modal_editar_despacho .modal-body')
				  .html(html);
				  
				  //Mostramos las opciones
				  $(data['transportistas']).each(function(index, elemento){
					  
					  //Evaluamos si es el seleccionado
					  if(elemento.id == data['datos']['id_transportista']){
					  
						  $('#form_planificar .transportistas')
						  .append(`<option value="`+elemento.id+`" selected>`+elemento.nombre+`</option>`);
					  
					  }else{
						  
						  $('#form_planificar .transportistas')
						  .append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);
						  
					  }//Fin dle if
					  
				  });//Fin del each
				  
				  //Mostramos las opciones
				  $(data['conductores']).each(function(index, elemento){
					  
					  //Evaluamos si es el seleccionado
					  if(elemento.id == data['datos']['id_conductor']){
					  
						  $('#form_planificar .conductor')
						  .append(`<option value="`+elemento.id+`" selected>`+elemento.nombre+`</option>`);
						  
					  }else{
						  
						  $('#form_planificar .conductor')
						  .append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);
						  
					  }//Fin del if
					
				  });//Fin del each
				  
				  //Creamos el formato autonumerico para los siguientes elementos
				  $('#form_planificar .cantidad').autoNumeric('init',{
					  aDec   : ',', 
					  aSep   : '.',
					  mDec   : 0,
					  vMin   : '0'
				  });
				
				  //Creamos el formato autonumerico para los siguientes elementos
				  $('#form_planificar .precio, #form_planificar .subtotal, #form_planificar .total').autoNumeric('init',{
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
				  
				  $('#modal_editar_despacho .modal-footer')
				  .html(`<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
							<button type="button" class="btn btn-success" id="editar_despacho" id_desp="`+id_desp+`">Guardar</button>
						  </div>`);
				
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_editar_despacho .modal-body')
				.html(`<div class="alert alert-danger" role="alert">
						  <strong>Error al mostrar los datos del despacho.</strong> Intente más tarde.
					   </div>`);
				$('#modal_editar_despacho .modal-footer')
				.html(`<button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>`);
				
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.data_nuevo_despacho
/********************************************/

/*
	Función que edita la información del despacho despacho
*/
$.fn.editar_despacho = function(id_desp){
	
	//Validamos si puede agregar un nuevo item
	var validador = $.fn.validar_despacho();
	
    //Evaluamos el validador
	if(validador){
		
		//Recorremos los items de despacho
		var arrayItems = [];
		
		$('.fila_item_desp').each(function(index, elemento){
            
			//Obtenemos valores
			var modulo     = $(this).find('.modulo').val();
			var asignatura = $(this).find('.asignatura').val();
			var cantidad   = $(this).find('.cantidad').autoNumeric('get');
			var precio     = $(this).find('.precio').autoNumeric('get');
			
			arrayItems.push('{"modulo":"'+modulo+'","asignatura":"'+asignatura+'","cantidad":"'+cantidad+'","precio":"'+precio+'"}');
			
        });//Fin del each
		
		//Obtenemos los demas valores para crear el despacho
		var establecimiento = $('#form_planificar #establecimiento').attr('id_ee');
		var transportista   = $('#form_planificar .transportistas').val();
		var conductor       = $('#form_planificar .conductor').val();
		var fecha           = $('#form_planificar #calendario').val();
		var estatus         = $('#form_planificar #estatus').val();
		
		//Ajax
		$.ajax({
				
			url: 'C_pedagogico/editar_despacho',
			type: 'POST',
			dataType: 'json',
			data: {
				arrayItems      : arrayItems,
				establecimiento : establecimiento,
				transportista   : transportista,
				conductor       : conductor,
				fecha           : fecha,
				id_desp         : id_desp,
				estatus         : estatus
			},
			beforeSend: function(objeto){
				 
				//Muestro la opcion de carga
				$('#modal_editar_despacho .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramoe el mensaje
				$('#modal_editar_despacho .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error al editar el despacho!</strong>, intente más tarde.
					   </div>`);
					   
					   
				setTimeout(function(){ 
			
					$('#modal_editar_despacho .modal-footer')
					.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						   <button type="button" class="btn btn-success" id="editar_despacho" id_desp="`+id_desp+`">Guardar</button>`);
						 
					$.fn.eventos();	   
					
				},3500);
				
			},
			success: function(data){
				
				//Evaluamos si hay transportistas
				if(data != null){
					
					//Evaluamos el codigo de respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
					    
						//Mostramoe el mensaje
						$('#modal_editar_despacho .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
							   
						setTimeout(function(){ 
					        
							//Cerramos la modal
							$('#modal_editar_despacho').modal('hide');
														
						},3000);
							   
					}else{
						
						//Mostramoe el mensaje
						$('#modal_editar_despacho .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
							   
						setTimeout(function(){ 
					
							$('#modal_editar_despacho .modal-footer')
							.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						           <button type="button" class="btn btn-success" id="editar_despacho" id_desp="`+id_desp+`">Guardar</button>`);
							
						},3500);
						
					}//Fin del if
					
				}else{
					
					//Mostramoe el mensaje
					$('#modal_editar_despacho .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error al editar el despacho!</strong>, intente más tarde.
						   </div>`);
						   
						   
					setTimeout(function(){ 
				
						$('#modal_editar_despacho .modal-footer')
						.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
						       <button type="button" class="btn btn-success" id="editar_despacho" id_desp="`+id_desp+`">Guardar</button>`);
						
					},3500);
					
				}//Fin del if
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
		
	}//Fin del if
	
};//Fin de la función $.fn.editar_despacho
/****************************************/

/*
	Función que lista los despachos creados
*/
$.fn.despachos = function(rango, remover_paginador){
	
	$.ajax({
				
		url: 'C_pedagogico/despachos_creados',
		type: 'POST',
		dataType: 'json',
		data: {
				rango : rango
			  },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			/*$('#busc_nombre_usu').attr('disabled',true);
			$('#buscar').attr('disabled',true);*/
			
			//Mostramos el icono de carga
			$('.wrapper_despachos').html('');
			$('.wrapper_despachos').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
			//Ocultamos el paginador
			$('.wrapper_paginador').hide();
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			/*$('#busc_nombre_usu').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');*/
			
			//Ocultamos el icono de carga
			$('.wrapper_despachos').html('');
			$('.wrapper_despachos')
			.append(`<div class="alert alert-warning" role="alert">
					  <strong>Error al tratar de listar a los despachos! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			/*$('#busc_nombre_usu').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');*/
			
			//Ocultamos el icono de carga
			$('.wrapper_despachos').html('');
			
			//Evaluamos data
			if(data != null){
				
				var tabla = `
							  <table class="table table-striped">
								    <thead>
										<tr>
											<th class="text-center">Establecimiento</th>
											<th class="text-center">Región</th>
											<th class="text-center">Comuna</th>
											<th class="text-center">Fecha de Despacho</th>
											<th class="text-center">Estatus</th>
											<th class="text-center"></th>
										</tr>
									</thead>
								    <tbody>
							`;
				
				//Recorremos los resultados
				$(data['despachos']).each(function(index, elemento){
				  
					tabla += `
							  <tr>
								<td>`+elemento.establecimiento+`</td>
								<td>`+elemento.region+`</td>
								<td>`+elemento.comuna+`</td>
								<td>`+elemento.fecha_despacho+`</td>
								<td>`+elemento.estatus+`</td>
								<td>
									<i id="`+elemento.id_despacho+`" class="fa fa-search editar_despacho" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Ver Más"></i>
								</td>
							  </tr>	
							 `;
					
				});//Fin del each
				
				tabla += `
							</tbody>
						  </table>
						 `;
				
				//Evaluamos si hay que armar nuevamente el paginador
				if(remover_paginador == 1){
				
					//Obtenemos el número de despachos
					var numDesp = data['numDesp'];
					var numPag  = 1;
					var rango   = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numDesp;){
						
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
				
				//Mostramos los despachos
				$('.wrapper_despachos').append(tabla);
				
				//Ocultamos el paginador
			    $('.wrapper_paginador').show();

			}else{
			
				//Mostramos el mensaje
				$('.wrapper_despachos')
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