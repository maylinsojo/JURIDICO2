<?php
/*
	NOMBRE				: M_wrs_pedagogico.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: David Molina
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Clase principal
*/
class m_wrs_pedagogico extends CI_Model
{
	
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct()
	{
		
		parent::__construct();	
       
		//Cargamos el grupo de conexión
		$this->db = $this->load->database('salo',TRUE);
                
	}//Fin del contructor de la clase principal
	/*****************************************/

	/*
		Descripción : Método que lista el precio de la guia segun el modulo seleccionado
		Parametros  : Nombre => id_modulo , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
							ID          => Int,
							DESCRIPCION => Varchar
					  )
	*/
	public function precio_guia($parametros){
		
		//Query 
		$sql = "SELECT precio_por_guia
				FROM modulo_pedagogico 
				WHERE id = ".$parametros['id_modulo'];
					
		
		//Ejecutamos el query
		$consulta  = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado  = $consulta->row_array();
		
		return $resultado['precio_por_guia'];
		
	}//Fin del método precio_guia
	/***************************/
	
}//Fin de la clase principal
/**************************/
?>