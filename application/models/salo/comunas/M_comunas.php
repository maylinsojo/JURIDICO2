<?php
/*
	NOMBRE			  : M_comunas.php
	DESCRIPCIÓN		  : Modelo 
	AUTOR		      : Jessica Rodriguez
	FECHA DE CREACIÓN : 06/11/2017

*/

/*
    Descripción : Clase principal.
*/
class m_comunas extends CI_Model{
    
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
		Descripción : Método obtiene las comunas creadas
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							  
						)
					  ) 
	*/
	public function comunas($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/comunas/c_wds_comunas";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'comunas';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método comunas
	/************************/
	
	/*
		Descripción : Método que lista las regiones para seleccionar la ubicación del establecimiento
		Parametros  : Ninguno.
		Retorna     : Array( ID      => Int, 
		                     NOMBRE  => Varchar,
							 COMUNA  => Varchar, 
							 NUMERO  => Varchar). 
	*/
	public function region(){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/comunas/c_wds_comunas";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'region';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método region
	/***********************/
	
	
	
	/*
		Descripción : Método que registra a una nueva comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre    , Tipo => Varchar, Obligatorio => Si,
					
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_comuna($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/comunas/c_wds_comunas";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'registrar_comuna';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método registrar_comuna
	/*********************************/
	
	/*
		Descripción : Método que lista la información de la región
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID         => Int,
							NOMBRE     => Varchar,
							COMUNA     => Varchar,
							NUMERO     => Varchar,
							
					  ) 
	*/
	public function info_comuna($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/comunas/c_wds_comunas";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'info_comuna';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método info_comuna
	/****************************/
	
	/*
		Descripción : Método que lista los estatus de la comuna
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     ID          => Int, 
		                     DESCRIPCION => Varchar
						   ). 
	*/
	public function estatus_comuna(){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/comunas/c_wds_comunas";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'estatus_comuna';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método estatus_comuna
	/*******************************/
		
		
	/*
		Descripción : Método que edita la información de la comuna
		Parametros  : Nombre => id_comuna , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => comuna     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero     , Tipo => Varchar , Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_comuna($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/comunas/c_wds_comunas";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'editar_comuna';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método editar_comuna
	/******************************/
	
	
	/*
		Descripción : Método que busca a una comuna por nombre 
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_comuna($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/comunas/c_wds_comunas";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'buscar_comuna';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método buscar_comuna
	/******************************/
	
	/*
		Descripción : Método que elimina la comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_comuna($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/comunas/c_wds_comunas";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'eliminar_comuna';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método eliminar_comuna
	/********************************/
	
	
	
}//Fin de la clase
/****************/