<?php
/*
	NOMBRE				: M_wds_transportistas.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: Jessica Rodriguez
	FECHA DE CREACIÓN 	: 06/11/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_transportistas extends CI_Model
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
		Descripción : Método obtiene las transportistas creadas
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   NOMBRE => Varchar
							
						)
					  ) 
	*/
	
	
	public function transportistas($datos){
		
		//Evaluamos si especificaron a una region
		if($datos['id_transp'] == 0){
		
			//Query para consultar las transportistas creadas
			 $sql = "SELECT t.id,
							t.nombre,							
							e.descripcion estatus			   
					   FROM transportista t,
							estatus e
					  WHERE  t.id_estatus = e.valor
					    AND e.tabla = 'transportista'
				   ORDER BY nombre ASC
				      LIMIT ".$datos['rango'].",5";

			 $sql2 = "SELECT COUNT(1) num_transp
						 FROM transportista t";
			
			
					
		}else{
			
				//Query para la transportista
				$sql = "SELECT  t.id,
								t.nombre,								
								e.descripcion estatus			   
						   FROM transportista t,								
								estatus e
						  WHERE t.id_estatus = e.valor		
						     AND e.tabla = 'transportista'
						    AND t.id = ".$datos['id_transp']."
						ORDER BY nombre ASC";

				$sql2 = "SELECT COUNT(1) num_transp
						 FROM transportista t
						 WHERE t.id = ".$datos['id_transp'];
			
			
		}//Fin del if	
		
		//Ejecutamos el query
		$consulta  = $this->db->query($sql);
		$consulta2 = $this->db->query($sql2);
		
		//Obtenemos el array de datos
		$resultado  = $consulta->result_array();
		$resultado2 = $consulta2->row_array();
		
		$respuesta['num_transp']  = $resultado2['num_transp'];
		$respuesta['transportistas'] = array();
		
		///Recorremos los registros
		foreach($resultado as $transportista){
			 
			
			$respuesta['transportistas'][] = array(
											'id'      => $transportista['id'],
											'nombre'  => $transportista['nombre'],
											'estatus' => $transportista['estatus']
											);
			
		}//Fin del foreach
		
		return $respuesta;
		
	}//Fin del método transportista
	/******************************/
	
	/*
		Descripción : Método que registra a una  nueva transportista
		Parametros  : Nombre => id_transp , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre    , Tipo => Varchar, Obligatorio => Si,
					  Nombre => region     , Tipo => Varchar, Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_transportista($datos){
		
		//Query para el tipo de transportista
	    $sql = "SELECT COUNT(1) existe
		        FROM transportista t
				WHERE nombre = '".$datos['nombre']."'";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		//Evaluamos si ya hay una transportista con esa misma transportista
		if(intval($resultado['existe']) == 0){
			
			//Iniciamos una transaccion
		    $this->db->trans_begin();
			
			$respuesta = array(
								   'CODIGO_RESPUESTA'  => 1, 
								   'MENSAJE_RESPUESTA' => 'Transportista registrada!'
								  );
			
			//Parametros para insertar la transportista
			$parametros = array(
								'nombre'             => $datos['nombre'],
				                'lista_conductores'  => $datos['conductor'],
				                'id_estatus'         => 1
							
						  );
			
			//Evaluamos si se creo la transportista
			if($this->db->insert('transportista', $parametros)){
				
				$this->db->trans_commit();
					
					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1, 
									   'MENSAJE_RESPUESTA' => 'Transportista Registrada!'
									  );
									  
				
			}else{
				
				$this->db->trans_rollback();
				
				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0, 
								   'MENSAJE_RESPUESTA' => 'No se pudo registrar la transportista!'
								  );
				
			}//Fin del if
			
		}else{
			
			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2, 
							   'MENSAJE_RESPUESTA' => 'La transportista ya se encuentra registrada!'
							  );
			
		}//Fin del if
		
		
		return $respuesta;
		
	}//Fin del método registrar_transportista
	/****************************************/
	
	/*
		Descripción : Método que busca a una transportista
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    ID     => Int,
							NOMBRE => Varchar
					  ) 
	*/
	public function buscar_transportista($datos){
		
		//Query para hacer la busqueda de la transportista
		$sql = "SELECT t.id,
					   t.nombre
				FROM transportista t
				WHERE LOWER(t.nombre) LIKE LOWER('%".$datos['descripcion']."%')
				ORDER BY nombre ASC
				LIMIT 0,6";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método buscar_transportista
	/*************************************/
	
	/*
		Descripción : Método que lista a los conductores asociados a la transportista
		Parametros  : Nombre => id_transp , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 TELEFONO      => Varchar,
							 OTRO_TELEFONO => Varchar,
							 CORREO        => Varchar	
		                   )
	*/
	public function conductores_transportista($datos){
		
		//Query para consultar los contactos creados
	    $sql = "SELECT ct.id,
					   ct.nombre,
					   ct.telefono,
					   ct.otro_telefono,
					   ct.correo
				FROM conductor_transportista ct
				WHERE ct.id_transportista = ".$datos['id_transp']."";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método conductores_transportista
	/******************************************/
	
	/*
		Descripción : Método que asocia los conductores a la transportista
		Parametros  : Nombre => id_transp    , Tipo => Int     , Obligatorio => Si
					  Nombre => nombre   , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo   , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf      , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function asociar_conductor($datos){
		
		//Parametros para insertar EL conductor
		$parametros = array(
		                    'id_transportista'   => $datos['id_transp'],
							'nombre'             => strtoupper(trim($datos['nombre'])),
			                'correo'             => strtolower(trim($datos['correo'])),
			                'telefono'           => $datos['tlf'],
							'otro_telefono'      => $datos['otro_tlf'],
							
							
					  );
		
		//Evaluamos si se creo el conductor de la transportista
		if($this->db->insert('conductor_transportista', $parametros)){
				
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Conductor agregado!'
							  );
								  
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo agregar el conductor!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método asociar_conductor
	/********************************/
	
	/*
		Descripción : Método que edita los datos del conductor
		Parametros  : Nombre => id_conductor , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo      , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf         , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf    , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_conductor($datos){
		
		//Parametros para insertar EL ESTABLECIMIENTO
		$parametros = array(
							'nombre'             => strtoupper(trim($datos['nombre'])),
							'correo'             => strtolower(trim($datos['correo'])),
							'telefono'           => $datos['tlf'],
							'otro_telefono'      => $datos['otro_tlf'],
					  );
		
		$this->db->where('id', $datos['id_conductor']);
		
		//Evaluamos si se creo el establecimiento
		if($this->db->update('conductor_transportista', $parametros)){
				
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Conductor actualizado!'
							  );
								  
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar el conductor!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método editar_conductor
	/*********************************/
	
	/*
		Descripción : Método que elimina los conductores de la transportista
		Parametros  : Nombre => id_conductor , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_conductor($datos){
	
		$this->db->where('id', $datos['id_conductor']);
		
		//Evaluamos si se creo el establecimiento
		if($this->db->delete('conductor_transportista')){
				
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Conductor eliminado!'
							  );
								  
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar el conductor!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método eliminar_conductor
	/***********************************/
	
	

}//Fin de la clase principal
/**************************/
?>