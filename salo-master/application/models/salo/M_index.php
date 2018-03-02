<?php
/*
	NOMBRE			  : M_salo.php
	DESCRIPCIÓN		  : Modelo 
	AUTOR		      : David Molina
	FECHA DE CREACIÓN : 11/10/2017

*/

/*
    Descripción : Clase principal.
*/
class m_index extends CI_Model{
    
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
	public function login($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/ruleservices/salo/c_wrs_salo";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'login';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método login
	/*********************/
	
	/*
		Descripción : Método obtiene los menus asociados al usuario
		Parametros  : Nombre => id_usuario , Tipo => Int
		Retorna     : array(
		                array( ID          => Int,
							   DESCRIPCION => Varchar,
							   URL         => Varchar
						)
					  ) 
	*/
	public function menu_usuario($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/c_wds_salo";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'menu_usuario';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método menu_usuario
	/****************************/
	
}//Fin de la clase
/****************/