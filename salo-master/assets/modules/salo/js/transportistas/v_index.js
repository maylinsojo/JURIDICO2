// JavaScript Document//Variables globales
var xhr;

/*
	Evento document ready
*/
$(document).ready(function(){
   
   $.fn.data_inicial();
   
   //Evento focus sobre el campo
   $('#busc_nombre_transp').focusin(function(e){	
         
		 //Evaluo si hay resultados previos
		 if($('#sugerencias .dropdown-item').length > 0){
		
			 //Agregamos la clase
			 $('#sugerencias').parent('.dropdown').addClass('show');
			 
		 };//Fin del if
		 
   });//Fin del evento focus
   
   //Evento focus sobre el campo
   $('#busc_nombre_transp').focusout(function(e){	
       
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
		Evento click sobre #nueva_transportista
	*/
	$('#nueva_transportista').unbind('click')
	$('#nueva_transportista').click(function(){
		
		//Abrimos la ventana modal_nueva_transportista
		$.fn.modal_nueva_transportista();
		
	});//Fin del evento click
	
	/*
		Evento click sobre #guardar
	*/
	$('#guardar').unbind('click')
	$('#guardar').click(function(){
		
		//Función para guardar
		$.fn.guardar_transportista();
		
	});//Fin del evento click
	
	/*
		Evento click sobre .editar_transportista
	*/
	$('.editar_transportista').unbind('click');
	$('.editar_transportista').click(function(){
		
		//Obtenemos el id de la transportista
		var id_transp = $(this).attr('id');
		
		$.fn.modal_editar_transportista(id_transp);
		
	});//Fin del evento click
	
	/*
		Evento click sobre #guardar_editar_transportista
	*/
	$('#guardar_editar_transportista').unbind('click');
	$('#guardar_editar_transportista').click(function(){
		
		//Obtenemos le id de la transportista
		var id_transp = $(this).attr('id_transp');
		
		$.fn.editar_transportista(id_transp);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .lista_conductor
	*/
	$('.lista_conductor').unbind('click');
	$('.lista_conductor').click(function(){
		
		//Obtenemos le id del establecimiento
		var id_transp = $(this).attr('id');
		
		$.fn.modal_lista_conductor(id_transp);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .agregar_conductor
	*/
	$('.agregar_conductor').unbind('click');
	$('.agregar_conductor').click(function(){
		
		//Verificamos la cantidad de conductores
		if($('.conductor').length < 3){
		
			//Obtenemos le id de la transportista
			var id_transp = $(this).attr('id_transp');
			
			$.fn.agregar_conductor(id_transp);
			
		}else{
			
			//Mostramos el mensaje de éxito
			$('#modal_conductores .modal-footer')
			.html(`<div class="alert alert-warning" role="alert">
					 <strong>Solo se pueden agregar hasta 3 conductores</strong>
				   </div>`);
				  
			setTimeout(function(){ 
			
				//Mostramos el btn
				$('#modal_conductores .modal-footer')
				.html(``);
				
				$.fn.eventos();
				
			},3000);
			
		}//Fin del if
		
	});//Fin del evento click
	
	/*
		Evento click sobre .editar_conductor
	*/
	$('.editar_conductor').unbind('click');
	$('.editar_conductor').click(function(){
		
		//Obtenemos el id de la transportista y del conductor
		var id        = $(this).attr('id');
		var id_transp = $(this).attr('id_transp');
		
		var contexto = $(this);
		
		$.fn.info_editar_conductor(id,id_transp,contexto);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .cancelar_editar_conductor
	*/
	$('.cancelar_editar_conductor').unbind('click');
	$('.cancelar_editar_conductor').click(function(){
		
		//Obtenemos el id del establecimiento
		var id_transp = $(this).attr('id_transp');
		
		//Seteamos valores
		$('#nombre_conductor').val('');
		$('#telefono_conductor').val('');
		$('#otro_tlf_conductor').val('');
		$('#correo_conductor').val('');
		
		//Mostramos los nuevos botones
		$('.wrapper_btn_agregar')
		.html(`<button type="button" class="btn btn-success agregar_conductor" id_transp="`+id_transp+`">Agregar</button>`);
		
		$.fn.eventos();	
		
	});//Fin del evento click
	
	
	/*
		Evento click sobre .guardar_editar_conductor
	*/
	$('.guardar_editar_conductor').unbind('click');
	$('.guardar_editar_conductor').click(function(){
		
		//Obtenemos el id de la transportista y del condutor
		var id        = $(this).attr('id');
		var id_transp = $(this).attr('id_transp');
		
		$.fn.editar_conductor(id,id_transp);
		
	});//Fin del evento click
	
	/*
		Evento keyup sobre el campo #nombre_conductor
	*/
	$('#nombre_conductor, #correo_conductor, #telefono_conductor, #otro_tlf_conductor').unbind('keyup');
	$('#nombre_conductor, #correo_conductor, #telefono_conductor, #otro_tlf_conductor').keyup(function(){
		
		//Removemos el mensaje de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	
	/*
		Evento click sobre .eliminar_conductor
	*/
	$('.eliminar_conductor').unbind('click');
	$('.eliminar_conductor').click(function(){
		
		//Obtenemos el id de la transportista y del conductor
		var id        = $(this).attr('id');
		var id_transp = $(this).attr('id_transp');
		
	
		$.fn.eliminar_conductor(id,id_transp)
		
	});//Fin del evento click
	/*
		Evento keyup sobre el campo #busc_nombre_transp
	*/
	$('#busc_nombre_transp').unbind('keyup');
	$('#busc_nombre_transp').keyup(function(){
		
		//Obtengo el valor
		var valor = $(this).val();
		
		//Evaluo
		if(valor.trim() == ''){
			
			$(this).val(valor.trim());
			
		}else{
			
			$.fn.buscar_transportista(valor);
			
		}//Fin del if
		
		$.fn.eventos();
	});//Fin del evento keyup
	/***********************/
	
	/*
		Evento click sobre #sugerencias .dropdown-item
	*/
	$('#sugerencias .dropdown-item').unbind('click');
	$('#sugerencias .dropdown-item').click(function(){
  
		//Obtenemos el id de la transportista 
		var id_transp = $(this).attr('id');
		var transportista    = $(this).children('.transportista').text(); 
		
		$('#busc_nombre_transp').val(transportista);
		$('#sugerencias').html('');
		
		
		$.fn.transportistas(id_transp,0,1);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .reiniciar_filtro
	*/
	$('.reiniciar_filtro').unbind('click');
	$('.reiniciar_filtro').click(function(){
  
		$.fn.transportistas(0,0,1);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre #confirm_eliminar_transportista
	*/
	$('#confirm_eliminar_transportista').unbind('click');
	$('#confirm_eliminar_transportista').click(function(){
  
		//Obtenemos el id del transportista
		var id_transp = $(this).attr('id_transp');
        
		//Mostramos el mensaje de error
		$('#modal_editar_transportista .modal-footer')
		.html(`<div class="alert alert-danger" role="alert">
				 <strong>¿Está seguro de eliminar ésta región?</strong>
				 <button type="button" class="btn btn-success cancelar_eliminar" id_transp="`+id_transp+`">No</button>
				 <button type="button" class="btn btn-danger eliminar_transportista" id_transp="`+id_transp+`">Si</button>
			   </div>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .cancelar_eliminar
	*/
	$('.cancelar_eliminar').unbind('click');
	$('.cancelar_eliminar').click(function(){
 
		//Obtenemos el id del transportista
		var id_transp = $(this).attr('id_transp');
        
		//Mostramos el mensaje de error
		$('#modal_editar_transportista .modal-footer')
		.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			   <button id_transp="`+id_transp+`" type="button" class="btn btn-danger" id="confirm_eliminar_transportista">Eliminar transportista</button>
			   <button id_transp="`+id_transp+`" type="button" class="btn btn-warning" id="guardar_editar_transportista">Guardar</button>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .eliminar_transportista
	*/
	$('.eliminar_transportista').unbind('click');
	$('.eliminar_transportista').click(function(){
 
		//Obtenemos el id del transportista
		var id_transp = $(this).attr('id_transp');
        
		$.fn.eliminar_transportista(id_transp);
		
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
			
			$.fn.transportistas(0,rango,0);
			
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
				
		url: 'C_transportistas/data_inicial',
		type: 'POST',
		dataType: 'json',	
		data:{
			  id_transp : 0,
			  rango            : 0
			 },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_transp').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_transportistas').html('');
			$('.wrapper_transportistas').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_transp').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_transportistas').html('');
			$('.wrapper_transportistas')
			.append(`<div class="alert alert-warning" role="alert">
			          <strong>Error al tratar de listar las transportistas! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_transp').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_transportistas').html('');
			
			//Evaluamos data
			if(data != null){
				
				//Evaluamos si hay transportistas
				if(data['transportistas'] != null){
					
					var tabla = `
								  <table class="table table-striped"s>
								    <thead>
										<tr>
											<th class="text-center">Nombre</th>										
											<th class="text-center">Estatus</th>
											<th class="text-center"></th>
										</tr>
									</thead>
								    <tbody>	
						        `
					
					//Recorremos los resultados
				    $(data['transportistas']).each(function(index, elemento){
						
						tabla += `
								  <tr>
								 	<td>`+elemento.nombre+`</td>									
									<td>`+elemento.estatus+`</td>
									<td>
										<i id="`+elemento.id+`" class="fa fa-search editar_transportista" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Transportista"></i>
										<i id="`+elemento.id+`" class="fa fa-drivers-license lista_conductor" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Conductores"></i>
									</td>
											
								  </tr>	
						        `
						
                    });//Fin del each
					
					tabla += `
						        </tbody>
							  </table>
						     `;
					
					//Obtenemos el número de transportistas
					var numTransp = data['num_transp'];
					var numPag = 1;
					var rango  = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numTransp;){
						
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
					
					//Mostramos las transportistas
					$('.wrapper_transportistas').append(tabla);
					
					//Mostramos el paginador
					$('.wrapper_paginador').append(paginador);
					
				}else{
					
					//Mostramos el mensaje
					$('.wrapper_transportistas')
				.append(`<div class="alert alert-warning" role="alert">
						  <strong>No hay transportistas registradas!.</strong>
						 </div>`);
					
				}//Fin del if
				
			}else{
			
				//Mostramos el mensaje
				$('.wrapper_transportistas')
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
	Función que muestra la ventana modal para el registro de una nueva transportista
*/
$.fn.modal_nueva_transportista = function(){
	
	var modal = `<div class="modal fade" id="modal_nueva_transportista" tabindex="-1" role="dialog" aria-hidden="true">

				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Registrar nueva transportista</h5>
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
							<label for="conductor">Lista de conductores select</label>
							<select class="form-control" id="conductor" name="conductor">
								<option value="1">Aplica</option>
								<option value="0" selected>No aplica</option>
							  </select>
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
	$('#modal_nueva_transportista').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_nueva_transportista').on('shown.bs.modal', function(e){
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_nueva_transportista').on('hidden.bs.modal', function(e){
	    
		//Listamos las transportistas
		$.fn.transportistas(0,0,1);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_nueva_transportista').modal('show');
	
};//Fin de la función $.fn.modal_nueva_transportista
/********************************************/


/*
	Función que lista las transportistas creadas
*/
$.fn.transportistas = function(id_transp, rango, remover_paginador){
	
	$.ajax({
				
		url: 'C_transportistas/transportistas_creadas',
		type: 'POST',
		dataType: 'json',
		data: {
				id_transp : id_transp,
				rango            : rango
			  },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_transp').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_transportistas').html('');
			$('.wrapper_transportistas').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
			//Ocultamos el paginador
			$('.wrapper_paginador').hide();
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_transp').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_transportistas').html('');
			$('.wrapper_transportistas')
			.append(`<div class="alert alert-warning" role="alert">
					  <strong>Error al tratar de listar las transportistas! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_transp').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_transportistas').html('');
			
			//Evaluamos datas
			if(data != null){
				
				//Evaluamos el id de la transportista
				if(id_transp != 0){
					
									
					//Mostramos el icono para reiniciar el filtro
					$('#busc_nombre_transp').parents('.dropdown').children('.input-group-addon:eq(1)')
					.html('<i class="fa fa-times-circle tips reiniciar_filtro" aria-hidden="true" title="Reiniciar filtro"></i>');
					
				}else{
					
					//Removemos los tooltips
					$('body .tooltip.bs-tether-element').remove();
					
					//Removemos el icono para reiniciar el filtro
					$('#busc_nombre_transp').parents('.dropdown').children('.input-group-addon:eq(1)')
			        .html('<i class="fa fa-search" aria-hidden="true"></i>');
					
					$('#busc_nombre_transp').val('');
					
				}//Fin del if
				
				
				var tabla = `
							  <table class="table table-striped">
								<thead>
									<tr>
										<th class="text-center">Nombre</th>										
										<th class="text-center">Estatus</th>
										<th class="text-center"></th>
									</tr>
								</thead>
								<tbody>	
							`
				
				//Recorremos los resultados
				$(data['transportistas']).each(function(index, elemento){
				  
					tabla += `
							  <tr>
								<td>`+elemento.nombre+`</td>								
								<td>`+elemento.estatus+`</td>
								<td>
									<i id="`+elemento.id+`" class="fa fa-search editar_transportista" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Transportista"></i>
									<i id="`+elemento.id+`" class="fa fa-drivers-license lista_conductor" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Conductores"></i>
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
				
					//Obtenemos el número de transportistas
					var numTransp= data['num_transp'];
					var numPag = 1;
					var rango  = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numTransp;){
						
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
				$('.wrapper_transportistas').append(tabla);
				
				//Ocultamos el paginador
			    $('.wrapper_paginador').show();

			}else{
			
				//Mostramos el mensaje
				$('.wrapper_transportistas')
				.append(`<div class="alert alert-danger" role="alert">
						  <strong>Error de conexión!.</strong>
						 </div>`);
						 
			}//Fin del if
			
			//Tooltips
   			$('.tips').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
}//Fin de la función $.fn.transportistas
/**************************************/

/*
	Función que guarda un nueva transportista
*/
$.fn.guardar_transportista = function(){
	
	var validador = $.fn.validar_nueva_transportista();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		var nombre     = $('#nombre').val();
		var conductor  = $('#conductor').val();
		
		$.ajax({
				
			url: 'C_transportistas/registrar_transportista',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre     : nombre,			  
				    conductor  : conductor
				
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_nueva_transportista .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_nueva_transportista .modal-footer')
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
						$('#modal_nueva_transportista .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
							   </div>`);
						
					}else if(parseInt(data['CODIGO_RESPUESTA']) == 2){
						
						//Mostramos el mensaje de error
						$('#modal_nueva_transportista .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
							   </div>`);
						
				    }else{
						
						//Mostramos el mensaje de error
						$('#modal_nueva_transportista .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-primary" id="guardar">Reintentar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_nueva_transportista .modal-footer')
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
	
};//Fin de la función $.fn.guardar_transportista
/**********************************************/

/*
	Función que valida el formulario para una nueva transportista
*/
$.fn.validar_nueva_transportista = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nombre    = $('#nombre');
	var conductor = $('#conductor');
	
	
	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
    conductor.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	conductor.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que elnombre  no esté vacio
	if(nombre.val().trim() == ''){
		
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre de la transportista es requerido!');
		
	}else{

			if(!conductor.val()){
			
			//Indicamos error
			conductor.parents('.form-group').addClass('has-danger');
			conductor.parents('.form-group').find('.form-control-feedback').html('Seleccione una opción!');
						
				}else{
				    
						respuesta = true;
						
					}//Fin del if
		
			
		}//Fin del if nombre

	return respuesta;
	
	
};//Fin de la función $.fn.validar_nueva_transportista
/*****************************************************/

/*
	Función que busca la transportista según el tipeo del usuario
*/

$.fn.buscar_transportista = function(valor){
	
	//Evaluamos si hay una petición
	if(xhr != null){
		
		xhr.abort();
			
	}//Fin del if
	
	xhr = $.ajax({
		url: 'C_transportistas/buscar_transportista',
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
			$('#busc_nombre_transp').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');
                
		},
		error: function(objeto, quepaso, otroobj) {
			
			xhr = null;
			
			//Ocultamos el icono de carga
			$('#busc_nombre_transp').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			xhr = null;
			
			//Ocultamos el icono de carga
			$('#busc_nombre_transp').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');
			
			//Evaluamos data
			if(data != null){
				
				if(data.length > 0){
					
					//Agregamos la clase
					$('#sugerencias').parent('.dropdown').addClass('show');
					
					//Recorremos las transportistas
					$(data).each(function(index, elemento){
                        
						$('#sugerencias')
						.append(`<div id="`+elemento['id']+`" class="dropdown-item">
								  
								  <span class="transportista">`+elemento['nombre']+`</span>
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
	
};//Fin de la función $.fn.buscar_transportista
/*********************************************/

/*
	Función que muestra la ventana modal para ver los conductores asociados a la transportista
*/
$.fn.modal_lista_conductor = function(id_transp){
	
	var modal = `<div class="modal fade" id="modal_conductores" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Conductores de la Transportista </h5>
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
	$('#modal_conductores').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_conductores').on('shown.bs.modal', function(e){
		
		$.fn.info_conductor(id_transp);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_conductores').on('hidden.bs.modal', function(e){
	    
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_conductores').modal('show');
	
};//Fin de la función $.fn.modal_lista_conductor
/**********************************************/

/*
	Función que lista la información del conductor asociado a la transportista
*/
$.fn.info_conductor = function(id_transp){
	
	$.ajax({
				
		url: 'C_transportistas/info_conductores',
		type: 'POST',
		dataType: 'json',
		data: {
				id_transp : id_transp
			  },
		beforeSend: function(objeto){
		
			//Mostramos el icono de carga
			$('#modal_conductores .modal-body')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_conductores .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay conductores asociados
			if(data['CONDUCTORES'] != null){
				
				var conductores = ``;
				
				//Recorremos los resultados
				$(data['CONDUCTORES']).each(function(index, elemento){

					conductores += `<tr class="conductor">
									<td>`+elemento.nombre+`</td>
									<td class="telefono">`+elemento.telefono+`</td>
									<td class="telefono">`+elemento.otro_telefono+`</td>
									<td>`+elemento.correo+`</td>
									<td>
										<i id_transp="`+id_transp+`" id="`+elemento.id+`" class="fa fa-pencil editar_conductor" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar"></i>
										<i id_transp="`+id_transp+`" id="`+elemento.id+`" class="fa fa-trash eliminar_conductor" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
									</td>
								  </tr>`;

				});//Fin del 
				
			}else{
				
				var conductores = `<tr>
				                 	<td colspan="5">
										<div class="alert alert-warning" role="alert">
										  <strong>No hay conductores registrados!.</strong>
										</div>
									</td>
								 </tr>`;
				
			}//Fin del if
			
			//Ocultamos el icono de carga
			$('#modal_conductores .modal-body')
			.html(`
			       <form class="form">
			          <div class="row">
						  <div class="form-group col-6">
							<input type="text" class="form-control text-capitalize" id="nombre_conductor" placeholder="Nombre">
							<div class="form-control-feedback text-left"></div>
						  </div>
						  <div class="form-group col-6">
						    <input type="text" class="form-control text-lowercase" id="correo_conductor" placeholder="Correo">
							<div class="form-control-feedback text-left"></div>
						  </div>
					  </div>
					  <div class="row">
						  <div class="form-group col-6">
						    <input type="text" class="form-control" id="telefono_conductor" placeholder="Teléfono" aria-describedby="telefono_conductor_help">
							<div class="form-control-feedback text-left"></div>
							<small id="telefono_conductor_help" class="form-text text-muted text-left">Ejemplo: (02) 2222-0000, (46) 2222-0000</small>
						  </div>
						  <div class="form-group col-6">
						    <input type="text" class="form-control" id="otro_tlf_conductor" placeholder="Otro Teléfono" aria-describedby="otro_tlf_conductor_help">
							<div class="form-control-feedback text-left"></div>
							<small id="otro_tlf_conductor_help" class="form-text text-muted text-left">Ejemplo: (02) 2222-0000, (46) 2222-0000</small>
						  </div>
					  </div>
					  <div class="row">
						  <div class="form-group col-12 wrapper_btn_agregar">
						    <button type="button" class="btn btn-success agregar_conductor" id_transp="`+id_transp+`">Agregar</button>
						  </div>
					  </div>
				   </form>
				   
				   <table id="tabla_conductores" class="table table-striped">
						<thead>
						    <tr>
								<th class="text-center" colspan="5">Conductores Asociados</th>
							</tr>
							<tr>
								<th class="text-center">Nombre</th>
								<th class="text-center">Teléfono</th>
								<th class="text-center">Otro Teléfono</th>
								<th class="text-center">Correo</th>
								<th class="text-center"></th>
							</tr>
						</thead>
						<tbody>
							`+conductores+`
						</tbody>
				    </table>
				   `);
			
			//Creamos la mascara para los siguientes elementos
			$('#telefono_conductor, #otro_tlf_conductor, .telefono').mask('(00) 0 0000-0000');
			
			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.info_conductor
/****************************************/

/*
	Función que asocia un conductor a una transportista
*/
$.fn.agregar_conductor = function(id_transp){
	
	var validador = $.fn.validar_conductor();
	
	//Evaluamos el validador
	if(validador){
		
		$.ajax({
				
			url: 'C_transportistas/asociar_conductor',
			type: 'POST',
			dataType: 'json',
			data: {
					id_transp    : id_transp,
					nombre   : $('#nombre_conductor').val(),
					correo   : $('#correo_conductor').val(),
					tlf      : $('#telefono_conductor').cleanVal(),
					otro_tlf : $('#otro_tlf_conductor').cleanVal()
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('.wrapper_btn_agregar')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Ocultamos el icono de carga
				$('.wrapper_btn_agregar').html('<button type="button" class="btn btn-success agregar_conductor" id_transp="'+id_transp+'">Agregar</button>');
				
				//Mostramos el mensaje de error
				$('#modal_conducores .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al agregar el conductor!</strong>, intenta de nuevo.
					   </div>`);
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				//Ocultamos el icono de carga
				$('.wrapper_btn_agregar').html('<button type="button" class="btn btn-success agregar_conductor" id_transp="'+id_transp+'">Agregar</button>');
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Limpiamos los campos
						$('#nombre_conductor').val('');
						$('#correo_conductor').val('');
						$('#telefono_conductor').val('');
						$('#otro_tlf_conductor').val('');
						
						//Mostramos el mensaje de éxito
						$('#modal_conductores .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
						$.fn.conductores_transp(id_transp);
							   
						setTimeout(function(){ 
						
							//Mostramos el btn
							$('#modal_conductores .modal-footer')
							.html(``);
							
							$.fn.eventos();
							
						},3000);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_conductores .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_conductores .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Ocurrió un error al agregar el conductor!</strong>, intenta de nuevo.
						   </div>`);
							
				}//Fin del if
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
	
	}//Fin del if validador
	
};//Fin de la función $.fn.agregar_conductor
/*****************************************/

/*
	Función que valida el formulario para agregar un conductor
*/
$.fn.validar_conductor = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nombre   = $('#nombre_conductor');
	var correo   = $('#correo_conductor');
	var tlf      = $('#telefono_conductor');
	var otro_tlf = $('#otro_tlf_conductor');
	
	//Removemos los mensajes de error
	nombre.parents('.form-group').removeClass('has-danger');
	correo.parents('.form-group').removeClass('has-danger');
	tlf.parents('.form-group').removeClass('has-danger');
	otro_tlf.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	correo.parents('.form-group').find('.form-control-feedback').html('');
	tlf.parents('.form-group').find('.form-control-feedback').html('');
	otro_tlf.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos si es está lleno
	if(nombre.val().trim().length < 3){
		
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('Es requerido, minimo 3 caracteres!');
		
	}else{
		
		//validamos el nombre
		var regla_nombre = /^[a-zA-Z\sáéíóú]*$/;
		
		//Evaluamos el nombre
		if(!regla_nombre.test(nombre.val())){
		
			//Indicamos error
			nombre.parents('.form-group').addClass('has-danger');
			nombre.parents('.form-group').find('.form-control-feedback').html('Solo letras!');
			
		}else{
			
			//validamos el correo
			var regla_correo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			
			//Evaluamos
			if(!regla_correo.test(correo.val())){
				
				//Indicamos error
				correo.parents('.form-group').addClass('has-danger');
				correo.parents('.form-group').find('.form-control-feedback').html('Correo inválido!');
				
			}else{
				
				//Evaluamos el telefono
				if(tlf.cleanVal().length < 9){
					
					//Indicamos error
					tlf.parents('.form-group').addClass('has-danger');
					tlf.parents('.form-group').find('.form-control-feedback').html('Debe de contener al menos 9 digitos!');
					
				}else{
					
					//Evaluamos el otro teléfono
					if(otro_tlf.cleanVal().length > 0 && otro_tlf.cleanVal().length < 9){
						
						//Indicamos error
						otro_tlf.parents('.form-group').addClass('has-danger');
						otro_tlf.parents('.form-group').find('.form-control-feedback').html('Debe de contener al menos 9 digitos!');
						
					}else{
						
						respuesta = true;
						
					}//Fin del if otro_tlf.cleanVal().length
					
				}//Fin del if tlf.cleanVal().length			
				
			}//Fin del if regla_correo.test
			
		}//Fin del if regla_nombre.test
		
	}//Fin nombre.val().trim()
	
	return respuesta;
	
};//Fin de la función $.fn.validar_conductor
/*****************************************/
/*
	Función que lista los conductores asociados a la transportista
*/
$.fn.conductores_transp = function(id_transp){
	
	$.ajax({
				
		url: 'C_transportistas/conductores_transportista',
		type: 'POST',
		dataType: 'json',
		data: {
				id_transp : id_transp
			  },
		beforeSend: function(objeto){
			
			
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_conductores .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al mostrar los conductores!</strong>, intenta de nuevo.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			var conductores = ``;
				
			//Recorremos los resultados
			$(data).each(function(index, elemento){

				conductores += `<tr class="conductor">
								<td>`+elemento.nombre+`</td>
								<td class="telefono">`+elemento.telefono+`</td>
								<td class="telefono">`+elemento.otro_telefono+`</td>
								<td>`+elemento.correo+`</td>
								<td>
									<i id_transp="`+id_transp+`" id="`+elemento.id+`" class="fa fa-pencil editar_conductor" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar"></i>
									<i id_transp="`+id_transp+`" id="`+elemento.id+`" class="fa fa-trash eliminar_conductor" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
								</td>
							  </tr>`;

			});//Fin del 
			
			$('#tabla_conductor tbody').html(conductores);
			
			//Creamos la mascara para los siguientes elementos
			$('#telefono_conductor, #otro_tlf_conductor, .telefono').mask('(00) 0 0000-0000');
			
			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.conductores_transp
/********************************************/

/*
	Función que elimina un conductor de la transportista
*/
$.fn.eliminar_conductor = function(id_conductor,id_transp){
	
	$.ajax({
				
		url: 'C_transportistas/eliminar_conductor',
		type: 'POST',
		dataType: 'json',
		data: {
				id_conductor : id_conductor
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#modal_conductores .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_conductores .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al agregar el conductor!</strong>, intenta de nuevo.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			
				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){
					
					//Mostramos el mensaje de éxito
					$('#modal_conductores .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);
						   
					$.fn.conductores_transp(id_transp);
						   
					setTimeout(function(){ 
					
						//Mostramos el btn
						$('#modal_conductores .modal-footer')
						.html(``);
						
						$.fn.eventos();
						
					},3000);
					
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_conductores .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);
					
				}//Fin del if
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_conductores .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al eliminar el conductor!</strong>, intenta de nuevo.
					   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función .fn.eliminar_conductor
/*********************************************/



/*
	Función que lista los datos que puede ser editados del conductor
*/
$.fn.info_editar_conductor = function(id,id_transp,contexto){
	
	//Obtenemos la fila
	var fila = contexto.parents('.conductor');
	
	//Obtenemos los valores
	var nombre   = fila.children('td').eq(0).text().toLowerCase();
	var tlf      = fila.children('td').eq(1).text();
	var otro_tlf = fila.children('td').eq(2).text();
	var correo   = fila.children('td').eq(3).text();
	
	//Seteamos valores
	$('#nombre_conductor').val(nombre).css("text-transform","capitalize");
	$('#telefono_conductor').val(tlf);
	$('#otro_tlf_conductor').val(otro_tlf);
	$('#correo_conductor').val(correo);
	
	//Mostramos los nuevos botones
	$('.wrapper_btn_agregar')
	.html(`<button type="button" class="btn btn-danger cancelar_editar_conductor" id_transp="`+id_transp+`">Cancelar</button>
	       <button type="button" class="btn btn-success guardar_editar_conductor" id="`+id+`" id_transp="`+id_transp+`">Guardar</button>`);
	
	$.fn.eventos();	
	
};//Fin de la función $.fn.editar_conductor
/******************************************/

/*
	Función que edita los datos de un conductor
*/
$.fn.editar_conductor = function(id_conductor,id_transp){
	
	var validador = $.fn.validar_conductor();
	
	//Evaluamos el validador
	if(validador){
	
		$.ajax({
					
			url: 'C_transportistas/editar_conductor',
			type: 'POST',
			dataType: 'json',
			data: {
					id_conductor : id_conductor,
					nombre       : $('#nombre_conductor').val(),
				    correo       : $('#correo_conductor').val(),
					tlf          : $('#telefono_conductor').cleanVal(),
					otro_tlf     : $('#otro_tlf_conductor').cleanVal()
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_conductores .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_conductores .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al editar el conductor!</strong>, intenta de nuevo.
					   </div>`);
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Mostramos el mensaje de éxito
						$('#modal_conductores .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
						$.fn.conductores_transp(id_transp);
						
						//Seteamos valores
						$('#nombre_conductor').val('');
						$('#telefono_conductor').val('');
						$('#otro_tlf_conductor').val('');
						$('#correo_conductor').val('');
						
						//Mostramos los nuevos botones
						$('.wrapper_btn_agregar')
						.html(`<button type="button" class="btn btn-success agregar_conductor" id_transp="`+id_transp+`">Agregar</button>`);
							   
						setTimeout(function(){ 
						
							//Mostramos el btn
							$('#modal_conductores .modal-footer')
							.html(``);
							
							$.fn.eventos();
							
						},3000);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_conductores .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_conductores .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Ocurrió un error al editar el conductor!</strong>, intenta de nuevo.
						   </div>`);
							
				}//Fin del if
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
	
	}//Fin del if
	
};//Fin de la función $.fn.editar_conductor
/****************************************/









