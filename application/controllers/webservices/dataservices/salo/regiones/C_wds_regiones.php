<?php
/*
	NOMBRE				: C_wds_regiones.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Libreria para crear el Rest Server
*/
require(APPPATH.'libraries/REST_Controller.php');  

/*
	Descripción: Clase principal
*/
class c_wds_regiones extends REST_Controller
{  
    
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){
		
		parent::__construct();
		$this->load->model('webservices/dataservices/salo/regiones/m_wds_regiones');//Cargamos el modelo
	
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
		Descripción : Método obtiene las regiones creadas
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   COMUNA => Varchar
						)
					  ) 
	*/
	public function regiones_get(){
		
		//Indices a evaluar
		$indices = array('id_region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_region'] = $this->get('id_region');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->regiones($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		
		$this->response($respuesta);
		
	}//Fin del método regiones creadas
	/********************************/
	
	/*
		Descripción : Método que registra a un nueva region
		Parametros  : Nombre => id_region  , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => comuna      , Tipo => Varchar, Obligatorio => Si,
					  Nombre => numero     , Tipo => Int, Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_region_post(){
		
		//Indices a evaluar
		$indices = array('nombre','numero');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
		
			$parametros['nombre']    = $this->post('nombre');
			$parametros['numero']    = $this->post('numero');
		
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->registrar_region($parametros);
			//print_r($respuesta);
			//echo 'ajaaa';
			//var_dump($respuesta); exit();   
			//$this->response($this->get()); 
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método registrar_region
	/*********************************/
	
	/*
		Descripción : Método que lista la información de La region
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							NOMBRE            => Varchar,
							COMUNA            => Varchar
							
					  ) 
	*/
	public function info_region_get(){
		
		//Indices a evaluar
		$indices = array('id_region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_region'] = $this->get('id_region');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->info_region($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método info_region
	/****************************/
	
	/*
		Descripción : Método que edita la información de la region
		Parametros  : Nombre => id_region , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero     , Tipo => Varchar , Obligatorio => Si				 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_region_post(){
		
		//Indices a evaluar
		$indices = array('id_region','nombre','numero');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_region'] = $this->post('id_region');
			$parametros['nombre']    = $this->post('nombre');
			$parametros['numero']    = $this->post('numero');
						
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->editar_region($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
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
	public function buscar_region_get(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['descripcion'] = $this->get('descripcion');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->buscar_region($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
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
	public function eliminar_region_post(){
		
		//Indices a evaluar
		$indices = array('id_region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_region'] = $this->post('id_region');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->eliminar_region($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método eliminar_region
	/********************************/
	/*
		Descripción : Método que lista a las comunas asociados a la regiom
		Parametros  : Nombre => id_reg , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 ESTATUS      => Varchar
							
		                   )
	*/
	public function comunas_region_get(){
		
		//Indices a evaluar
		$indices = array('id_reg');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_reg'] = $this->get('id_reg');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->comunas_region($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método comunas_region
	/*******************************/
	
	/*
		Descripción : Método que asocia los contactos al establecimiento
		Parametros  : Nombre => id_ee    , Tipo => Int     , Obligatorio => Si
					  Nombre => nombre   , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo   , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf      , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function asociar_comuna_post(){
		
		//Indices a evaluar
		$indices = array('id_reg','nombre');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['nombre']   = $this->post('nombre');
			$parametros['id_reg']   = $this->post('id_reg');
			
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->asociar_comuna($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método asociar_comuna
	/********************************/
	
	
	/*
		Descripción : Método que edita los datos del comuna
		Parametros  : Nombre => id_comuna , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si
					 
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_comuna_post(){
		
		//Indices a evaluar
		$indices = array('id_comuna','nombre');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_comuna'] = $this->post('id_comuna');
			$parametros['nombre']    = $this->post('nombre');
		
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->editar_comuna($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método editar_comuna
	/*******************************/
	
	/*
		Descripción : Método que elimina los comunas de la región
		Parametros  : Nombre => id_comuna , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	
	
	
	public function eliminar_comuna_post(){

		//Indices a evaluar
		$indices = array('id');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id'] = $this->post('id');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_regiones->eliminar_comuna($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método eliminar_comuna
	/*********************************/
		
}//Fin de la clase principal
/**************************/
?>
