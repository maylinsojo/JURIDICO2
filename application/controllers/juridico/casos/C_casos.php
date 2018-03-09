<?php
/*

	NOMBRE				      : C_casos.php
	DESCRIPCIÓN			      : Controlador del frontend
	AUTOR				      : Maylin Sojo
	FECHA DE CREACIÓN 	      : 15/02/2018

*/

/*
	Descripción: Clase principal. 
*/
class C_casos extends CI_Controller
{
    
	/*
		Descripción: Contructor de la clase principal. 
	*/
	function __construct()
	{
		
		parent::__construct();
		
		//Cargamos el modelo
		$this->load->model('juridico/casos/M_casos');

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
	public function cargar_form_casos()
	{

		//Cargamos la vista
		$this->load->view("juridico/casos/v_casos");
		
	
	}//Fin del método index
	/*********************/





	/*
		Descripción : Método que muestra la vista para realizar operaciones
		              sobre los usuarios.
		Parametros  : Ninguno.
		Retorna     : Una vista. 
	*/
	public function cargar_data_casos()
	{

		//Cargamos la vista
		//$this->load->view("juridico/casos/v_casos");
    	$data['procedimientos']   = $this->M_casos->procedimientos();
		$data['generos']          = $this->M_casos->generos();


		echo json_encode($data);
		
		
	
	}//Fin del método index
	/*********************/
	
	
	
}//Fin de la clase principal
/**************************/

?>