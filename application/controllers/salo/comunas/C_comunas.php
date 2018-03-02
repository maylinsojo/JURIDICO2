<?php
/*

	NOMBRE				      : C_comunas.php
	DESCRIPCIÓN			      : Controlador del frontend
	AUTOR				      : Jessica Rodriguez
	FECHA DE CREACIÓN 	      : 15/10/2017

*/

/*
	Descripción: Clase principal. 
*/
class c_comunas extends CI_Controller
{
    
	/*
		Descripción: Contructor de la clase principal. 
	*/
	function __construct()
	{
		
		parent::__construct();
		
		//Cargamos el modelo
		$this->load->model('salo/comunas/M_comunas');

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
		              sobre las comunas.
		Parametros  : Ninguno.
		Retorna     : Una vista. 
	*/
	public function index()
	{
	    
		//Cargamos la vista
		$this->load->view("salo/comunas/v_index");
	
	}//Fin del método index
	/**********************/
	
	
	/*
		Descripción : Método que muestra la información inicial necesaria
		              para la vista salo/comunas/v_index.
		Parametros  : Ninguno.
		Retorna     : Una vista. 
	*/
	
	public function data_inicial()
	{
	    
		//Indices a evaluar
		$indices = array('id_comuna','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_comuna'] = $_POST['id_comuna'];
			$parametros['rango']     = $_POST['rango'];
			
			echo json_encode($this->M_comunas->comunas($parametros));
		
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if;


	}//Fin del método data_incial
	/***************************/
	
	/*
		Descripción : Método que lista los tipos de region
		Parametros  : Ninguno.
		Retorna     : Array( ID          => Int, 
		                     DESCRIPCION => Varchar, 
							 ID_ESTATUS  => Int). 
	*/
	public function region()
	{

		echo json_encode($this->M_comunas->region());

	}//Fin del método regiones
	/****************************/
	
	/*
		Descripción : Método que registra a una nueva comuna
		Parametros  : Nombre => id_comuna  , Tipo => Int, Obligatorio => Si,
		              Nombre => comuna     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => nombre     , Tipo => Varchar, Obligatorio => Si,
					  Nombre => numero     , Tipo => Int, Obligatorio => Si,
					
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function registrar_comuna(){
		
		//Indices a evaluar
		$indices = array('nombre','region');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
		    $parametros['nombre']     = $_POST['nombre'];
			$parametros['region']     = $_POST['region'];
			
			
			echo json_encode($this->M_comunas->registrar_comuna($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método registrar_comuna
	/*********************************/
	
	/*
		Descripción : Método que lista a las comunas creadas
		Parametros  : Ninguno.
		Retorna     : array(
		 					 ID           => Int,
							 NOMBRE       => Varchar,
							 COMUNA       => Varchar,
							 NUMERO       => Int
							
		                   ). 
	*/
	public function comunas_creadas()
	{
	    
		//Indices a evaluar
		$indices = array('id_comuna','rango');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_comuna'] = $_POST['id_comuna'];
			$parametros['rango']     = $_POST['rango'];
			
			echo json_encode($this->M_comunas->comunas($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if


	}//Fin del método comunas_creadas
	/********************************/
	
/*
		Descripción : Método que lista la información necesaria para editar una comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array( 
		                     INFO => array(
											ID      => Int,
											NOMBRE  => Varchar,
											NOMBRE  => Varchar,
											NUMERO => Varchar
											
									),
							
					  ) 
	*/
	public function info_editar_comuna(){
		
		//Indices a evaluar
		$indices = array('id_comuna');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_comuna'] = $_POST['id_comuna'];
			
			$data['INFO']     = $this->M_comunas->info_comuna($parametros);
			$data['REGION']   = $this->M_comunas->region();	
			$data['ESTATUS']  = $this->M_comunas->estatus_comuna();	
			
			echo json_encode($data);
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método info_editar_comuna
	/***********************************/
	
	/*
		Descripción : Método que edita la información de la comuna
		Parametros  : Nombre => id_comuna , Tipo => Int     , Obligatorio => Si,
		              Nombre => nombre      , Tipo => Varchar , Obligatorio => Si,
					  Nombre => numero      , Tipo => Varchar , Obligatorio => Si
					 
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function editar_comuna(){
		
		//Indices a evaluar
		$indices = array('id_comuna','nombre','region','estatus');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_comuna']  = $_POST['id_comuna'];
			$parametros['nombre']     = $_POST['nombre'];
			$parametros['region']     = $_POST['region'];
			$parametros['estatus']    = $_POST['estatus'];
						
			echo json_encode($this->M_comunas->editar_comuna($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
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
	public function buscar_comuna(){
		
		//Indices a evaluar
		$indices = array('descripcion');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['descripcion'] = $_POST['descripcion'];
			
			echo json_encode($this->M_comunas->buscar_comuna($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método buscar_comuna
	/******************************/
	
	/*
		Descripción : Método que elimina una comuna
		Parametros  : Nombre => id_comuna , Tipo => Int, Obligatorio => Si
		Retorna     : array(
		                    CODIGO_RESPUESTA  => Int,
							MENSAJE_RESPUESTA => Varchar
					  ) 
	*/
	public function eliminar_comuna(){
		
		//Indices a evaluar
		$indices = array('id_comuna');
		
		//Evaluamos los parametros
		$validador = $this->evaluar_parametros($indices,$_POST);
		
		//Evaluamos
		if($validador['CODIGO_RESPUESTA'] == 1){
		
			//Obtenemos los parametros
			$parametros['id_comuna'] = $_POST['id_comuna'];
			
			echo json_encode($this->M_comunas->eliminar_comuna($parametros));
			
		}else{
			
			echo json_encode($validador);
			
		}//Fin del if
		
	}//Fin del método eliminar_comuna
	/********************************/

}//Fin de la clase principal
/**************************/

?>