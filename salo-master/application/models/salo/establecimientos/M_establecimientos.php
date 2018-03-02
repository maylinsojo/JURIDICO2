<?php
/*
	NOMBRE			  : M_establecimientos.php
	DESCRIPCIÓN		  : Modelo 
	AUTOR		      : Jessica Rodriguez
	FECHA DE CREACIÓN : 15/10/2017

*/

/*
    Descripción : Clase principal.
*/
class m_establecimientos extends CI_Model{
    
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
		Descripción : Método que lista las regiones disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
						id,
						nombre,
						numero
		              ) 
	*/
	public function regiones(){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'regiones';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function comunas_region($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'comunas_region';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método comunas_region
	/******************************/
	
	/*
		Descripción : Método obtiene los establecimientos creados
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
	public function establecimientos($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'establecimientos';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function registrar_establecimiento($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'registrar_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function info_establecimiento($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'info_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'estatus_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function eliminar_establecimiento($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'eliminar_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function editar_establecimiento($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'editar_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método editar_establecimiento
	/**************************************/
	
	/*
		Descripción : Método que busca a un establecimiento
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    ID     => Int,
							NOMBRE => Varchar
					  ) 
	*/
	public function buscar_ee($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'buscar_ee';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'nivel_academico';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método nivel_academico
	/*******************************/
	
	/*
		Descripción : Método que lista los cursos aociados del establecimiento
		Parametros  : Nombre => id_ee , Tipo => Int , Obligatorio => Si
		Retorna     :  Array( 
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
	public function cursos_establecimiento($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'cursos_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function eliminar_curso($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'eliminar_curso';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function editar_curso($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'editar_curso';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function nivel_curso($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'nivel_curso';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método nivel_curso
	/***************************/
	
	/*
		Descripción : Método que asocia el curso a un establecimiento
		Parametros  : Nombre => id_ee  , Tipo => Int, Obligatorio => Si
					  Nombre => curso  , Tipo => Int, Obligatorio => Si
					  Nombre => numEst , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function agregar_curso($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'agregar_curso';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método agregar_curso
	/*****************************/
	
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
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'cursos';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método cursos
	/**********************/
	
	/*
		Descripción : Método que lista los servicios dispinibles para un Establecimineto Escolar
		Parametros  : Ninguno.
		Retorna     : Array( 
		                     Array( 
							       ID          => Int, 
							       DESCRIPCION => Varchar
							 )
						   ) 
	*/
	public function servicios(){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'servicios';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método servicios
	/*************************/
	
	/*
		Descripción : Método que lista los servicios asociados al establecimiento
		Parametros  : Ninguno.
		Retorna     : Array( 
		                Array(
		                     ID          => Int,
		                     DESCRIPCION => Varchar
						)
                      )	
	*/
	public function servicio_establecimiento($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'servicio_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método servicio_establecimiento
	/****************************************/
	
	/*
		Descripción : Método que asocia o desasocia los servicios al establecimiento
		Parametros  : Nombre => id_ee     , Tipo => Int   , Obligatorio => Si
		              Nombre => servicios , Tipo => Array , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function asociar_servicio_establecimiento($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'asociar_servicio_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método asociar_servicio_establecimiento
	/************************************************/
	
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
	public function contactos_establecimiento($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'contactos_establecimiento';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function asociar_contacto($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'asociar_contacto';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function eliminar_contacto($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'eliminar_contacto';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
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
	public function editar_contacto($parametros){
		
		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/establecimientos/c_wds_establecimientos";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'editar_contacto';
		
		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);
		
		return $respuesta_servicio;
		
	}//Fin del método editar_contacto
	/*******************************/
	
}//Fin de la clase
/****************/