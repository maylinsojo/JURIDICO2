<?php
/*
	NOMBRE				: M_wds_prueba.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: David Molina
	FECHA DE CREACIÓN 	: 21/09/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_prueba extends CI_Model
{
	
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct()
	{
		
		parent::__construct();	
       
		//Cargamos el grupo de conexión
		//$this->db = $this->load->database('molly',TRUE);
                
	}//Fin del contructor de la clase principal
	/*****************************************/
	
	/*
		Descripción : 
		Parametros  :
		Retorna     :
	*/
	public function saludo($tipo_nombre){
		
		//Evaluamos el $tipo_nombre
		if($tipo_nombre == 1){
			
			$nombre = 'JESSI';
			
		}else{
			
			$nombre = 'MUNDO';
			
		}//Fin del if 
			
		return $nombre;
		
	}//Fin del método comentar_publicacion
	/************************************/
	
}//Fin de la clase principal
/**************************/
?>