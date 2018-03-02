<?php
/*

	NOMBRE				      : C_regiones.php
	DESCRIPCIÓN			      : Controlador del frontend
	AUTOR				      : Jessica Rodriguez
	FECHA DE CREACIÓN 	      : 15/10/2017

*/

/*
	Descripción: Clase principal. 
*/
class c_regiones extends CI_Controller
{
    
	/*
		Descripción: Contructor de la clase principal. 
	*/
	function __construct()
	{
		
		parent::__construct();
		
		//Cargamos el modelo
		$this->load->model('salo/regiones/M_regiones');

	}//Fin del contructor de la clase
	/*******************************/
	
	/*
		Descripción : Método verifica los parametros
		Parametros  : Nombre => $keys    , Tipo => Array,
		              Nombre => $valores , Tipo => Array
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
						   ) 
	*/
	private function evaluar_parametros($keys, $valores){
		
		//Obtenemos el n° de llaves a verificar
		$numKey = count($keys);
		
		//Respuesta por defecto
		$respuesta = array(
						   'CODIGO_RESPUESTA'  => 1,
						   'MENSAJE_RESPUESTA' => 'Todos los parametros existen.'
						  );
							 
		//Recorremos las llaves
		for($i = 0; $i < $numKey; $i++){
			
			//Evaluamos
			if(!array_key_exists($keys[$i], $valores)){
				
				//Definimos la respuesta de error
				$respuesta = array(
				               'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'El parametro '.$keys[$i].' no se encuentra definido'
				             );
							 
				break;
				
			}//Fin del if
			
		}//Fin del for
		
		return $respuesta;
		
	}//Fin del método evaluar_parametros
	/**********************************/
	
	/*
		Descripción : Método que muestra la vista para realizar operaciones
		              sobre las regiones.
		Parametros  : Ninguno.
		Retorna     : Una vista. 
	*/
	public function index()
	{
	    
		//Cargamos la vista
		$this->load->view("salo/regiones/v_index");
	
	}//Fin del método index
	/**********************/
	
	
	/*
		Descripción : Método que muestra la información inicial necesaria
		              para la vista salo/regiones/v_index.
		Parametros  : Ninguno.
		Retorna     : Una vista. 
	*/
	
	public function data_inicial()
	{
	    
		//Indices a evaluar
		$indices = array('id_region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_region'] = $_POST['id_region'];
			
			$data['regiones'] = $this->M_regiones->regiones($parametros);
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if;


	}//Fin del método data_incial
	/***************************/
	
	/*
		Descripción : Método que registra a una nueva region
		Parametros  : Nombre => id_region  , Tipo => Int, Obligatorio => Si,
		              Nombre => comuna     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => numero     , Tipo => Int, Obligatorio => Si,
					
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_region(){
		
		//Indices a evaluar
		$indices = array('nombre','numero');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
		    $parametros['nombre']     = $_POST['nombre'];
			$parametros['numero']     = $_POST['numero'];
			
			
			echo json_encode($this->M_regiones->registrar_region($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método registrar_region
	/*********************************/
	
	/*
		Descripción : Método que lista a las regiones creadas
		Parametros  : Ninguno.
		Retorna     : array(
		 					 ID           => Int,
							 NOMBRE       => Varchar,
							 COMUNA       => Varchar,
							 NUMERO       => Int
							
		                   ). 
	*/
	public function regiones_creadas()
	{
	    
		//Indices a evaluar
		$indices = array('id_region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_region'] = $_POST['id_region'];
			
			echo json_encode($this->M_regiones->regiones($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if


	}//Fin del método regiones_creadas
	/********************************/
	
/*
		Descripción : Método que lista la información necesaria para editar una region
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si
		Retorna     : array( 
		                     INFO => array(
											ID      => Int,
											NOMBRE  => Varchar,
											NOMBRE  => Varchar,
											NUMERO => Varchar
											
									),
							
					  ) 
	*/
	public function info_editar_region(){
		
		//Indices a evaluar
		$indices = array('id_region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_region'] = $_POST['id_region'];
			
			$data['INFO'] = $this->M_regiones->info_region($parametros);
						
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método info_editar_region
	/***********************************/
	
	/*
		Descripción : Método que edita la información de la region
		Parametros  : Nombre => id_region , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero      , Tipo => Varchar , Obligatorio => Si
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_region(){
		
		//Indices a evaluar
		$indices = array('id_region','nombre','numero');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_region']  = $_POST['id_region'];
			$parametros['nombre']     = $_POST['nombre'];
			$parametros['numero']     = $_POST['numero'];
						
			echo json_encode($this->M_regiones->editar_region($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método editar_region
	/******************************/
	/*
		Descripción : Método que busca a una region por nombre
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_region(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['descripcion'] = $_POST['descripcion'];
			
			echo json_encode($this->M_regiones->buscar_region($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método buscar_region
	/******************************/
	
	/*
		Descripción : Método que elimina un region
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_region(){
		
		//Indices a evaluar
		$indices = array('id_region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_region'] = $_POST['id_region'];
			
			echo json_encode($this->M_regiones->eliminar_region($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método eliminar_region
	/********************************/
	
	/*
		Descripción : Método que lista a laS comunas asociadas a la región
		Parametros  : Nombre => id_reg , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 ESTATUS => Varchar
							 	
		                   )
	*/
	public function info_comunas()
	{
	    
		//Indices a evaluar
		$indices = array('id_reg');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_reg'] = $_POST['id_reg'];
		
			$data['COMUNAS'] = $this->M_regiones->comunas_region($parametros);
			
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método contactos_creados
	/*********************************/
	
	/*
		Descripción : Método que asocia las comunas a la región
		Parametros  : Nombre => id_reg   , Tipo => Int     , Obligatorio => Si
					  Nombre => nombre   , Tipo => Varchar , Obligatorio => Si
					
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function asociar_comuna()
	{
	    
		//Indices a evaluar
		$indices = array('id_reg','nombre');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_reg']    = $_POST['id_reg'];
			$parametros['nombre']    = $_POST['nombre'];
		
			echo json_encode($this->M_regiones->asociar_comuna($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método asociar_comuna
	/********************************/
	
	/*
		Descripción : Método que lista a las comunas asociados a la regiòn
		Parametros  : Nombre => id_ee , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 TELEFONO      => Varchar,
							 OTRO_TELEFONO => Varchar,
							 CORREO        => Varchar	
		                   )
	*/
	public function comunas_region()
	{
	    
		//Indices a evaluar
		$indices = array('id_reg');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_reg'] = $_POST['id_reg'];
		
			echo json_encode($this->M_regiones->comunas_region($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método comunas_region
	/******************************/
	
	/*
		Descripción : Método que edita los datos del comuna
		Parametros  : Nombre => id_comuna , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si
					
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_comuna()
	{

		//Indices a evaluar
		$indices = array('id_comuna','nombre');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_comuna'] = $_POST['id_comuna'];
			$parametros['nombre']      = $_POST['nombre'];
		

			echo json_encode($this->M_regiones->editar_comuna($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método editar_coomuna
	/*******************************/
	
	
	
	/*
		Descripción : Método que elimina los comuna de la regiones
		Parametros  : Nombre => id_ccomuna , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	
		
	public function eliminar_comuna()
	{

		//Indices a evaluar
		$indices = array('id');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id'] = $_POST['id'];

			echo json_encode($this->M_regiones->eliminar_comuna($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método eliminar_comuna
	/*********************************/

	
}//Fin de la clase principal
/**************************/

?>

