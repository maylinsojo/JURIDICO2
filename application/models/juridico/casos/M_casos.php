<?php
/*
	NOMBRE			  : M_casos.php
	DESCRIPCIÓN		  : Modelo 
	AUTOR		      : Maylin SOjo
	FECHA DE CREACIÓN : 15/02/2018

*/

/*
    Descripción : Clase principal.
*/
class m_casos extends CI_Model{
    
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
	/*public function usuarios($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/juridico/webservices/dataservices/juridico/usuarios/c_wds_usuarios";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'usuarios';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método usuarios
	/************************/
	
	
	
	public function procedimientos(){

		$url         = "http://".$_SERVER['SERVER_NAME']."/juridico/webservices/dataservices/juridico/casos/c_wds_casos";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'procedimientos';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método procedimientos
	/*******************************/	
	
	
	
	public function generos(){

		$url         = "http://".$_SERVER['SERVER_NAME']."/juridico/webservices/dataservices/juridico/casos/c_wds_casos";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'generos';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método generos
	/*************************/			
	
	
}//Fin de la clase
/****************/