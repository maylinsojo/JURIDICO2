<?php
/*
	NOMBRE				: M_wds_regiones.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: Jessica Rodriguez
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_regiones extends CI_Model
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
		Descripción : Método obtiene las regiones creados
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   NOMBRE => Varchar,
							   NUMERO => Varchar
						)
					  ) 
	*/
	public function regiones($datos){
		
		//Evaluamos si especificaron a una region
		if($datos['id_region'] == 0){
		
		
		//Query para  la region
			 $sql = "SELECT  r.id,
		                r.numero,
						r.nombre					   
		           FROM region r
					ORDER BY nombre ASC";
					
		}else{
			
			//Query para la region
		 	$sql = "SELECT  r.id,
		                r.numero,
						r.nombre					   
		           FROM region r
					WHERE r.id = ".$datos['id_region']."
					ORDER BY nombre ASC";
			
		}//Fin del if
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		$regiones = array();
		
		//Recorremos los registros
		foreach($resultado as $region){
			
			$regiones[] = array(
			              	'id'      => $region['id'],
							'numero'  => $region['numero'],
				            'nombre'  => $region['nombre']
						    );
			
		}//Fin del foreach
		
		return $regiones;
		
	}//Fin del método regiones
	/************************/
	
	
	/*
		Descripción : Método que registra a una  nueva region
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si,
		              Nombre => comuna    , Tipo => Varchar, Obligatorio => Si,
					  Nombre => numero     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_region($datos){
		
		//Query para el tipo de region
	    $sql = "SELECT COUNT(1) existe
		        FROM region r
				WHERE nombre = '".$datos['nombre']."'";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		//Evaluamos si ya hay una region con esa misma comuna
		if(intval($resultado['existe']) == 0){
			
			//Iniciamos una transaccion
		    $this->db->trans_begin();
			
			$respuesta = array(
								   'CODIGO_RESPUESTA'  => 1, 
								   'MENSAJE_RESPUESTA' => 'Región registrada!'
								  );
			
			//Parametros para insertar la region
			$parametros = array(
								'nombre'  => $datos['nombre'],
								'numero'  => $datos['numero'],
				                'id_estatus' => 1
							
						  );
			
			//Evaluamos si se creo la region
			if($this->db->insert('region', $parametros)){
				
				$this->db->trans_commit();
					
					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1, 
									   'MENSAJE_RESPUESTA' => 'Región registrado!'
									  );
									  
				
			}else{
				
				$this->db->trans_rollback();
				
				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0, 
								   'MENSAJE_RESPUESTA' => 'No se pudo registrar la región!'
								  );
				
			}//Fin del if
			
		}else{
			
			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2, 
							   'MENSAJE_RESPUESTA' => 'La región ya se encuentra registrada!'
							  );
			
		}//Fin del if
		
		
		return $respuesta;
		
	}//Fin del método registrar_region
	/*********************************/
	
	/*
		Descripción : Método que lista la información de la region
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							NOMBRE            => Varchar,
							NUMERO            => Varchar
							
					  ) 
	*/
	public function info_region($datos){
		
		//Query para el tipo de region
		$sql = "SELECT r.id,
		               r.nombre,
					   r.numero
			      FROM region r
				  WHERE r.id = ".$datos['id_region'];
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
	
		return $resultado;
		
	}//Fin del método info_region
	/****************************/
	/*
		Descripción : Método que edita la información del region
		Parametros  : Nombre => id_region  , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero     , Tipo => Varchar , Obligatorio => Si,
					
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_region($datos){
		
				
		//Parametros para insertar la region
		$parametros = array(
								
						'nombre'  => $datos['nombre'],
						'numero'  => $datos['numero']
						  );
			//var_dump ($parametros)	; exit(); 
		
		
		//Iniciamos una transaccion
		$this->db->trans_begin();
		
		$this->db->where('id', $datos['id_region']);
		
		//Evaluamos si se creo la region
		if($this->db->update('region', $parametros)){
			
			$this->db->trans_commit();
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Región actualizada!'
							  );
								  
		}else{
			
			$this->db->trans_rollback();
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar la región!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método editar_region
	/******************************/
	
	/*
		Descripción : Método que busca a una region por nombre 
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_region($datos){
		
		//Query para el nombre de la region
		 $sql = "SELECT r.id,
					    r.nombre
				   FROM region r
				  WHERE LOWER(r.nombre) LIKE LOWER('%".$datos['descripcion']."%')
				ORDER BY nombre ASC
				LIMIT 0,6";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método buscar_region
	/******************************/
	
	/*
		Descripción : Método que elimina la region
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_region($datos){
		
		$this->db->where('id', $datos['id_region']);
		
		//Evaluamos si se elimina
        if($this->db->delete('region')){
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Región Eliminada!'
							  );
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método eliminar_region
	/********************************/
	
}//Fin de la clase principal
/**************************/
?>