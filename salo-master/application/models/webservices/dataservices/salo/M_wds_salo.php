<?php
/*
	NOMBRE				: M_wds_salo.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: David Molina
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_salo extends CI_Model
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
		Descripción : Método obtiene los menus asociados al usuario
		Parametros  : Nombre => id_usuario , Tipo => Int
		Retorna     : array(
		                array( ID          => Int,
							   DESCRIPCION => Varchar,
							   URL         => Varchar
						)
					  ) 
	*/
	public function menu_usuario($datos){
		
		//Query
		$sql = "SELECT * FROM(

						SELECT m.id,
							   m.descripcion,
							   m.url,
							   m.id_padre,
							   m.orden,
							   (SELECT COUNT(1) 
								FROM menu m2,
									 menu_usuario mu2
								WHERE m2.id = mu2.id_menu
								AND m2.id_padre = m.id
								AND mu2.id_usuario = ".$datos['id_usuario'].") numHijos
						FROM menu m,
							 menu_usuario mu
						WHERE m.id = mu.id_menu
						AND m.id_padre = 0
						AND mu.id_usuario = ".$datos['id_usuario']."
						
						UNION
						
						SELECT m.id,
							   m.descripcion,
							   m.url,
							   m.id_padre,
							   m.orden,
							   (SELECT COUNT(1) 
								FROM menu m2,
									 menu_usuario mu2
								WHERE m2.id = mu2.id_menu
								AND m2.id_padre = m.id
								AND mu2.id_usuario = ".$datos['id_usuario'].") numHijos
						FROM menu m
						WHERE m.id IN(
									SELECT id_padre
									FROM menu m3,
										 menu_usuario mu3
									WHERE m3.id = mu3.id_menu
									AND mu3.id_usuario = ".$datos['id_usuario']."
								   )
							
						) t ORDER BY orden ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		//Recorremos los menus
		foreach($resultado as $menu){
			
			$menus[] = array(
					   		'id'          => $menu['id'],
							'descripcion' => $menu['descripcion'],
							'url'         => $menu['url'],
							'id_padre'    => $menu['id_padre'],
							'numHijos'    => $menu['numHijos'],
							'submenus'    => $this->menu_hijos($menu['id'],$datos['id_usuario'])
			           );
			
		}//Fin del foreach
		
		return $menus;
		
	}//Fin del método usuarios
	/************************/
	
	/*
		Descripción : Método obtiene los menus hijos asociados al padre
		Parametros  : Nombre => id_menu_padre , Tipo => Int
		              Nombre => id_usuario    , Tipo => Int
		Retorna     : array(
		                array( ID          => Int,
							   DESCRIPCION => Varchar,
							   URL         => Varchar
						)
					  ) 
	*/
	private function menu_hijos($id_menu_padre,$id_usuario){
		
		//Query
		$sql = "SELECT m.id,
		               m.descripcion,
					   m.url,
					   m.id_padre,
					   (SELECT COUNT(1) 
                        FROM menu m2,
                             menu_usuario mu2
                        WHERE m2.id = mu2.id_menu
                        AND m2.id_padre = m.id
                        AND mu2.id_usuario = ".$id_usuario.") numHijos
		        FROM menu m,
				     menu_usuario mu
				WHERE m.id = mu.id_menu
				AND mu.id_usuario = ".$id_usuario."
				AND m.id_padre = ".$id_menu_padre."
	            ORDER BY orden ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		$menus = array();
		
		//Recorremos los menus
		foreach($resultado as $menu){
			
			$menus[] = array(
					   		'id'          => $menu['id'],
							'descripcion' => $menu['descripcion'],
							'url'         => $menu['url'],
							'id_padre'    => $menu['id_padre'],
							'numHijos'    => $menu['numHijos'],
							'submenus'    => $this->menu_hijos($menu['id'],$id_usuario)
			           );
			
		}//Fin del foreach
		
		return $menus;
		
	}//Fin del método menu_hijos
	/**************************/
	
}//Fin de la clase principal
/**************************/
?>