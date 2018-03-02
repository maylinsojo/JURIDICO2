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
		//CSS para los iconos
		echo css_asset('font-awesome.min.css','font-awesome-4.7.0');
		//CSS para los menú tipo árbol
    echo css_asset('treed.css','treed');
		//CSS propio de la vista
	  echo css_asset('transportistas/v_index.css','salo');

		//JS principal de Jquery
		echo js_asset('jquery-3.2.1.min.js','jquery');
    //JS Popper necsaria para el Bootstrap 4
	  echo js_asset('popper.min.js','popper');
	  //JS principal de Bootstrap
    echo js_asset('bootstrap.min.js','bootstrap-4.0.0/dist');
		//JS principal para los menú tipo árbol
		echo js_asset('treed.js','treed');
		//JS principal para enmascarar los campos
		echo js_asset('jquery.mask.js','jquery');
		//JS propio de la vista
	  echo js_asset('transportistas/v_index.js','salo');

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
                                <input type="text" class="form-control" id="busc_nombre_transp" placeholder="Nombre de la transportista" autocomplete="off">
                                <div id="sugerencias" class="dropdown-menu"></div>
                                <div class="input-group-prepend">
                                  <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                  </span>
                                </div>

                            </div>

                        </div>

                        <div class="col-6 text-right">

                   	    	<button id="nueva_transportista" type="button" class="btn btn-success">Crear Transportista</button>

                        </div>

                    </div>

                </nav><!-- Fin navbar -->

            </div>

            <div class="col col-sm-11 wrapper_transportistas"></div>
            <div class="col col-sm-11 wrapper_paginador"></div>

        </div>
    </div><!-- Fin .container -->

</body>
</html>
