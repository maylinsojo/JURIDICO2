<?php
/*
	NOMBRE				: C_wds_transportistas.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	FECHA DE CREACIÓN 	: 13/11/2017
*/

/*
	Descripción: Libreria para crear el Rest Server
*/
require(APPPATH.'libraries/REST_Controller.php');  

/*
	Descripción: Clase principal
*/
class c_wds_transportistas extends REST_Controller
{  
    
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){
		
		parent::__construct();
		$this->load->model('webservices/dataservices/salo/transportistas/m_wds_transportistas');//Cargamos el modelo
	
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
		Descripción : Método obtiene las transportistas creadas
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   transportista => Varchar
						)
					  ) 
	*/
	public function transportistas_get(){
		
		//Indices a evaluar
		$indices = array('id_transp','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_transp'] = $this->get('id_transp');
			$parametros['rango']            = $this->get('rango');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_transportistas->transportistas($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		
		$this->response($respuesta);
		
		
	}//Fin del método transportistas creadas
	/**************************************/
	
	/*
		Descripción : Método que registra a un nueva transportista
		Parametros  : Nombre => id_transp  , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => transportista      , Tipo => Varchar, Obligatorio => Si,
					  Nombre => numero     , Tipo => Int, Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_transportista_post(){
		
		//Indices a evaluar
		$indices = array('nombre','conductor');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
		
			$parametros['nombre']    = $this->post('nombre');
			$parametros['conductor'] = $this->post('conductor');
		
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_transportistas->registrar_transportista($parametros);
			//print_r($respuesta);
			//echo 'ajaaa';
			//var_dump($respuesta); exit();   
			//$this->response($this->get()); 
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método registrar_transportista
	/****************************************/
	
	/*
		Descripción : Método que busca a una transportista
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    ID     => Int,
							NOMBRE => Varchar
					  )  
	*/
	public function buscar_transportista_get(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['descripcion'] = $this->get('descripcion');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_transportistas->buscar_transportista($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método buscar_transportista
	/*************************************/
	
	/*
		Descripción : Método que lista a los conductores asociados a la transportista
		Parametros  : Nombre => id_transp , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 TELEFONO      => Varchar,
							 OTRO_TELEFONO => Varchar,
							 CORREO        => Varchar	
		                   )
	*/
	public function conductores_transportista_get(){
		
		//Indices a evaluar
		$indices = array('id_transp');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_transp'] = $this->get('id_transp');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_transportistas->conductores_transportista($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método conductores_transportista
	/*****************************************/
	/*
		Descripción : Método que asocia los conductores a la transportista
		Parametros  : Nombre => id_transp    , Tipo => Int     , Obligatorio => Si
					  Nombre => nombre   , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo   , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf      , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function asociar_conductor_post(){
		
		//Indices a evaluar
		$indices = array('id_transp','nombre','correo','tlf','otro_tlf');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_transp']    = $this->post('id_transp');
			$parametros['nombre']   = $this->post('nombre');
			$parametros['correo']   = $this->post('correo');
			$parametros['tlf']      = $this->post('tlf');
			$parametros['otro_tlf'] = $this->post('otro_tlf');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_transportistas->asociar_conductor($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método asociar_conductor
	/********************************/
	
	/*
		Descripción : Método que edita los datos del conductor
		Parametros  : Nombre => id_conductor , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo      , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf         , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf    , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_conductor_post(){
		
		//Indices a evaluar
		$indices = array('id_conductor','nombre','correo','tlf','otro_tlf');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_conductor'] = $this->post('id_conductor');
			$parametros['nombre']       = $this->post('nombre');
			$parametros['correo']       = $this->post('correo');
			$parametros['tlf']          = $this->post('tlf');
			$parametros['otro_tlf']     = $this->post('otro_tlf');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_trasportistas->editar_conductor($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método editar_conductor
	/*******************************/
	
	/*
		Descripción : Método que elimina los conductores de la transportista
		Parametros  : Nombre => id_conductor , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_conductor_post(){
		
		//Indices a evaluar
		$indices = array('id_conductor');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_conductor'] = $this->post('id_conductor');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_transportistas->eliminar_conductor($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método eliminar_contacto
	/*********************************/
	
	
	
	
	
		
}//Fin de la clase principal
/**************************/
?>