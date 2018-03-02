<?php
/*
	NOMBRE				: M_wds_imprentas.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: Jessica Rodriguez
	FECHA DE CREACIÓN 	: 06/11/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_imprentas extends CI_Model
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
		Descripción : Método obtiene las imprentas creadas
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   NOMBRE => Varchar
							  
						)
					  ) 
	*/
	public function imprentas($datos){
		
		//Evaluamos si especificaron a una imprenta
		if($datos['id_imprenta'] == 0){
		
		//Query para consultar las imprentas creadas
			 $sql = "SELECT i.id,
							i.nombre,
							i.precio,
							e.descripcion estatus			   
					   FROM imprenta i,
							estatus e
					  WHERE  i.id_estatus = e.valor
					    AND e.tabla = 'imprenta'
				   ORDER BY nombre ASC
				      LIMIT ".$datos['rango'].",5";

			 $sql2 = "SELECT COUNT(1) num_imp
						 FROM imprenta i";
			
			
				
		}else{
			
				//Query para la imprenta
				$sql = "SELECT  i.id,
								i.nombre,
								i.precio,
								e.descripcion estatus			   
						   FROM imprenta i,								
								estatus e
						  WHERE i.id_estatus = e.valor		
						     AND e.tabla = 'imprenta'
						    AND i.id = ".$datos['id_imprenta']."
						ORDER BY nombre ASC";

				$sql2 = "SELECT COUNT(1) num_imp
						 FROM imprenta i
						 WHERE i.id = ".$datos['id_imprenta'];
			
		}//Fin del if	
		
		//Ejecutamos el query
		$consulta  = $this->db->query($sql);
		$consulta2 = $this->db->query($sql2);
		
		//Obtenemos el array de datos
		$resultado  = $consulta->result_array();
		$resultado2 = $consulta2->row_array();
		
		$respuesta['num_imp']  = $resultado2['num_imp'];
		$respuesta['imprentas'] = array();
		
		///Recorremos los registros
		foreach($resultado as $imprenta){
			 
			
			$respuesta['imprentas'][] = array(
											'id'      => $imprenta['id'],
											'nombre'  => $imprenta['nombre'],
				                            'precio'  => $imprenta['precio'],
											'estatus' => $imprenta['estatus']
											);
			
		}//Fin del foreach
		
		return $respuesta;
		
	}//Fin del método imprentas
	/************************/
	
	
	/*
		Descripción : Método que registra a una  nueva imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre    , Tipo => Varchar, Obligatorio => Si,
					  Nombre => precio     , Tipo => Varchar, Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_imprenta($datos){
		
		//Query para el tipo de imprenta
	    $sql = "SELECT COUNT(1) existe
		        FROM imprenta i
				WHERE nombre = '".$datos['nombre']."'";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		//Evaluamos si ya hay una imprenta con esa misma imprenta
		if(intval($resultado['existe']) == 0){
			
			//Iniciamos una transaccion
		    $this->db->trans_begin();
			
			$respuesta = array(
								   'CODIGO_RESPUESTA'  => 1, 
								   'MENSAJE_RESPUESTA' => 'Región registrada!'
								  );
			
			//Parametros para insertar la imprenta
			$parametros = array(
								'nombre'     => $datos['nombre'],
								'direccion'  => $datos['direccion'],
							    'precio'     => $datos['precio'],
				                'id_estatus' => 1
							
						  );
			
			//Evaluamos si se creo la imprenta
			if($this->db->insert('imprenta', $parametros)){
				
				$this->db->trans_commit();
					
					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1, 
									   'MENSAJE_RESPUESTA' => 'imprenta registrada!'
									  );
									  
				
			}else{
				
				$this->db->trans_rollback();
				
				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0, 
								   'MENSAJE_RESPUESTA' => 'No se pudo registrar la imprenta!'
								  );
				
			}//Fin del if
			
		}else{
			
			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2, 
							   'MENSAJE_RESPUESTA' => 'La imprenta ya se encuentra registrada!'
							  );
			
		}//Fin del if
		
		
		return $respuesta;
		
	}//Fin del método registrar_imprenta
	/*********************************/
	
	/*
		Descripción : Método que lista la información de la imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							NOMBRE            => Varchar,
							PRECIO            => Int
							
					  ) 
	*/
	public function info_imprenta($datos){
		
		//Query para el tipo de imprenta
		$sql = "SELECT i.id,
		               i.nombre,
					   i.precio
			      FROM imprenta i
				  WHERE i.id = ".$datos['id_imprenta'];
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
	
		return $resultado;
		
	}//Fin del método info_imprenta
	/****************************/
	
	/*
		Descripción : Método que lista los estatus de  la imprenta
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     ID          => Int, 
		                     DESCRIPCION => Varchar
						   ). 
	*/
	public function estatus_imprenta(){
		
		//Query para el estatus de la imprenta
		 $sql = "SELECT valor,
		               descripcion
		        FROM estatus
				WHERE tabla = 'imprenta'
				ORDER BY descripcion ASC";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método estatus_imprenta
	/*******************************/
	
	/*
		Descripción : Método que edita la información del usuario
		Parametros  : Nombre => id_imprenta  , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => precio     , Tipo => Int     , Obligatorio => Si,
					
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_imprenta($datos){
		
		//Parametros para insertar los cambios en los datos de la imprenta
		$parametros = array(
								
						'nombre'    => $datos['nombre'],
						'precio' => $datos['precio'],
						'id_estatus' => $datos['estatus']
						  );
			//var_dump ($parametros)	; exit(); 
		
		
		//Iniciamos una transaccion
		$this->db->trans_begin();
		
		$this->db->where('id', $datos['id_imprenta']);
		
		//Evaluamos si se creo la imprenta
		if($this->db->update('imprenta', $parametros)){
			
			$this->db->trans_commit();
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'imprenta actualizada!'
							  );
								  
		}else{
			
			$this->db->trans_rollback();
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar la imprenta!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método editar_imprenta
	/********************************/
	
	/*
		Descripción : Método que busca a una imprenta por nombre 
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_imprenta($datos){
		
		//Query para el nombre de la imprenta
		 $sql = "SELECT i.id,
					    i.nombre
				   FROM imprenta i
				  WHERE LOWER(i.nombre) LIKE LOWER('%".$datos['descripcion']."%')
				ORDER BY nombre ASC
				LIMIT 0,6";
	
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->result_array();
		
		return $resultado;
		
	}//Fin del método buscar_imprenta
	/******************************/
	
	/*
		Descripción : Método que elimina la imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_imprenta($datos){
		
		$this->db->where('id', $datos['id_imprenta']);
		
		//Evaluamos si se elimina
        if($this->db->delete('imprenta')){
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1, 
							   'MENSAJE_RESPUESTA' => 'imprenta Eliminada!'
							  );
			
		}else{
			
			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0, 
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar!'
							  );
			
		}//Fin del if
		
		return $respuesta;
		
	}//Fin del método eliminar_imprenta
	/********************************/
	
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
	
	
	
}//Fin de la clase principal
/**************************/
?>