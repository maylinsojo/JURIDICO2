<?php
/*
	NOMBRE				: C_wds_pedagogico.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	FECHA DE CREACIÓN 	: 19/11/2017
*/

/*
	Descripción: Libreria para crear el Rest Server
*/
require(APPPATH.'libraries/REST_Controller.php');  

/*
	Descripción: Clase principal
*/
class c_wds_pedagogico extends REST_Controller
{  
    
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){
		
		parent::__construct();
		$this->load->model('webservices/dataservices/salo/servicios/m_wds_pedagogico');//Cargamos el modelo
	
	}//Fin del contructor de la clase
	/*******************************/
	
	/*
		Descripción : Método verifica los parametros
		Parametros  : Nombre => $keys    , Tipo => Array, Obligatorio => Si
		              Nombre => $valores , Tipo => Array, Obligatorio => Si
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
		Descripción : Método lista los despachos creados
		Parametros  : Nombre => rango , Tipo => Int, Obligatorio => Si
		Retorna     : array(
						  despachos => array(
											array( ID_DESPACHO        => Int,
												   ID_ESTABLECIMIENTO => Int,
												   ESTABLECIMIENTO    => Varchar,
												   ID_REGION          => Int,
												   REGION             => Varchar,
												   COMUNA             => Varchar,
												   FECHA_DESPACHO     => Varchar,
												   ID_ESTATU          => Int,
												   ESTATUS            => Varchar
											)
										  ),
						   numDesp => Int
					 )
	*/
	public function despachos_get(){
		
		//Indices a evaluar
		$indices = array('rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['rango'] = $this->get('rango');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_pedagogico->despachos($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método despachos
	/*************************/
	
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
			$respuesta = $this->m_wds_pedagogico->buscar_establecimiento($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método buscar_establecimiento
	/**************************************/
	
	/*
		Descripción : Método que lista los módulos asociados al servicio pedagógico
		Parametros  : Ninguno
		Retorna     : Array(
						Array(
							ID          => Int,
							DESCRIPCION => Varchar
						)
					  )
	*/
	public function modulo_pedagogico_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_pedagogico->modulo_pedagogico();		

		$this->response($respuesta);
		
	}//Fin del método modulo_pedagogico
	/*********************************/
	
	/*
		Descripción : Método que lista los transportistas creados
		Parametros  : Ninguno
		Retorna     : Array(
						Array(
							ID                => Int,
							NOMBRE            => Varchar,
							LISTA_CONDUCTORES => Int
						)
					  )
	*/
	public function transportistas_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_pedagogico->transportistas();		

		$this->response($respuesta);
		
	}//Fin del método transportistas
	/******************************/
	
	/*
		Descripción : Método que lista los conductores asociados a la transportista
		Parametros  : Nombre => id_transportista , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
						 Array(
								ID     => Int,
								NOMBRE => Varchar
							  )
					  ) 
	*/
	public function conductores_get(){
		
		//Indices a evaluar
		$indices = array('id_trasportista');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_trasportista'] = $this->get('id_trasportista');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_pedagogico->conductores($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método conductores
	/***************************/
	
	/*
		Descripción : Método que lista las asignaturas disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
							ID          => Int,
							DESCRIPCION => Varchar
					  )
	*/
	public function asignaturas_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_pedagogico->asignaturas();		

		$this->response($respuesta);
		
	}//Fin del método asignaturas
	/***************************/
	
	/*
		Descripción : Método que crea un nuevo despacho
		Parametros  : Nombre => arrayItems      , Tipo => Array   , Obligatorio => Si,
		              Nombre => establecimiento , Tipo => Int     , Obligatorio => Si,
					  Nombre => transportista   , Tipo => Int     , Obligatorio => Si,
					  Nombre => conductor       , Tipo => Int     , Obligatorio => Si,
					  Nombre => fecha           , Tipo => Varchar , Obligatorio => Si,
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function nuevo_despacho_post(){
		
		//Indices a evaluar
		$indices = array('arrayItems','establecimiento','transportista','conductor','fecha');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['arrayItems']      = $this->post('arrayItems');
			$parametros['establecimiento'] = $this->post('establecimiento');
			$parametros['transportista']   = $this->post('transportista');
			$parametros['conductor']       = $this->post('conductor');
			$parametros['fecha']           = $this->post('fecha');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_pedagogico->nuevo_despacho($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método nuevo_despacho
	/******************************/
	
    /*
		Descripción : Método lista los datos del despacho
		Parametros  : Nombre => id_desp , Tipo => Int, Obligatorio => Si
		Retorna     : Array( 
		               ID_DESPACHO        => Int,
					   ID_ESTABLECIMIENTO => Int,
					   ESTABLECIMIENTO    => Varchar,
					   ID_REGION          => Int,
					   REGION             => Varchar,
					   COMUNA             => Varchar,
					   FECHA_DESPACHO     => Varchar,
					   ID_ESTATU          => Int,
					   ESTATUS            => Varchar,
					   ITEMS              => Array(
													ID             => Int,
													ID_MODULO_PEDA => Int,
													CANTIDAD       => Int,
													ID_ASIGNATURA  => Int,
													PRECIO         => Float
											  )
				      )
	*/
	public function info_despacho_get(){
		
		//Indices a evaluar
		$indices = array('id_desp');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_desp'] = $this->get('id_desp');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_pedagogico->info_despacho($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método info_despacho
	/*****************************/
	
	/*
		Descripción : Método que lista los estatus del espacho
		Parametros  : Ninguno
		Retorna     : Array(
		                Array(
		                    DESCRIPCION => Varchar,
							VALOR       => Int
						)
					  ) 
	*/
	public function estatus_despacho_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_pedagogico->estatus_despacho();	

		$this->response($respuesta);
		
	}//Fin del método editar_despacho
	/*******************************/
	
	/*
		Descripción : Método que edita la información de un depacho
		Parametros  : Nombre => arrayItems      , Tipo => Array   , Obligatorio => Si,
		              Nombre => establecimiento , Tipo => Int     , Obligatorio => Si,
					  Nombre => transportista   , Tipo => Int     , Obligatorio => Si,
					  Nombre => conductor       , Tipo => Int     , Obligatorio => Si,
					  Nombre => fecha           , Tipo => Varchar , Obligatorio => Si,
					  Nombre => id_desp         , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_despacho_post(){
		
		//Indices a evaluar
		$indices = array('arrayItems','establecimiento','transportista','conductor','fecha','id_desp','estatus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['arrayItems']      = $this->post('arrayItems');
			$parametros['establecimiento'] = $this->post('establecimiento');
			$parametros['transportista']   = $this->post('transportista');
			$parametros['conductor']       = $this->post('conductor');
			$parametros['fecha']           = $this->post('fecha');
			$parametros['id_desp']         = $this->post('id_desp');
			$parametros['estatus']         = $this->post('estatus');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_pedagogico->editar_despacho($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método editar_despacho
	/*******************************/
		
	public function editar_despacho_get(){
		
		
		//Parametros
		$parametros['arrayItems']      = array('{"modulo":"2","asignatura":"1","cantidad":"3","precio":"3.01"}','{"modulo":"2","asignatura":"4","cantidad":"2","precio":"2"}');
		$parametros['establecimiento'] = 2;
		$parametros['transportista']   = 2;
		$parametros['conductor']       = 5;
		$parametros['fecha']           = '30/12/2017';
		$parametros['id_desp']         = 9;
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_pedagogico->editar_despacho($parametros);

		$this->response($respuesta);
		
	}//Fin del método nuevo_despacho
		
}//Fin de la clase principal
/**************************/
?>
