<?php
/*

	NOMBRE				    : C_pedagogico.php
	DESCRIPCIÓN			  : Controlador del servicio Pedagógico
	AUTOR				      : David Molina
	FECHA DE CREACIÓN : 19/11/2017

*/

/*
	Descripción: Clase principal.
*/
class C_pedagogico extends CI_Controller
{

	/*
		Descripción: Contructor de la clase principal.
	*/
	function __construct()
	{

		parent::__construct();

		//Cargamos el modelo
		$this->load->model('salo/servicios/M_pedagogico');

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
		Descripción : Método que muestra la vista para realizar un nuevo despacho.
		Parametros  : Ninguno.
		Retorna     : Una vista.
	*/
	public function formNuevoDesp()
	{

		//Cargamos la vista
		$this->load->view("salo/servicios/pedagogico/v_nuevo_despacho");

	}//Fin del método index
	/*********************/

	/*
		Descripción : Método que muestra la vista para realizar operaciones
		              sobre los servicios pedagógicos.
		Parametros  : Ninguno.
		Retorna     : Una vista.
	*/
	public function index()
	{

		//Cargamos la vista
		$this->load->view("salo/servicios/v_pedagogico");

	}//Fin del método index
	/*********************/

	/*
		Descripción : Método que muestra la información inicial necesaria
		              para la vista salo/servicios/v_pedagogico.
		Parametros  : Parametros  : Nombre => rango , Tipo => Int, Obligatorio => Si
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
	public function data_inicial()
	{

		//Indices a evaluar
		$indices = array('rango');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['rango'] = $_POST['rango'];

			echo json_encode($this->M_pedagogico->despachos($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método data_incial
	/***************************/
	
	/*
		Descripción : Método que busca a un establecimiento en el filtro
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

			echo json_encode($this->M_pedagogico->buscar_ee($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método buscar_ee
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
	public function buscar_establecimiento()
	{

		//Indices a evaluar
		$indices = array('nombre_ee');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['nombre_ee'] = $_POST['nombre_ee'];

			echo json_encode($this->M_pedagogico->buscar_establecimiento($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método buscar_establecimiento
	/**************************************/

	/*
		Descripción : Método que lista los cursos asociados al establecimiento
		Parametros  : Nombre => id_ee , Tipo => int, Obligatorio => Si
		Retorna     : Array(
		                     id          => Int,
		                     descripcion => Varchar
						      )
	*/
	public function cursosAsociados(){

		//Indices a evaluar
		$indices = array('id_ee');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_ee'] = $_POST['id_ee'];

			echo json_encode($this->M_pedagogico->cursosAsociados($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método cursosAsociados
	/*******************************/

	/*
		Descripción : Método que lista los establecimientos que coincidan con la busqueda
		Parametros  : Ninguno
		Retorna     : array(
		                 modulos => array(
            										  array(
              											ID          => Int,
              											DESCRIPCION => Varchar
            										  )
							                  ),
							       transportistas => array(
                												array(
                													ID                => Int,
                													NOMBRE            => Varchar,
                													LISTA_CONDUCTORES => Int
                												)
											                ),
                     imprentas => array(
                                    array(
                                      ID     => Int,
                                      NOMBRE => Varchar
                                    )
                                  ),
                     asignaturas => array(
                                      array(
                                        ID     => Int,
                                        NOMBRE => Varchar
                                      )
                                    ),
										 cursos => array(
										 						 array(

																 )
										           )
					  )
	*/
	public function data_nuevo_despacho()
	{

		//Obtenemos los módulos asociados
    	$data['imprentas']      = $this->M_pedagogico->imprentas();
		$data['modulos']        = $this->M_pedagogico->modulo_pedagogico();
		$data['transportistas'] = $this->M_pedagogico->transportistas();
    	$data['asignaturas']    = $this->M_pedagogico->asignaturas();
		$data['productoServ']   = $this->M_pedagogico->producto_servicio();

		echo json_encode($data);

	}//Fin del método data_nuevo_despacho
	/***********************************/

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
	public function conductores(){

		$indices = array('id_trasportista');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_trasportista'] = $_POST['id_trasportista'];

			echo json_encode($this->M_pedagogico->conductores($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método conductores
	/***************************/

	/*
		Descripción : Método que lista los datos que prelan del modulo
		Parametros  : Nombre => id_modulo , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
						asignaturas => Array(
										ID          => Int,
										DESCRIPCION => Varchar
									   )
					  )
	*/
	public function datos_prelatorios_modulo(){

		//Indices a evaluar
		$indices = array('id_modulo');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_modulo'] = $_POST['id_modulo'];

			$data['asignaturas'] = $this->M_pedagogico->asignaturas();
			$data['precio_guia'] = $this->M_pedagogico->precio_guia($parametros);

			echo json_encode($data);

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del metodo datos_prelatorios_modulo
	/****************************************/

	/*
		Descripción : Método que crea un nuevo despacho
		Parametros  : Nombre => arrayItems      , Tipo => Array   , Obligatorio => Si,
		              Nombre => establecimiento , Tipo => Int     , Obligatorio => Si,
								  Nombre => transportista   , Tipo => Int     , Obligatorio => Si,
								  Nombre => conductor       , Tipo => Int     , Obligatorio => Si,
								  Nombre => fecha           , Tipo => Varchar , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							          MENSAJE_RESPUESTA => Varchar
					        )
	*/
	public function nuevo_despacho(){

		//Indices a evaluar
		$indices = array('arrayItems','establecimiento','transportista','conductor','fecha','coste_imprenta','productoServ','imprenta');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['arrayItems']      = $_POST['arrayItems'];
			$parametros['establecimiento'] = $_POST['establecimiento'];
			$parametros['transportista']   = $_POST['transportista'];
			$parametros['conductor']       = $_POST['conductor'];
			$parametros['fecha']           = $_POST['fecha'];
			$parametros['coste_imprenta']  = $_POST['coste_imprenta'];
			$parametros['productoServ']    = $_POST['productoServ'];
			$parametros['imprenta']        = $_POST['imprenta'];

			echo json_encode($this->M_pedagogico->nuevo_despacho($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método nuevo_despacho
	/******************************/

	/*
		Descripción : Método que lista los datos del despacho
		Parametros  : Ninguno
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
	public function data_despacho()
	{

		//Indices a evaluar
		$indices = array('id_desp');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Parametros
			$parametros['id_desp'] = $_POST['id_desp'];

			//Obtenemos los módulos asociados
			$data['datos']          = $this->M_pedagogico->info_despacho($parametros);
			$data['modulos']        = $this->M_pedagogico->modulo_pedagogico();
			$data['transportistas'] = $this->M_pedagogico->transportistas();
			$data['estatus']        = $this->M_pedagogico->estatus_despacho();

			$parametros['id_trasportista'] = $data['datos']['id_transportista'];
			$data['conductores']           = $this->M_pedagogico->conductores($parametros);

			echo json_encode($data);

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método data_despacho
	/*****************************/

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
	public function editar_despacho(){

		//Indices a evaluar
		$indices = array('arrayItems','establecimiento','transportista','conductor','fecha','id_desp','estatus');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_desp']         = $_POST['id_desp'];
			$parametros['arrayItems']      = $_POST['arrayItems'];
			$parametros['establecimiento'] = $_POST['establecimiento'];
			$parametros['transportista']   = $_POST['transportista'];
			$parametros['conductor']       = $_POST['conductor'];
			$parametros['fecha']           = $_POST['fecha'];
			$parametros['estatus']         = $_POST['estatus'];

			echo json_encode($this->M_pedagogico->editar_despacho($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método editar_despacho
	/*******************************/

	/*
		Descripción : Método que muestra los despachos creados
		Parametros  : Parametros  : Nombre => rango , Tipo => Int, Obligatorio => Si
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
	public function despachos_creados()
	{

		//Indices a evaluar
		$indices = array('rango');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['rango'] = $_POST['rango'];

			echo json_encode($this->M_pedagogico->despachos($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método despachos_creados
	/*********************************/



}//Fin de la clase principal
/**************************/

?>
