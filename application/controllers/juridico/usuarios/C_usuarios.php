<?php
/*

	NOMBRE				      : C_usuarios.php
	DESCRIPCIÓN			      : Controlador del frontend
	AUTOR				      : David Molina
	FECHA DE CREACIÓN 	      : 15/10/2017

*/

/*
	Descripción: Clase principal.
*/
class c_usuarios extends CI_Controller
{

	/*
		Descripción: Contructor de la clase principal.
	*/
	function __construct()
	{

		parent::__construct();

		//Cargamos el modelo
		$this->load->model('juridico/usuarios/M_usuarios');

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
		              sobre los usuarios.
		Parametros  : Ninguno.
		Retorna     : Una vista.
	*/
	public function index()
	{

		//Cargamos la vista
		$this->load->view("juridico/usuarios/v_index");

	}//Fin del método index
	/*********************/

	/*
		Descripción : Método que muestra la información inicial necesaria
		              para la vista juridico/usuarios/v_index.
		Parametros  : Ninguno.
		Retorna     : Una vista.
	*/
	public function data_inicial()
	{

		//Indices a evaluar
		$indices = array('id_usuario','rango');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_usuario'] = $_POST['id_usuario'];
			$parametros['rango']      = $_POST['rango'];

			echo json_encode($this->M_usuarios->usuarios($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método data_incial
	/***************************/

	/*
		Descripción : Método que lista los tipos de usuario
		Parametros  : Ninguno.
		Retorna     : Array( ID          => Int,
		                     DESCRIPCION => Varchar,
							 ID_ESTATUS  => Int).
	*/
	public function tipo_usuario()
	{

		echo json_encode($this->M_usuarios->tipo_usuario());

	}//Fin del método tipo_usuario
	/****************************/

	/*
		Descripción : Método que registra a un nuevo usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si,
		              Nombre => correo     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => clave      , Tipo => Varchar, Obligatorio => Si,
					  Nombre => tipo_usu   , Tipo => Int, Obligatorio => Si,
					  Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function registrar_usuario(){

		/*echo "hola";
		exit();*/
		//Indices a evaluar
		$indices = array('id_usuario','correo','clave','tipo_usu','nombre','correo2');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_usuario'] = $_POST['id_usuario'];
			$parametros['correo']     = $_POST['correo'];
			$parametros['correo2']    = $_POST['correo2'];
			$parametros['clave']      = $_POST['clave'];
			$parametros['tipo_usu']   = $_POST['tipo_usu'];
			$parametros['nombre']     = $_POST['nombre'];

			echo json_encode($this->M_usuarios->registrar_usuario($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método registrar_usuario
	/*********************************/

	/*
		Descripción : Método que lista a los usuarios creados
		Parametros  : Ninguno.
		Retorna     : array(
		 					 ID           => Int,
							 AVATAR       => Varchar,
							 NOMBRE       => Varchar,
							 TIPO_USUARIO => Int,
							 ESTATUS      => Varchar
		                   ).
	*/
	public function usuarios_creados()
	{

		//Indices a evaluar
		$indices = array('id_usuario','rango');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_usuario'] = $_POST['id_usuario'];
			$parametros['rango']      = $_POST['rango'];

			echo json_encode($this->M_usuarios->usuarios($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método usuarios_creados
	/********************************/

	/*
		Descripción : Método que lista la información necesaria para editar un usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                     INFO => array(
											ID                => Int,
											AVATAR            => Varchar,
											NOMBRE            => Varchar,
											CORREO_PRINCIPAL  => Varchar,
											CORREO_SECUNDARIO => Varchar,
											ID_TIPO_USUARIO   => Int,
											ID_ESTATUS        => Int
									),
							 TIPOS => array(
											 ID          => Int,
											 DESCRIPCION => Varchar,
											 ID_ESTATUS  => Int
										   ),
							 ESTATUS => Array(
											   ID          => Int,
											   DESCRIPCION => Varchar
										     )
					  )
	*/
	public function info_editar_usuario(){

		//Indices a evaluar
		$indices = array('id_usuario');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_usuario'] = $_POST['id_usuario'];

			$data['INFO']    = $this->M_usuarios->info_usuario($parametros);
			$data['TIPOS']   = $this->M_usuarios->tipo_usuario();
			$data['ESTATUS'] = $this->M_usuarios->estatus_usuario();

			echo json_encode($data);

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método info_editar_usuario
	/***********************************/

	/*
		Descripción : Método que edita la información del usuario
		Parametros  : Nombre => id_usuario , Tipo => Int     , Obligatorio => Si,
		              Nombre => correo     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => clave      , Tipo => Varchar , Obligatorio => Si,
					  Nombre => tipo_usu   , Tipo => Int     , Obligatorio => Si,
					  Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => estatus    , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function editar_usuario(){

		//Indices a evaluar
		$indices = array('id_usuario','correo','clave','tipo_usu','nombre','correo2','estatus');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_usuario'] = $_POST['id_usuario'];
			$parametros['correo']     = $_POST['correo'];
			$parametros['correo2']    = $_POST['correo2'];
			$parametros['clave']      = $_POST['clave'];
			$parametros['tipo_usu']   = $_POST['tipo_usu'];
			$parametros['nombre']     = $_POST['nombre'];
			$parametros['estatus']    = $_POST['estatus'];

			echo json_encode($this->M_usuarios->editar_usuario($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método editar_usuario
	/******************************/

	/*
		Descripción : Método que lista los menús del sistema y los menús asociados al usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si
		RRetorna    : Array(
		                     MENUS => array(
    											 ID          => Int,
    											 ID_PADRE    => Int,
    											 DESCRIPCION => Varchar
										    ),
        							  MENUS_USUARIO => array(
                													 ID          => Int,
                													 ID_PADRE    => Int,
                													 DESCRIPCION => Varchar
              												   )
        						    )
	*/
	public function menu_usuario(){

		//Indices a evaluar
		$indices = array('id_usuario');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_usuario'] = $_POST['id_usuario'];

			$data['MENUS']         = $this->M_usuarios->menu_sistema();
			$data['MENUS_USUARIO'] = $this->M_usuarios->menu_usuario($parametros);

			echo json_encode($data);

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método menu_usuario
	/****************************/

	/*
		Descripción : Método que asocia o desasocia los menus al usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si,
		              Nombre => menus      , Tipo => Array, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function asociar_menu_usuario(){

		//Indices a evaluar
		$indices = array('id_usuario','menus');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_usuario'] = $_POST['id_usuario'];
			$parametros['menus']      = $_POST['menus'];

			echo json_encode($this->M_usuarios->asociar_menu_usuario($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método asociar_menu_usuario
	/************************************/

	/*
		Descripción : Método que busca a un usuario por nombre o correo
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function buscar_usuario(){

		//Indices a evaluar
		$indices = array('descripcion');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['descripcion'] = $_POST['descripcion'];

			echo json_encode($this->M_usuarios->buscar_usuario($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método buscar_usuario
	/******************************/

	/*
		Descripción : Método que elimina un usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function eliminar_usuario(){

		//Indices a evaluar
		$indices = array('id_usuario');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_usuario'] = $_POST['id_usuario'];

			echo json_encode($this->M_usuarios->eliminar_usuario($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método eliminar_usuario
	/********************************/

}//Fin de la clase principal
/**************************/

?>
