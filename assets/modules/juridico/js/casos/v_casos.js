//Variables globales
var xhr;

/*
	Evento document ready
*/
$(document).ready(function(){
   
   $.fn.carga_data_casos();
   

   $.fn.eventos();
   
});/*Fin del document ready*/
/***************************/

/*
	Función donde se declaran los eventos
*/
$.fn.eventos = function(){
	
	
	
	
};//Fin de la función eventos
/***************************/



/**********************************************/
/*Función que obtiene los campos de los casos */
/**********************************************/
$.fn.carga_data_casosx = function(e){ 
		
		$.ajax({
				
			url: 'cargar_data_casos',
			type: 'POST',
			//data: {id_usuario:id_usuario},
			dataType: 'json',
			beforeSend: function(objeto){
				alert(1);

			},
			error: function(objeto, quepaso, otroobj){

				alert(2);
				
			},
			//timeout: 10000,
			success: function(respuesta){
				
				alert(3);
				//remuevo la carga
				/*alert('dsfsdfasdfads');
				return;*/
				
				$.fn.caso(respuesta);				
				
			}//Fin del success
				
		});//Fin del ajax

}



//$.fn.cargar_data_casos
//$.fn.caso
$.fn.carga_data_casos = function(){
	
	var formcaso =`<form id="form_caso">
						<div class="form-group col-lg-12">
						<div class="form-group col-lg-12">
						<div class="col-lg-12 definicion_nombre">
							<div class="form-group col-lg-6">
								<label>Nombre</label>
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-user"></i></span>
									<input  name="primer_nombre" id="primer_nombre"  placeholder="Primer Nombre" class="form-control primer_nombre"  
									value=""  type="text" required pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s ]{3,}">
								</div>
							</div>    
						
						<div class="form-group col-lg-6">
							<label>Segundo Nombre</label>
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-user"></i></span>
								<input  name="segundo_nombre" id="segundo_nombre" placeholder="Segundo Nombre" class="form-control segundo_nombre"   
								value="" type="text" pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s ]{3,}">
							</div>
						</div>                        
						
						<div class="form-group col-lg-6">
							<label>Primer Apellido</label>
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-user"></i></span>
								<input  name="primer_apellido" id="primer_apellido" placeholder="Primer Apellido" class="form-control primer_apellido"  
								value="" type="text" required pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s ]{3,}">
							</div>
						</div> 
						
						<div class="form-group col-lg-6">
							<label>Segundo Apellido</label>
							<div class="input-group">
								<span class="input-group-addon"><i class="fa fa-user"></i></span>
								<input  name="segundo_apellido" id="segundo_apellido" placeholder="Segundo Apellido" class="form-control segundo_apellido" 
								value="" type="text" pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ\s ]{3,}">
							</div>
						</div>  
					
					
					</div>
					</div>
					
					<div class="form-group col-lg-6">
						<label>Documento de Identidad</label>
						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
							<input type="text" name="documento_identidad" id="documento" value="" class="form-control documento" 
							 placeholder="V-00000000 o E-0000000 o P-0000000" required  />
						</div>				
					</div>  
					
					
					<div class="form-group col-lg-6">
						<label>Procedimiento</label>
						<div class="input-group">
							<span class="input-group-addon"><i class="" aria-hidden="true"></i></span>
							<select class="form-control " id="genero" name="genero" required>
							</select>
						</div>
					</div>
					
					<div class="form-group col-lg-6">
						<label>Genero</label>
						<div class="input-group">
							<span class="input-group-addon"><i class="fa fa-venus-mars" aria-hidden="true"></i></span>
							<select class="form-control " id="genero" name="genero" required>
							</select>
						</div>
					</div>
					
					<div class="form-group col-lg-6">
						<label>Fecha de Nacimiento</label>
						<div class='input-group date' id='calendario' class="f_nacimiento">
							<span class="input-group-addon">
								<span class="glyphicon glyphicon-calendar"></span>
							</span>
							<input type='text' id="txtFecha" class="form-control f_nacimiento" name="f_nacimiento" value="" placeholder="Fecha de Nacimiento" required/>
						</div>
					</div>                 
					
					
					<div class="form-group col-lg-6">
						<label>Correo Principal</label>
						<div class="input-group">
							<span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
							<input name="correo[]" placeholder="Correo Electronico Primario" class="form-control email correop"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" required >
						</div>
					</div>
					
					</div>
					<div class="opciones">
					<div class="col-lg-12" id="pruebabtn">
						<div class="msgalerta text-center"></div>
						<button class="btn btn-default guardar_caso" type="button">Guardar</button>
					</div>
					</div>				
					</form>`;
					
	/*var formcaso = `<div class="form-group row">
  <label for="example-text-input" class="col-2 col-form-label">Text</label>
  <div class="col-10">
    <input class="form-control" type="text" value="Artisanal kale" id="example-text-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-search-input" class="col-2 col-form-label">Search</label>
  <div class="col-10">
    <input class="form-control" type="search" value="How do I shoot web" id="example-search-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-email-input" class="col-2 col-form-label">Email</label>
  <div class="col-10">
    <input class="form-control" type="email" value="bootstrap@example.com" id="example-email-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-url-input" class="col-2 col-form-label">URL</label>
  <div class="col-10">
    <input class="form-control" type="url" value="https://getbootstrap.com" id="example-url-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-tel-input" class="col-2 col-form-label">Telephone</label>
  <div class="col-10">
    <input class="form-control" type="tel" value="1-(555)-555-5555" id="example-tel-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-password-input" class="col-2 col-form-label">Password</label>
  <div class="col-10">
    <input class="form-control" type="password" value="hunter2" id="example-password-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-number-input" class="col-2 col-form-label">Number</label>
  <div class="col-10">
    <input class="form-control" type="number" value="42" id="example-number-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-datetime-local-input" class="col-2 col-form-label">Date and time</label>
  <div class="col-10">
    <input class="form-control" type="datetime-local" value="2011-08-19T13:45:00" id="example-datetime-local-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-date-input" class="col-2 col-form-label">Date</label>
  <div class="col-10">
    <input class="form-control" type="date" value="2011-08-19" id="example-date-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-month-input" class="col-2 col-form-label">Month</label>
  <div class="col-10">
    <input class="form-control" type="month" value="2011-08" id="example-month-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-week-input" class="col-2 col-form-label">Week</label>
  <div class="col-10">
    <input class="form-control" type="week" value="2011-W33" id="example-week-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-time-input" class="col-2 col-form-label">Time</label>
  <div class="col-10">
    <input class="form-control" type="time" value="13:45:00" id="example-time-input">
  </div>
</div>
<div class="form-group row">
  <label for="example-color-input" class="col-2 col-form-label">Color</label>
  <div class="col-10">
    <input class="form-control" type="color" value="#563d7c" id="example-color-input">
  </div>
</div>`;*/				

            
					$('.container').append(formcaso);
					//$('.wraper_formulario').append(formcaso);
					
					//Obtenemos las dimensiones de los objetos
					alto_contenido = $('body').height();
					
					//Seteamos el alto del contenido
								
					$.fn.eventos();
}



/*
	Funcion que devuelve vacio en caso de que el valor de entrada sea nulo
*/
$.fn.campo_nulo = function(valor){
	
	if(valor == null){
		
		valor = '';	
	}else{
		
		valor = valor;
	}
	
	return valor;
	
}/*Fin campo nulo*/
/******************/