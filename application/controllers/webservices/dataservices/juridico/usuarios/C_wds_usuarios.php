<?php
/*
	NOMBRE				: C_wds_usuario.php
	PARÁMETROS			: (none)
	DESCRIPCIÓN			: 
	FECHA DE CREACIÓN 	: 11/10/2017
*/

/*
	Descripción: Libreria para crear el Rest Server
*/
require(APPPATH.'libraries/REST_Controller.php');  

/*
	Descripción: Clase principal
*/
class c_wds_usuarios extends REST_Controller
{  
    
	/*
		Descripción: Constructor de la clase principal
	*/
	function __construct(){
		
		parent::__construct();
		$this->load->model('webservices/dataservices/juridico/usuarios/m_wds_usuarios');//Cargamos el modelo
	
	}//Fin del contructor de la clase
	/*******************************/
	
	/*
		Descripción : Método verifica los parametros
		Parametros  : Nombre => $keys    , Tipo => Array, Obligatorio => Si
		              Nombre => $valores , Tipo => Array, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
						   ) 
	*/
	private function evaluar_parametros($keys, $valores){
		
		//Obtenemos el n° de llaves a verificar
		$numKey = count($keys);
		
		//Respuesta por defecto
		$respuesta = array(
						   'CODIGO_RESPUESTA'  => 1,
						   'MENSAJE_RESPUESTA' => 'Todos los parametros existen.'
						  );
							 
		//Recorremos las llaves
		for($i = 0; $i < $numKey; $i++){
			
			//Evaluamos
			if(!array_key_exists($keys[$i], $valores)){
				
				//Definimos la respuesta de error
				$respuesta = array(
				               'CODIGO_RESPUESTA'  => 0,
							   'MENSAJE_RESPUESTA' => 'El parametro '.$keys[$i].' no se encuentra definido'
				             );
							 
				break;
				
			}//Fin del if
			
		}//Fin del for
		
		return $respuesta;
		
	}//Fin del método evaluar_parametros
	/**********************************/
	
	/*
		Descripción : Método obtiene los usuarios creados
		Parametros  : Ninguno
		Retorna     : array(
		                array( ID     => Int,
							   CORREO => Varchar
						)
					  ) 
	*/
	public function usuarios_get(){
		
		//Indices a evaluar
		$indices = array('id_usuario','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_usuario'] = $this->get('id_usuario');
			$parametros['rango']      = $this->get('rango');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_usuarios->usuarios($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método usuarios
	/************************/
	
	/*
		Descripción : Método que lista los tipos de usuario
		Parametros  : Ninguno.
		Retorna     : Array( ID          => Int, 
		                     DESCRIPCION => Varchar, 
							 ID_ESTATUS  => Int). 
	*/
	public function tipo_usuario_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_usuarios->tipo_usuario();
		
		$this->response($respuesta);
		
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
	public function registrar_usuario_post(){
		
		//Indices a evaluar
		$indices = array('id_usuario','correo','clave','tipo_usu','nombre','correo2');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_usuario'] = $this->post('id_usuario');
			$parametros['correo']     = $this->post('correo');
			$parametros['clave']      = $this->post('clave');
			$parametros['tipo_usu']   = $this->post('tipo_usu');
			$parametros['nombre']     = $this->post('nombre');
			$parametros['correo2']    = $this->post('correo2');
			
			/*
			$parametros['id_usuario'] = 1;
			$parametros['correo']     = 'maylin.sojo@gmail.com';
			$parametros['clave']      = 'MTIzNDU2Nzg=';
			$parametros['tipo_usu']   = 1;
			$parametros['nombre']     = 'Maylin Sojo';
			$parametros['correo2']    = 'maylin.sojo@gmail.com';			
			
			*/			
			
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_usuarios->registrar_usuario($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
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
	public function info_usuario_get(){
		
		//Indices a evaluar
		$indices = array('id_usuario');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_usuario'] = $this->get('id_usuario');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_usuarios->info_usuario($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
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
	public function estatus_usuario_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_usuarios->estatus_usuario();
		
		$this->response($respuesta);
		
	}//Fin del método estatus_usuario
	/*******************************/
	
	/*
		Descripción : Método que edita la información del usuario
		Parametros  : Nombre => id_usuario , Tipo => Int     , Obligatorio => Si,
		              Nombre => correo     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => clave      , Tipo => Varchar , Obligatorio => No,
					  Nombre => tipo_usu   , Tipo => Int     , Obligatorio => Si,
					  Nombre => nombre     , Tipo => Varchar , Obligatorio => Si,
					  Nombre => estatus    , Tipo => Int     , Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_usuario_post(){
		
		//Indices a evaluar
		$indices = array('id_usuario','correo','clave','tipo_usu','nombre','correo2','estatus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_usuario'] = $this->post('id_usuario');
			$parametros['correo']     = $this->post('correo');
			$parametros['clave']      = $this->post('clave');
			$parametros['tipo_usu']   = $this->post('tipo_usu');
			$parametros['nombre']     = $this->post('nombre');
			$parametros['correo2']    = $this->post('correo2');
			$parametros['estatus']    = $this->post('estatus');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_usuarios->editar_usuario($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
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
	public function menu_sistema_get(){
		
		//Obtenemos la respuesta
		$respuesta = $this->m_wds_usuarios->menu_sistema();
		
		$this->response($respuesta);
		
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
	public function menu_usuario_get(){
		
		//Indices a evaluar
		$indices = array('id_usuario');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_usuario'] = $this->get('id_usuario');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_usuarios->menu_usuario($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
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
	public function asociar_menu_usuario_post(){
		
		//Indices a evaluar
		$indices = array('id_usuario','menus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_usuario'] = $this->post('id_usuario');
			$parametros['menus']      = $this->post('menus');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_usuarios->asociar_menu_usuario($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
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
	public function buscar_usuario_get(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->get());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['descripcion'] = $this->get('descripcion');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_usuarios->buscar_usuario($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
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
	public function eliminar_usuario_post(){
		
		//Indices a evaluar
		$indices = array('id_usuario');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$this->post());
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Parametros
			$parametros['id_usuario'] = $this->post('id_usuario');
			
			//Obtenemos la respuesta
			$respuesta = $this->m_wds_usuarios->eliminar_usuario($parametros);
			
		}else{
			
			$respuesta = $validador;
			
		}//Fin del if		

		$this->response($respuesta);
		
	}//Fin del método eliminar_usuario
	/********************************/
		
}//Fin de la clase principal
/**************************/
?>
