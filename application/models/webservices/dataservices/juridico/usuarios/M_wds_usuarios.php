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
class m_wds_usuarios extends CI_Model
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
		Descripción : Método que envia un correo electrónico
		Parametros  : Url del servicios web y los parametros
		Retorna     : Un array de datos.
	*/
	private function enviar_correo($mensaje, $asunto, $quien_envia, $destinatarios){

		//Cargamos la libreria de PHPMAILER
		$this->load->library('PHPMail');

		$mail             = new PHPMailer();
        $mail->IsSMTP();//establecemos que utilizaremos SMTP
        $mail->SMTPAuth   = true;//habilitamos la autenticación SMTP
        $mail->SMTPSecure = "ssl";//establecemos el prefijo del protocolo seguro de comunicación con el servidor
        $mail->Host       = "mail.mollynadas.com.ve";//Establecemos servidor SMTP
        $mail->Port       = 465;//establecemos el puerto SMTP en el servidor de GMail
        $mail->Username   = "soporte@mollynadas.com.ve";//la cuenta de correo GMail
        $mail->Password   = "dc171216";//password de la cuenta GMail
		$mail->CharSet    = 'UTF-8'; // the same as 'utf-8'
        $mail->SetFrom($quien_envia['correo'], $quien_envia['nombre']);  //Quien envía el correo
        $mail->Subject    = $asunto;  //Asunto del mensaje
        $mail->Body       = $mensaje;
		$mail->IsHTML(true);

		//Recorremos los destinatarios
		foreach($destinatarios as $destinatario){

			$mail->AddAddress($destinatario['correo'], $destinatario['nombre']);

		}//Fin del foreach

        //Evaluamos si se envia el mensaje !$mail->Send()
        if($mail->Send()){

			$respuesta = array('CODIGO_RESPUESTA' => 1, 'MENSAJE_RESPUESTA' => '¡Mensaje enviado correctamente!');

        }else{

            //$respuesta['RESPUESTA'] = array('CODIGO' => '0', 'MENSAJE' => 'Error en el envío: ' . $mail->ErrorInfo);
            $respuesta = array('CODIGO_RESPUESTA' => '0', 'MENSAJE_RESPUESTA' => 'Error en el envío ' );

        }//Fin del if

		return $respuesta;

	}//Fin del método enviar_correo
	/*****************************/

	/*
		Descripción : Método obtiene los usuarios creados
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   CORREO => Varchar
						)
					  )
	*/
	public function usuarios($datos){

		//Evaluamos si especificaron a un usuario
		if(intval($datos['id_usuario']) == 0){

			//Query para el tipo de usuario
			$sql = "SELECT u.id,
						   u.avatar,
						   u.nombre,
						   tu.descripcion tipo_usuario,
						   e.descripcion estatus
					FROM usuario u,
						 tipo_usuario tu,
						 estatus e
					WHERE u.id_tipo_usuario = tu.id
					AND e.tabla = 'usuario'
					AND e.valor = u.id_estatus
					ORDER BY nombre ASC
					LIMIT ".$datos['rango'].",5";

			$sql2 = "SELECT COUNT(1) num_usu
					 FROM usuario u";

		}else{

			//Query para el tipo de usuario
			$sql = "SELECT u.id,
						   u.avatar,
						   u.nombre,
						   tu.descripcion tipo_usuario,
						   e.descripcion estatus
					FROM usuario u,
						 tipo_usuario tu,
						 estatus e
					WHERE u.id_tipo_usuario = tu.id
					AND e.tabla = 'usuario'
					AND e.valor = u.id_estatus
					AND u.id = ".$datos['id_usuario']."
					ORDER BY nombre ASC";

			$sql2 = "SELECT COUNT(1) num_usu
					 FROM usuario u
					 WHERE u.id = ".$datos['id_usuario'];

		}//Fin del if

		//Ejecutamos el query
		$consulta  = $this->db->query($sql);
		$consulta2 = $this->db->query($sql2);

		//Obtenemos el array de datos
		$resultado  = $consulta->result_array();
		$resultado2 = $consulta2->row_array();

		$respuesta['num_usu']  = $resultado2['num_usu'];
		$respuesta['usuarios'] = array();

		//Recorremos los registros
		foreach($resultado as $usuario){

			$respuesta['usuarios'][] = array(
											'id'          => $usuario['id'],
											'avatar'      => $usuario['avatar'],
											'nombre'      => $usuario['nombre'],
											'tipo_usuario' => $usuario['tipo_usuario'],
											'estatus'     => $usuario['estatus'],
											'pseudonimo'  => $this->seudonimo_usuario($usuario['id'])
										  );

		}//Fin del foreach

		return $respuesta;

	}//Fin del método usuarios
	/************************/

	/*
		Descripción : Método muestra el seudonimo del usuario.
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si
		Retorna     : Varchar.
	*/
	public function seudonimo_usuario($id_usuario){

		//Query para el tipo de usuario
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
		Descripción : Método que lista los tipos de usuario
		Parametros  : Ninguno.
		Retorna     : Array( ID          => Int,
		                     DESCRIPCION => Varchar,
							 ID_ESTATUS  => Int).
	*/
	public function tipo_usuario(){

		//Query para el tipo de usuario
		$sql = "SELECT *
		        FROM tipo_usuario
				WHERE id_estatus = 1
				ORDER BY descripcion ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método tipo_usuario
	/****************************/

	/*
		Descripción : Método que registra a un nuevo usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si,
		              Nombre => correo     , Tipo => Varchar, Obligatorio => Si,
								  Nombre => clave      , Tipo => Varchar, Obligatorio => Si,
								  Nombre => tipo_usu   , Tipo => Int, Obligatorio => Si,
								  Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
												MENSAJE_RESPUESTA => Varchar
					  					)
	*/
	public function registrar_usuario($datos){

		//Query para el tipo de usuario
	    $sql = "SELECT COUNT(1) existe
		          FROM usuario u
				      WHERE correo_principal = '".$datos['correo']."'";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->row_array();

		//Evaluamos si ya hay un usuario con ese mismo correo
		if(intval($resultado['existe']) == 0){

			//Iniciamos una transaccion
		  $this->db->trans_begin();

			$respuesta = array(
								   'CODIGO_RESPUESTA'  => 1,
								   'MENSAJE_RESPUESTA' => 'Usuario registrado!'
								  );

			//Parametros para insertar al usuario
			$parametros = array(
											'clave'             => md5(base64_decode($datos['clave'])),
											'nombre'            => $datos['nombre'],
											'correo_principal'  => $datos['correo'],
											'id_tipo_usuario'   => $datos['tipo_usu'],
											'correo_Secundario' => $datos['correo2'],
											'id_estatus'        => 1
									  );

			//Evaluamos si se creo el usuario
			if($this->db->insert('usuario', $parametros)){

				//Query para ver si la clave del usuario es válida
				$sql = 'SELECT * FROM mensaje_correo WHERE id = 1';

				//Ejecutamos el query
				$consulta = $this->db->query($sql);

				//Obtenemos el array de datos
				$resultado = $consulta->row_array();

				//Parametros para el envio de correo
				$mensaje               = $resultado['mensaje'];
				$asunto                = $resultado['asunto'];
				$quien_envia['correo'] = $resultado['quien_envia_correo'];
				$quien_envia['nombre'] = $resultado['quien_envia_nombre'];
				$destinaratios         = array(array('correo' => $datos['correo'], 'nombre' => $datos['nombre']));

				//Remplazamos los caracteres del mensaje
				$mensaje = str_replace("#CORREO#",$datos['correo'],$mensaje);
				$mensaje = str_replace("#CLAVE#",base64_decode($datos['clave']),$mensaje);

				$envio_correo = $this->enviar_correo($mensaje, $asunto, $quien_envia, $destinaratios);

				//Evaluamos
				if($envio_correo['CODIGO_RESPUESTA'] == 1){

					$this->db->trans_commit();

					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1,
									   'MENSAJE_RESPUESTA' => 'Usuario registrado!'
									  );

				}else{

					$this->db->trans_rollback();

					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 0,
									   'MENSAJE_RESPUESTA' => 'Error al enviar el correo!'
									  );

				}//Fin del if

			}else{

				$this->db->trans_rollback();

				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 0,
								   'MENSAJE_RESPUESTA' => 'No se pudo registrar el usuario!'
								  );

			}//Fin del if

		}else{

			$respuesta = array(
			                   'CODIGO_RESPUESTA'  => 2,
							   'MENSAJE_RESPUESTA' => 'El correo ya se encuentra registrado!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método registrar_usuario
	/*********************************/

	/*
		Descripción : Método que lista la información del usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si
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
	public function info_usuario($datos){

		//Query para el tipo de usuario
		$sql = "SELECT u.id,
		               u.avatar,
					   u.nombre,
					   u.correo_principal,
					   u.correo_secundario,
					   u.id_tipo_usuario,
					   u.id_estatus
		        FROM usuario u
				WHERE u.id = ".$datos['id_usuario'];

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->row_array();

		return $resultado;

	}//Fin del método info_usuario
	/****************************/

	/*
		Descripción : Método que lista los estatus del usuario
		Parametros  : Ninguno.
		Retorna     : Array(
		                     ID          => Int,
		                     DESCRIPCION => Varchar
						   ).
	*/
	public function estatus_usuario(){

		//Query para el tipo de usuario
		$sql = "SELECT id,
		               descripcion
		        FROM estatus
				WHERE tabla = 'usuario'
				ORDER BY descripcion ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método estatus_usuario
	/*******************************/

	/*
		Descripción : Método que edita la información del usuario
		Parametros  : Nombre => id_usuario , Tipo => Int     , Obligatorio => Si,
		              Nombre => correo     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => clave      , Tipo => Varchar , Obligatorio => Si,
					  Nombre => tipo_usu   , Tipo => Int     , Obligatorio => Si,
					  Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function editar_usuario($datos){

		//Evaluamos si la clave no es vacia
		if(trim($datos['clave']) == ''){

			//Parametros para insertar al usuario
			$parametros = array(
								'nombre'            => $datos['nombre'],
								'correo_principal'  => $datos['correo'],
								'id_tipo_usuario'   => $datos['tipo_usu'],
								'correo_Secundario' => $datos['correo2'],
								'id_estatus'        => $datos['estatus']
						  );

		}else{

			//Parametros para insertar al usuario
			$parametros = array(
											'clave'             => md5(base64_decode($datos['clave'])),
											'nombre'            => $datos['nombre'],
											'correo_principal'  => $datos['correo'],
											'id_tipo_usuario'   => $datos['tipo_usu'],
											'correo_Secundario' => $datos['correo2'],
											'id_estatus'        => $datos['estatus']
									  );

		}//Fin del if

		//Iniciamos una transaccion
		$this->db->trans_begin();

		$this->db->where('id', $datos['id_usuario']);

		//Evaluamos si se creo el usuario
		if($this->db->update('usuario', $parametros)){

			$this->db->trans_commit();

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Usuario actualizado!'
							  );

		}else{

			$this->db->trans_rollback();

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar el usuario!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método editar_usuario
	/******************************/

	/*
		Descripción : Método que lista los menús del sistema
		Parametros  : Ninguno.
		Retorna     : Array(
		                     ID          => Int,
							 ID_PADRE    => Int,
		                     DESCRIPCION => Varchar
						   )
	*/
	public function menu_sistema(){

		//Query
		$sql = "SELECT m.id,
		               m.descripcion,
					         m.url,
					         m.id_padre,
								   (SELECT COUNT(1)
			              FROM menu m2
			              WHERE m2.id_padre = m.id) numHijos
		        FROM menu m
				    WHERE m.id_padre = 0
	          ORDER BY orden ASC";

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
									'submenus'    => $this->menu_hijos($menu['id'])
			           );

		}//Fin del foreach

		return $menus;

	}//Fin del método menu_sistema
	/****************************/

	/*
		Descripción : Método obtiene los menus hijos asociados al padre
		Parametros  : Nombre => id_menu_padre , Tipo => Int
		Retorna     : array(
		                array( ID          => Int,
							   DESCRIPCION => Varchar,
							   URL         => Varchar
						)
					  )
	*/
	private function menu_hijos($id_menu_padre){

		//Query
		$sql = "SELECT m.id,
		               m.descripcion,
								   m.url,
								   m.id_padre,
								   (SELECT COUNT(1)
			              FROM menu m2
			              WHERE m2.id_padre = m.id) numHijos
		        FROM menu m
				    WHERE m.id_padre = ".$id_menu_padre."
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
							'submenus'    => $this->menu_hijos($menu['id'])
			           );

		}//Fin del foreach

		return $menus;

	}//Fin del método menu_hijos
	/**************************/

	/*
		Descripción : Método que lista los menús asociados al usuario
		Parametros  : Ninguno.
		Retorna     : Array(
		                     ID          => Int,
							 ID_PADRE    => Int,
		                     DESCRIPCION => Varchar
						   )
	*/
	public function menu_usuario($datos){

		//Query
		$sql = "SELECT m.id,
		               m.descripcion,
					         m.id_padre
		        FROM menu m,
				         menu_usuario mu
						WHERE m.id = mu.id_menu
						AND mu.id_usuario = ".$datos['id_usuario']."
		        AND m.id_estatus = 1
						ORDER BY m.id, m.id_padre ASC";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método menu_usuario
	/****************************/

	/*
		Descripción : Método que asocia o desasocia los menus al usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si,
		              Nombre => menus      , Tipo => Array, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function asociar_menu_usuario($datos){

		//Iniciamos una transaccion
		$this->db->trans_begin();

		//Eliminamos los menus anteriores
		$this->db->where('id_usuario', $datos['id_usuario']);

		//Evaluamos
		if($this->db->delete('menu_usuario')){

			//Evaluamos
			if($datos['menus'] == '-1'){

				$this->db->trans_commit();

				$respuesta = array(
								   'CODIGO_RESPUESTA'  => 1,
								   'MENSAJE_RESPUESTA' => 'Actualizado!'
								  );

			}else{

				//Otenemos el n° de menús a asociar
				$numMenus = count($datos['menus']);

				//Evaluamos si
				if($numMenus > 0){

					$menus = array();

					//Recorremos
					for($i = 0; $i < $numMenus; $i++){

						$menus[$i] = array(
										 'id_menu'    => $datos['menus'][$i],
										 'id_usuario' => $datos['id_usuario']
										);

					}//Fin del for

					if($this->db->insert_batch('menu_usuario', $menus)){

						$this->db->trans_commit();

						$respuesta = array(
										   'CODIGO_RESPUESTA'  => 1,
										   'MENSAJE_RESPUESTA' => 'Actualizado!'
										  );

					}else{

						$this->db->trans_rollback();

						$respuesta = array(
										   'CODIGO_RESPUESTA'  => 0,
										   'MENSAJE_RESPUESTA' => 'No se pudo actualizar!'
										  );

					}//Fin del if

				}else{

					$this->db->trans_commit();

					$respuesta = array(
									   'CODIGO_RESPUESTA'  => 1,
									   'MENSAJE_RESPUESTA' => 'Actualizado!'
									  );

				}//Fin del if

			}//Fin del if

		}else{

			$this->db->trans_rollback();

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo actualizar!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método asociar_menu_usuario
	/************************************/

	/*
		Descripción : Método que busca a un usuario por nombre o correo
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function buscar_usuario($datos){

		//Query para el tipo de usuario
		$sql = "SELECT u.id,
					   u.nombre,
					   u.avatar
				FROM usuario u
				WHERE LOWER(u.nombre) LIKE LOWER('%".$datos['descripcion']."%')
				OR u.correo_principal LIKE '%".$datos['descripcion']."%'
				ORDER BY nombre ASC
				LIMIT 0,6";

		//Ejecutamos el query
		$consulta = $this->db->query($sql);

		//Obtenemos el array de datos
		$resultado = $consulta->result_array();

		return $resultado;

	}//Fin del método buscar_usuario
	/******************************/

	/*
		Descripción : Método que elimina un usuario
		Parametros  : Nombre => id_usuario , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function eliminar_usuario($datos){

		$this->db->where('id', $datos['id_usuario']);

		//Evaluamos si se elimina
        if($this->db->delete('usuario')){

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 1,
							   'MENSAJE_RESPUESTA' => 'Usuario Eliminado!'
							  );

		}else{

			$respuesta = array(
							   'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'No se pudo eliminar!'
							  );

		}//Fin del if

		return $respuesta;

	}//Fin del método eliminar_usuario
	/********************************/

}//Fin de la clase principal
/**************************/
?>
