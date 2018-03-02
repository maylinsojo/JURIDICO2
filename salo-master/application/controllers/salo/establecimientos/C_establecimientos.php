<?php
/*

	NOMBRE			  : C_establecimientos.php
	DESCRIPCIÓN	      : Controlador del frontend
	AUTOR		      : Jessica Rodriguez
	FECHA DE CREACIÓN : 15/10/2017

*/

/*
	Descripción: Clase principal. 
*/
class c_establecimientos extends CI_Controller
{
    
	/*
		Descripción: Contructor de la clase principal. 
	*/
	function __construct()
	{
		
		parent::__construct();
		
		//Cargamos el modelo
		$this->load->model('salo/establecimientos/M_establecimientos');

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
		              sobre los establecimientos.
		Parametros  : Ninguno.
		Retorna     : Una vista. 
	*/
	public function index()
	{
	    
		//Cargamos la vista
		$this->load->view("salo/establecimientos/v_index");
	
	}//Fin del método index
	/**********************/
	
	/*
		Descripción : Método que muestra la información inicial necesaria
		              para la vista salo/establecimientos/v_index.
		Parametros  : Nombre => id_ee , Tipo => Int, Obligatorio => Si
		              Nombre => rango , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID      => Int,
							NOMBRE  => Varchar,
							REGION  => Varchar,
							COMUNA  => Varchar,
							ESTATUS => Varchar
					  ) 
	*/
	public function data_inicial()
	{
	    
		//Indices a evaluar
		$indices = array('id_ee','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee'] = $_POST['id_ee'];
			$parametros['rango'] = $_POST['rango'];
			
			echo json_encode($this->M_establecimientos->establecimientos($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if

	}//Fin del método data_incial
	/***************************/
	
	/*
		Descripción : Método que lista las regiones disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
						id,
						nombre,
						numero
		              ) 
	*/
	public function info_nuevo_ee()
	{
	    
		$data['regiones'] = $this->M_establecimientos->regiones();
		
		echo json_encode($data);

	}//Fin del método info_nuevo_ee
	/*****************************/
	
	/*
		Descripción : Método que lista las comunas asociadas a las regiones
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		              	id,
						descripcion
		              )  
	*/
	public function comunas_region()
	{
	    
		//Indices a evaluar
		$indices = array('id_region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
			
			//Obtenemos los parametros
			$parametros['id_region'] = $_POST['id_region'];
			
			echo json_encode($this->M_establecimientos->comunas_region($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método comunas_region
	/******************************/
	
	/*
		Descripción : Método que registra un nuevo establecimiento
		Parametros  : Nombre => region , Tipo => Int     , Obligatorio => Si,
					  Nombre => nombre , Tipo => Varchar , Obligatorio => Si,
					  Nombre => comuna , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_establecimiento(){
		
		//Indices a evaluar
		$indices = array('nombre','comuna');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['nombre'] = $_POST['nombre'];
			$parametros['comuna'] = $_POST['comuna'];
			
			echo json_encode($this->M_establecimientos->registrar_establecimiento($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método registrar_establecimiento
	/*****************************************/
	
	/*
		Descripción : Método que lista a los establecimientos_creados
		Parametros  : Ninguno.
		Retorna     : array(
		 					 ID           => Int,
							 NOMBRE       => Varchar,
							 COMUNA       => Varchar,
							 NUMERO       => Int
							
		                   ). 
	*/
	public function establecimientos_creados()
	{
		
		//Indices a evaluar
		$indices = array('id_ee','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee'] = $_POST['id_ee'];
			$parametros['rango'] = $_POST['rango'];
			
			echo json_encode($this->M_establecimientos->establecimientos($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if

	}//Fin del método establecimientos_creados
	/*****************************************/
	
	/*
		Descripción : Método que elimina un establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_establecimiento(){
		
		//Indices a evaluar
		$indices = array('id_ee');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_ee'] = $_POST['id_ee'];
			
			//Obtenemos la respuesta
			echo json_encode($this->M_establecimientos->eliminar_establecimiento($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if		
		
	}//Fin del método eliminar_establecimiento
	/****************************************/

	/*
		Descripción : Método que lista la información necesaria para editar el establecimiento
		Parametros  : Nombre => id_establecimiento , Tipo => Int, Obligatorio => Si
		Retorna     : array( 
		                     INFO => array(
											ID                => Int,
											AVATAR            => Varchar,
											NOMBRE            => Varchar,
											CORREO_PRINCIPAL  => Varchar,
											CORREO_SECUNDARIO => Varchar,
											ID_TIPO_establecimiento   => Int,
											ID_ESTATUS        => Int
									),
							
					  ) 
	*/
	public function info_editar_establecimiento(){
		
		//Indices a evaluar
		$indices = array('id_establecimiento');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_establecimiento'] = $_POST['id_establecimiento'];
			
			$data['INFO']     = $this->M_establecimientos->info_establecimiento($parametros);
			$data['REGIONES'] = $this->M_establecimientos->regiones();
			$data['ESTATUS']  = $this->M_establecimientos->estatus_establecimiento();
			
			//Obtenemos el parametro de id_region 
			$parametros['id_region'] = $data['INFO']['id_region'];
			
			$data['COMUNAS'] = $this->M_establecimientos->comunas_region($parametros);
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método info_editar_establecimiento
	/*******************************************/
	
	/*
		Descripción : Método que edita la información del establecimiento
		Parametros  : Nombre => id_ee   , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre  , Tipo => Varchar , Obligatorio => Si
					  Nombre => comuna  , Tipo => Int     , Obligatorio => Si
					  Nombre => estatus , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_establecimiento(){
		
		//Indices a evaluar
		$indices = array('id_ee','nombre','comuna','estatus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee']   = $_POST['id_ee'];
			$parametros['nombre']  = $_POST['nombre'];
			$parametros['comuna']  = $_POST['comuna'];
			$parametros['estatus'] = $_POST['estatus'];
			
			echo json_encode($this->M_establecimientos->editar_establecimiento($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método editar_establecimiento
	/***************************************/
	
	/*
		Descripción : Método que busca a un establecimiento
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    ID     => Int,
							NOMBRE => Varchar
					  )  
	*/
	public function buscar_ee(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['descripcion'] = $_POST['descripcion'];
			
			echo json_encode($this->M_establecimientos->buscar_ee($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método buscar_ee
	/*************************/
	
	/*
		Descripción : Método que lista los cursos disponibles para asociar al EE y los
		              cursos ya asociados
		Parametros  : Nombre => id_ee, Tipo => Int, Obligatorio => Si
		Retorna     : Array( 
		                   nivel => Array( 
										 Array( 
											   ID          => Int, 
											   DESCRIPCION => Varchar
										 )
									   ) , 
						   cursos_establecimiento =>  Array( 
														 Array( 
															   ID          => Int, 
															   ID_CURSO    => Int,
															   DESC_CURSO  => Varchar,
															   ID_NIVEL    => Int,
															   DESC_NIVEL  => Varchar,
															   NUM_ALUMNOS => Int
														 )
													   )  	
						   )
	*/
	public function data_cursos(){
		
		//Indices a evaluar
		$indices = array('id_ee');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee'] = $_POST['id_ee'];
		
			$data['nivel']                  = $this->M_establecimientos->nivel_academico();
			$data['cursos_establecimiento'] = $this->M_establecimientos->cursos_establecimiento($parametros);
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método data_cursos
	/***************************/
	
	/*
		Descripción : Método que lista los cursos asociados a los niveles academicos
		Parametros  : Nombre => id_nivel , Tipo => Int, Obligatorio => Si
		              Nombre => id_ee    , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    ID          => Int, 
							DESCRIPCION => Varchar,
		                   )
	*/
	public function nivel_curso(){
		
		//Indices a evaluar
		$indices = array('id_nivel','id_ee');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_nivel'] = $_POST['id_nivel'];
			$parametros['id_ee']    = $_POST['id_ee'];
		
			echo json_encode($this->M_establecimientos->nivel_curso($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método nivel_curso
	/***************************/
	
	/*
		Descripción : Método que asocia el curso a un establecimiento
		Parametros  : Nombre => id_ee  , Tipo => Int, Obligatorio => Si
		              Nombre => nivel  , Tipo => Int, Obligatorio => Si
					  Nombre => curso  , Tipo => Int, Obligatorio => Si
					  Nombre => numEst , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function agregar_curso(){
		
		//Indices a evaluar
		$indices = array('id_ee','curso','numEst');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee']  = $_POST['id_ee'];
			$parametros['curso']  = $_POST['curso'];
			$parametros['numEst'] = $_POST['numEst'];
		
			echo json_encode($this->M_establecimientos->agregar_curso($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método agregar_curso
	/*****************************/
	
	/*
		Descripción : Método que obtiene los cursos asociados al EE
		Parametros  : Nombre => id_ee , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function cursos_establecimiento(){
		
		//Indices a evaluar
		$indices = array('id_ee');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee'] = $_POST['id_ee'];
			
			echo json_encode($this->M_establecimientos->cursos_establecimiento($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método cursos_establecimiento
	/**************************************/
	
	/*
		Descripción : Método elimina el curso al EE
		Parametros  : Nombre => id , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_curso(){
		
		//Indices a evaluar
		$indices = array('id');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id'] = $_POST['id'];
			
			echo json_encode($this->M_establecimientos->eliminar_curso($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método eliminar_curso
	/******************************/
	
	/*
		Descripción : Método edita el curso de una establecimiento
		Parametros  : Nombre => id     , Tipo => Int , Obligatorio => Si
		              Nombre => numEst , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_curso(){
		
		//Indices a evaluar
		$indices = array('id','numEst');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id']     = $_POST['id'];
			$parametros['numEst'] = $_POST['numEst'];
			
			echo json_encode($this->M_establecimientos->editar_curso($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método editar_curso
	/****************************/
	
	/*
		Descripción : Método que lista los servicios disponibles
             		  para asociar a los EE y los servicios asociados del EE
		Parametros  : Nombre => id_establecimiento, Tipo => Int, Obligatorio => Si
		Retorna     : Array( 
		                   SERVICIOS => Array( 
										   Array( 
											   ID          => Int, 
											   DESCRIPCION => Varchar
										   )
								  		), 
						   SERVICIO_ESTABLECIMIENTO => Array( 
														  Array(
															   ID          => Int,
															   DESCRIPCION => Varchar
														  )
													   )	
						   )
	*/
	public function servicio_establecimiento(){
		
		//Indices a evaluar
		$indices = array('id_ee');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee'] = $_POST['id_ee'];
		
			$data['SERVICIOS']                 = $this->M_establecimientos->servicios();
			$data['SERVICIOS_ESTABLECIMIENTO'] = $this->M_establecimientos->servicio_establecimiento($parametros);
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método asociar_servicio
	/********************************/
	
	/*
		Descripción : Método que asocia o desasocia los servicios al establecimiento
		Parametros  : Nombre => id_ee     , Tipo => Int   , Obligatorio => Si
		              Nombre => servicios , Tipo => Array , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function asociar_servicio_establecimiento(){
		
		//Indices a evaluar
		$indices = array('id_ee','servicios');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee']     = $_POST['id_ee'];
			$parametros['servicios'] = $_POST['servicios'];
			 
			echo json_encode($this->M_establecimientos->asociar_servicio_establecimiento($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método asociar_servicio_establecimiento
	/************************************************/
	
	/*
		Descripción : Método que lista a los contactos asociados al establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 TELEFONO      => Varchar,
							 OTRO_TELEFONO => Varchar,
							 CORREO        => Varchar	
		                   )
	*/
	public function info_contactos()
	{
	    
		//Indices a evaluar
		$indices = array('id_ee');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee'] = $_POST['id_ee'];
		
			$data['CONTACTOS'] = $this->M_establecimientos->contactos_establecimiento($parametros);
			
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método contactos_creados
	/*********************************/
	
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
	public function asociar_contacto()
	{
	    
		//Indices a evaluar
		$indices = array('id_ee','nombre','correo','tlf','otro_tlf');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee']    = $_POST['id_ee'];
			$parametros['nombre']   = $_POST['nombre'];
			$parametros['correo']   = $_POST['correo'];
			$parametros['tlf']      = $_POST['tlf'];
			$parametros['otro_tlf'] = $_POST['otro_tlf'];
			
			echo json_encode($this->M_establecimientos->asociar_contacto($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método asociar_contacto
	/********************************/
	
	/*
		Descripción : Método que lista a los contactos asociados al establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 TELEFONO      => Varchar,
							 OTRO_TELEFONO => Varchar,
							 CORREO        => Varchar	
		                   )
	*/
	public function contactos_establecimiento()
	{
	    
		//Indices a evaluar
		$indices = array('id_ee');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_ee'] = $_POST['id_ee'];
		
			echo json_encode($this->M_establecimientos->contactos_establecimiento($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método contactos_establecimiento
	/*****************************************/
	
	/*
		Descripción : Método que elimina los contactos del establecimiento
		Parametros  : Nombre => id_contacto , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_contacto()
	{
	    
		//Indices a evaluar
		$indices = array('id_contacto');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_contacto'] = $_POST['id_contacto'];
			
			echo json_encode($this->M_establecimientos->eliminar_contacto($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método eliminar_contacto
	/*********************************/
	
	/*
		Descripción : Método que edita los datos del contacto
		Parametros  : Nombre => id_contacto , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo      , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf         , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf    , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_contacto()
	{
	    
		//Indices a evaluar
		$indices = array('id_contacto','nombre','correo','tlf','otro_tlf');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_contacto'] = $_POST['id_contacto'];
			$parametros['nombre']      = $_POST['nombre'];
			$parametros['correo']      = $_POST['correo'];
			$parametros['tlf']         = $_POST['tlf'];
			$parametros['otro_tlf']    = $_POST['otro_tlf'];
			
			echo json_encode($this->M_establecimientos->editar_contacto($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método editar_contacto
	/*******************************/
	
}//Fin de la clase principal
/**************************/

?>