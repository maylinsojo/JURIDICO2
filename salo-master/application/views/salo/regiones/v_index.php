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
		//CSS para los iconos
		echo css_asset('font-awesome.min.css','font-awesome-4.7.0');
		//CSS propio de la vista
	    echo css_asset('regiones/v_index.css','salo');
		
		//JS principal de Jquery
		echo js_asset('jquery-3.2.1.min.js','jquery');
		//JS Tether necsaria para el Bootstrap 4
		echo js_asset('tether.js','tether-1.3.3/dist');
		//JS principal de Bootstrap
		echo js_asset('bootstrap.min.js','bootstrap-4.0.0');
		//JS propio de la vista
	    echo js_asset('regiones/v_index.js','salo');
	  
    ?>

</head>
<body>
    
    <div class="container">
    	<div class="row align-items-center justify-content-center">
            <div class="col col-sm-11">
            	
                <nav id="menu_principal" class="navbar">
                    
                    <div class="row">
                    	
                        <div class="col-6">
                        
                            <div class="input-group dropdown">
                                <div class="input-group-addon">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                </div>
                                <input type="text" class="form-control" id="busc_nombre_reg" placeholder="Nombre de la región" autocomplete="off">
                                <div id="sugerencias" class="dropdown-menu"></div>
                                <div class="input-group-addon">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </div>
                            </div>
                    
                        </div>
                        
                        <div class="col-6 text-right">
                        
                   	    	<button id="nueva_region" type="button" class="btn btn-success">Crear Región</button>
                    	
                        </div>
                        
                    </div>
                    
                </nav><!-- Fin navbar -->
            
            </div>
            
            <div class="col col-sm-11 wrapper_regiones">
            
            </div>
            
        </div>
    </div><!-- Fin .container -->
	
</body>
</html>


