<?php
/*
	NOMBRE				: M_wds_pedagogico.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: David Molina
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_pedagogico extends CI_Model
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
		Descripción : Método lista los despachos creados
		Parametros  : Nombre => rango , Tipo => Int, Obligatorio => Si
		Retorna     : array(
						  despachos => array(
											array( ID_DESPACHO        => Int,
												   ID_ESTABLECIMIENTO => Int,
												   ESTABLECIMIENTO    => Varchar,
												   ID_REGION          => Int,
												   REGION             => Varchar,
												   COMUNA             => Varchar,
												   FECHA_DESPACHO     => Varchar,
												   ID_ESTATU          => Int,
												   ESTATUS            => Varchar
											)
										  ),
						   numDesp => Int
					 )
	*/
	public function despachos($parametros){

		//Query
		$sql = "SELECT dp.id id_despacho,
					   dp.id_establecimiento,
					   e.nombre establecimiento,
					   r.id id_region,
					   r.nombre region,
					   rc.nombre comuna,
					   dp.fecha_despacho,
					   dp.id_estatus,
					   es.descripcion estatus
				FROM despacho_pedagogico dp,
					 establecimiento e,
					 region_comuna rc,
					 region r,
					 estatus es
				WHERE dp.id_establecimiento = e.id
				AND e.id_comuna = rc.id
				AND rc.id_region = r.id
				AND dp.id_estatus = es.valor
				AND es.tabla = 'despacho_pedagogico'
				ORDER BY dp.fecha_despacho DESC
				LIMIT ".$parametros['rango'].",5";
		
		$sql2 = "SELECT COUNT(*) numDesp FROM despacho_pedagogico";	
		
		//Ejecutamos el query
		$consulta  = $this->db->query($sql);
		$consulta2 = $this->db->query($sql2);
		
		//Obtenemos el array de datos
		$resultado  = $consulta->result_array();
		$resultado2 = $consulta2->row_array();
        $resultado2 = $resultado2['numDesp'];
		
		$data['despachos'] = $resultado;
		$data['numDesp']   = $resultado2;
		
		return $data;
		
	}//Fin del método despachos
	/*************************/
	
	/*
		Descripción : Método muestra el seudonimo del usuario.
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si
		Retorna     : Varchar. 
	*/
	public function seudonimo_usuario($id_usuario){
		
		//Query
		$sql = 'SELECT u.correo_principal
				FROM usuario u
				WHERE u.id = '.$id_usuario;
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		$seudonimo = explode('@',$resultado['correo_principal']);
		$seudonimo = array_shift($seudonimo);
		
		return $seudonimo;
		
	}//Fin del método seudonimo_usuario
	/*********************************/
	
	/*
		Descripción : Método que lista los establecimientos que coincidan con la busqueda
		Parametros  : Nombre => nombre_ee , Tipo => Varchar, Obligatorio => Si
		Retorna     : Array(
		                     ID              => Int, 
		                     ESTABLECIMIENTO => Varchar, 
							 COMUNA          => Varchar, 
							 REGION          => Varchar
						   ) 
	*/
	public function buscar_establecimiento($parametros){
		
		//Query
		$sql = "SELECT e.id,
					   e.nombre establecimiento,
					   c.nombre comuna,
					   r.nombre region
				FROM establecimiento e,
					 region_comuna c,
					 region r
				WHERE e.id_comuna = c.id 
				AND c.id_region = r.id
				AND LOWER(e.nombre) LIKE '%".strtoupper($parametros['nombre_ee'])."%'
				ORDER BY e.nombre ASC
				LIMIT 5";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método buscar_establecimiento
	/**************************************/
	
	/*
		Descripción : Método que lista los módulos asociados al servicio pedagógico
		Parametros  : Ninguno
		Retorna     : Array(
						Array(
							ID          => Int,
							DESCRIPCION => Varchar
						)
					  )
	*/
	public function modulo_pedagogico(){
		
		//Query
		$sql = "SELECT id,
					   descripcion
				FROM modulo_pedagogico 
				WHERE id_estatus = 1
				ORDER BY descripcion ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método modulo_pedagogico
	/*********************************/
	
	/*
		Descripción : Método que lista los transportistas creados
		Parametros  : Ninguno
		Retorna     : Array(
						Array(
							ID                => Int,
							NOMBRE            => Varchar,
							LISTA_CONDUCTORES => Int
						)
					  )
	*/
	public function transportistas(){
		
		//Query
		$sql = "SELECT id,
		               nombre,
					   lista_conductores
		        FROM transportista 
				WHERE id_estatus = 1
				ORDER BY nombre ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método transportistas
	/******************************/
	
	/*
		Descripción : Método que lista los conductores asociados a la transportista
		Parametros  : Nombre => id_transportista , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
						 Array(
								ID     => Int,
								NOMBRE => Varchar
							  )
					  ) 
	*/
	public function conductores($parametros){
		
		//Query
		$sql = "SELECT id,
		               nombre
		        FROM conductor_transportista 
				WHERE id_transportista = ".$parametros['id_trasportista']."
				ORDER BY nombre ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
	    
		//Arreglo con los conductores
		$conductores[] = array('id' => 0, 'nombre' => 'No Aplica');
		
		//Recorremos los resutados
		foreach($resultado as $conductor){
			
			$conductores[] = array('id' => $conductor['id'], 'nombre' => $conductor['nombre']);
			
		}//Fin del foreach
		
		return $conductores;
		
	}//Fin del método conductores
	/***************************/
	
	/*
		Descripción : Método que lista las asignaturas disponibles
		Parametros  : Ninguno
		Retorna     : Array(
							ID          => Int,
							DESCRIPCION => Varchar
					  )
	*/
	public function asignaturas(){
		
		//Query
		$sql = "SELECT id,
                       descripcion		
		        FROM asignatura
				WHERE id_estatus = 1
				ORDER BY descripcion ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método asignaturas
	/***************************/
	
	/*
		Descripción : Método que crea un nuevo despacho
		Parametros  : Nombre => arrayItems      , Tipo => Array   , Obligatorio => Si,
		              Nombre => establecimiento , Tipo => Int     , Obligatorio => Si,
					  Nombre => transportista   , Tipo => Int     , Obligatorio => Si,
					  Nombre => conductor       , Tipo => Int     , Obligatorio => Si,
					  Nombre => fecha           , Tipo => Varchar , Obligatorio => Si,
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function nuevo_despacho($parametros){
		
		//Query
	    $sql = "SELECT COUNT(1) despachado
		        FROM despacho_pedagogico
				WHERE id_establecimiento = ".$parametros['establecimiento']."
				AND fecha_despacho = '".$parametros['fecha']."'";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		//Evaluamos si ya hay un usuario con ese mismo correo
		if(intval($resultado['despachado']) == 0){
			
			//Iniciamos una transaccion
		    $this->db->trans_begin();
			
			//Parametros para crear el despacho
			$datos = array(
							'id_establecimiento' => $parametros['establecimiento'],
							'id_transportista'   => $parametros['transportista'],
							'id_conductor'       => $parametros['conductor'],
							'fecha_despacho'     => $parametros['fecha'],
							'fecha_registro'     => date('d/m/Y'),
							'id_estatus'         => 1
						  );
			
			//Evaluamos si se creo el despacho
			if($this->db->insert('despacho_pedagogico', $datos)){
				
				//Obtenemos el id generado
				$id_despacho = $this->db->insert_id();
				
				//Parametros para crear el detalle del despacho
				$datos = array();
				
				//Recorremos los items del despacho
				foreach($parametros['arrayItems'] as $item){
					
					$valores = json_decode($item);
					
					$datos[] = array(
								  'id_despacho_peda' => $id_despacho,
								  'id_modulo_peda'   => $valores->modulo,
								  'cantidad'         => $valores->cantidad,
								  'precio'           => $valores->precio,
								  'id_asignatura'    => $valores->asignatura
					           );  
					
				}//Fin del foreach
				
				//Evaluamos si se creo el despacho
			    if($this->db->insert_batch('detalle_despacho_pedagogico', $datos)){
					
					$this->db->trans_commit();
				
					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1, 
									   'MENSAJE_RESPUESTA' => 'Despacho creado!'
									  );
					
				}else{
					
					$this->db->trans_rollback();
				
					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 0, 
									   'MENSAJE_RESPUESTA' => 'Error al crear el despacho!'
									  );
					
				}//Fin del if
				
			}else{
				
				$this->db->trans_rollback();
				
				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0, 
								   'MENSAJE_RESPUESTA' => 'Error al crear el despacho!'
								  );
				
			}//Fin del if*/
			
		}else{
			
			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2, 
							   'MENSAJE_RESPUESTA' => 'Ya el establecimiento posee un despacho programado para esa fecha!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método registrar_usuario
	/*********************************/
	
	/*
		Descripción : Método lista los datos del despacho
		Parametros  : Nombre => id_desp , Tipo => Int, Obligatorio => Si
		Retorna     : Array( 
		               ID_DESPACHO        => Int,
					   ID_ESTABLECIMIENTO => Int,
					   ESTABLECIMIENTO    => Varchar,
					   ID_REGION          => Int,
					   REGION             => Varchar,
					   COMUNA             => Varchar,
					   FECHA_DESPACHO     => Varchar,
					   ID_ESTATU          => Int,
					   ESTATUS            => Varchar,
					   ITEMS              => Array(
													ID             => Int,
													ID_MODULO_PEDA => Int,
													CANTIDAD       => Int,
													ID_ASIGNATURA  => Int,
													PRECIO         => Float
											  )
				      )
	*/
	public function info_despacho($parametros){

		//Query
		$sql = "SELECT dp.id id_despacho,
					   dp.id_establecimiento,
					   e.nombre establecimiento,
					   r.id id_region,
					   r.nombre region,
					   rc.nombre comuna,
					   dp.fecha_despacho,
					   dp.id_estatus,
					   es.descripcion estatus,
					   dp.id_transportista,
					   dp.id_conductor
				FROM despacho_pedagogico dp,
					 establecimiento e,
					 region_comuna rc,
					 region r,
					 estatus es
				WHERE dp.id_establecimiento = e.id
				AND e.id_comuna = rc.id
				AND rc.id_region = r.id
				AND dp.id_estatus = es.valor
				AND es.tabla = 'despacho_pedagogico'
				AND dp.id = ".$parametros['id_desp']."";	
		
		//Ejecutamos el query
		$consulta  = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado  = $consulta->row_array();
		
		//Buscamos los items del despacho
		$resultado['items'] = $this->items_despacho($parametros['id_desp']);
		
		return $resultado;
		
	}//Fin del método info_despacho
	/*****************************/
	
	/*
		Descripción : Método que lista el detalle del despacho
		Parametros  : Nombre => id_desp , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
							ID             => Int,
							ID_MODULO_PEDA => Int,
							CANTIDAD       => Int,
							ID_ASIGNATURA  => Int,
							PRECIO         => Float
					  )
	*/
	public function items_despacho($id_desp){
		
		//Query
		$sql = "SELECT ddp.id,
					   ddp.id_modulo_peda,
					   mp.descripcion modulo,
					   ddp.cantidad,
					   ddp.id_asignatura,
					   a.descripcion asignatura,
					   ddp.precio	
				FROM detalle_despacho_pedagogico ddp,
					 modulo_pedagogico mp,
					 asignatura a
				WHERE ddp.id_modulo_peda = mp.id
				AND ddp.id_asignatura = a.id
				AND ddp.id_despacho_peda = ".$id_desp."
				ORDER BY ddp.id_modulo_peda,
						 mp.descripcion ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método items_despacho
	/******************************/
	
	/*
		Descripción : Método que lista los estatus del espacho
		Parametros  : Ninguno
		Retorna     : Array(
		                Array(
		                    DESCRIPCION => Varchar,
							VALOR       => Int
						)
					  ) 
	*/
	public function estatus_despacho(){
		
		//Query
		$sql = "SELECT descripcion,
		               valor
		        FROM estatus
				WHERE tabla = 'despacho_pedagogico'
				ORDER BY descripcion ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método estatus_despacho
	/********************************/
	
	/*
		Descripción : Método que edita la información de un depacho
		Parametros  : Nombre => arrayItems      , Tipo => Array   , Obligatorio => Si,
		              Nombre => establecimiento , Tipo => Int     , Obligatorio => Si,
					  Nombre => transportista   , Tipo => Int     , Obligatorio => Si,
					  Nombre => conductor       , Tipo => Int     , Obligatorio => Si,
					  Nombre => fecha           , Tipo => Varchar , Obligatorio => Si,
					  Nombre => id_desp         , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_despacho($parametros){
		
		//Query
	    $sql = "SELECT COUNT(1) despachado
		        FROM despacho_pedagogico
				WHERE id_establecimiento = ".$parametros['establecimiento']."
				AND fecha_despacho = '".$parametros['fecha']."'
				AND id <> ".$parametros['id_desp']."";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		//Evaluamos si ya hay un usuario con ese mismo correo
		if(intval($resultado['despachado']) == 0){
			
			//Iniciamos una transaccion
		   // $this->db->trans_begin();
			
			//Parametros para crear el despacho
			$datos = array(
							'id_establecimiento' => $parametros['establecimiento'],
							'id_transportista'   => $parametros['transportista'],
							'id_conductor'       => $parametros['conductor'],
							'fecha_despacho'     => $parametros['fecha'],
							'id_estatus'         => $parametros['estatus']
						  );
			
			$this->db->where('id', $parametros['id_desp']);
			
			//Evaluamos si se creo el despacho
			if($this->db->update('despacho_pedagogico', $datos)){
				
				//Borramos los items
				if($this->db->delete('detalle_despacho_pedagogico', array('id_despacho_peda' => $parametros['id_desp']))){
				
					//Parametros para crear el detalle del despacho
					$datos = array();
					
					//Recorremos los items del despacho
					foreach($parametros['arrayItems'] as $item){
						
						$valores = json_decode($item);
						
						$datos[] = array(
									  'id_despacho_peda' => $parametros['id_desp'],
									  'id_modulo_peda'   => $valores->modulo,
									  'cantidad'         => $valores->cantidad,
									  'precio'           => $valores->precio,
									  'id_asignatura'    => $valores->asignatura
								   );  
						
					}//Fin del foreach
					
					//Evaluamos si se creo el despacho
					if($this->db->insert_batch('detalle_despacho_pedagogico', $datos)){
						
						$this->db->trans_commit();
					
						$respuesta = array(
										   'CODIGO_RESPUESTA'  => 1, 
										   'MENSAJE_RESPUESTA' => 'Despacho editado!'
										  );
						
					}else{
						
						$this->db->trans_rollback();
					
						$respuesta = array(
										   'CODIGO_RESPUESTA'  => 0, 
										   'MENSAJE_RESPUESTA' => 'Error al editar el despacho!'
										  );
						
					}//Fin del if
					
				}else{
					
					$this->db->trans_rollback();
					
					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 0, 
									   'MENSAJE_RESPUESTA' => 'Error al editar el despacho!'
									  );
					
				}//Fin del if
				
			}else{
				
				$this->db->trans_rollback();
				
				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0, 
								   'MENSAJE_RESPUESTA' => 'Error al editar el despacho!'
								  );
				
			}//Fin del if*/
			
		}else{
			
			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2, 
							   'MENSAJE_RESPUESTA' => 'Ya el establecimiento posee un despacho programado para esa fecha!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método editar_despacho
	/*******************************/
	
}//Fin de la clase principal
/**************************/
?>