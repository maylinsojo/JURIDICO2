$(document).ready(function(){
   
   $.fn.data_inicial();
   
   //Evento focus sobre el campo
   $('#busc_nombre_ee').focusin(function(e){	
         
		 //Evaluo si hay resultados previos
		 if($('#sugerencias .dropdown-item').length > 0){
		
			 //Agregamos la clase
			 $('#sugerencias').parent('.dropdown').addClass('show');
			 $('#sugerencias').addClass('show');
		 };//Fin del if
		 
   });//Fin del evento focus
   
   //Evento focus sobre el campo
   $('#busc_nombre_ee').focusout(function(e){	
       
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

		//Obtenemos el id del despacho
		var id_despacho   = $(this).attr('id');
		var despacho      = $(this).children('.despacho').text();

		$('#busc_nombre_ee').val(despacho);
		$('#sugerencias').html('');

		$.fn.despachos(id_despacho);

		$.fn.eventos();

	});//Fin del evento click
	/***********************/

	/*
		Evento click sobre .reiniciar_filtro
	*/
	$('.reiniciar_filtro').unbind('click');
	$('.reiniciar_filtro').click(function(){

		$.fn.despachos(0);

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
			/*$('#busc_nombre_ee').attr('disabled',true);
			$('#buscar').attr('disabled',true);*/
			
			//Mostramos el icono de carga
			$('.wrapper_despachos').html('');
			$('.wrapper_despachos').append('<i class="fa fa-circle-o-notch fa-spin fa-fw"></i>');
			
			//Ocultamos el paginador
			$('.wrapper_paginador').hide();
			
		},
		error: function(objeto, quepaso, otroobj){
			
			//Desbloqueamos los siguientes elementos
			/*$('#busc_nombre_ee').removeAttr('disabled');
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
			/*$('#busc_nombre_ee').removeAttr('disabled');
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
	
}//Fin de la función $.fn.despachos
/**********************************/

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
      $('#sugerencias').removeClass('show');
			$('#sugerencias').html('');

			//Mostramos el icono de carga
			$('#busc_nombre_ee').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
			.html('<i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>');

		},
		error: function(objeto, quepaso, otroobj) {

			xhr = null;

			//Ocultamos el icono de carga
			$('#busc_nombre_ee').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');

			$.fn.eventos();

		},
		success: function(data){

			xhr = null;

			//Ocultamos el icono de carga
			$('#busc_nombre_ee').parents('.dropdown').children('.input-group-prepend:eq(0)').children('.input-group-text')
			.html('<i class="fa fa-search" aria-hidden="true"></i>');

			//Evaluamos data
			if(data != null){

				if(data.length > 0){

					//Agregamos la clase
					$('#sugerencias').parent('.dropdown').addClass('show');
          $('#sugerencias').addClass('show');

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
        $('#sugerencias').removeClass('show');

			}//Fin del if data

			$.fn.eventos();

		}//Fin del success
	});//Ajax

};//Fin de la función $.fn.buscar_ee
/************************************/











