<?php
/*
	Descripción: Libreria para crear el Rest Server
*/
require(APPPATH.'libraries/REST_Controller.php');

/*
	Descripción: Clase principal
*/
class c_wds_imprentas extends REST_Controller
{

	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){

		parent::__construct();
		$this->load->model('webservices/dataservices/salo/imprentas/m_wds_imprentas');//Cargamos el modelo

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
		Descripción : Método obtiene las imprentas creadas
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   imprenta => Varchar
						)
					  )
	*/
	public function imprentas_get(){

		//Indices a evaluar
		$indices = array('id_imprenta','rango');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_imprenta'] = $this->get('id_imprenta');
			$parametros['rango']     = $this->get('rango');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_imprentas->imprentas($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if


		$this->response($respuesta);


	}//Fin del método imprentas creadas
	/********************************/
	
	
	/*
		Descripción : Método que registra a un nueva imprenta
		Parametros  : Nombre => id_imprenta  , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => imprenta      , Tipo => Varchar, Obligatorio => Si,
					  Nombre => numero     , Tipo => Int, Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_imprenta_post(){
		
		//Indices a evaluar
		$indices = array('nombre','direccion','precio');
		//$indices = array('nombre','precio');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
		
			$parametros['nombre']       = $this->post('nombre');
			$parametros['direccion']    = $this->post('direccion');
			$parametros['precio']       = $this->post('precio');
		
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_imprentas->registrar_imprenta($parametros);
			//print_r($respuesta);
			//echo 'ajaaa';
			//var_dump($respuesta); exit();   
			//$this->response($this->get()); 
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método registrar_imprenta
	/***********************************/
	
	/*
		Descripción : Método que lista la información de La imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							NOMBRE            => Varchar,
							imprenta            => Varchar
							
					  ) 
	*/
	public function info_imprenta_get(){
		
		//Indices a evaluar
		$indices = array('id_imprenta');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_imprenta'] = $this->get('id_imprenta');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_imprentas->info_imprenta($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método info_imprenta
	/****************************/
	
	/*
		Descripción : Método que lista los estatus de la imprenta
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     ID          => Int, 
		                     DESCRIPCION => Varchar
						   ). 
	*/
	public function estatus_imprenta_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_imprentas->estatus_imprenta();
		
		$this->response($respuesta);
		
	}//Fin del método estatus_imprenta
	/*******************************/
	
	
	/*
		Descripción : Método que edita la información de la imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => precio     , Tipo => Varchar , Obligatorio => Si				 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_imprenta_post(){
		
		//Indices a evaluar
		$indices = array('id_imprenta','nombre','precio','estatus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_imprenta'] = $this->post('id_imprenta');
			$parametros['nombre']    = $this->post('nombre');
			$parametros['precio']    = $this->post('precio');
			$parametros['estatus']   = $this->post('estatus');
						
						
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_imprentas->editar_imprenta($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método editar_imprenta
	/******************************/
	
	
		/*
		Descripción : Método que busca a una imprenta por nombre
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_imprenta_get(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['descripcion'] = $this->get('descripcion');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_imprentas->buscar_imprenta($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método buscar_imprenta
	/******************************/
	
	/*
		Descripción : Método que elimina un imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_imprenta_post(){
		
		//Indices a evaluar
		$indices = array('id_imprenta');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_imprenta'] = $this->post('id_imprenta');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_imprentas->eliminar_imprenta($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método eliminar_imprenta
	/********************************/
	
	/*
		Descripción : Método que lista los establecimientos que coincidan con la busqueda
		Parametros  : Nombre => nombre_ee , Tipo => Varchar, Obligatorio => Si
		Retorna     : Array(
		                     ID              => Int,
		                     ESTABLECIMIENTO => Varchar,
							 COMUNA          => Varchar,
							 REGION          => Varchar
						   )
	*/
	public function buscar_establecimiento_get(){

		//Indices a evaluar
		$indices = array('nombre_ee');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['nombre_ee'] = $this->get('nombre_ee');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_imprentas->buscar_establecimiento($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método buscar_establecimiento
	/**************************************/
	
	


}//Fin de la clase principal
/**************************/
?>
