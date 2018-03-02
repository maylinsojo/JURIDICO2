<?php
/*
	NOMBRE			  : M_pedagogico.php
	DESCRIPCIÓN		  : Modelo del servicio Pedagógico
	AUTOR		      : David Molina
	FECHA DE CREACIÓN : 19/11/2017

*/

/*
    Descripción : Clase principal.
*/
class M_pedagogico extends CI_Model{

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
		Descripción : Método lista los despachos creados
		Parametros  : Nombre => rango , Tipo => Int, Obligatorio => Si
		Retorna     : array(
									  despachos => array(
														array( ID_DESPACHO        => Int,
															   ID_ESTABLECIMIENTO => Int,
															   ESTABLECIMIENTO    => Varchar,
															   ID_REGION          => Int,
															   REGION             => Varchar,
															   COMUNA             => Varchar,
															   FECHA_DESPACHO     => Varchar,
															   ID_ESTATU          => Int,
															   ESTATUS            => Varchar
														)
													  ),
									   numDesp => Int
								 )
	*/
	public function despachos($parametros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'despachos';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método despachos
	/*************************/
	
	/*
		Descripción : Método que busca a un establecimiento en el filtro
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    ID     => Int,
							NOMBRE => Varchar
					  )
	*/
	public function buscar_ee($parametros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'buscar_ee';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método buscar_ee
	/*************************/

	/*
		Descripción : Método que lista los establecimientos que coincidan con la busqueda para el despacho
		Parametros  : Nombre => nombre_ee , Tipo => Varchar, Obligatorio => Si
		Retorna     : Array(
		                     ID              => Int,
		                     ESTABLECIMIENTO => Varchar,
												 COMUNA          => Varchar,
												 REGION          => Varchar
						      )
	*/
	public function buscar_establecimiento($parametros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'buscar_establecimiento';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método buscar_establecimiento
	/**************************************/

	/*
		Descripción : Método que lista los cursos asociados al establecimiento
		Parametros  : Nombre => id_ee , Tipo => int, Obligatorio => Si
		Retorna     : Array(
		                     id          => Int,
		                     descripcion => Varchar
						      )
	*/
	public function cursosAsociados($parametros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'cursosAsociados';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método cursosAsociados
	/*******************************/

  /*
		Descripción : Método que lista las imprentas disponibles
		Parametros  : Ninguno
    Retorna     : array(
        						array(
        							ID     => Int,
        							NOMBRE => Varchar
        						)
        					)
	*/
	public function imprentas(){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'imprentas';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método imprentas
	/*************************/

	/*
		Descripción : Método que lista los módulos asociados al servicio pedagógico
		Parametros  : Ninguno
		Retorna     : array(
        						array(
        							ID          => Int,
        							DESCRIPCION => Varchar
        						)
      					  )
	*/
	public function modulo_pedagogico(){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'modulo_pedagogico';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método modulo_pedagogico
	/*********************************/

	/*
		Descripción : Método que lista los transportistas creados
		Parametros  : Ninguno
		Retorna     : Array(
						Array(
							ID                => Int,
							NOMBRE            => Varchar,
							LISTA_CONDUCTORES => Int
						)
					  )
	*/
	public function transportistas(){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'transportistas';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método transportistas
	/******************************/

	/*
		Descripción : Método que lista los conductores asociados a la transportista
		Parametros  : Nombre => id_transportista , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
						 Array(
								ID     => Int,
								NOMBRE => Varchar
							  )
					  )
	*/
	public function conductores($paramtros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = $paramtros;
		$metodo_curl = 'GET';
		$metodo      = 'conductores';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método conductores
	/***************************/

	/*
		Descripción : Método que lista las asignaturas disponibles
		Parametros  : Ninguno.
		Retorna     : Array(
										ID          => Int,
										DESCRIPCION => Varchar
								  )
	*/
	public function asignaturas(){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'asignaturas';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método asignaturas
	/***************************/

	/*
		Descripción : Método que los productos que los servicios pueden asociaer
		Parametros  : Ninguno.
		Retorna     : Array(
										id          => Int,
										descripcion => Varchar
								  )
	*/
	public function producto_servicio(){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'producto_servicio';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del metodo producto_servicio
	/*********************************/

	/*
		Descripción : Método que lista el precio de la guia segun el modulo seleccionado
		Parametros  : Nombre => id_modulo , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
							ID          => Int,
							DESCRIPCION => Varchar
					  )
	*/
	public function precio_guia($parametros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/ruleservices/salo/servicios/c_wrs_pedagogico";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'precio_guia';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método precio_guia
	/***************************/

	/*
		Descripción : Método que crea un nuevo despacho
		Parametros  : Nombre => arrayItems      , Tipo => Array   , Obligatorio => Si,
		              Nombre => establecimiento , Tipo => Int     , Obligatorio => Si,
								  Nombre => transportista   , Tipo => Int     , Obligatorio => Si,
								  Nombre => conductor       , Tipo => Int     , Obligatorio => Si,
								  Nombre => fecha           , Tipo => Varchar , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							         MENSAJE_RESPUESTA => Varchar
					        )
	*/
	public function nuevo_despacho($parametros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'nuevo_despacho';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método nuevo_despacho
	/******************************/

	/*
		Descripción : Método lista los datos del despacho
		Parametros  : Nombre => id_desp , Tipo => Int, Obligatorio => Si
		Retorna     : Array(
		               ID_DESPACHO        => Int,
					   ID_ESTABLECIMIENTO => Int,
					   ESTABLECIMIENTO    => Varchar,
					   ID_REGION          => Int,
					   REGION             => Varchar,
					   COMUNA             => Varchar,
					   FECHA_DESPACHO     => Varchar,
					   ID_ESTATU          => Int,
					   ESTATUS            => Varchar,
					   ITEMS              => Array(
													ID             => Int,
													ID_MODULO_PEDA => Int,
													CANTIDAD       => Int,
													ID_ASIGNATURA  => Int,
													PRECIO         => Float
											  )
				      )
	*/
	public function info_despacho($parametros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = $parametros;
		$metodo_curl = 'GET';
		$metodo      = 'info_despacho';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método info_despacho
	/*****************************/

	/*
		Descripción : Método que lista los estatus del espacho
		Parametros  : Ninguno
		Retorna     : Array(
		                Array(
		                    DESCRIPCION => Varchar,
							VALOR       => Int
						)
					  )
	*/
	public function estatus_despacho(){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = NULL;
		$metodo_curl = 'GET';
		$metodo      = 'estatus_despacho';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método estatus_despacho
	/********************************/

	/*
		Descripción : Método que edita la información de un depacho
		Parametros  : Nombre => arrayItems      , Tipo => Array   , Obligatorio => Si,
		              Nombre => establecimiento , Tipo => Int     , Obligatorio => Si,
					  Nombre => transportista   , Tipo => Int     , Obligatorio => Si,
					  Nombre => conductor       , Tipo => Int     , Obligatorio => Si,
					  Nombre => fecha           , Tipo => Varchar , Obligatorio => Si,
					  Nombre => id_desp         , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  )
	*/
	public function editar_despacho($parametros){

		$url         = "http://".$_SERVER['SERVER_NAME']."/salo/webservices/dataservices/salo/servicios/c_wds_pedagogico";
		$paramtros   = $parametros;
		$metodo_curl = 'POST';
		$metodo      = 'editar_despacho';

		$respuesta_servicio = $this->servicio_rest($url,$paramtros,$metodo_curl,$metodo);

		return $respuesta_servicio;

	}//Fin del método editar_despacho
	/*******************************/

}//Fin de la clase
/****************/
