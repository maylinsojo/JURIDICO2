<?php
/*

	NOMBRE				      : C_imprentas.php
	DESCRIPCIÓN			      : Controlador del frontend
	AUTOR				      : Jessica Rodriguez
	FECHA DE CREACIÓN 	      : 01/02/2018

*/

/*
	Descripción: Clase principal.
*/
class c_imprentas extends CI_Controller
{

	/*
		Descripción: Contructor de la clase principal.
	*/
	function __construct()
	{

		parent::__construct();

		//Cargamos el modelo
		$this->load->model('salo/imprentas/M_imprentas');

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
		              sobre las imprentas.
		Parametros  : Ninguno.
		Retorna     : Una vista.
	*/
	public function index()
	{

		//Cargamos la vista
		$this->load->view("salo/imprentas/v_index");

	}//Fin del método index
	/**********************/
	/*
		Descripción : Método que muestra la información inicial necesaria
		              para la vista salo/imprentas/v_index.
		Parametros  : Ninguno.
		Retorna     : Una vista.
	*/

	public function data_inicial()
	{

		//Indices a evaluar
		$indices = array('id_imprenta','rango');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['id_imprenta'] = $_POST['id_imprenta'];
			$parametros['rango']       = $_POST['rango'];

			echo json_encode($this->M_imprentas->imprentas($parametros));


		}else{

			echo json_encode($validador);

		}//Fin del if;


	}//Fin del método data_incial
	/***************************/

	
		
	/*
		Descripción : Método que registra a una nueva imprenta
		Parametros  : Nombre => id_imprenta  , Tipo => Int, Obligatorio => Si,
		              Nombre => imprenta     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => numero     , Tipo => Int, Obligatorio => Si,
					
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_imprenta(){
		
		//Indices a evaluar
		$indices = array('nombre','direccion','precio');
		//$indices = array('nombre','precio');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
		    $parametros['nombre']        = $_POST['nombre'];
			$parametros['direccion']     = $_POST['direccion'];
			$parametros['precio']        = $_POST['precio'];
			
			
			echo json_encode($this->M_imprentas->registrar_imprenta($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método registrar_imprenta
	/*********************************/
	
	/*
		Descripción : Método que lista a las imprentas creadas
		Parametros  : Ninguno.
		Retorna     : array(
		 					 ID           => Int,
							 NOMBRE       => Varchar,
							 imprenta       => Varchar,
							 NUMERO       => Int
							
		                   ). 
	*/
	public function imprentas_creadas()
	{
	    
		//Indices a evaluar
		$indices = array('id_imprenta','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_imprenta'] = $_POST['id_imprenta'];
			$parametros['rango']     = $_POST['rango'];
			
			echo json_encode($this->M_imprentas->imprentas($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if


	}//Fin del método imprentas_creadas
	/**********************************/

		
/*
		Descripción : Método que lista la información necesaria para editar una imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array( 
		                     INFO => array(
											ID      => Int,
											NOMBRE  => Varchar,
											NOMBRE  => Varchar,
											NUMERO => Varchar
											
									),
							
					  ) 
	*/
	public function info_editar_imprenta(){
		
		//Indices a evaluar
		$indices = array('id_imprenta');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_imprenta'] = $_POST['id_imprenta'];
			
			$data['INFO']     = $this->M_imprentas->info_imprenta($parametros);
			//$data['REGION']   = $this->M_imprentas->region();	
			$data['ESTATUS']  = $this->M_imprentas->estatus_imprenta();	
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método info_editar_imprenta
	/***********************************/
	
	/*
		Descripción : Método que edita la información de la imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero      , Tipo => Varchar , Obligatorio => Si
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_imprenta(){
		
		//Indices a evaluar
		$indices = array('id_imprenta','nombre','precio','estatus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_imprenta']  = $_POST['id_imprenta'];
			$parametros['nombre']       = $_POST['nombre'];
			$parametros['precio']       = $_POST['precio'];
			$parametros['estatus']      = $_POST['estatus'];
						
			echo json_encode($this->M_imprentas->editar_imprenta($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método editar_imprenta
	/*******************************/
	
		/*
		Descripción : Método que busca a una imprenta por nombre
		Parametros  : Nombre => descripcion , Tipo => Varchar, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function buscar_imprenta(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['descripcion'] = $_POST['descripcion'];
			
			echo json_encode($this->M_imprentas->buscar_imprenta($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método buscar_imprenta
	/******************************/
	
	/*
		Descripción : Método que elimina una imprenta
		Parametros  : Nombre => id_imprenta , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_imprenta(){
		
		//Indices a evaluar
		$indices = array('id_imprenta');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_imprenta'] = $_POST['id_imprenta'];
			
			echo json_encode($this->M_imprentas->eliminar_imprenta($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
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
	public function buscar_establecimiento()
	{

		//Indices a evaluar
		$indices = array('nombre_ee');

		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);

		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){

			//Obtenemos los parametros
			$parametros['nombre_ee'] = $_POST['nombre_ee'];

			echo json_encode($this->M_imprentas->buscar_establecimiento($parametros));

		}else{

			echo json_encode($validador);

		}//Fin del if

	}//Fin del método buscar_establecimiento
	/**************************************/


}//Fin de la clase principal
/**************************/

?>
