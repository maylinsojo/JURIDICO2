<?php
/*

	NOMBRE				      : C_prueba.php
	DESCRIPCIÓN			      : Controlador del frontend
	AUTOR				      : David Molina
	FECHA DE CREACIÓN 	      : 21/09/2017

*/

/*
	Descripción: Clase principal. 
*/
class c_prueba extends CI_Controller
{
    
	/*
		Descripción: Contructor de la clase principal. 
	*/
	function __construct()
	{
		
		parent::__construct();
		
		//Cargamos el modelo
		$this->load->model('prueba/M_prueba');

	}//Fin del contructor de la clase
	/*******************************/
	
	/*
		Descripción: Método que muestra el indice del frontend.
		Parametros : Ninguno.
		Retorna    : Una vista. 
	*/
	public function index()
	{
	    
		$data['nombre'] = $this->M_prueba->saludo(1);
		   		
		//Cargamos la vista
		$this->load->view("prueba/v_index",$data);
	
	}//Fin del método index
	/*********************/
	
}//Fin de la clase principal
/**************************/

?>