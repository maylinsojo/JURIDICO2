<?php
/*
	NOMBRE				: M_wds_establecimientos.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			:
	AUTOR				: Jessica Rodriguez
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Clase principal
*/
class m_wds_establecimientos extends CI_Model
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
		Descripción : Método que lista las regiones disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
						id,
						nombre,
						numero
		              )
	*/
	public function regiones(){

		//Query
		$sql = "SELECT id,
		               nombre,
					   numero
		        FROM region
				WHERE id_estatus = 1
				ORDER BY nombre ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método regiones
	/************************/

	/*
		Descripción : Método que lista las comunas asociadas a las regiones
		Parametros  : Nombre => id_region , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		              	id,
						descripcion
		              )
	*/
	public function comunas_region($datos){

		//Query para el tipo de usuario
		$sql = "SELECT id,
		               nombre
		        FROM region_comuna
				WHERE id_region = ".$datos['id_region']."
				ORDER BY nombre ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método comunas_region
	/******************************/

	/*
		Descripción : Método que lista los establecimientos creados
		Parametros  : Nombre => id_ee , Tipo => Int, Obligatorio => Si
		              Nombre => rango , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID      => Int,
							NOMBRE  => Varchar,
							REGION  => Varchar,
							COMUNA  => Varchar,
							ESTATUS => Varchar
					  )
	*/
	public function establecimientos($datos){

		//Evaluamos si especificaron a un usuario
		if(intval($datos['id_ee']) == 0){

			//Query para consultar los establecimientos creados
			$sql = "SELECT es.id,
							r.id id_region,
							es.nombre,
							es.id_comuna,
							r.nombre region,
							e.descripcion estatus,
							rc.nombre comuna
					 FROM establecimiento es,
						  region r,
						  estatus e,
						  region_comuna rc
					 WHERE rc.id = es.id_comuna
					   AND rc.id_region = r.id
					   AND es.id_estatus = e.valor
					   AND e.tabla = 'establecimiento'
					   LIMIT ".$datos['rango'].",5";

			 $sql2 = "SELECT COUNT(1) num_ee
					  FROM establecimiento e";

		}else{

			//Query para consultar los establecimientos creados
			$sql = "SELECT es.id,
							r.id id_region,
							es.nombre,
							es.id_comuna,
							r.nombre region,
							e.descripcion estatus,
							rc.nombre comuna
					 FROM establecimiento es,
						   region r,
						   estatus e,
						   region_comuna rc
					 WHERE rc.id = es.id_comuna
					   AND rc.id_region = r.id
					   AND es.id_estatus = e.valor
					   AND e.tabla = 'establecimiento'
					   AND es.id = ".$datos['id_ee'];

			 $sql2 = "SELECT COUNT(1) num_ee
					  FROM establecimiento e";

		}//Fin del if

		//Ejecutamos el query
		$consulta  = $this->db->query($sql);
		$consulta2 = $this->db->query($sql2);

		//Obtenemos el array de datos
		$resultado  = $consulta->result_array();
		$resultado2 = $consulta2->row_array();

		$respuesta['num_ee'] = $resultado2['num_ee'];
		$respuesta['ee']     = array();

		//Recorremos los registros
		foreach($resultado as $establecimiento){

			$respuesta['ee'][] = array(
									   'id'      => $establecimiento['id'],
									   'nombre'  => $establecimiento['nombre'],
									   'region'  => $establecimiento['region'],
									   'comuna'  => $establecimiento['comuna'],
									   'estatus' => $establecimiento['estatus']
									  );

		}//Fin del foreach

		return $respuesta;

	}//Fin del método establecimientos
	/********************************/

	/*
		Descripción : Método que registra un nuevo establecimiento
		Parametros  : Nombre => region , Tipo => Int, Obligatorio => Si,
								  Nombre => nombre , Tipo => Varchar, Obligatorio => Si,
								  Nombre => comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
                    CODIGO_RESPUESTA  => Int,
										MENSAJE_RESPUESTA => Varchar
					  			)
	*/
	public function registrar_establecimiento($datos){

		//Query para el establecimiento
	    $sql = "SELECT COUNT(1) existe
				      FROM establecimiento
						  WHERE UPPER(nombre) = UPPER('".$datos['nombre']."')";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->row_array();

		//Evaluamos si ya está el establecimiento creado
		if(intval($resultado['existe']) == 0){

			//Iniciamos una transaccion
		  $this->db->trans_begin();

			$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1,
									   'MENSAJE_RESPUESTA' => 'Establecimiento registrado!'
									  );

			//Parametros para insertar EL ESTABLECIMIENTO
			$parametros = array(
											'nombre'     => strtoupper(trim($datos['nombre'])),
										  'id_comuna'  => $datos['comuna'],
											'id_estatus' => 1
									  );

			//Evaluamos si se creo el establecimiento
			if($this->db->insert('establecimiento', $parametros)){

				$this->db->trans_commit();

					$respuesta = array(
											   'CODIGO_RESPUESTA'  => 1,
											   'MENSAJE_RESPUESTA' => 'Establecimiento registrado!'
											 );

			}else{

				$this->db->trans_rollback();

				$respuesta = array(
										   'CODIGO_RESPUESTA'  => 0,
										   'MENSAJE_RESPUESTA' => 'No se pudo registrar el establecimiento!'
										  );

			}//Fin del if

		}else{

			$respuesta = array(
			             	'CODIGO_RESPUESTA'  => 2,
							      'MENSAJE_RESPUESTA' => 'El establecimiento ya se encuentra registrado!'
							     );

		}//Fin del if

		return $respuesta;

	}//Fin del método registrar_establecimiento
	/******************************************/

	/*
		Descripción : Método que lista la información del establecimiento
		Parametros  : Nombre => id_establecimiento , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID                => Int,
							AVATAR            => Varchar,
							NOMBRE            => Varchar,
							CORREO_PRINCIPAL  => Varchar,
							CORREO_SECUNDARIO => Varchar,
							ID_TIPO_USUARIO   => Int,
							ID_ESTATUS        => Int
					  )
	*/
	public function info_establecimiento($datos){

		//Query para obtener información del establecimiento
		$sql = "SELECT e.id,
					   e.nombre,
					   rc.id_region,
					   rc.id id_comuna,
					   e.id_estatus
				FROM establecimiento e,
					 region_comuna rc
				WHERE e.id_comuna = rc.id
				AND e.id = ".$datos['id_establecimiento'];

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->row_array();

		return $resultado;

	}//Fin del método info_establecimiento
	/************************************/

	/*
		Descripción : Método que lista los estatus del establecimiento
		Parametros  : Ninguno
		Retorna     : array(
		                    ID          => Int,
							DESCRIPCION => Varchar
					  )
	*/
	public function estatus_establecimiento(){

		//Query para obtener información del establecimiento
		$sql = "SELECT valor id,
					   descripcion
				FROM estatus
				WHERE tabla = 'establecimiento'
				ORDER BY descripcion ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método estatus_establecimiento
	/***************************************/

	/*
		Descripción : Método que elimina un establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function eliminar_establecimiento($datos){

		$this->db->where('id', $datos['id_ee']);

		//Evaluamos si se elimina
        if($this->db->delete('establecimiento')){

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Establecimiento Eliminado!'
							  );

		}else{

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método eliminar_establecimiento
	/****************************************/

	/*
		Descripción : Método que edita la información del establecimiento
		Parametros  : Nombre => id_ee   , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre  , Tipo => Varchar , Obligatorio => Si,
					  Nombre => comuna  , Tipo => Int     , Obligatorio => Si,
					  Nombre => estatus , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function editar_establecimiento($datos){

		//Query para el establecimiento
	    $sql = "SELECT COUNT(1) existe
		        FROM establecimiento
				WHERE nombre = '".$datos['nombre']."'
				AND id <> ".$datos['id_ee'];

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->row_array();

		//Evaluamos si ya está el establecimiento creado
		if(intval($resultado['existe']) == 0){

			//Parametros para insertar el editar_establecimiento
			$parametros = array(
								'nombre'     => strtoupper(trim($datos['nombre'])),
								'id_comuna'  => $datos['comuna'],
								'id_estatus' => $datos['estatus']
						  );


			//Iniciamos una transaccion
			$this->db->trans_begin();

			$this->db->where('id', $datos['id_ee']);

			//Evaluamos si se creo el establecimiento
			if($this->db->update('establecimiento', $parametros)){

				$this->db->trans_commit();

				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 1,
								   'MENSAJE_RESPUESTA' => 'Establecimiento actualizado!'
								  );

			}else{

				$this->db->trans_rollback();

				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0,
								   'MENSAJE_RESPUESTA' => 'No se pudo actualizar el establecimiento!'
								  );

			}//Fin del if

		}else{

			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2,
							   'MENSAJE_RESPUESTA' => 'El establecimiento ya se encuentra registrado!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método editar_establecimiento
	/***************************************/

	/*
		Descripción : Método que busca a un establecimiento
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    ID     => Int,
							NOMBRE => Varchar
					  )
	*/
	public function buscar_ee($datos){

		//Query para el tipo de usuario
		$sql = "SELECT e.id,
					   e.nombre
				FROM establecimiento e
				WHERE LOWER(e.nombre) LIKE LOWER('%".$datos['descripcion']."%')
				ORDER BY nombre ASC
				LIMIT 0,6";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método buscar_ee
	/*************************/

	/*
		Descripción : Método que lista los niveles academicos disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
		                     Array(
							       ID          => Int,
							       DESCRIPCION => Varchar
							 )
						   )
	*/
	public function nivel_academico(){

		//Query
		$sql = "SELECT id,
		               descripcion
				    FROM nivel_educativo
					  WHERE id_estatus = 1
					  ORDER BY orden ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método nivel_academico
	/*******************************/

	/*
		Descripción : Método que lista los cursos aociados del establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                     Array(
							       ID          => Int,
							       ID_CURSO    => Int,
								   DESC_CURSO  => Varchar,
								   ID_NIVEL    => Int,
								   DESC_NIVEL  => Varchar,
								   NUM_ALUMNOS => Int
							 )
						   )
	*/
	public function cursos_establecimiento($datos){

		//Query
		$sql = "SELECT ce.id,
		               ce.id_curso,
					   ce.num_alumnos,
					   c.descripcion desc_curso,
					   n.id id_nivel,
					   n.descripcion desc_nivel
			    FROM curso_esteblecimiento ce,
				     curso c,
					 nivel_educativo n
			    WHERE ce.id_curso = c.id
				AND n.id = c.id_nivel
				AND c.id_nivel = n.id
				AND ce.id_establecimiento = ".$datos['id_ee']."
				ORDER BY n.orden, n.descripcion, c.descripcion ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método cursos_establecimiento
	/**************************************/

	/*
		Descripción : Método elimina el curso al EE
		Parametros  : Nombre => id , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function eliminar_curso($datos){

		$this->db->where('id', $datos['id']);

		//Evaluamos si se creo el establecimiento
		if($this->db->delete('curso_esteblecimiento')){

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Curso eliminado!'
							  );


		}else{

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar el curso!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método eliminar_curso
	/******************************/

	/*
		Descripción : Método edita el curso de una establecimiento
		Parametros  : Nombre => id     , Tipo => Int , Obligatorio => Si
		              Nombre => numEst , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function editar_curso($datos){

		//Parametros para insertar EL ESTABLECIMIENTO
		$parametros = array(
							'num_alumnos' => $datos['numEst'],
					  );

		$this->db->where('id', $datos['id']);

		//Evaluamos si se creo el establecimiento
		if($this->db->update('curso_esteblecimiento', $parametros)){

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Curso actualizado!'
							  );


		}else{

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar el curso!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método editar_curso
	/****************************/

	/*
		Descripción : Método que lista los cursos asociados a los niveles academicos
		Parametros  : Nombre => id_nivel, Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    ID          => Int,
							DESCRIPCION => Varchar,
		                   )
	*/
	public function nivel_curso($datos){

		//Query
		$sql = "SELECT c.id,
		               c.descripcion
			    FROM curso c
				WHERE c.id NOT IN(SELECT id_curso
				                  FROM curso_esteblecimiento
								  WHERE id_establecimiento = ".$datos['id_ee'].")
				AND c.id_estatus = 1
				AND c.id_nivel = ".$datos['id_nivel']."
				ORDER BY c.orden ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método nivel_curso
	/***************************/

	/*
		Descripción : Método que lista los cursos disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
		                     Array(
							       ID          => Int,
							       DESCRIPCION => Varchar,
								   ID_NIVEL    => Int
							 )
						   )
	*/
	public function cursos(){

		//Query
		$sql = "SELECT id,
		               descripcion,
					   id_nivel
			    FROM curso
				WHERE id_estatus = 1
				ORDER BY id_nivel, descripcion ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método cursos
	/**********************/

	/*
		Descripción : Método que asocia el curso a un establecimiento
		Parametros  : Nombre => id_ee  , Tipo => Int, Obligatorio => Si
		              Nombre => nivel  , Tipo => Int, Obligatorio => Si
					  Nombre => curso  , Tipo => Int, Obligatorio => Si
					  Nombre => numEst , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function agregar_curso($datos){

		//Query para el tipo de region
	    $sql = "SELECT COUNT(1) existe
				      FROM curso_esteblecimiento
							WHERE id_establecimiento = ".$datos['id_ee']."
							AND id_curso = ".$datos['curso'];

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->row_array();

		//Evaluamos si ya hay una region con esa misma comuna
		if(intval($resultado['existe']) == 0){

			//Parametros para insertar
			$parametros = array(
											'id_establecimiento' => $datos['id_ee'],
											'id_curso'           => $datos['curso'],
											'num_alumnos'        => $datos['numEst']
									  );

			//Evaluamos si se creo la relación del curso con el establecimiento
			if($this->db->insert('curso_esteblecimiento', $parametros)){

				$respuesta = array(
										   'CODIGO_RESPUESTA'  => 1,
										   'MENSAJE_RESPUESTA' => 'Curso agregado!'
										 );


			}else{

				$respuesta = array(
										   'CODIGO_RESPUESTA'  => 0,
										   'MENSAJE_RESPUESTA' => 'No se pudo agregar el curso!'
										  );

			}//Fin del if

		}else{

			$respuesta = array(
			             	'CODIGO_RESPUESTA'  => 2,
							   		'MENSAJE_RESPUESTA' => 'El curso ya se encuentra asociado!'
							  	 );

		}//Fin del if

		return $respuesta;

	}//Fin del método agregar_curso
	/*****************************/

	/*
		Descripción : Método que lista a los contactos asociados al establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 TELEFONO      => Varchar,
							 OTRO_TELEFONO => Varchar,
							 CORREO        => Varchar
		                   )
	*/
	public function contactos_establecimiento($datos){

		//Query para consultar los contactos creados
	    $sql = "SELECT ces.id,
					   ces.nombre,
					   ces.telefono,
					   ces.otro_telefono,
					   ces.correo
				FROM contacto_establecimiento ces
				WHERE ces.id_establecimiento = ".$datos['id_ee']."";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método contactos_establecimiento
	/*****************************************/

	/*
		Descripción : Método que asocia los contactos al establecimiento
		Parametros  : Nombre => id_ee    , Tipo => Int     , Obligatorio => Si
					  Nombre => nombre   , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo   , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf      , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function asociar_contacto($datos){

		//Parametros para insertar EL ESTABLECIMIENTO
		$parametros = array(
		                    'id_establecimiento' => $datos['id_ee'],
							'nombre'             => strtoupper(trim($datos['nombre'])),
							'correo'             => strtolower(trim($datos['correo'])),
							'telefono'           => $datos['tlf'],
							'otro_telefono'      => $datos['otro_tlf'],
					  );

		//Evaluamos si se creo el establecimiento
		if($this->db->insert('contacto_establecimiento', $parametros)){

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Contacto agregado!'
							  );


		}else{

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo agregar el contacto!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método asociar_contacto
	/********************************/

	/*
		Descripción : Método que elimina los contactos del establecimiento
		Parametros  : Nombre => id_contacto , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function eliminar_contacto($datos){

		$this->db->where('id', $datos['id_contacto']);

		//Evaluamos si se creo el establecimiento
		if($this->db->delete('contacto_establecimiento')){

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Contacto eliminado!'
							  );


		}else{

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar el contacto!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método eliminar_contacto
	/*********************************/

	/*
		Descripción : Método que edita los datos del contacto
		Parametros  : Nombre => id_contacto , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo      , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf         , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf    , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function editar_contacto($datos){

		//Parametros para insertar EL ESTABLECIMIENTO
		$parametros = array(
							'nombre'             => strtoupper(trim($datos['nombre'])),
							'correo'             => strtolower(trim($datos['correo'])),
							'telefono'           => $datos['tlf'],
							'otro_telefono'      => $datos['otro_tlf'],
					  );

		$this->db->where('id', $datos['id_contacto']);

		//Evaluamos si se creo el establecimiento
		if($this->db->update('contacto_establecimiento', $parametros)){

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Contacto actualizado!'
							  );


		}else{

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar el contacto!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método editar_contacto
	/*******************************/

}//Fin de la clase principal
/**************************/
?>
