<?php
/*
	NOMBRE			  : C_wds_casos.php
	DESCRIPCIÓN		  : Controlador del servicio de data para el módulo de Usuarios
	FECHA DE CREACIÓN : 11/10/2017
*/

/*
	Descripción: Libreria para crear el Rest Server
*/
require(APPPATH.'libraries/REST_Controller.php');  

/*
	Descripción: Clase principal
*/
class c_wds_casoss extends REST_Controller
{  
    
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){
		
		parent::__construct();
		//$this->load->model('webservices/dataservices/juridico/usuarios/m_wds_casos');//Cargamos el modelo
		$this->load->model('webservices/dataservices/juridico/casos/m_wds_casos');//Cargamos el modelo
	
	}//Fin del contructor de la clase
	/*******************************/
	
	/*
		Descripción : Método verifica los parametros
		Parametros  : Nombre => $keys    , Tipo => Array, Obligatorio => Si
		              Nombre => $valores , Tipo => Array, Obligatorio => Si
		Retorna     : Array(
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
		Descripción : Método que lista las imprentas disponibles
		Parametros  : Ninguno
    Retorna     : array(
        						array(
        							ID     => Int,
        							NOMBRE => Varchar
        						)
        					)
	*/
	public function procedimientos_get(){

    //Obtenemos la respuesta
    $respuesta = $this->m_wds_casos->procedimientos();

    $this->response($respuesta);

  }//Fin del método imprentas
  /*************************/	
	
	
	
	
}//Fin de la clase principal
/**************************/
?>
