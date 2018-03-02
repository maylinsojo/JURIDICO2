<?php
/*
	NOMBRE				: M_wds_comunas.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: Jessica Rodriguez
	FECHA DE CREACIÓN 	: 06/11/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_comunas extends CI_Model
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
		Descripción : Método obtiene las comunas creados
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   NOMBRE => Varchar,
							   REGION => Int
						)
					  ) 
	*/
	public function comunas($datos){
	
		//Evaluamos si especificaron a una region
		if($datos['id_comuna'] == 0){
		
			//Query para consultar las comunas creadas
			echo $sql = "SELECT rc.id,
							rc.nombre,
							r.nombre region,
							e.descripcion estatus			   
					   FROM region_comuna rc,
							region r,
							estatus e
					  WHERE r.id = rc.id_region		
					    AND rc.id_estatus = e.valor
					    AND e.tabla = 'region_comuna'
				   ORDER BY nombre ASC
				      LIMIT ".$datos['rango'].",5";

			 $sql2 = "SELECT COUNT(1) num_com
						 FROM region_comuna rc";
			
			
					
		}else{
			
				//Query para la region
				$sql = "SELECT  rc.id,
								rc.nombre,
								r.nombre region,
								e.descripcion estatus			   
						   FROM region_comuna rc,
								region r,
								estatus e
						  WHERE r.id = rc.id_region		
						    AND rc.id_estatus = e.valor
						    AND e.tabla = 'region_comuna'
						    AND rc.id = ".$datos['id_comuna']."
						ORDER BY nombre ASC"; 
					
				$sql2 = "SELECT COUNT(1) num_com
						 FROM region_comuna rc
						 WHERE rc.id = ".$datos['id_comuna'];
			
			
		}//Fin del if	
		
		//Ejecutamos el query
		$consulta  = $this->db->query($sql);
		$consulta2 = $this->db->query($sql2);
		
		//Obtenemos el array de datos
		$resultado  = $consulta->result_array();
		$resultado2 = $consulta2->row_array();
		
		$respuesta['num_com']  = $resultado2['num_com'];
		$respuesta['comunas'] = array();
		
		///Recorremos los registros
		foreach($resultado as $comuna){
			 
			
			$respuesta['comunas'][] = array(
											'id'      => $comuna['id'],
											'nombre'  => $comuna['nombre'],
											'region'  => $comuna['region'],
											'estatus' => $comuna['estatus']
											);
			
		}//Fin del foreach
		
		return $respuesta;
		
	}//Fin del método comunas
	/************************/
	
	/*
		Descripción : Método que lista las regiones para seleccionar la regiön
		Parametros  : Ninguno.
		Retorna     : Array( ID          => Int, 
						     NOMBRE => Varchar, 
		                     COMUNA => Varchar, 
							 NUMERO  => Varchar). 
	*/
	public function region(){
		
		//Query para el tipo de usuario
		$sql = "SELECT *
		        FROM region
				ORDER BY nombre ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método region
	/**********************/
	
	
	/*
		Descripción : Método que registra a una  nueva comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre    , Tipo => Varchar, Obligatorio => Si,
					  Nombre => region     , Tipo => Varchar, Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_comuna($datos){
		
		//Query para el tipo de comuna
	    $sql = "SELECT COUNT(1) existe
		        FROM region_comuna rc
				WHERE nombre = '".$datos['nombre']."'";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		//Evaluamos si ya hay una comuna con esa misma comuna
		if(intval($resultado['existe']) == 0){
			
			//Iniciamos una transaccion
		    $this->db->trans_begin();
			
			$respuesta = array(
								   'CODIGO_RESPUESTA'  => 1, 
								   'MENSAJE_RESPUESTA' => 'Región registrada!'
								  );
			
			//Parametros para insertar la comuna
			$parametros = array(
								'nombre'     => $datos['nombre'],
							    'id_region'  => $datos['region'],
				                'id_estatus' => 1
							
						  );
			
			//Evaluamos si se creo la comuna
			if($this->db->insert('region_comuna', $parametros)){
				
				$this->db->trans_commit();
					
					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1, 
									   'MENSAJE_RESPUESTA' => 'Comuna registrada!'
									  );
									  
				
			}else{
				
				$this->db->trans_rollback();
				
				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0, 
								   'MENSAJE_RESPUESTA' => 'No se pudo registrar la comuna!'
								  );
				
			}//Fin del if
			
		}else{
			
			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2, 
							   'MENSAJE_RESPUESTA' => 'La comuna ya se encuentra registrada!'
							  );
			
		}//Fin del if
		
		
		return $respuesta;
		
	}//Fin del método registrar_comuna
	/*********************************/
	
	/*
		Descripción : Método que lista la información de la comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							NOMBRE            => Varchar,
							REGION            => Int
							
					  ) 
	*/
	public function info_comuna($datos){
		
		//Query para el tipo de comuna
		$sql = "SELECT rc.id,
		               rc.nombre,
					   rc.id_region
			      FROM region_comuna rc
				  WHERE rc.id = ".$datos['id_comuna'];
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
	
		return $resultado;
		
	}//Fin del método info_comuna
	/****************************/
	
	/*
		Descripción : Método que lista los estatus de  la comuna
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     ID          => Int, 
		                     DESCRIPCION => Varchar
						   ). 
	*/
	public function estatus_comuna(){
		
		//Query para el estatus de la comuna
		$sql = "SELECT valor,
		               descripcion
		        FROM estatus
				WHERE tabla = 'region_comuna'
				ORDER BY descripcion ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método estatus_comuna
	/*******************************/
	
	/*
		Descripción : Método que edita la información del usuario
		Parametros  : Nombre => id_comuna  , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => region     , Tipo => Int     , Obligatorio => Si,
					
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_comuna($datos){
		
		//Parametros para insertar los cambios en los datos de la comuna
		$parametros = array(
								
						'nombre'    => $datos['nombre'],
						'id_region' => $datos['region'],
						'id_estatus' => $datos['estatus']
						  );
			//var_dump ($parametros)	; exit(); 
		
		
		//Iniciamos una transaccion
		$this->db->trans_begin();
		
		$this->db->where('id', $datos['id_comuna']);
		
		//Evaluamos si se creo la comuna
		if($this->db->update('region_comuna', $parametros)){
			
			$this->db->trans_commit();
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Comuna actualizada!'
							  );
								  
		}else{
			
			$this->db->trans_rollback();
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar la comuna!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método editar_comuna
	/******************************/
	
	/*
		Descripción : Método que busca a una comuna por nombre 
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_comuna($datos){
		
		//Query para el nombre de la comuna
		 $sql = "SELECT rc.id,
					    rc.nombre
				   FROM region_comuna rc
				  WHERE LOWER(rc.nombre) LIKE LOWER('%".$datos['descripcion']."%')
				ORDER BY nombre ASC
				LIMIT 0,6";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método buscar_comuna
	/******************************/
	
	/*
		Descripción : Método que elimina la comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_comuna($datos){
		
		$this->db->where('id', $datos['id_comuna']);
		
		//Evaluamos si se elimina
        if($this->db->delete('region_comuna')){
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Comuna Eliminada!'
							  );
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método eliminar_comuna
	/********************************/
	
	
}//Fin de la clase principal
/**************************/
?>