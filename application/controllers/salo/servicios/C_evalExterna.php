<?php
/*

	NOMBRE				      : C_evalExterna.php
	DESCRIPCIÓN			      : Controlador del servicio Evaluaciones Externas
	AUTOR				      : David Molina
	FECHA DE CREACIÓN 	      : 19/11/2017

*/

/*
	Descripción: Clase principal.
*/
class C_evalExterna extends CI_Controller
{

	/*
		Descripción: Contructor de la clase principal.
	*/
	function __construct()
	{

		parent::__construct();

		//Cargamos el modelo
		$this->load->model('salo/servicios/M_evalExterna');

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
		$this->load->view("salo/servicios/evalExterna/v_nuevo_despacho");

	}//Fin del método index
	/*********************/
	
}//Fin de la clase principal
/**************************/

?>