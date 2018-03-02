<?php
/*
	NOMBRE				: C_wds_prueba.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	FECHA DE CREACIÓN 	: 21/09/2017
*/

/*
	Descripción: Libreria para crear el Rest Server
*/
require(APPPATH.'libraries/REST_Controller.php');  

/*
	Descripción: Clase principal
*/
class c_wds_prueba extends REST_Controller
{  
    
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){
		
		parent::__construct();
		$this->load->model('webservices/dataservices/prueba/m_wds_prueba');//Cargamos el modelo
	
	}//Fin del contructor de la clase
	/*******************************/
	
	/*
		Descripción : 
		Parametros  :
		Retorna     :
	*/
	public function saludo_get(){
		
		//Obtenemos los parametros
		$tipo_nombre = $this->get('tipo_nombre');
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_prueba->saludo($tipo_nombre);	
		
		$this->response($respuesta);
		
	}//Fin del método saludo
	/**********************/
	
}//Fin de la clase principal
/**************************/
?>
