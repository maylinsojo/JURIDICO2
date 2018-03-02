<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>SALO</title>

    <?php

		//CSS principal de Bootstrap
		echo css_asset('bootstrap.min.css','bootstrap-4.0.0/dist');
		//CSS para el calendario
		echo css_asset('bootstrap-datepicker.css','bootstrap-datepicker');
		//CSS para los iconos
		echo css_asset('font-awesome.min.css','font-awesome-4.7.0');
		//CSS propio de la vista
		echo css_asset('servicios/pedagogico/v_index.css','salo');

		//JS principal de Jquery
		echo js_asset('jquery-3.2.1.min.js','jquery');
    	//JS Popper necsaria para el Bootstrap 4
	  	echo js_asset('popper.min.js','popper');
	  	//JS principal de Bootstrap
		echo js_asset('bootstrap.min.js','bootstrap-4.0.0/dist');
		//JS para el calendario
		echo js_asset('bootstrap-datepicker.js','bootstrap-datepicker');
		echo js_asset('locales/bootstrap-datepicker.es.js','bootstrap-datepicker');
		//JS principal para dar formato numerico
		echo js_asset('autoNumeric-min.js','autoNumeric');
		//JS propio de la vista
	  	echo js_asset('servicios/pedagogico/v_index.js','salo');

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
                          <input type="text" class="form-control" id="busc_nombre_ee" placeholder="Despacho" autocomplete="off">
                          <div id="sugerencias" class="dropdown-menu"></div>
                          <div class="input-group-prepend">
                            <span class="input-group-text">
                              <i class="fa fa-search" aria-hidden="true"></i>
                            </span>
                          </div>
                        </div>
                    </div>
                    
                </div>
            </nav>
        </div>
        <div class="col col-sm-11 wrapper_despachos"></div>
      </div>
    </div><!-- Fin .container -->

</body>
</html>

