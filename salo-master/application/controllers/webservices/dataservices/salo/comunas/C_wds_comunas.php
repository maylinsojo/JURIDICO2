<?php
/*
	NOMBRE				: C_wds_comunas.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	FECHA DE CREACIÓN 	: 06/11/2017
*/

/*
	Descripción: Libreria para crear el Rest Server
*/
require(APPPATH.'libraries/REST_Controller.php');  

/*
	Descripción: Clase principal
*/
class c_wds_comunas extends REST_Controller
{  
    
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){
		
		parent::__construct();
		$this->load->model('webservices/dataservices/salo/comunas/m_wds_comunas');//Cargamos el modelo
	
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
		Descripción : Método obtiene las comunas creadas
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   COMUNA => Varchar
						)
					  ) 
	*/
	public function comunas_get(){
		
		//Indices a evaluar
		$indices = array('id_comuna','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_comuna'] = $this->get('id_comuna');
			$parametros['rango']     = $this->get('rango');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_comunas->comunas($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		
		$this->response($respuesta);
		
		
	}//Fin del método comunas creadas
	/********************************/
	
	/*
		Descripción : Método que lista las regiones
		Parametros  : Ninguno.
		Retorna     : Array( ID          => Int, 
		                     DESCRIPCION => Varchar, 
							 ID_ESTATUS  => Int). 
	*/
	public function region_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_comunas->region();
		
		$this->response($respuesta);
		
	}//Fin del método region
	/**********************/
	
	/*
		Descripción : Método que registra a un nueva comuna
		Parametros  : Nombre => id_comuna  , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => comuna      , Tipo => Varchar, Obligatorio => Si,
					  Nombre => numero     , Tipo => Int, Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_comuna_post(){
		
		//Indices a evaluar
		$indices = array('nombre','region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
		
			$parametros['nombre']    = $this->post('nombre');
			$parametros['region']    = $this->post('region');
		
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_comunas->registrar_comuna($parametros);
			//print_r($respuesta);
			//echo 'ajaaa';
			//var_dump($respuesta); exit();   
			//$this->response($this->get()); 
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método registrar_comuna
	/*********************************/
	
	/*
		Descripción : Método que lista la información de La comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							NOMBRE            => Varchar,
							COMUNA            => Varchar
							
					  ) 
	*/
	public function info_comuna_get(){
		
		//Indices a evaluar
		$indices = array('id_comuna');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_comuna'] = $this->get('id_comuna');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_comunas->info_comuna($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método info_comuna
	/****************************/
	
	/*
		Descripción : Método que lista los estatus de la comuna
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     ID          => Int, 
		                     DESCRIPCION => Varchar
						   ). 
	*/
	public function estatus_comuna_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_comunas->estatus_comuna();
		
		$this->response($respuesta);
		
	}//Fin del método estatus_comuna
	/*******************************/
	
	
	/*
		Descripción : Método que edita la información de la comuna
		Parametros  : Nombre => id_comuna , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero     , Tipo => Varchar , Obligatorio => Si				 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_comuna_post(){
		
		//Indices a evaluar
		$indices = array('id_comuna','nombre','region','estatus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_comuna'] = $this->post('id_comuna');
			$parametros['nombre']    = $this->post('nombre');
			$parametros['region']    = $this->post('region');
			$parametros['estatus']   = $this->post('estatus');
						
						
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_comunas->editar_comuna($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método editar_comuna
	/******************************/
	
		/*
		Descripción : Método que busca a una comuna por nombre
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_comuna_get(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['descripcion'] = $this->get('descripcion');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_comunas->buscar_comuna($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método buscar_comuna
	/******************************/
	
	/*
		Descripción : Método que elimina un comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_comuna_post(){
		
		//Indices a evaluar
		$indices = array('id_comuna');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_comuna'] = $this->post('id_comuna');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_comunas->eliminar_comuna($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método eliminar_comuna
	/********************************/
	
	
}//Fin de la clase principal
/**************************/
?>
