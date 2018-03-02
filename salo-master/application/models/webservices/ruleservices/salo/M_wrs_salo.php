<?php
/*
	NOMBRE				: M_wrs_salo.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	AUTOR				: David Molina
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Clase principal
*/
class m_wrs_salo extends CI_Model
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
		Descripción : Método autentica al usuario
		Parametros  : Nombre => correo , Tipo => Varchar,
		              Nombre => clave  , Tipo => Varchar
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar,
							ID_USUARIO        => Int,
							PSEUDONIMO        => Varchar,
							AVATAR_USUARIO    => Varchar
						   ) 
	*/
	public function login($datos){
		
		//Query para verificar el correo
		$sql = 'SELECT COUNT(*) AS num_reg, 
		               id,
					   clave,
					   avatar 
			    FROM usuario
			    WHERE correo_principal = "'.$datos['correo'].'"
				GROUP BY id, clave, avatar';
		
		//Ejecutamos el query
		$consulta = $this->db->query($sql);
		
		//Obtenemos el array de datos
		$resultado = $consulta->row_array();
		
		//Evaluamos
		if(intval($resultado['num_reg']) > 0){
			
			//Encriptamos la clave para comparar
			$clave = md5(base64_decode($datos['clave']));
			
			//Evaluamos
			if($resultado['clave'] == $clave){
				
				//Obtenemos el seudonimo del usuario
				$seudonimo = $this->seudonimo_usuario($resultado['id']);
				
				$respuesta = array(
				                   'CODIGO_RESPUESTA'  => '1', 
								   'MENSAJE_RESPUESTA' => 'Autenticación exitosa.',
								   'ID_USUARIO'        => $resultado['id'],
								   'AVATAR_USUARIO'    => $resultado['avatar'],
								   'SEUDONIMO'         => $seudonimo
								  );
				
			}else{
				
				$respuesta = array('CODIGO_RESPUESTA' => '3', 'MENSAJE_RESPUESTA' => 'Contraseña incorrecta.');
				
			}//Fin del if
			
		}else{
			
			$respuesta = array('CODIGO_RESPUESTA' => '2', 'MENSAJE_RESPUESTA' => 'El correo no existe.');
			
		}//Fin dle if
		
		return $respuesta;
		
	}//Fin del método login
	/*********************/
	
	/*
		Descripción : Método muestra el seudonimo del usuario.
		Parametros  : El id del usuario.
		Retorna     : Un array con los datos del usuario. 
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
	
}//Fin de la clase principal
/**************************/
?>