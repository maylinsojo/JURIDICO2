<?php
/*

	NOMBRE				      : C_transportistas.php
	DESCRIPCIÓN			      : Controlador del frontend
	AUTOR				      : Jessica Rodriguez
	FECHA DE CREACIÓN 	      : 13/11/2017

*/

/*
	Descripción: Clase principal. 
*/
class c_transportistas extends CI_Controller
{
    
	/*
		Descripción: Contructor de la clase principal. 
	*/
	function __construct()
	{
		
		parent::__construct();
		
		//Cargamos el modelo
		$this->load->model('salo/transportistas/M_transportistas');

	}//Fin del contructor de la clase
	/*******************************/
	
	/*
		Descripción : Método verifica los parametros
		Parametros  : Nombre => $keys    , Tipo => Array,
		              Nombre => $valores , Tipo => Array
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
		Descripción : Método que muestra la vista para realizar operaciones
		              sobre las transportistas.
		Parametros  : Ninguno.
		Retorna     : Una vista. 
	*/
	public function index()
	{
	    
		//Cargamos la vista
		$this->load->view("salo/transportistas/v_index");
	
	}//Fin del método index
	/**********************/
	
	/*
		Descripción : Método que muestra la información inicial necesaria
		              para la vista salo/transportistas/v_index.
		Parametros  : Ninguno.
		Retorna     : Una vista. 
	*/
	
	public function data_inicial()
	{
	    
		//Indices a evaluar
		$indices = array('id_transp','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_transp'] = $_POST['id_transp'];
			$parametros['rango']     = $_POST['rango'];
			
			echo json_encode($this->M_transportistas->transportistas($parametros));
		
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if;


	}//Fin del método data_incial
	/***************************/
	
	/*
		Descripción : Método que registra a una nueva transportista
		Parametros  : Nombre => id_transp  , Tipo => Int, Obligatorio => Si,
		              Nombre => nombre           , Tipo => Varchar, Obligatorio => Si,
					  Nombre => conductor       , Tipo => booleano, Obligatorio => Si,
					
					
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_transportista(){
		
		//Indices a evaluar
		$indices = array('nombre','conductor');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
		    $parametros['nombre']     = $_POST['nombre'];
			$parametros['conductor']  = $_POST['conductor'];
			
			
			echo json_encode($this->M_transportistas->registrar_transportista($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método registrar_transportista
	/***************************************/
	
