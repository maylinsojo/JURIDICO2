<?php
/*
	NOMBRE				: m_wds_casos.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: David Molina
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_casos extends CI_Model
{
	
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct()
	{
		
		parent::__construct();	
       
		//Cargamos el grupo de conexión
		$this->db = $this->load->database('juridico',TRUE);
                
	}//Fin del contructor de la clase principal
	/*****************************************/
	

	/*
		Descripción : Método que lista los procedimientos activos
		Parametros  : Ninguno
		Retorna     : array(
        						array(
        							ID     => Int,
        							NOMBRE => Varchar
        						)
        					)
	*/
	public function procedimientos(){

		//Query
		$sql = "SELECT id,
								   nombre,
									 precio
							FROM tipo_procedimiento
							WHERE id_estatus = 1
							ORDER BY nombre ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método imprentas
	/*************************/



}//Fin de la clase principal
/**************************/
?>