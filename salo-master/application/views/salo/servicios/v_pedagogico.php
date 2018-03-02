<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>SALO</title>
    
    <?php
      
		//CSS principal de Bootstrap
		echo css_asset('bootstrap.min.css','bootstrap-4.0.0');
		//CSS para el calendario
		echo css_asset('bootstrap-datepicker.css','bootstrap-datepicker');
		//CSS para los iconos
		echo css_asset('font-awesome.min.css','font-awesome-4.7.0');
		//CSS para los menú tipo árbol
        echo css_asset('treed.css','treed');
		//CSS propio de la vista
	    echo css_asset('servicios/v_pedagogico.css','salo');
		
		//JS principal de Jquery
		echo js_asset('jquery-3.2.1.min.js','jquery');		
		//JS Tether necsaria para el Bootstrap 4
		echo js_asset('tether.js','tether-1.3.3/dist');
		//JS principal de Bootstrap
		echo js_asset('bootstrap.min.js','bootstrap-4.0.0');
		//JS para el calendario
		echo js_asset('bootstrap-datepicker.js','bootstrap-datepicker');
		echo js_asset('locales/bootstrap-datepicker.es.js','bootstrap-datepicker');
		//JS principal para dar formato numerico
		echo js_asset('autoNumeric-min.js','autoNumeric');
		//JS propio de la vista
	    echo js_asset('servicios/v_pedagogico.js','salo');
	  
    ?>

</head>
<body>
    
    <div class="container">
    	<div class="row align-items-center justify-content-center">
            <div class="col col-sm-11">
            	
                <nav id="menu_principal" class="navbar">
                    
                    <div class="row">
                    	
                        <div class="col-6"></div>
                        
                        <div class="col-6 text-right">
                        
                   	    	<button id="nueva_planificacion" type="button" class="btn btn-success">Planificar Despacho</button>
                    	
                        </div>
                        
                    </div>
                    
                </nav><!-- Fin navbar -->
            
            </div>
            
            <div class="col col-sm-11 wrapper_despachos"></div>
            <div class="col col-sm-11 wrapper_paginador"></div>
            
        </div>
    </div><!-- Fin .container -->
	
</body>
</html>