	/*
		Descripción : Método que lista a las transportistas creadas
		Parametros  : Ninguno.
		Retorna     : array(
		 					 ID           => Int,
							 NOMBRE       => Varchar,
						
							
		                   ). 
	*/
	public function transportistas_creadas()
	{
	    
		//Indices a evaluar
		$indices = array('id_transp','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_transp'] = $_POST['id_transp'];
			$parametros['rango']     = $_POST['rango'];
			
			echo json_encode($this->M_transportistas->transportistas($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if


	}//Fin del método transportistas_creadas
	/**************************************/
	
			
/*
		Descripción : Método que lista la información necesaria para editar una transportista
		Parametros  : Nombre => id_transp , Tipo => Int, Obligatorio => Si
		Retorna     : array( 
		                     INFO => array(
											ID      => Int,
											NOMBRE  => Varchar,
											NOMBRE  => Varchar,
											NUMERO => Varchar
											
									),
							
					  ) 
	*/
	public function info_editar_transportista(){
		
		//Indices a evaluar
		$indices = array('id_transp');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_transp'] = $_POST['id_transp'];
			
			$data['INFO']     = $this->M_transportistas->info_transportista($parametros);
			
			$data['ESTATUS']  = $this->M_transportistas->estatus_transportista();	
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método info_editar_transportista
	/*****************************************/
	
	/*
		Descripción : Método que edita la información de la transportista
		Parametros  : Nombre => id_transp , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero      , Tipo => Varchar , Obligatorio => Si
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_transportista(){
		
		//Indices a evaluar
		$indices = array('id_transp','nombre','estatus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_transp']    = $_POST['id_transp'];
			$parametros['nombre']       = $_POST['nombre'];
			$parametros['estatus']      = $_POST['estatus'];
						
			echo json_encode($this->M_transportistas->editar_transportista($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método editar_transportista
	/************************************/
	
	/*
		Descripción : Método que busca a una transportista
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    ID     => Int,
							NOMBRE => Varchar
					  )  
	*/
	public function buscar_transportista(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['descripcion'] = $_POST['descripcion'];
			
			echo json_encode($this->M_transportistas->buscar_transportista($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método buscar_transportista
	/*************************************/
	
	/*
		Descripción : Método que elimina una transportista
		Parametros  : Nombre => id_transportista , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_transportista(){
		
		//Indices a evaluar
		$indices = array('id_transp');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_transp'] = $_POST['id_transp'];
			
			echo json_encode($this->M_transportistas->eliminar_transportista($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método eliminar_transportista
	/********************************/
	
	
	/*
		Descripción : Método que lista a los conductores asociados a la transportista
		Parametros  : Nombre => id_transp , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 TELEFONO      => Varchar,
							 OTRO_TELEFONO => Varchar,
							 CORREO        => Varchar	
		                   )
	*/
	public function info_conductores()
	{
	    
		//Indices a evaluar
		$indices = array('id_transp');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_transp'] = $_POST['id_transp'];
		
			$data['CONDUCTORES'] = $this->M_transportistas->conductores_transportista($parametros);
			
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método conductores_creados
	/***********************************/
	
	/*
		Descripción : Método que asocia los conductores a las transportistas
		Parametros  : Nombre => id_transp    , Tipo => Int     , Obligatorio => Si
					  Nombre => nombre   , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo   , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf      , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function asociar_conductor()
	{
	   		
		
		//Indices a evaluar
		$indices = array('id_transp','nombre','correo','tlf','otro_tlf');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_transp']    = $_POST['id_transp'];
			$parametros['nombre']       = $_POST['nombre'];
			$parametros['correo']       = $_POST['correo'];
			$parametros['tlf']          = $_POST['tlf'];
			$parametros['otro_tlf']     = $_POST['otro_tlf'];
			
			echo json_encode($this->M_transportistas->asociar_conductor($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método asociar_conductor
	/**********************************/
	/*
		Descripción : Método que lista a los conductores asociados ala transportista
		Parametros  : Nombre => id_transp , Tipo => Int , Obligatorio => Si
		Retorna     : array(
		 					 ID            => Int,
							 NOMBRE        => Varchar,
							 TELEFONO      => Varchar,
							 OTRO_TELEFONO => Varchar,
							 CORREO        => Varchar	
		                   )
	*/
	public function conductores_transportista()
	{
	    
		//Indices a evaluar
		$indices = array('id_transp');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_transp'] = $_POST['id_transp'];
		
			echo json_encode($this->M_transportistas->conductores_transportista($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método conductores_transportista
	/*****************************************/
	
	/*
		Descripción : Método que edita los datos del conductor
		Parametros  : Nombre => id_conductor , Tipo => Int     , Obligatorio => Si
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si
					  Nombre => correo      , Tipo => Varchar , Obligatorio => Si
					  Nombre => tlf         , Tipo => Int     , Obligatorio => Si
					  Nombre => otro_tlf    , Tipo => Int     , Obligatorio => No
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_conductor()
	{
	    
		//Indices a evaluar
		$indices = array('id_conductor','nombre','correo','tlf','otro_tlf');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_conductor'] = $_POST['id_conductor'];
			$parametros['nombre']       = $_POST['nombre'];
			$parametros['correo']       = $_POST['correo'];
			$parametros['tlf']          = $_POST['tlf'];
			$parametros['otro_tlf']     = $_POST['otro_tlf'];
			
			echo json_encode($this->M_transportistas->editar_conductor($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método editar_conductor
	/*******************************/
	
	/*
		Descripción : Método que elimina los conductor de la transportista
		Parametros  : Nombre => id_cconductor , Tipo => Int , Obligatorio => Si
		Retorna     : Array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_conductor()
	{
	    
		//Indices a evaluar
		$indices = array('id_conductor');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_conductor'] = $_POST['id_conductor'];
			
			echo json_encode($this->M_transportistas->eliminar_conductor($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método eliminar_conductor
	/*********************************/
	
	
	
	

}//Fin de la clase principal
/**************************/

?>