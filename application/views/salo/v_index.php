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
		//CSS propio de la vista
	  echo css_asset('v_index.css','salo');

		//JS principal de Jquery
		echo js_asset('jquery-3.2.1.min.js','jquery');
    //JS Popper necsaria para el Bootstrap 4
	  echo js_asset('popper.min.js','popper');
	  //JS principal de Bootstrap
    echo js_asset('bootstrap.min.js','bootstrap-4.0.0/dist');
		//JS propio de la vista
	  echo js_asset('v_index.js','salo');

    ?>

</head>
<body>

    <div id="wrapper_login" class="container">
        <div class="row align-items-center justify-content-center">
            <div class="col col-sm-7 col-md-5">
                <form>
                    <div class="form-group">
                    	<label for="correo">Correo</label>
                    	<input type="text" class="form-control text-lowercase" id="correo" aria-describedby="correo_ayuda" autocomplete="off">
                        <div class="form-control-feedback"></div>
                    	<small id="correo_ayuda" class="form-text text-muted">Correo con el cual se registró.</small>
                    </div>
                    <div class="form-group">
                    	<label for="clave">Contraseña</label>
                    	<input type="password" class="form-control text-lowercase" id="clave" autocomplete="off">
                        <div class="form-control-feedback"></div>
                    </div>
                    <div class="form-group text-center">
                		<button id="ingresar" type="button" class="btn btn-primary">Ingresar</button>
                    </div>
                </form>
            </div>
        </div><!-- Fin .row -->
    </div><!-- Fin .container -->

</body>
</html>
