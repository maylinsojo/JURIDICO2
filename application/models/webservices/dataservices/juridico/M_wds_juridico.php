<?php
/*
	NOMBRE				: M_wds_juridico.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			:
	AUTOR				: David Molina
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_juridico extends CI_Model
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
		$sql = "SELECT m.id,
								   m.descripcion,
								   m.url,
								   m.id_padre,
								   m.orden
							FROM menu m,
							     menu_usuario mu
							WHERE m.id = mu.id_menu
							AND mu.id_usuario = ".$datos['id_usuario']."
							ORDER BY id_padre ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		//Recorremos los menus
		foreach($resultado as $menu){

			$menus[] = $this->ruta_menu($menu);

		}//Fin del foreach

		$menus = $this->armarMenu($menus,array());

		return $menus;

	}//Fin del método usuarios
	/************************/

	/*
		Descripción : Método filtra el array de los menus y lo va reorganizando
		Parametros  : array(
		 								array(
											id          => int ,
											descripcion => varchar,
											url         => varchar,
											id_padre    => int,
											orden       => int,
											submenus    => array(...))
										)
		              )
		Retorna     : array(
										array(
											id          => int ,
											descripcion => varchar,
											url         => varchar,
											submenus    => array(...))
										)
					        )
	*/
	private function armarMenu($items,$menuArray){

		//Recorremos los menus
		foreach($items as $item){

			if(!array_key_exists($item['id'],$menuArray)){

				$menuArray[$item['id']] = array(
																			'id'          => $item['id'],
																			'descripcion' => $item['descripcion'],
																			'url'         => $item['url']
																	 );

				if(count($item['submenus']) > 0){

					$menuArray[$item['id']]['submenus'] = $this->armarMenu(array($item['submenus']),array());

				}else{

					$menuArray[$item['id']]['submenus'] = array();

				}

			}else{

				$menuArray[$item['id']]['submenus'] = $this->armarMenu(array($item['submenus']),$menuArray[$item['id']]['submenus']);

			}//Fin del if

		}//Fin del foreach

		return $menuArray;

	}//Fin del método armarMenu
	/*************************/

	/*
		Descripción : Método obtiene los menus padres
		Parametros  : array(
		              	id          => int,
										descripcion => varchar,
										url         => varchar,
										id_padre    => int,
										orden       => int
		              )
		Retorna     : array(
										array(
											id          => int,
											descripcion => varchar,
											url         => varchar,
											id_padre    => int,
											orden       => int,
											submenus    => array(
																			 id          => int,
																		   descripcion => varchar,
																		   url         => varchar,
																		   id_padre    => int,
																		   orden       => int
																			 submenus    => array()
											               )
										)
					        )
	*/
	private function ruta_menu($menu){

		//Evaluamos si es un menú principal
		if(intval($menu['id_padre']) == 0){

			return array(
						   		 'id'          => $menu['id'],
									 'id_padre'    => $menu['id_padre'],
								   'descripcion' => $menu['descripcion'],
								   'url'         => $menu['url'],
									 'orden'       => $menu['orden'],
								   'submenus'    => array()
								  );

		}else{

			//Query
			$sql = "SELECT m.id,
									   m.descripcion,
									   m.url,
									   m.id_padre,
									   m.orden
							FROM menu m
							WHERE m.id = ".$menu['id_padre'];

			//Ejecutamos el query
			$consulta = $this->db->query($sql);

			//Obtenemos el array de datos
			$resultado = $consulta->row_array();

			//Evaluamos si es un menú principal
			if(intval($resultado['id_padre']) == 0){

				$menu['submenus'] = array();

				return array(
							   		 'id'          => $resultado['id'],
										 'id_padre'    => $resultado['id_padre'],
									   'descripcion' => $resultado['descripcion'],
									   'url'         => $resultado['url'],
										 'orden'       => $resultado['orden'],
									   'submenus'    => $menu
									  );

			}else{

				$menu['submenus'] = array();

				$menu_padre =  array(
									   		 'id'          => $resultado['id'],
												 'id_padre'    => $resultado['id_padre'],
											   'descripcion' => $resultado['descripcion'],
											   'url'         => $resultado['url'],
												 'orden'       => $resultado['orden'],
											   'submenus'    => $menu
											 );

				$menu_abuelo = $this->ruta_menu($menu_padre);
				$menu_abuelo['submenus'] = $menu_padre;

				return $menu_abuelo;

			}//Fin del if

		}//Fin del if

	}//Fin de la función menu_padres
	/******************************/

	function filtrar_menu($arrayMenus){

		//Recorremos los menus
		foreach($arrayMenus as $item){

			//Evaluamos a ver si ya existe el item dentro del array
			if(!isset($menus[$item['id']])){

				//Evaluamos si posee submenus
				if(count($item['submenus']) > 0){

					$nuevoItem = array(
												'id'          => $item['id'],
												'id_padre'    => $item['id_padre'],
												'descripcion' => $item['descripcion'],
												'url'         => $item['url'],
												'orden'       => $item['orden'],
												'submenus'    => $this->filtrar_menu(array($item['submenus']))
					             );

					$menus[$item['id']] = $nuevoItem;

				}else{

					$menus[$item['id']] = $item;

				}//Fin del if

			}else{

				$nuevoItem = array(
											'id'          => $item['id'],
											'id_padre'    => $item['id_padre'],
											'descripcion' => $item['descripcion'],
											'url'         => $item['url'],
											'orden'       => $item['orden'],
											'submenus'    => $this->filtrar_menu(array($item['submenus']))
										 );

				//array_push($menus[$item['id']],$nuevoItem);
				//$menus[$item['id']] = $nuevoItem;

			}


		}//Fin del foreach

		return $menus;

	}//Fin de la función filtrar_menu
	/*******************************/

}//Fin de la clase principal
/**************************/
?>
