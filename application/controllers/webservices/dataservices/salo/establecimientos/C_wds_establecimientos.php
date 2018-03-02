<?php
/*
	NOMBRE				: C_wds_establecimientos.php
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
class c_wds_establecimientos extends REST_Controller
{

	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){

		parent::__construct();
		$this->load->model('webservices/dataservices/salo/establecimientos/m_wds_establecimientos');//Cargamos el modelo

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
		Descripción : Método que lista las regiones disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
						id,
						nombre,
						numero
		              )
	*/
	public function regiones_get(){

		//Obtenemos la respuesta
		$respuesta = $this->m_wds_establecimientos->regiones();

		$this->response($respuesta);

	}//Fin del método regiones
	/************************/

	/*
		Descripción : Método que lista las comunas asociadas a las regiones
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		              	id,
						descripcion
		              )
	*/
	public function comunas_region_get(){

		//Indices a evaluar
		$indices = array('id_region');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_region'] = $this->get('id_region');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->comunas_region($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método comunas_region
	/******************************/

	/*
		Descripción : Método obtiene las establecimientos creados
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
	public function establecimientos_get(){

		//Indices a evaluar
		$indices = array('id_ee','rango');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_ee'] = $this->get('id_ee');
			$parametros['rango'] = $this->get('rango');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->establecimientos($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método establecimientos creados
	/****************************************/

	/*
		Descripción : Método que registra un nuevo establecimiento
		Parametros  : Nombre => region , Tipo => Int, Obligatorio => Si,
      					  Nombre => nombre , Tipo => Varchar, Obligatorio => Si,
      					  Nombre => comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							          MENSAJE_RESPUESTA => Varchar
					        )
	*/
	public function registrar_establecimiento_post(){

		//Indices a evaluar
		$indices = array('nombre','region','comuna');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['nombre'] = $this->post('nombre');
			$parametros['region'] = $this->post('region');
			$parametros['comuna'] = $this->post('comuna');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->registrar_establecimiento($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método registrar_establecimiento
	/*****************************************/

	/*
		Descripción : Método que lista la información del establecimiento
		Parametros  : Nombre => id_establecimiento , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							AVATAR            => Varchar,
							NOMBRE            => Varchar,
							CORREO_PRINCIPAL  => Varchar,
							CORREO_SECUNDARIO => Varchar,
							ID_TIPO_establecimiento   => Int,
							ID_ESTATUS        => Int
					  )
	*/
	public function info_establecimiento_get(){

		//Indices a evaluar
		$indices = array('id_establecimiento');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_establecimiento'] = $this->get('id_establecimiento');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->info_establecimiento($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método info_establecimiento
	/************************************/

	/*
		Descripción : Método que lista los estatus del establecimiento
		Parametros  : Ninguno
		Retorna     : array(
		                    ID          => Int,
							DESCRIPCION => Varchar
					  )
	*/
	public function estatus_establecimiento_get(){

		//Obtenemos la respuesta
		$respuesta = $this->m_wds_establecimientos->estatus_establecimiento();

		$this->response($respuesta);

	}//Fin del método estatus_establecimiento
	/***************************************/

	/*
		Descripción : Método que elimina un establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function eliminar_establecimiento_post(){

		//Indices a evaluar
		$indices = array('id_ee');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_ee'] = $this->post('id_ee');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->eliminar_establecimiento($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método eliminar_establecimiento
	/****************************************/

	/*
		Descripción : Método que edita la información del establecimiento
		Parametros  : Nombre => id_ee   , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre  , Tipo => Varchar , Obligatorio => Si,
					  Nombre => comuna  , Tipo => Int     , Obligatorio => Si,
					  Nombre => estatus , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function editar_establecimiento_post(){

		//Indices a evaluar
		$indices = array('id_ee','nombre','comuna','estatus');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_ee']   = $this->post('id_ee');
			$parametros['nombre']  = $this->post('nombre');
			$parametros['comuna']  = $this->post('comuna');
			$parametros['estatus'] = $this->post('estatus');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->editar_establecimiento($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método editar_establecimiento
	/**************************************/

	/*
		Descripción : Método que busca a un establecimiento
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    ID     => Int,
							NOMBRE => Varchar
					  )
	*/
	public function buscar_ee_get(){

		//Indices a evaluar
		$indices = array('descripcion');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['descripcion'] = $this->get('descripcion');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->buscar_ee($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método buscar_ee
	/*************************/

	/*
		Descripción : Método que lista los niveles academicos disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
		                     Array(
							       ID          => Int,
							       DESCRIPCION => Varchar
							 )
						   )
	*/
	public function nivel_academico_get(){

		//Obtenemos la respuesta
		$respuesta = $this->m_wds_establecimientos->nivel_academico();

		$this->response($respuesta);

	}//Fin del método nivel_academico
	/*******************************/

	/*
		Descripción : Método que lista los cursos aociados del establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int , Obligatorio => Si
		Retorna     :  Array(
		                     Array(
							       ID          => Int,
							       ID_CURSO    => Int,
								   DESC_CURSO  => Varchar,
								   ID_NIVEL    => Int,
								   DESC_NIVEL  => Varchar,
								   NUM_ALUMNOS => Int
							 )
						   )
	*/
	public function cursos_establecimiento_get(){

		//Indices a evaluar
		$indices = array('id_ee');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_ee'] = $this->get('id_ee');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->cursos_establecimiento($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

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
	public function eliminar_curso_post(){

		//Indices a evaluar
		$indices = array('id');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id'] = $this->post('id');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->eliminar_curso($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

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
	public function editar_curso_post(){

		//Indices a evaluar
		$indices = array('id','numEst');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id']     = $this->post('id');
			$parametros['numEst'] = $this->post('numEst');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->editar_curso($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método editar_curso
	/****************************/

	/*
		Descripción : Método que lista los cursos asociados a los niveles academicos
		Parametros  : Nombre => id_nivel, Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    ID          => Int,
							DESCRIPCION => Varchar,
		                   )
	*/
	public function nivel_curso_get(){

		//Indices a evaluar
		$indices = array('id_nivel','id_ee');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_nivel'] = $this->get('id_nivel');
			$parametros['id_ee']    = $this->get('id_ee');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->nivel_curso($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método nivel_curso
	/***************************/

	/*
		Descripción : Método que lista los cursos disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
		                     Array(
							       ID          => Int,
							       DESCRIPCION => Varchar,
								   ID_NIVEL    => Int
							 )
						   )
	*/
	public function cursos_get(){

		//Obtenemos la respuesta
		$respuesta = $this->m_wds_establecimientos->cursos();

		$this->response($respuesta);

	}//Fin del método cursos
	/**********************/

	/*
		Descripción : Método que asocia el curso a un establecimiento
		Parametros  : Nombre => id_ee  , Tipo => Int, Obligatorio => Si
					  Nombre => curso  , Tipo => Int, Obligatorio => Si
					  Nombre => numEst , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function agregar_curso_post(){

		//Indices a evaluar
		$indices = array('id_ee','curso','numEst');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_ee']  = $this->post('id_ee');
			$parametros['curso']  = $this->post('curso');
			$parametros['numEst'] = $this->post('numEst');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->agregar_curso($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método agregar_curso
	/*****************************/

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
	public function contactos_establecimiento_get(){

		//Indices a evaluar
		$indices = array('id_ee');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_ee'] = $this->get('id_ee');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->contactos_establecimiento($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método contactos_establecimiento
	/*****************************************/

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
	public function asociar_contacto_post(){

		//Indices a evaluar
		$indices = array('id_ee','nombre','correo','tlf','otro_tlf');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_ee']    = $this->post('id_ee');
			$parametros['nombre']   = $this->post('nombre');
			$parametros['correo']   = $this->post('correo');
			$parametros['tlf']      = $this->post('tlf');
			$parametros['otro_tlf'] = $this->post('otro_tlf');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->asociar_contacto($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método asociar_contacto
	/********************************/

	/*
		Descripción : Método que elimina los contactos del establecimiento
		Parametros  : Nombre => id_contacto , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function eliminar_contacto_post(){

		//Indices a evaluar
		$indices = array('id_contacto');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_contacto'] = $this->post('id_contacto');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->eliminar_contacto($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

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
	public function editar_contacto_post(){

		//Indices a evaluar
		$indices = array('id_contacto','nombre','correo','tlf','otro_tlf');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_contacto'] = $this->post('id_contacto');
			$parametros['nombre']      = $this->post('nombre');
			$parametros['correo']      = $this->post('correo');
			$parametros['tlf']         = $this->post('tlf');
			$parametros['otro_tlf']    = $this->post('otro_tlf');

			//Obtenemos la respuesta
			$respuesta = $this->m_wds_establecimientos->editar_contacto($parametros);

		}else{

			$respuesta = $validador;

		}//Fin del if

		$this->response($respuesta);

	}//Fin del método editar_contacto
	/*******************************/

}//Fin de la clase principal
/**************************/
?>
