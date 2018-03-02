<?php
/*

	NOMBRE				    : C_index.php
	DESCRIPCIÓN			  : Controlador del frontend
	AUTOR				      : David Molina
	FECHA DE CREACIÓN : 11/10/2017

*/

/*
	Descripción: Clase principal.
*/
class c_index extends CI_Controller
{

	/*
		Descripción: Contructor de la clase principal.
	*/
	function __construct()
	{

		parent::__construct();

		$this->output->cache(0);//Para remover el cache
		$this->load->model('juridico/M_index');//Cargamos el modelo

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
		Descripción : Método que muestra la vista para el logueo del usuario.
		Parametros  : Ninguno.
		Retorna     : Una vista.
	*/
	public function index()
	{

		//Cargamos la vista
		$this->load->view("juridico/v_index");

	}//Fin del método index
	/*********************/

	/*
		Descripción : Método autentica al usuario
		Parametros  : Nombre => correo , Tipo => Varchar, Obligatorio => Si,
		              Nombre => clave  , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar,
							ID_USUARIO        => Int,
							PSEUDONIMO        => Varchar,
							AVATAR_USUARIO    => Varchar
						   )
	*/
	public function login()
	{


		/*print_r($_POST);
		exit();*/
		//Indices a evaluar
		$indices = array('correo','clave');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['correo'] = $_POST['correo'];
			$parametros['clave']  = $_POST['clave'];

			echo json_encode($this->M_index->login($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método login
	/*********************/

	/*
		Descripción : Método que muestra la vista del panel principal del usuario.
		Parametros  : Ninguno.
		Retorna     : Una vista.
	*/
	public function panel_principal()
	{

		//Cargamos la vista
		$this->load->view("juridico/v_panel_principal");

	}//Fin del método panel_principal
	/*******************************/

	/*
		Descripción : Método obtiene los menus asociados al usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                array( ID          => Int,
							   DESCRIPCION => Varchar,
							   URL         => Varchar
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

			echo json_encode($this->M_index->menu_usuario($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método menu_usuario
	/****************************/

}//Fin de la clase principal
/**************************/

?>
