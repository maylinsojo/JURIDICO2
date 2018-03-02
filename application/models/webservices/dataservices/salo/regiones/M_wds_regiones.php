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
									   'MENSAJE_RESPUESTA' => 'Región registrada!'
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
	
	
	/*
		Descripción : Método que lista a las comunas asociadas a la region
		Parametros  : Nombre => id_reg , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 ESTATUS        => Varchar	
		                   )
	*/
	public function comunas_region($datos){
		
		//Query para consultar los contactos creados
	    $sql = "     SELECT rc.id,
							rc.nombre,
							e.descripcion estatus			   
					   FROM region_comuna rc,
							estatus e
					  WHERE rc.id_estatus = e.valor	
					    AND e.tabla = 'region_comuna'
						AND rc.id_region = ".$datos['id_reg']."
				   ORDER BY nombre ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método comunas_region
	/*******************************/
	
	/*
		Descripción : Método que asocia las comunas a la región
		Parametros  : Nombre => id_reg   , Tipo => Int     , Obligatorio => Si
					  Nombre => nombre   , Tipo => Varchar , Obligatorio => Si
					
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function asociar_comuna($datos){
		
		//Parametros para insertar LA COMUNA
		$parametros = array(
		                    
							'nombre'     => $datos['nombre'],
							'id_region'  => $datos['id_reg'],
							'id_estatus' => 1
							
					  );
		
		//Evaluamos si se creo el establecimiento
		if($this->db->insert('region_comuna', $parametros)){
				
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Comuna agregada!'
							  );
								  
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo agregar la comuna!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método asociar_comuna
	/********************************/
	/*
		Descripción : Método que elimina las comunas asociadas a la región seleccionada
		Parametros  : Nombre => id_comuna , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	
	public function eliminar_comuna($datos){

		$this->db->where('id', $datos['id']);

		//Evaluamos si se creo el establecimiento
		if($this->db->delete('region_comuna')){

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Comuna eliminada!'
							  );


		}else{

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar la comuna!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método eliminar_comuna
	/*********************************/

		
	/*
		Descripción : Método que edita los datos de la comuna
		Parametros  : Nombre => id_comuna , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si
					 
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_comuna($datos){
		
		//Parametros para editar la comuna
		$parametros = array(
							'nombre'   => strtoupper(trim($datos['nombre'])),
							
					  );
		
		$this->db->where('id', $datos['id_comuna']);
		
		//Evaluamos si actualizó la comuna
		if($this->db->update('region_comuna', $parametros)){
				
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'Comuna actualizada!'
							  );
								  
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar la comuna!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método editar_comuna
	/******************************/
	
		
}//Fin de la clase principal
/**************************/
?>