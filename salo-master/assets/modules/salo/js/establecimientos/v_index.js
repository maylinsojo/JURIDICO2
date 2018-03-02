//Variables globales
var xhr;

/*
	Evento document ready
*/
$(document).ready(function(){
   
   $.fn.data_inicial();
   
   //Evento focus sobre el campo
   $('#busc_nombre_ee').focusin(function(e){	
         
		 //Evaluo si hay resultados previos
		 if($('#sugerencias .dropdown-item').length > 0){
		
			 //Agregamos la clase
			 $('#sugerencias').parent('.dropdown').addClass('show');
			 
		 };//Fin del if
		 
   });//Fin del evento focusin
   /*************************/
   
   //Evento focus sobre el campo
   $('#busc_nombre_ee').focusout(function(e){	
       
		setTimeout(function(){
	
			//Agregamos la clase
		    $('#sugerencias').parent('.dropdown').removeClass('show');

		},200);		
		 
   });//Fin del evento focusout
   /**************************/
   
   $.fn.eventos();
   
});/*Fin del document ready*/
/***************************/

/*
	Función donde se declaran los eventos
*/
$.fn.eventos = function(){
	
	/*
		Evento click sobre #nuevo_establecimiento
	*/
	$('#nuevo_establecimiento').unbind('click')
	$('#nuevo_establecimiento').click(function(){
		
		//Abrimos la ventana modal
		$.fn.modal_nuevo_establecimiento();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento keyup sobre #nombre
	*/
	$('#nombre').unbind('keyup');
	$('#nombre').keyup(function(){
		
		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento change sobre #regiones
	*/
	$('#regiones').unbind('change');
	$('#regiones').change(function(){
		
		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		//Obtenemos el id de la region
		var id_region = $(this).val();
		
		$.fn.comunas(id_region);
		
		$.fn.eventos();
		
	});//Fin del evento change
	/************************/
	
	/*
		Evento change sobre #comunas
	*/
	$('#comunas').unbind('change');
	$('#comunas').change(function(){
		
		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		$.fn.eventos();
		
	});//Fin del evento change
	/************************/
	
	/*
		Evento change sobre #estatus_ee
	*/
	$('#estatus_ee').unbind('change');
	$('#estatus_ee').change(function(){
		
		//Removemos los mensajes de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		$.fn.eventos();
		
	});//Fin del evento change
	/************************/

	/*
		Evento click sobre #guardar
	*/
	$('#guardar').unbind('click');
	$('#guardar').click(function(){
		
		//Función para guardar
		$.fn.guardar_establecimiento();
		
	});//Fin del evento 
	/*****************/

	/*
		Evento click sobre .editar_establecimiento
	*/
	$('.editar_establecimiento').unbind('click');
	$('.editar_establecimiento').click(function(){
		
		//Obtenemos el id del establecimiento
		var id_establecimiento = $(this).attr('id');
			
		$.fn.modal_editar_establecimiento(id_establecimiento);
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre #guardar_editar_ee
	*/
	$('#guardar_editar_ee').unbind('click');
	$('#guardar_editar_ee').click(function(){
		
		//Obtenemos le id del establecimiento
		var id_establecimiento = $(this).attr('id_ee');
		
		$.fn.editar_establecimiento(id_establecimiento);
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre #confirm_eliminar_ee
	*/
	$('#confirm_eliminar_ee').unbind('click');
	$('#confirm_eliminar_ee').click(function(){
  
		//Obtenemos el id del establecimiento
		var id_ee = $(this).attr('id_ee');
        
		//Mostramos el mensaje de error
		$('#modal_editar_establecimiento .modal-footer')
		.html(`<div class="alert alert-danger" role="alert">
				 <strong>&iquest;Esta seguro de eliminar este Establecimiento?</strong>
				 <button type="button" class="btn btn-success cancelar_eliminar_ee" id_ee="`+id_ee+`">No</button>
				 <button type="button" class="btn btn-danger eliminar_ee" id_ee="`+id_ee+`">Si</button>
			   </div>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .cancelar_eliminar_ee
	*/
	$('.cancelar_eliminar_ee').unbind('click');
	$('.cancelar_eliminar_ee').click(function(){
 
		//Obtenemos el id del establecimiento
		var id_ee = $(this).attr('id_usu');
        
		//Mostramos el mensaje de error
		$('#modal_editar_establecimiento .modal-footer')
		.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
			   <button id_ee="`+id_ee+`" type="button" class="btn btn-danger" id="confirm_eliminar_ee">Eliminar EE</button>
			   <button id_ee="`+id_ee+`" type="button" class="btn btn-warning" id="guardar_editar_ee">Guardar</button>`);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .eliminar_ee
	*/
	$('.eliminar_ee').unbind('click');
	$('.eliminar_ee').click(function(){
 
		//Obtenemos el id del establecimiento
		var id_ee = $(this).attr('id_ee');
        
		$.fn.eliminar_establecimiento(id_ee);
		
		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento keyup sobre el campo #busc_nombre_ee
	*/
	$('#busc_nombre_ee').unbind('keyup');
	$('#busc_nombre_ee').keyup(function(){
		
		//Obtengo el valor
		var valor = $(this).val();
		
		//Evaluo
		if(valor.trim() == ''){
			
			$(this).val(valor.trim());
			
		}else{
			
			$.fn.buscar_ee(valor);
			
		}//Fin del if
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	/***********************/
	
	/*
		Evento click sobre #sugerencias .dropdown-item
	*/
	$('#sugerencias .dropdown-item').unbind('click');
	$('#sugerencias .dropdown-item').click(function(){
  
		//Obtenemos el id del ee y el ee
		var id_ee = $(this).attr('id');
		var ee    = $(this).children('.ee').text(); 
		
		$('#busc_nombre_ee').val(ee);
		$('#sugerencias').html('');
		
		$.fn.establecimientos(id_ee,0,1);

		$.fn.eventos();
		
	});//Fin del evento click
	/***********************/
	
	/*
		Evento click sobre .reiniciar_filtro
	*/
	$('.reiniciar_filtro').unbind('click');
	$('.reiniciar_filtro').click(function(){
  
		$.fn.establecimientos(0,0,1);

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
			
			$.fn.establecimientos(0,rango,0);
			
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
		Evento click sobre .servicio_establecimiento
	*/
	$('.servicio_establecimiento').unbind('click');
	$('.servicio_establecimiento').click(function(){
		
		//Obtenemos el id del estbalecimiento
		var id_ee = $(this).attr('id');
		
		$.fn.modal_servicio_establecimiento(id_ee);
		
	});//Fin del evento click
	
	/*
		Evento click sobre #guardar_servicios
	*/
	$('#guardar_servicios').unbind('click');
	$('#guardar_servicios').click(function(){
		
		//Obtenemos el id del establecimiento
		var id_ee = $(this).attr('id_ee');
	
		$.fn.guardar_servicios(id_ee);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .cursos_establecimiento
	*/
	$('.cursos_establecimiento').unbind('click');
	$('.cursos_establecimiento').click(function(){
		
		//Obtenemos el id del estbalecimiento y su nombre
		var id_ee   = $(this).attr('id');
		var desc_ee = $(this).parents('tr').children('td').eq(0).text().toLowerCase();
		
		$.fn.modal_cursos(id_ee,desc_ee);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .listar_contacto 
	*/
	$('.lista_contacto').unbind('click');
	$('.lista_contacto').click(function(){
		
		//Obtenemos le id del establecimiento y su nombre
		var id_ee   = $(this).attr('id');
		var desc_ee = $(this).parents('tr').children('td').eq(0).text().toLowerCase();
		
		$.fn.modal_lista_contacto(id_ee,desc_ee);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .agregar_contacto
	*/
	$('.agregar_contacto').unbind('click');
	$('.agregar_contacto').click(function(){
		
		//Verificamos la cantidad de contactos
		if($('.contacto').length < 3){
		
			//Obtenemos le id del establecimiento
			var id_ee = $(this).attr('id_ee');
			
			$.fn.agregar_contacto(id_ee);
			
		}else{
			
			//Mostramos el mensaje de éxito
			$('#modal_contactos .modal-footer')
			.html(`<div class="alert alert-warning" role="alert">
					 <strong>Solo se pueden agregar hasta 3 contactos</strong>
				   </div>`);
				  
			setTimeout(function(){ 
			
				//Mostramos el btn
				$('#modal_contactos .modal-footer')
				.html(``);
				
				$.fn.eventos();
				
			},3000);
			
		}//Fin del if
		
	});//Fin del evento click
	
	/*
		Evento keyup sobre el campo #nombre_contacto
	*/
	$('#nombre_contacto, #correo_contacto, #telefono_contacto, #otro_tlf_contacto').unbind('keyup');
	$('#nombre_contacto, #correo_contacto, #telefono_contacto, #otro_tlf_contacto').keyup(function(){
		
		//Removemos el mensaje de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	
	/*
		Evento click sobre .eliminar_contacto
	*/
	$('.eliminar_contacto').unbind('click');
	$('.eliminar_contacto').click(function(){
		
		//Obtenemos el id del establecimiento y del contacto
		var id    = $(this).attr('id');
		var id_ee = $(this).attr('id_ee');
		
		$.fn.eliminar_contacto(id,id_ee)
		
	});//Fin del evento click
	
	/*
		Evento click sobre .editar_contacto
	*/
	$('.editar_contacto').unbind('click');
	$('.editar_contacto').click(function(){
		
		//Obtenemos el id del establecimiento y del contacto
		var id      = $(this).attr('id');
		var id_ee   = $(this).attr('id_ee');
		
		var contexto = $(this);
		
		$.fn.info_editar_contacto(id,id_ee,contexto);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .cancelar_editar_contacto
	*/
	$('.cancelar_editar_contacto').unbind('click');
	$('.cancelar_editar_contacto').click(function(){
		
		//Obtenemos el id del establecimiento
		var id_ee = $(this).attr('id_ee');
		
		//Seteamos valores
		$('#nombre_contacto').val('');
		$('#telefono_contacto').val('');
		$('#otro_tlf_contacto').val('');
		$('#correo_contacto').val('');
		
		//Mostramos los nuevos botones
		$('.wrapper_btn_agregar')
		.html(`<button type="button" class="btn btn-success agregar_contacto" id_ee="`+id_ee+`">Agregar</button>`);
		
		$.fn.eventos();	
		
	});//Fin del evento click
	
	/*
		Evento click sobre .guardar_editar_contacto
	*/
	$('.guardar_editar_contacto').unbind('click');
	$('.guardar_editar_contacto').click(function(){
		
		//Obtenemos el id del establecimiento y del contacto
		var id    = $(this).attr('id');
		var id_ee = $(this).attr('id_ee');
		
		$.fn.editar_contacto(id,id_ee);
		
	});//Fin del evento click
	
	/*
		Evento change sobre .nivel
	*/
	$('.nivel').unbind('change');
	$('.nivel').change(function(){
		
		//Obtenemos el id del nivel y del ee
		var id_nivel = $(this).val();
		var id_ee    = $(this).attr('id_ee');
		
		//Removemos el mensaje de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		$.fn.nivel_curso(id_nivel,id_ee);
		
	});//Fin del evento change
	
	/*
		Evento change sobre .cursos
	*/
	$('.cursos').unbind('change');
	$('.cursos').change(function(){
		
		//Removemos el mensaje de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		$.fn.eventos();
		
	});//Fin del evento change
	
	/*
		Evento change sobre #num_estudiantes
	*/
	$('#num_estudiantes').unbind('keyup');
	$('#num_estudiantes').keyup(function(){
		
		//Removemos el mensaje de error
		$(this).parents('.form-group').removeClass('has-danger');
		$(this).parents('.form-group').find('.form-control-feedback').html('');
		
		$.fn.eventos();
		
	});//Fin del evento keyup
	
	/*
		Evento click sobre .agregar_curso
	*/
	$('#agregar_curso').unbind('click');
	$('#agregar_curso').click(function(){
		
		//Obtenemos el id del establecimiento
		var id_ee = $(this).attr('id_ee');
		
		$.fn.agregar_curso(id_ee);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .eliminar_curso
	*/
	$('.eliminar_curso').unbind('click');
	$('.eliminar_curso').click(function(){
		
		//Obtenemos el id del registro y el establecimiento
		var id    = $(this).attr('id');
		var id_ee = $(this).attr('id_ee');
		
		$.fn.eliminar_curso(id,id_ee);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .editar_curso
	*/
	$('.editar_curso').unbind('click');
	$('.editar_curso').click(function(){
		
		//Obtenemos el id del registro y el establecimiento
		var id    = $(this).attr('id');
		var id_ee = $(this).attr('id_ee');
		
		var contexto = $(this);
		
		$.fn.info_editar_curso(id,id_ee,contexto);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .cancelar_editar_curso
	*/
	$('.cancelar_editar_curso').unbind('click');
	$('.cancelar_editar_curso').click(function(){
		
		//Obtenemos el id del establecimiento
		var id_ee = $(this).attr('id_ee');
		
		//Mostramos el icono de carga
		$('.wrapper_btn_agregar_curso')
		.html(`<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>`);
		
		$.fn.cursos(id_ee);
		
	});//Fin del evento click
	
	/*
		Evento click sobre .guardar_editar_curso
	*/
	$('.guardar_editar_curso').unbind('click');
	$('.guardar_editar_curso').click(function(){
		
		//Obtenemos el id del establecimiento y del registro
		var id_ee = $(this).attr('id_ee');
		var id    = $(this).attr('id');
		
		$.fn.editar_curso(id,id_ee);
		
	});//Fin del evento click
	
};//Fin de la función eventos
/***************************/

/*
	Función que obtiene la data inicial para armar la vista
*/
$.fn.data_inicial = function(){
	
	$.ajax({
				
		url: 'C_establecimientos/data_inicial',
		type: 'POST',
		dataType: 'json',
		data: {
			    id_ee : 0,
				rango : 0
			  },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_ee').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_ee').html('');
			$('.wrapper_ee').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_ee').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_ee').html('');
			$('.wrapper_ee')
			.append(`<div class="alert alert-warning" role="alert">
			          <strong>Error al tratar de listar los establecimientos! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_ee').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_ee').html('');
			
			//Evaluamos data
			if(data != null){
				
				//Evaluamos si hay establecimientos
				if(data['ee'] != null){
					
					var tabla = `<table class="table table-striped">
								    <thead>
										<tr>
											<th class="text-center">Nombre</th>
											<th class="text-center">Región</th>
											<th class="text-center">Comuna</th>
											<th class="text-center">Estatus</th>
											<th class="text-center" colspan="3"></th>
										</tr>
									</thead>
								    <tbody>	
						        `
					
					//Recorremos los resultados
					$(data['ee']).each(function(index, elemento){
                      
						tabla += `
								  <tr>
									<td class="text-capitalize">`+elemento.nombre+`</td>
									<td>`+elemento.region+`</td>
									<td>`+elemento.comuna+`</td>
									<td>`+elemento.estatus+`</td>
									<td class="col-1">
										<i id="`+elemento.id+`"class="fa fa-search editar_establecimiento" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Establecimiento"></i>
									</td>
									<td class="col-1">
										<i id="`+elemento.id+`" class="fa fa-group lista_contacto" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Contactos"></i>
									</td>
									<td class="col-1">
										<i id="`+elemento.id+`" class="fa fa-server servicio_establecimiento" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Servicios Asociados"></i>
									</td>
									<td class="col-1">
										<i id="`+elemento.id+`" class="fa fa-book cursos_establecimiento" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Cursos"></i>
									</td>
								  </tr>	
						        `
						
                    });//Fin del each
					
					tabla += `  </tbody>
							  </table>
						     `;
					
					//Obtenemos el número de ee
					var numEE  = data['num_ee'];
					var numPag = 1;
					var rango  = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numEE;){
						
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
					
					//Mostramos los establecimienetos
					$('.wrapper_ee').append(tabla);
					
					//Mostramos el paginador
					$('.wrapper_paginador').append(paginador);
					
				}else{
					
					//Mostramos el mensaje
					$('.wrapper_ee')
				    .append(`<div class="alert alert-warning" role="alert">
						       <strong>No hay establecimientos registrados!.</strong>
						     </div>`);
					
				}//Fin del if
				
			}else{
			
				//Mostramos el mensaje
				$('.wrapper_ee')
				.append(`<div class="alert alert-danger" role="alert">
						   <strong>Error de conexión!.</strong>
						 </div>`);
						 
			}//Fin del if
			
			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.data_inicial
/*************************************/

/*
	Función que lista los establecimientos creados
*/
$.fn.establecimientos = function(id_ee, rango, remover_paginador){
	
	$.ajax({
				
		url: 'C_establecimientos/establecimientos_creados',
		type: 'POST',
		dataType: 'json',
		data: {
			   id_ee : id_ee,
			   rango : rango
			  },
		beforeSend: function(objeto){
			
			//Bloqueamos los siguientes elementos
			$('#busc_nombre_ee').attr('disabled',true);
			$('#buscar').attr('disabled',true);
			
			//Mostramos el icono de carga
			$('.wrapper_ee').html('');
			$('.wrapper_ee').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
			//Ocultamos el paginador
			$('.wrapper_paginador').hide();
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_ee').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_ee').html('');
			$('.wrapper_ee')
			.append(`<div class="alert alert-warning" role="alert">
					  <strong>Error al tratar de listar los establecimientos! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Desbloqueamos los siguientes elementos
			$('#busc_nombre_ee').removeAttr('disabled');
			$('#buscar').removeAttr('disabled');
			
			//Ocultamos el icono de carga
			$('.wrapper_ee').html('');
			
			//Evaluamos data
			if(data != null){
				
				//Evaluamos el id del ee
				if(id_ee != 0){
					
					//Mostramos el icono para reiniciar el filtro
					$('#busc_nombre_ee').parents('.dropdown').children('.input-group-addon:eq(1)')
					.html('<i class="fa fa-times-circle tips reiniciar_filtro" aria-hidden="true" title="Reiniciar filtro"></i>');
					
				}else{
					
					//Removemos los tooltips
					$('body .tooltip.bs-tether-element').remove();
					
					//Removemos el icono para reiniciar el filtro
					$('#busc_nombre_ee').parents('.dropdown').children('.input-group-addon:eq(1)')
			        .html('<i class="fa fa-search" aria-hidden="true"></i>');
					
					$('#busc_nombre_ee').val('');
					
				}//Fin del if
				
				var tabla = `<table class="table table-striped">
								<thead>
									<tr>
										<th class="text-center">Nombre</th>
										<th class="text-center">Región</th>
										<th class="text-center">Comuna</th>
										<th class="text-center">Estatus</th>
										<th class="text-center" colspan="3"></th>
									</tr>
								</thead>
								<tbody>`;
				
				//Recorremos los resultados
				$(data['ee']).each(function(index, elemento){
				  
					tabla += `<tr>
								<td class="text-capitalize">`+elemento.nombre+`</td>
								<td>`+elemento.region+`</td>
								<td>`+elemento.comuna+`</td>
								<td>`+elemento.estatus+`</td>
								<td class="col-1">
									<i id="`+elemento.id+`" class="fa fa-search editar_establecimiento" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar Establecimiento"></i>	
								</td>
								<td class="col-1">
									<i id="`+elemento.id+`" class="fa fa-group lista_contacto" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Ver contacto"></i>
								</td>
								<td class="col-1">
									<i id="`+elemento.id+`" class="fa fa-server servicio_establecimiento" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Servicios Asociados"></i>
								</td>
								<td class="col-1">
									<i id="`+elemento.id+`" class="fa fa-book cursos_establecimiento" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Cursos"></i>
								</td>
							  </tr>`;
					
				});//Fin del each
				
				tabla += `
							</tbody>
						  </table>
						 `;
				
				//Evaluamos si hay que armar nuevamente el paginador
				if(remover_paginador == 1){
				
					//Obtenemos el número de ee
					var numEE  = data['num_ee'];
					var numPag = 1;
					var rango  = 0;
					
					var paginador = `<nav class="paginador">
									  <ul class="pagination justify-content-center">
										<li class="page-item previo"><a class="page-link">Previo</a></li>`;
					
					//Recorremos
					for(var i = 1; i <= numEE;){
						
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
				$('.wrapper_ee').append(tabla);
				
				//Ocultamos el paginador
			    $('.wrapper_paginador').show();
				
			}else{
			
				//Mostramos el mensaje
				$('.wrapper_ee')
				.append(`<div class="alert alert-danger" role="alert">
						  <strong>Error de conexión!.</strong>
						 </div>`);
						 
			}//Fin del if
			
			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip()
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
}//Fin de la función $.fn.establecimientos
/*****************************************/

/*
	Función que muestra la ventana modal para el registro de un nuevo establecimiento
*/
$.fn.modal_nuevo_establecimiento = function(){
	
	var modal = `<div class="modal fade" id="modal_nuevo_establecimiento" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Registrar Nuevo Establecimiento Escolar</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						  <span aria-hidden="true">&times;</span>
						</button>
					  </div>
					  <div class="modal-body text-center"></div>
					  <div class="modal-footer"></div>
					</div>
				  </div>
				</div>`;
				
    //Agregamos la modal al body
	$('body').append(modal);
	
	//Opciones de la modal
	$('#modal_nuevo_establecimiento').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_nuevo_establecimiento').on('shown.bs.modal', function(e){
		
		$.fn.info_nuevo_ee();
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_nuevo_establecimiento').on('hidden.bs.modal', function(e){
	    
		//Obtenemos el rango
		var rango = $('.page-item.active').children('.page-link').attr('rango');
		
		//Listamos los establecimientos
		$.fn.establecimientos(0,0,1);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_nuevo_establecimiento').modal('show');
	
}//Fin $.fn.modal_nuevo_establecimiento
/*************************************/

/*
	Función que lista la información para crear un nuevo EE
*/
$.fn.info_nuevo_ee = function(){
	
	$.ajax({
				
		url: 'C_establecimientos/info_nuevo_ee',
		type: 'POST',
		dataType: 'json',
		beforeSend: function(objeto){
			
			//Ocultamos el icono de carga
			$('#modal_nuevo_establecimiento .modal-body')
			.html(`<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>`);
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Ocultamos el icono de carga
			$('#modal_nuevo_establecimiento .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					  <strong>Ocurrio un error! Recarga nuevamente.</strong>
					 </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			var regiones = `<select id="regiones" class="form-control">
			                  <option value="" selected disabled>Seleccione...</option>`;
			
			//Recorremos las regiones
			$(data['regiones']).each(function(index, elemento){
                
				regiones += `<option value="`+elemento.id+`">`+elemento.nombre+`</option>`;
				
            });//Fin del each
			
			regiones += `</select>`;
			
			var formulario = `<form>
								<div class="form-group text-left">
									<label for="nombre">Nombre</label>
									<input type="text" class="form-control text-capitalize" id="nombre" autocomplete="off">
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group text-left">
									<label for="regiones">Región</label>
									`+regiones+`
									<div class="form-control-feedback"></div>
								</div>
								<div class="form-group text-left">
									<label for="comunas">Comuna</label>
									<select id="comunas" class="form-control">
										<option value="" selected disabled>Seleccione...</option>
								    </select>
									<div class="form-control-feedback"></div>
									<small id="comunasHelp" class="form-text text-muted">Debe seleccionar una región para poder elegir una comuna.</small>
								</div>
							</form>`;
			
			//Mostramos el formulario
			$('#modal_nuevo_establecimiento .modal-body')
			.html(formulario);
			
			//Mostramos los botones
			$('#modal_nuevo_establecimiento .modal-footer')
			.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
				   <button type="button" class="btn btn-success" id="guardar">Guardar</button>`);
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
}//Fin $.fn.info_nuevo_ee
/***********************/

/*
	Función que lista las comunas asociadas a la región
*/
$.fn.comunas = function(id_region){
	
	$.ajax({
				
		url: 'C_establecimientos/comunas_region',
		type: 'POST',
		dataType: 'json',
		data: {
				id_region : id_region
			  },
		
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#comunas')
			.html(`<option value="" selected disabled>Buscando comunas asociadas</option>`);
			
			//Removemos el mensaje de error
			$('#comunas').parents('.form-group').removeClass('has-danger');
		    $('#comunas').parents('.form-group').find('.form-control-feedback').html(''); 
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el icono de carga
			$('#comunas')
			.html(`<option value="" selected disabled>Seleccione...</option>`);
			
			//Indicamos error
			$('#comunas').parents('.form-group').addClass('has-danger');
			$('#comunas').parents('.form-group').find('.form-control-feedback').html('No hay Comunas asociadas!');
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			    
				$('#comunas').html('');
				
				//Evaluamos la cantidad de comunas
				if(data.length > 0){
				    
					$('#comunas')
					.append(`<option value="" selected disabled>Seleccione...</option>`);
					
					//Recorremos las regiones
					$(data).each(function(index, elemento){
						
						$('#comunas')
						.append(`<option value="`+elemento.id+`">`+elemento.nombre+`</option>`);
						
					});//Fin del each
					
				}else{
					
					$('#comunas')
					.append(`<option value="" selected disabled>Debe de asociar una comuna</option>`);
					
					//Indicamos error
					$('#comunas').parents('.form-group').addClass('has-danger');
				    $('#comunas').parents('.form-group').find('.form-control-feedback').html('No hay comunas asociadas!');
					
				}//Fin del if
			
			}else{
				
				$('#comunas')
				.append(`<option value="" selected disabled>Debe de asociar una comuna</option>`);
				
				//Indicamos error
				$('#comunas').parents('.form-group').addClass('has-danger');
				$('#comunas').parents('.form-group').find('.form-control-feedback').html('No hay comunas asociadas!');
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
}//Fin $.fn.comunas
/*****************/

/*
	Función que guarda un nuevo establecimiento
*/
$.fn.guardar_establecimiento = function(){
	
	var validador = $.fn.validar_nuevo_establecimiento();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		var nombre = $('#nombre').val();
		var comuna = $('#comunas').val();
		
		$.ajax({
				
			url: 'C_establecimientos/registrar_establecimiento',
			type: 'POST',
			dataType: 'json',
			data: {
					nombre : nombre,
					comuna : comuna
				  },
			
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_nuevo_establecimiento .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_nuevo_establecimiento .modal-footer')
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
						$('#modal_nuevo_establecimiento .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>
							   </div>`);
						
					}else if(parseInt(data['CODIGO_RESPUESTA']) == 2){
						
						//Mostramos el mensaje de error
						$('#modal_nuevo_establecimiento .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
							   </div>`);
						
				    }else{
						
						//Mostramos el mensaje de error
						$('#modal_nuevo_establecimiento .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
								 <button type="button" class="btn btn-success" id="guardar">Reintentar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_nuevo_establecimiento .modal-footer')
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
	
};//Fin de la función $.fn.guardar_establecimiento
/************************************************/

/*
	Función que valida el formulario para un nuevo establecimiento
*/
$.fn.validar_nuevo_establecimiento = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var regiones = $('#regiones');
	var nombre   = $('#nombre');
	var comunas  = $('#comunas');
	
	//Removemos los mensajes de error
	regiones.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').removeClass('has-danger');
	comunas.parents('.form-group').removeClass('has-danger');
	regiones.parents('.form-group').find('.form-control-feedback').html('');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	comunas.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que el nombre del establecimiento no esté vacio
	if(nombre.val().trim() == ''){	
	
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre del establecimiento es requerido!');
		
	}else{

		//Evaluamos que la region no sea vacia
		if(regiones.val() == null){
			
			//Indicamos error
			regiones.parents('.form-group').addClass('has-danger');
			regiones.parents('.form-group').find('.form-control-feedback').html('Seleccione una Región!');
			
		}else{
			
			//Evaluamos la dirección
			if(comunas.val() == null){
				
				//Indicamos error
				comunas.parents('.form-group').addClass('has-danger');
				comunas.parents('.form-group').find('.form-control-feedback').html('Seleccione una Comuna!');
				
			}else{
				
				respuesta = true;
		
			}//Fin del if comunas
			
		}//Fin del if regiones

	}//Fin del if nombre
	
	return respuesta;
	
};//Fin de la función $.fn.validar_nuevo_establecimiento
/******************************************************/

/*
	Función que muestra la ventana modal para editar a un establecimiento
*/
$.fn.modal_editar_establecimiento = function(id_establecimiento){
	
	var modal = `<div class="modal fade" id="modal_editar_establecimiento" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Editar Establecimiento</h5>
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
	$('#modal_editar_establecimiento').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_editar_establecimiento').on('shown.bs.modal', function(e){
		
		$.fn.info_establecimiento(id_establecimiento);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_editar_establecimiento').on('hidden.bs.modal', function(e){
	    
		//Obtenemos el rango
		var rango = $('.page-item.active').children('.page-link').attr('rango');
		
		//Listamos los establecimientos
		$.fn.establecimientos(0,rango,0);
		
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_editar_establecimiento').modal('show');
	
};//Fin de la función $.fn.modal_editar_establecimiento
/*****************************************************/

/*
	Función que lista la información del establecimiento seleccionado para editar información
*/
$.fn.info_establecimiento = function(id_establecimiento){
	
	$.ajax({
				
		url: 'C_establecimientos/info_editar_establecimiento',
		type: 'POST',
		dataType: 'json',
		data: {
				id_establecimiento : id_establecimiento
			  },
		beforeSend: function(objeto){
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_establecimiento .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			    
				var regiones = `<select id="regiones" class="form-control">
								  <option value="" selected disabled>Seleccione...</option>`;
				
				//Recorremos las regiones
				$(data['REGIONES']).each(function(index, elemento){
					
					//Evaluamos si es la seleccionada
					if(parseInt(data['INFO']['id_region']) ==  elemento.id){
						
						regiones += `<option value="`+elemento.id+`" selected>`+elemento.nombre+`</option>`;
						
					}else{
					
						regiones += `<option value="`+elemento.id+`">`+elemento.nombre+`</option>`;
						
					}//Fin del if
					
				});//Fin del each
				
				regiones += `</select>`;
				
				var comunas = `<select id="comunas" class="form-control">
								  <option value="" selected disabled>Seleccione...</option>`;
				
				//Recorremos las comunas
				$(data['COMUNAS']).each(function(index, elemento){
					
					//Evaluamos si es la seleccionada
					if(parseInt(data['INFO']['id_comuna']) ==  elemento.id){
						
						comunas += `<option value="`+elemento.id+`" selected>`+elemento.nombre+`</option>`;
						
					}else{
					
						comunas += `<option value="`+elemento.id+`">`+elemento.nombre+`</option>`;
						
					}//Fin del if
					
				});//Fin del each
				
				comunas += `</select>`;
				
				var estatus = `<select id="estatus_ee" class="form-control">
								  <option value="" selected disabled>Seleccione...</option>`;
				
				//Recorremos los estatus
				$(data['ESTATUS']).each(function(index, elemento){
					
					//Evaluamos si es la seleccionada
					if(parseInt(data['INFO']['id_estatus']) ==  elemento.id){
						
						estatus += `<option value="`+elemento.id+`" selected>`+elemento.descripcion+`</option>`;
						
					}else{
					
						estatus += `<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`;
						
					}//Fin del if
					
				});//Fin del each
				
				estatus += `</select>`;
				
				var formulario = `<form>
									<div class="form-group text-left">
										<label for="nombre">Nombre</label>
										<input type="text" class="form-control text-capitalize" id="nombre" autocomplete="off" value="`+data['INFO']['nombre']+`">
										<div class="form-control-feedback"></div>
									</div>
									<div class="form-group text-left">
										<label for="regiones">Región</label>
										`+regiones+`
										<div class="form-control-feedback"></div>
									</div>
									<div class="form-group text-left">
										<label for="comunas">Comuna</label>
										`+comunas+`
										<div class="form-control-feedback"></div>
										<small id="comunasHelp" class="form-text text-muted">Debe seleccionar una región para poder elegir una comuna.</small>
									</div>
									<div class="form-group text-left">
										<label for="estatus_ee">Estatus</label>
										`+estatus+`
										<div class="form-control-feedback"></div>
									</div>
								</form>`;
					
				//Mostramos los datos del establecimiento
				$('#modal_editar_establecimiento .modal-body').html(formulario);
				
				//Mostramos los btn
				$('#modal_editar_establecimiento .modal-footer')
				.html(`<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
				       <button id_ee="`+data['INFO']['id']+`" type="button" class="btn btn-danger" id="confirm_eliminar_ee">Eliminar EE</button>
					   <button id_ee="`+data['INFO']['id']+`" type="button" class="btn btn-warning" id="guardar_editar_ee">Guardar</button>`);
			
			}else{
				
				//Mostramos el mensaje de error
			$('#modal_editar_establecimiento .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.info_establecimiento
/*********************************************/

/*
	Función que elimina un establecimiento
*/
$.fn.eliminar_establecimiento = function(id_ee){
	
	$.ajax({
				
		url: 'C_establecimientos/eliminar_establecimiento',
		type: 'POST',
		dataType: 'json',
		data: {
				id_ee : id_ee
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#modal_editar_establecimiento .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_editar_establecimiento .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta de nuevo.
					 <button type="button" class="btn btn-success cancelar_eliminar_ee" id_ee="`+id_ee+`">Cancelar</button>
					 <button type="button" class="btn btn-danger eliminar_ee" id_ee="`+id_ee+`">Reintentar</button>
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			
				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){
					
					//Mostramos el mensaje de error
					$('#modal_editar_establecimiento .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-success" data-dismiss="modal">Ok!</button>
						   </div>`);
					
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_editar_establecimiento .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button type="button" class="btn btn-success cancelar_eliminar_ee" id_ee="`+id_ee+`">Cancelar</button>
					         <button type="button" class="btn btn-danger eliminar_ee" id_ee="`+id_ee+`">Reintentar</button>
						   </div>`);
					
				}//Fin del if
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_editar_establecimiento .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
						 <button type="button" class="btn btn-success cancelar_eliminar_ee" id_ee="`+id_ee+`">Cancelar</button>
					     <button type="button" class="btn btn-danger eliminar_ee" id_ee="`+id_ee+`">Reintentar</button>
					   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.eliminar_usuario
/*****************************************/

/*
	Función que guarda la edición del establecimiento
*/
$.fn.editar_establecimiento = function(id_ee){
	
	var validador = $.fn.validar_editar_establecimiento();
	
	//Evaluamos el validador
	if(validador){
		
		//Obtenemos valores
		//Obtenemos valores
		var nombre  = $('#nombre').val();
		var comuna  = $('#comunas').val();
		var estatus = $('#estatus_ee').val();
		
		$.ajax({
				
			url: 'C_establecimientos/editar_establecimiento',
			type: 'POST',
			dataType: 'json',
			data: {
				    nombre  : nombre,
					comuna  : comuna,
					estatus : estatus,
					id_ee   : id_ee
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_editar_establecimiento .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_editar_establecimiento .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
				         <strong>Ocurrió un error!</strong>, intenta de nuevo. <br>
						 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
				         <button id_ee="`+id_ee+`" type="button" class="btn btn-danger" id="confirm_eliminar_ee">Eliminar EE</button>
					     <button id_ee="`+id_ee+`" type="button" class="btn btn-warning" id="guardar_editar_ee">Guardar</button>
					   </div>`);
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Mostramos el mensaje de error
						$('#modal_editar_establecimiento .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
						         <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
				                 <button id_ee="`+id_ee+`" type="button" class="btn btn-danger" id="confirm_eliminar_ee">Eliminar EE</button>
					             <button id_ee="`+id_ee+`" type="button" class="btn btn-warning" id="guardar_editar_ee">Guardar</button>
							   </div>`);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_editar_establecimiento .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
								 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
				                 <button id_ee="`+id_ee+`" type="button" class="btn btn-danger" id="confirm_eliminar_ee">Eliminar EE</button>
					             <button id_ee="`+id_ee+`" type="button" class="btn btn-warning" id="guardar_editar_ee">Guardar</button>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_editar_establecimiento .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
							 <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
				             <button id_ee="`+id_ee+`" type="button" class="btn btn-danger" id="confirm_eliminar_ee">Eliminar EE</button>
					         <button id_ee="`+id_ee+`" type="button" class="btn btn-warning" id="guardar_editar_ee">Guardar</button>
						   </div>`);
							
				}//Fin del if
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
		
	}//Fin del if
	
};//Fin de la función guardar_editar_establecimiento
/**************************************************/

/*
	Función que valida el formulario para editar el establecimiento
*/
$.fn.validar_editar_establecimiento = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var regiones = $('#regiones');
	var nombre   = $('#nombre');
	var comunas  = $('#comunas');
	var estatus  = $('#estatus_ee');
	
	//Removemos los mensajes de error
	regiones.parents('.form-group').removeClass('has-danger');
	nombre.parents('.form-group').removeClass('has-danger');
	comunas.parents('.form-group').removeClass('has-danger');
	estatus.parents('.form-group').removeClass('has-danger');
	regiones.parents('.form-group').find('.form-control-feedback').html('');
	nombre.parents('.form-group').find('.form-control-feedback').html('');
	comunas.parents('.form-group').find('.form-control-feedback').html('');
	estatus.parents('.form-group').find('.form-control-feedback').html('');
	
	//Evaluamos que el nombre del establecimiento no esté vacio
	if(nombre.val().trim() == ''){	
	
		//Indicamos error
		nombre.parents('.form-group').addClass('has-danger');
		nombre.parents('.form-group').find('.form-control-feedback').html('El nombre del establecimiento es requerido!');
		
	}else{

		//Evaluamos que la region no sea vacia
		if(regiones.val() == null){
			
			//Indicamos error
			regiones.parents('.form-group').addClass('has-danger');
			regiones.parents('.form-group').find('.form-control-feedback').html('Seleccione una Región!');
			
		}else{
			
			//Evaluamos la comunas
			if(comunas.val() == null){
				
				//Indicamos error
				comunas.parents('.form-group').addClass('has-danger');
				comunas.parents('.form-group').find('.form-control-feedback').html('Seleccione una Comuna!');
				
			}else{
				
				//Evaluamos la estatus
				if(estatus.val() == null){
					
					//Indicamos error
					estatus.parents('.form-group').addClass('has-danger');
					estatus.parents('.form-group').find('.form-control-feedback').html('Seleccione un estatus!');
					
				}else{
				
					respuesta = true;
					
				}//Fin del if estatus
		
			}//Fin del if comunas
			
		}//Fin del if regiones

	}//Fin del if nombre
	
	return respuesta;
	
};//Fin de la función $.fn.validar_editar_establecimiento
/*******************************************************/

/*
	Función que busca los usuario según el tipeo del establecimiento
*/
$.fn.buscar_ee = function(valor){
	
	//Evaluamos si hay una petición
	if(xhr != null){
		
		xhr.abort();
			
	}//Fin del if
	
	xhr = $.ajax({
		url: 'C_establecimientos/buscar_ee',
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
			$('#busc_nombre_ee').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');
                
		},
		error: function(objeto, quepaso, otroobj) {
			
			xhr = null;
			
			//Ocultamos el icono de carga
			$('#busc_nombre_ee').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			xhr = null;
			
			//Ocultamos el icono de carga
			$('#busc_nombre_ee').parents('.dropdown').children('.input-group-addon:eq(1)')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');
			
			//Evaluamos data
			if(data != null){
				
				if(data.length > 0){
					
					//Agregamos la clase
					$('#sugerencias').parent('.dropdown').addClass('show');
					
					//Recorremos los usuario
					$(data).each(function(index, elemento){
                        
						$('#sugerencias')
						.append(`<div id="`+elemento['id']+`" class="dropdown-item">
								  <span class="ee">`+elemento['nombre']+`</span>
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
	
};//Fin de la función $.fn.buscar_usuario
/***************************************/

/*
	Función que muestra la ventana modal para ver los cursos disponibles
*/
$.fn.modal_cursos = function(id_ee,desc_ee){
	
	var modal = `<div class="modal fade" id="modal_cursos" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Cursos del Establecimiento <span class="text-capitalize">`+desc_ee+`</span></h5>
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
	$('#modal_cursos').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_cursos').on('shown.bs.modal', function(e){
		
		$.fn.cursos(id_ee);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_cursos').on('hidden.bs.modal', function(e){
	    
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_cursos').modal('show');
	
};//Fin de la función $.fn.modal_cursos
/*************************************/

/*
	Función que lista los cursos disponibles para ser asociados al establecimiento
*/
$.fn.cursos = function(id_ee){
	
	$.ajax({
				
		url: 'C_establecimientos/data_cursos',
		type: 'POST',
		dataType: 'json',
		data: {
				id_ee : id_ee
			  },
		beforeSend: function(objeto){
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_cursos .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			    
				var niveles = '<option value="" disabled selected>Nivel Academico</option>';
				
				//Recorremos los usuario
				$(data['nivel']).each(function(index, elemento){
					
					niveles += `<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`;
					
				});//Fin del each
				
				//Evaluamos si hay cursos asociados
				if(data['cursos_establecimiento'] != null){
					
					var cursos = ``;
					
					//Recorremos los resultados
					$(data['cursos_establecimiento']).each(function(index, elemento){
	
						cursos += `<tr class="curso">
									 <td class="col-3">`+elemento.desc_nivel+`</td>
									 <td class="col-3">`+elemento.desc_curso+`</td>
									 <td class="num col-3">`+elemento.num_alumnos+`</td>
									 <td class="col-3">
										<i id="`+elemento.id+`" id_ee="`+id_ee+`" id_curso="`+elemento.id_curso+`" class="fa fa-pencil editar_curso" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar"></i>
										<i id="`+elemento.id+`" id_ee="`+id_ee+`" id_curso="`+elemento.id_curso+`" class="fa fa-trash eliminar_curso" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
									 </td>
									</tr>`;
	
					});//Fin del 
					
				}else{
					
					var cursos = `<tr>
									<td class="col-12" colspan="5">
										<div class="alert alert-warning" role="alert">
										  <strong>No hay contactos registrados!.</strong>
										</div>
									</td>
								  </tr>`;
					
				}//Fin del if
				
				//Mostramos el mensaje de error
				$('#modal_cursos .modal-body')
				.html(`<form id="form_nivel_academico">
							<div class="row">
								<div class="form-group col-6">
									<select class="form-control nivel" id_ee="`+id_ee+`">
										`+niveles+`
									</select>
									<div class="form-control-feedback text-left"></div>
								</div>
								<div class="form-group col-6">
									<select class="form-control cursos">
										<option value="" disabled selected>Seleccione un nivel</option>
									</select>
									<div class="form-control-feedback text-left"></div>
								</div>
							</div>
							<div class="row">
								<div class="form-group col-6" data-toggle="tooltip" data-placement="top" title="N° de Estudiantes">
									<input type="text" class="form-control" id="num_estudiantes" placeholder="N° de Estudiantes">
									<div class="form-control-feedback text-left"></div>
								</div>
								<div class="form-group wrapper_btn_agregar_curso col-6 text-left">
									<button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="agregar_curso">Agregar</button>
								</div>
							</div>
						</form>
						
						
						
						<table id="tabla_cursos" class="table table-striped">
							<thead>
								<tr>
									<th class="text-center col-12" colspan="4">Cursos Asociados</th>
								</tr>
								<tr>
									<th class="text-center col-3">Nivel</th>
									<th class="text-center col-3">Curso</th>
									<th class="text-center col-3">N° Estudiantes</th>
									<th class="text-center col-3"></th>
								</tr>
							</thead>
							<tbody>
								`+cursos+`
							</tbody>
						</table>
						
						`);
						
				//Creamos la mascara para los siguientes elementos
				$('#num_estudiantes,.num').mask('000.000', {reverse: true});
				
				//Para los tooltips
				$('[data-toggle="tooltip"]').tooltip();
				
				$.fn.eventos();

			}else{
				
				//Mostramos el mensaje de error
				$('#modal_cursos .modal-body')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error!</strong>, intenta más tarde.
					   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.cursos
/*******************************/

/*
	Función que lista los cursos asociados a los niveles educativos
*/
$.fn.nivel_curso = function(id_nivel,id_ee){
	
	$.ajax({
					
		url: 'C_establecimientos/nivel_curso',
		type: 'POST',
		dataType: 'json',
		data: {
				id_nivel : id_nivel,
				id_ee    : id_ee
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('.wrapper_btn_agregar_curso')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
			//Ocultamos el mensaje de error
			$('#modal_cursos .modal-footer').html('');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Ocultamos el icono de carga
			$('.wrapper_btn_agregar_curso')
			.html(`<button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="agregar_curso">Agregar</button>`);
			
			//Mostramos el mensaje de error
			$('#modal_cursos .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al listar los cursos!</strong>, intenta de nuevo.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Ocultamos el mensaje de error
			$('#modal_cursos .modal-footer').html('');
			
			//Evaluamos si hay data
			if(data != null){
				
				var cursos = '<option value="" disabled selected>Cursos</option>';
				
				//Recorremos los usuario
				$(data).each(function(index, elemento){
					
					cursos += `<option value="`+elemento.id+`">`+elemento.descripcion+`</option>`;
					
				});//Fin del each
				
			}else{
				
				var cursos = '<option value="" disabled selected>Ya posee todos los cursos asociados</option>';
				
			}//Fin del if
			
			//Mostramos las opciones
			$('.cursos').html(cursos);
			
			//Ocultamos el icono de carga
			$('.wrapper_btn_agregar_curso')
			.html(`<button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="agregar_curso">Agregar</button>`);
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.cursos_nivel
/*************************************/

/*
	Función que asocia el curso a un establecimiento
*/
$.fn.agregar_curso = function(id_ee){
	
	var validador = $.fn.validar_curso();
	
	//Evaluamos el validador
	if(validador){
		
		$.ajax({
					
			url: 'C_establecimientos/agregar_curso',
			type: 'POST',
			dataType: 'json',
			data: {
					id_ee  : id_ee,
					curso  : $('.cursos').val(),
					numEst : $('#num_estudiantes').cleanVal()
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('.wrapper_btn_agregar_curso')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
				//Ocultamos el mensaje de error
				$('#modal_cursos .modal-footer').html('');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Ocultamos el icono de carga
				$('.wrapper_btn_agregar_curso')
				.html(`<button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="agregar_curso">Agregar</button>`);
				
				//Mostramos el mensaje de error
				$('#modal_cursos .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al agregar el curso!</strong>, intenta de nuevo.
					   </div>`);
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				//Ocultamos el mensaje de error
				$('#modal_cursos .modal-footer').html('');
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Mostramos el mensaje de éxito
						$('#modal_cursos .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
						//Limpiamos los campos del formulario
						$('.nivel').val('');
						$('.cursos').html('<option value="" disabled="" selected="">Seleccione un nivel</option>');	   
					    $('#num_estudiantes').val('');
						
						$.fn.cursos_ee(id_ee);	
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_cursos .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_cursos .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Ocurrió un error al agregar el curso!</strong>, intenta de nuevo.
						   </div>`);
							
				}//Fin del if
				
				//Ocultamos los mensajes
				setTimeout(function(){ 
						
					//Mostramos el btn
					$('#modal_cursos .modal-footer')
					.html(``);
					
				},3000);
				
				//Ocultamos el icono de carga
				$('.wrapper_btn_agregar_curso')
				.html(`<button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="agregar_curso">Agregar</button>`);
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
		
	}//Fin del if
	
};//Fin de la función $.fn.agregar_contacto
/*****************************************/

/*
	Función que valida el formulario para agregar un curso
*/
$.fn.validar_curso = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nivel           = $('.nivel');
	var cursos          = $('.cursos');
	var num_estudiantes = $('#num_estudiantes');
	
	//Removemos los mensajes de error
	nivel.parents('.form-group').removeClass('has-danger');
	cursos.parents('.form-group').removeClass('has-danger');
	num_estudiantes.parents('.form-group').removeClass('has-danger');
	nivel.parents('.form-group').find('.form-control-feedback').html('');
	cursos.parents('.form-group').find('.form-control-feedback').html('');
	num_estudiantes.parents('.form-group').find('.form-control-feedback').html('');

	//Evaluamos nivel
	if(nivel.val() == null){
		
		//Indicamos error
		nivel.parents('.form-group').addClass('has-danger');
		nivel.parents('.form-group').find('.form-control-feedback').html('Elija un nivel académico!');
		
	}else{
		
		//Evaluamos cursos
		if(cursos.val() == null){
		
			//Indicamos error
			cursos.parents('.form-group').addClass('has-danger');
			cursos.parents('.form-group').find('.form-control-feedback').html('Elija un curso!');
			
		}else{
			
			//Evaluamos num_estudiantes
			if(num_estudiantes.cleanVal().length < 1){
				
				//Indicamos error
				num_estudiantes.parents('.form-group').addClass('has-danger');
				num_estudiantes.parents('.form-group').find('.form-control-feedback').html('Debe indicar el n° de estudiantes!');
				
			}else{
				
				respuesta = true;
				
			}//Fin del if num_estudiantes.cleanVal().length		
			
		}//Fin del if cursos
		
	}//Fin nivel
	
	return respuesta;
	
};//Fin de la función $.fn.validar_contacto
/*****************************************/

/*
	Función que lista todos los cursos asociados del establecimiento
*/
$.fn.cursos_ee = function(id_ee){
	
	$.ajax({
				
		url: 'C_establecimientos/cursos_establecimiento',
		type: 'POST',
		dataType: 'json',
		data: {
				id_ee : id_ee
			  },
		beforeSend: function(objeto){
			
			
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_cursos .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al mostrar los cursos!</strong>, intenta de nuevo.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay datos
			if(data != null){
			
				var cursos = ``;
					
				//Recorremos los resultados
				$(data).each(function(index, elemento){
	
					cursos += `<tr class="curso">
								 <td class="col-3">`+elemento.desc_nivel+`</td>
								 <td class="col-3">`+elemento.desc_curso+`</td>
								 <td class="col-3 num">`+elemento.num_alumnos+`</td>
								 <td class="col-3">
									<i id="`+elemento.id+`" id_ee="`+id_ee+`" id_curso="`+elemento.id_curso+`" class="fa fa-pencil editar_curso" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar"></i>
									<i id="`+elemento.id+`" id_ee="`+id_ee+`" id_curso="`+elemento.id_curso+`" class="fa fa-trash eliminar_curso" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
								 </td>
								</tr>`;
	
				});//Fin del each
				
			}else{
				
				var cursos = `<tr>
								<td class="col-12" colspan="5">
									<div class="alert alert-warning" role="alert">
									  <strong>No hay contactos registrados!.</strong>
									</div>
								</td>
							  </tr>`;
				
			}//Fin del if
			
			//Removemo los tooltip
			$('.tooltip').remove();
			
			$('#tabla_cursos tbody').html(cursos);
			
			//Creamos la mascara para los siguientes elementos
			$('.num').mask('000.000');
			
			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.cursos_asociados
/*****************************************/

/*
	Función que elimina un cursos asocido al EE
*/
$.fn.eliminar_curso = function(id,id_ee){
	
	$.ajax({
				
		url: 'C_establecimientos/eliminar_curso',
		type: 'POST',
		dataType: 'json',
		data: {
				id : id
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#modal_cursos .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_cursos .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al eliminar el curso!</strong>, intenta de nuevo.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			
				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){
					
					//Mostramos el mensaje de éxito
					$('#modal_cursos .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);
						   
					$.fn.cursos_ee(id_ee);
					
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_cursos .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);
					
				}//Fin del if
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_cursos .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al eliminar el curso!</strong>, intenta de nuevo.
					   </div>`);
						
			}//Fin del if
			
			//Ocultamos los mensajes
			setTimeout(function(){ 
					
				//Mostramos el btn
				$('#modal_cursos .modal-footer')
				.html(``);
				
				$.fn.eventos();
				
			},3000);
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función .fn.eliminar_curso
/**************************************/

/*
	Función que lista los datos que puede ser eidtados del curso
*/
$.fn.info_editar_curso = function(id,id_ee,contexto){
	
	//Obtenemos la fila
	var fila = contexto.parents('.curso');
	
	//Obtenemos los valores
	var nivel   = fila.children('td').eq(0).text();
	var curso   = fila.children('td').eq(1).text();
	var numEstu = fila.children('td').eq(2).text();
	
	//Seteamos valores
	$('.nivel').html('<option value="">'+nivel+'</option>');
	$('.cursos').html('<option value="">'+curso+'</option>');
	$('#num_estudiantes').val(numEstu);
	
	//Mostramos los nuevos botones
	$('.wrapper_btn_agregar_curso')
	.html(`<button type="button" class="btn btn-danger cancelar_editar_curso" id_ee="`+id_ee+`">Cancelar</button>
	       <button type="button" class="btn btn-success guardar_editar_curso" id="`+id+`" id_ee="`+id_ee+`">Guardar</button>`);
	
	$.fn.eventos();	
	
};//Fin de la función $.fn.info_editar_curso
/******************************************/

/*
	Función que edita los datos de un contacto
*/
$.fn.editar_curso = function(id,id_ee){
	
	var validador = $.fn.validar_curso();
	
	//Evaluamos el validador
	if(validador){
	
		$.ajax({
					
			url: 'C_establecimientos/editar_curso',
			type: 'POST',
			dataType: 'json',
			data: {
					id     : id,
					numEst : $('#num_estudiantes').cleanVal()				  
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_cursos .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_cursos .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al editar el curso!</strong>, intenta de nuevo.
					   </div>`);
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Mostramos el mensaje de éxito
						$('#modal_cursos .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
						//Mostramos el icono de carga
						$('.wrapper_btn_agregar_curso')
						.html(`<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>`);
						
						$.fn.cursos(id_ee);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_cursos .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_cursos .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Ocurrió un error al editar el curso!</strong>, intenta de nuevo.
						   </div>`);
							
				}//Fin del if
				
				//Ocultamos los mensajes
				setTimeout(function(){ 
						
					//Mostramos el btn
					$('#modal_cursos .modal-footer')
					.html(``);
					
				},3000);
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
	
	}//Fin del if
	
};//Fin de la función $.fn.editar_curso
/*************************************/

/*
	Función que muestra la ventana modal para ver los servicios asociados al establecimiento
*/
$.fn.modal_servicio_establecimiento = function(id_ee){
	
	var modal = `<div class="modal fade" id="modal_servicios_establecimiento" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Servicios Asociados</h5>
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
	$('#modal_servicios_establecimiento').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_servicios_establecimiento').on('shown.bs.modal', function(e){
		
		$.fn.servicio_establecimiento(id_ee);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_servicios_establecimiento').on('hidden.bs.modal', function(e){
	    
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_editar_establecimiento').modal('show');
	
};//Fin de la función $.fn.modal_servicio_establecimiento
/*******************************************************/

/*
	Función que lista los servicios asociados del establecimiento
*/
$.fn.servicio_establecimiento = function(id_ee){
	
	$.ajax({
				
		url: 'C_establecimientos/servicio_establecimiento',
		type: 'POST',
		dataType: 'json',
		data: {
				id_ee : id_ee
			  },
		beforeSend: function(objeto){
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_servicios_establecimiento .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			    
				//Armo la tabla
				var arbol = '<ul class="servicios text-left">';
				
				//Recorremos los sistemas
				$(data['SERVICIOS']).each(function(index, servicio){
                    
					var chequear = '';
					
					//Recorremos los servicios asociados al establecimiento
					$(data['SERVICIOS_ESTABLECIMIENTO']).each(function(index2, servicio2){
						
						//Evaluamos si hay que chequear
						if(servicio2.id == servicio.id){
							
							chequear = 'checked';
							
						}//Fin del if
						
					});//Fin del each
					
					arbol += '<li>'+servicio.descripcion;
					arbol += '	<input id="'+servicio.id+'" type="checkbox" '+chequear+' class="servicio">';
					arbol += '</li>';
					
                });//Fin del each de los servicios
				
				arbol += '</ul>';
				
				//Mostramos los datos del establecimiento
				$('#modal_servicios_establecimiento .modal-body').html(arbol);
				
				$('#modal_servicios_establecimiento .modal-body .servicios').treed();
				
				//Mostramos los btn
				$('#modal_servicios_establecimiento .modal-footer')
				.html(`<button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="guardar_servicios">Guardar</button>`);
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_servicios_establecimiento .modal-body')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error!</strong>, intenta más tarde.
					   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.servicio_establecimiento
/*************************************************/

/*
	Función que asocia los servicios al establecimiento
*/
$.fn.guardar_servicios = function(id_ee){
	
	var servicios = [];
	
	//Recorremos todos los servicios chequeados
	$('.servicios .servicio:checked').each(function(index, elemento) {
        
		servicios.push(elemento.id);
		
    });//Fin del each
	
	//Evaluamos si no hay servicios por asociar
	if(servicios.length == 0){
		
		servicios = '-1';
		
	}//Fin del if
	
	$.ajax({
				
		url: 'C_establecimientos/asociar_servicio_establecimiento',
		type: 'POST',
		dataType: 'json',
		data: {
				servicios : servicios,
				id_ee     : id_ee
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#modal_servicios_establecimiento .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_servicios_establecimiento .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta de nuevo.
					 <button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="guardar_servicios">Reintentar</button>
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			
				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){
					
					//Mostramos el mensaje de éxito
					$('#modal_servicios_establecimiento .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);
						   
					setTimeout(function(){ 
					
						//Mostramos el btn
						$('#modal_servicios_establecimiento .modal-footer')
						.html(`<button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="guardar_servicios">Guardar</button>`);
						
						$.fn.eventos();
						
					},3000);
					
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_servicios_establecimiento .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong> <br>
							 <button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="guardar_servicios">Reintentar</button>
						   </div>`);
					
				}//Fin del if
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_servicios_establecimiento .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Error de conexión!</strong>, intenta de nuevo. <br>
						 <button id_ee="`+id_ee+`" type="button" class="btn btn-success" id="guardar_servicios">Reintentar</button>
					   </div>`);
						
			}//Fin del if
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.guardar_servicios
/******************************************/

/*
	Función que muestra la ventana modal para ver los contatcos asociados al establecimiento
*/
$.fn.modal_lista_contacto = function(id_ee,desc_ee){
	
	var modal = `<div class="modal fade" id="modal_contactos" tabindex="-1" role="dialog" aria-hidden="true">
				  <div class="modal-dialog" role="document">
					<div class="modal-content">
					  <div class="modal-header">
						<h5 class="modal-title">Contactos del Establecimiento <span class="text-capitalize">`+desc_ee+`</span></h5>
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
	$('#modal_contactos').modal({backdrop : 'static'})
	
	//Evento cuando abra la modal
	$('#modal_contactos').on('shown.bs.modal', function(e){
		
		$.fn.info_contacto(id_ee);
		
		//Función que declaran todos los eventos
		$.fn.eventos()	
	   
	});
	
	//Evento cuando se cierre la modal
	$('#modal_contactos').on('hidden.bs.modal', function(e){
	    
		$(this).remove();
	  
	});
	
	//Mostramos la modal
	$('#modal_contactos').modal('show');
	
};//Fin de la función $.fn.modal_listar_contacto
/**********************************************/

/*
	Función que lista la información del contacto asociado al establecimiento
*/
$.fn.info_contacto = function(id_ee){
	
	$.ajax({
				
		url: 'C_establecimientos/info_contactos',
		type: 'POST',
		dataType: 'json',
		data: {
				id_ee : id_ee
			  },
		beforeSend: function(objeto){
		
			//Mostramos el icono de carga
			$('#modal_contactos .modal-body')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_contactos .modal-body')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error!</strong>, intenta más tarde.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay contacto asociados
			if(data['CONTACTOS'] != null){
				
				var contactos = ``;
				
				//Recorremos los resultados
				$(data['CONTACTOS']).each(function(index, elemento){

					contactos += `<tr class="contacto">
									<td>`+elemento.nombre+`</td>
									<td class="telefono">`+elemento.telefono+`</td>
									<td class="telefono">`+elemento.otro_telefono+`</td>
									<td>`+elemento.correo+`</td>
									<td>
										<i id_ee="`+id_ee+`" id="`+elemento.id+`" class="fa fa-pencil editar_contacto" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar"></i>
										<i id_ee="`+id_ee+`" id="`+elemento.id+`" class="fa fa-trash eliminar_contacto" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
									</td>
								  </tr>`;

				});//Fin del 
				
			}else{
				
				var contactos = `<tr>
				                 	<td colspan="5">
										<div class="alert alert-warning" role="alert">
										  <strong>No hay contactos registrados!.</strong>
										</div>
									</td>
								 </tr>`;
				
			}//Fin del if
			
			//Ocultamos el icono de carga
			$('#modal_contactos .modal-body')
			.html(`
			       <form class="form">
			          <div class="row">
						  <div class="form-group col-6">
							<input type="text" class="form-control text-capitalize" id="nombre_contacto" placeholder="Nombre">
							<div class="form-control-feedback text-left"></div>
						  </div>
						  <div class="form-group col-6">
						    <input type="text" class="form-control text-lowercase" id="correo_contacto" placeholder="Correo">
							<div class="form-control-feedback text-left"></div>
						  </div>
					  </div>
					  <div class="row">
						  <div class="form-group col-6">
						    <input type="text" class="form-control" id="telefono_contacto" placeholder="Teléfono" aria-describedby="telefono_contacto_help">
							<div class="form-control-feedback text-left"></div>
							<small id="telefono_contacto_help" class="form-text text-muted text-left">Ejemplo: (02) 2222-0000, (46) 2222-0000</small>
						  </div>
						  <div class="form-group col-6">
						    <input type="text" class="form-control" id="otro_tlf_contacto" placeholder="Otro Teléfono" aria-describedby="otro_tlf_contacto_help">
							<div class="form-control-feedback text-left"></div>
							<small id="otro_tlf_contacto_help" class="form-text text-muted text-left">Ejemplo: (02) 2222-0000, (46) 2222-0000</small>
						  </div>
					  </div>
					  <div class="row">
						  <div class="form-group col-12 wrapper_btn_agregar">
						    <button type="button" class="btn btn-success agregar_contacto" id_ee="`+id_ee+`">Agregar</button>
						  </div>
					  </div>
				   </form>
				   
				   <table id="tabla_contactos" class="table table-striped">
						<thead>
						    <tr>
								<th class="text-center" colspan="5">Contactos Asociados</th>
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
							`+contactos+`
						</tbody>
				    </table>
				   `);
			
			//Creamos la mascara para los siguientes elementos
			$('#telefono_contacto, #otro_tlf_contacto, .telefono').mask('(00) 0000-0000');
			
			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.info_contacto
/**************************************/

/*
	Función que asocia un contacto a un establecimiento
*/
$.fn.agregar_contacto = function(id_ee){
	
	var validador = $.fn.validar_contacto();
	
	//Evaluamos el validador
	if(validador){
		
		$.ajax({
				
			url: 'C_establecimientos/asociar_contacto',
			type: 'POST',
			dataType: 'json',
			data: {
					id_ee    : id_ee,
					nombre   : $('#nombre_contacto').val(),
					correo   : $('#correo_contacto').val(),
					tlf      : $('#telefono_contacto').cleanVal(),
					otro_tlf : $('#otro_tlf_contacto').cleanVal()
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('.wrapper_btn_agregar')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Ocultamos el icono de carga
				$('.wrapper_btn_agregar').html('<button type="button" class="btn btn-success agregar_contacto" id_ee="'+id_ee+'">Agregar</button>');
				
				//Mostramos el mensaje de error
				$('#modal_contactos .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al agregar el contacto!</strong>, intenta de nuevo.
					   </div>`);
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				//Ocultamos el icono de carga
				$('.wrapper_btn_agregar').html('<button type="button" class="btn btn-success agregar_contacto" id_ee="'+id_ee+'">Agregar</button>');
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Limpiamos los campos
						$('#nombre_contacto').val('');
						$('#correo_contacto').val('');
						$('#telefono_contacto').val('');
						$('#otro_tlf_contacto').val('');
						
						//Mostramos el mensaje de éxito
						$('#modal_contactos .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
						$.fn.contactos_ee(id_ee);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_contactos .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_contactos .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Ocurrió un error al agregar el contacto!</strong>, intenta de nuevo.
						   </div>`);
							
				}//Fin del if
				
				//Ocultamos el mensaje
				setTimeout(function(){ 
						
					//Mostramos el btn
					$('#modal_contactos .modal-footer')
					.html(``);
					
				},3000);
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
		
	}//Fin del if validador
	
};//Fin de la función $.fn.agregar_contacto
/*****************************************/

/*
	Función que valida el formulario para agregar un contacto
*/
$.fn.validar_contacto = function(){
	
	var respuesta = false;
	
	//Obtenemos los campos
	var nombre   = $('#nombre_contacto');
	var correo   = $('#correo_contacto');
	var tlf      = $('#telefono_contacto');
	var otro_tlf = $('#otro_tlf_contacto');
	
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
	
};//Fin de la función $.fn.validar_contacto
/*****************************************/

/*
	Función que lista los contactos asociados al EE
*/
$.fn.contactos_ee = function(id_ee){
	
	$.ajax({
				
		url: 'C_establecimientos/contactos_establecimiento',
		type: 'POST',
		dataType: 'json',
		data: {
				id_ee : id_ee
			  },
		beforeSend: function(objeto){
			
			
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_contactos .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al mostrar los contacto!</strong>, intenta de nuevo.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay contactos
			if(data != null){
			
				var contactos = ``;
					
				//Recorremos los resultados
				$(data).each(function(index, elemento){
	
					contactos += `<tr class="contacto">
									<td>`+elemento.nombre+`</td>
									<td class="telefono">`+elemento.telefono+`</td>
									<td class="telefono">`+elemento.otro_telefono+`</td>
									<td>`+elemento.correo+`</td>
									<td>
										<i id_ee="`+id_ee+`" id="`+elemento.id+`" class="fa fa-pencil editar_contacto" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Editar"></i>
										<i id_ee="`+id_ee+`" id="`+elemento.id+`" class="fa fa-trash eliminar_contacto" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Eliminar"></i>
									</td>
								  </tr>`;
	
				});//Fin del 
			
			}else{
				
				var contactos = `<tr>
				                 	<td colspan="5">
										<div class="alert alert-warning" role="alert">
										  <strong>No hay contactos registrados!.</strong>
										</div>
									</td>
								 </tr>`;
				
			}//Fin del if
			
			//Removemos los tooltips
			$('.tooltips').remove();
			
			$('#tabla_contactos tbody').html(contactos);
			
			//Creamos la mascara para los siguientes elementos
			$('#telefono_contacto, #otro_tlf_contacto, .telefono').mask('(00) 0000-0000');
			
			//Para los tooltips
			$('[data-toggle="tooltip"]').tooltip();
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función $.fn.contactos_ee
/*************************************/

/*
	Función que elimina un contacto del establecimiento
*/
$.fn.eliminar_contacto = function(id_contacto,id_ee){
	
	$.ajax({
				
		url: 'C_establecimientos/eliminar_contacto',
		type: 'POST',
		dataType: 'json',
		data: {
				id_contacto : id_contacto
			  },
		beforeSend: function(objeto){
			
			//Mostramos el icono de carga
			$('#modal_contactos .modal-footer')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Mostramos el mensaje de error
			$('#modal_contactos .modal-footer')
			.html(`<div class="alert alert-danger" role="alert">
					 <strong>Ocurrió un error al agregar el contacto!</strong>, intenta de nuevo.
				   </div>`);
			
			$.fn.eventos();
			
		},
		success: function(data){
			
			//Evaluamos si hay respusta
			if(data != null){
			
				//Evaluamos la respuesta
				if(parseInt(data['CODIGO_RESPUESTA']) == 1){
					
					//Mostramos el mensaje de éxito
					$('#modal_contactos .modal-footer')
					.html(`<div class="alert alert-success" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);
						   
					$.fn.contactos_ee(id_ee);
					
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_contactos .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
						   </div>`);
					
				}//Fin del if
			
			}else{
				
				//Mostramos el mensaje de error
				$('#modal_contactos .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al eliminar el contacto!</strong>, intenta de nuevo.
					   </div>`);
						
			}//Fin del if
			
			//Ocultamos el mensaje
			setTimeout(function(){ 
					
				//Mostramos el btn
				$('#modal_contactos .modal-footer')
				.html(``);
				
			},3000);
			
			$.fn.eventos();
			
		}//Fin del success
			
	});//Fin del ajax
	
};//Fin de la función .fn.eliminar_contacto
/*****************************************/

/*
	Función que lista los datos que puede ser eidtados del contacto
*/
$.fn.info_editar_contacto = function(id,id_ee,contexto){
	
	//Obtenemos la fila
	var fila = contexto.parents('.contacto');
	
	//Obtenemos los valores
	var nombre   = fila.children('td').eq(0).text().toLowerCase();
	var tlf      = fila.children('td').eq(1).text();
	var otro_tlf = fila.children('td').eq(2).text();
	var correo   = fila.children('td').eq(3).text();
	
	//Seteamos valores
	$('#nombre_contacto').val(nombre).css("text-transform","capitalize");
	$('#telefono_contacto').val(tlf);
	$('#otro_tlf_contacto').val(otro_tlf);
	$('#correo_contacto').val(correo);
	
	//Mostramos los nuevos botones
	$('.wrapper_btn_agregar')
	.html(`<button type="button" class="btn btn-danger cancelar_editar_contacto" id_ee="`+id_ee+`">Cancelar</button>
	       <button type="button" class="btn btn-success guardar_editar_contacto" id="`+id+`" id_ee="`+id_ee+`">Guardar</button>`);
	
	$.fn.eventos();	
	
};//Fin de la función $.fn.editar_contacto
/****************************************/

/*
	Función que edita los datos de un contacto
*/
$.fn.editar_contacto = function(id_contacto,id_ee){
	
	var validador = $.fn.validar_contacto();
	
	//Evaluamos el validador
	if(validador){
	
		$.ajax({
					
			url: 'C_establecimientos/editar_contacto',
			type: 'POST',
			dataType: 'json',
			data: {
					id_contacto : id_contacto,
					nombre      : $('#nombre_contacto').val(),
				    correo      : $('#correo_contacto').val(),
					tlf         : $('#telefono_contacto').cleanVal(),
					otro_tlf    : $('#otro_tlf_contacto').cleanVal()
				  },
			beforeSend: function(objeto){
				
				//Mostramos el icono de carga
				$('#modal_contactos .modal-footer')
				.html('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
				
			},
			error: function(objeto, quepaso, otroobj){
				
				//Mostramos el mensaje de error
				$('#modal_contactos .modal-footer')
				.html(`<div class="alert alert-danger" role="alert">
						 <strong>Ocurrió un error al editar el contacto!</strong>, intenta de nuevo.
					   </div>`);
				
				$.fn.eventos();
				
			},
			success: function(data){
				
				//Evaluamos si hay respusta
				if(data != null){
				
					//Evaluamos la respuesta
					if(parseInt(data['CODIGO_RESPUESTA']) == 1){
						
						//Mostramos el mensaje de éxito
						$('#modal_contactos .modal-footer')
						.html(`<div class="alert alert-success" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
							   
						$.fn.contactos_ee(id_ee);
						
						//Seteamos valores
						$('#nombre_contacto').val('');
						$('#telefono_contacto').val('');
						$('#otro_tlf_contacto').val('');
						$('#correo_contacto').val('');
						
						//Mostramos los nuevos botones
						$('.wrapper_btn_agregar')
						.html(`<button type="button" class="btn btn-success agregar_contacto" id_ee="`+id_ee+`">Agregar</button>`);
						
					}else{
						
						//Mostramos el mensaje de error
						$('#modal_contactos .modal-footer')
						.html(`<div class="alert alert-danger" role="alert">
								 <strong>`+data['MENSAJE_RESPUESTA']+`</strong>
							   </div>`);
						
					}//Fin del if
				
				}else{
					
					//Mostramos el mensaje de error
					$('#modal_contactos .modal-footer')
					.html(`<div class="alert alert-danger" role="alert">
							 <strong>Ocurrió un error al editar el contacto!</strong>, intenta de nuevo.
						   </div>`);
							
				}//Fin del if
				
				//Ocultamos los mensajes
				setTimeout(function(){ 
						
					//Mostramos el btn
					$('#modal_contactos .modal-footer')
					.html(``);
					
				},3000);
				
				$.fn.eventos();
				
			}//Fin del success
				
		});//Fin del ajax
	
	}//Fin del if
	
};//Fin de la función $.fn.editar_contacto
/****************************************/