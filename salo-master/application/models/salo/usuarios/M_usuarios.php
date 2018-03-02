<?php
/*
	NOMBRE			  : M_salo.php
	DESCRIPCIÓN		  : Modelo 
	AUTOR		      : David Molina
	FECHA DE CREACIÓN : 15/10/2017

*/

/*
    Descripción : Clase principal.
*/
class m_usuarios extends CI_Model{
    
	/*
		Descripción : Constructor de la clase principal.
	*/
	public function __construct(){
		
		parent::__construct();
		
	}//Fin del constructor de la clase
	/********************************/
	
	/*
		Descripción : Método que invoca un servicio web
		Parametros  : Url del servicios web y los parametros
		Retorna     : Un array de datos. 
	*/
	private function servicio_rest($url, $parametros = NULL, $metodo_curl, $funcion, $puerto = 80)
	{

		//Inicializamos el curl
		$recurso = curl_init();
		
		//Evaluamos el método de consumo
		if(strtoupper($metodo_curl) == 'POST'){
			
			$met = CURLOPT_POST;
			
			//Opciones del curl
			curl_setopt($recurso, CURLOPT_URL, $url.'/'.$funcion);
			curl_setopt($recurso, CURLOPT_POSTFIELDS, json_encode($parametros));
			
		}elseif(strtoupper($metodo_curl) == 'PUT'){
			
			$met = CURLOPT_PUT;
			
		}elseif(strtoupper($metodo_curl) == 'GET'){
			
			//Evaluamos si existen parametros
			if($parametros != NULL){
				
				$parametros = '?'.http_build_query($parametros);
				
			}//Fin del if
			
			$met = CURLOPT_CUSTOMREQUEST;
		    
			//Opciones del curl
			curl_setopt($recurso, CURLOPT_URL, $url.'/'.$funcion.$parametros);
			
		}elseif(strtoupper($metodo_curl) == 'DELETE'){
			
			$met = CURLOPT_CUSTOMREQUEST;
			
		}else{
			
			return "error con el metodo";
			
		}//Fin del if

		//Opciones del curl
		curl_setopt($recurso, CURLOPT_HEADER, false);
		curl_setopt($recurso, CURLOPT_HTTPHEADER, array("Content-Type:application/json","accept:application/json"));
		curl_setopt($recurso, CURLOPT_PORT, $puerto);
		//curl_setopt($recurso, $met, true);
		curl_setopt($recurso, CURLOPT_RETURNTRANSFER, true);
        
		//Ejecutamos el curl
		$data = curl_exec($recurso);
		
		//Cerramos el recurso
		curl_close($recurso);
	
		//Retornamos la data 
		return json_decode($data,true);

	}//Fin del método servicio_rest
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
	public function usuarios($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'usuarios';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método usuarios
	/************************/
	
	/*
		Descripción : Método que lista los tipos de usuario
		Parametros  : Ninguno.
		Retorna     : Array( ID          => Int, 
		                     DESCRIPCION => Varchar, 
							 ID_ESTATUS  => Int). 
	*/
	public function tipo_usuario(){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'tipo_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function registrar_usuario($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'registrar_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function info_usuario($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'info_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'estatus_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function editar_usuario($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'editar_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'menu_sistema';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método menu_sistema
	/****************************/
	
	/*
		Descripción : Método que lista los menús asociados al usuario
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     ID          => Int, 
							 ID_PADRE    => Int,
		                     DESCRIPCION => Varchar
						   )
	*/
	public function menu_usuario($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'menu_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function asociar_menu_usuario($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'asociar_menu_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function buscar_usuario($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'buscar_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function eliminar_usuario($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'eliminar_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método eliminar_usuario
	/********************************/
	
}//Fin de la clase
/****************/