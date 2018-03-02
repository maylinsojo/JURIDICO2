<?php
/*
	NOMBRE			  : M_imprentas.php
	DESCRIPCIÓN		  : Modelo 
	AUTOR		      : Jessica Rodriguez
	FECHA DE CREACIÓN : 06/11/2017

*/

/*
    Descripción : Clase principal.
*/
class m_imprentas extends CI_Model{
    
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
		Descripción : Método obtiene las imprentas creadas
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							  
						)
					  ) 
	*/
	public function imprentas($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/imprentas/c_wds_imprentas";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'imprentas';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método imprentas
	/**************************/
	
	
	/*
		Descripción : Método que registra a una nueva imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre    , Tipo => Varchar, Obligatorio => Si,
					
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_imprenta($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/imprentas/c_wds_imprentas";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'registrar_imprenta';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método registrar_imprenta
	/*********************************/
	
		/*
		Descripción : Método que lista la información de la región
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    ID         => Int,
							NOMBRE     => Varchar,
							imprenta     => Varchar,
							NUMERO     => Varchar,
							
					  ) 
	*/
	public function info_imprenta($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/imprentas/c_wds_imprentas";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'info_imprenta';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método info_imprenta
	/****************************/
	
	/*
		Descripción : Método que lista los estatus de la imprenta
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     ID          => Int, 
		                     DESCRIPCION => Varchar
						   ). 
	*/
	public function estatus_imprenta(){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/imprentas/c_wds_imprentas";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'estatus_imprenta';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método estatus_imprenta
	/*******************************/
		
		
	/*
		Descripción : Método que edita la información de la imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => imprenta     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero     , Tipo => Varchar , Obligatorio => Si,
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_imprenta($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/imprentas/c_wds_imprentas";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'editar_imprenta';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function buscar_imprenta($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/imprentas/c_wds_imprentas";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'buscar_imprenta';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function eliminar_imprenta($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/imprentas/c_wds_imprentas";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'eliminar_imprenta';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/imprentas/c_wds_imprentas";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'buscar_establecimiento';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método buscar_establecimiento
	/**************************************/

	
	
	
}//Fin de la clase
/****************/	
	