<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>juridico</title>

    <?php

    //CSS principal de Bootstrap
    echo css_asset('bootstrap.min.css','bootstrap-4.0.0/dist');
		//CSS para los iconos
		echo css_asset('font-awesome.min.css','font-awesome-4.7.0');
    //CSS para el dropdown multinivel
    echo css_asset('bootstrap-4-navbar.css','bootstrap-4-multi-dropdown');
		//CSS propio de la vista
	  echo css_asset('v_panel_principal.css','juridico');

		//JS principal de Jquery
		echo js_asset('jquery-3.2.1.min.js','jquery');
    //JS Popper necsaria para el Bootstrap 4
	  echo js_asset('popper.min.js','popper');
	  //JS principal de Bootstrap
    echo js_asset('bootstrap.min.js','bootstrap-4.0.0/dist');
    //JS para el dropdown multinivel
    echo js_asset('bootstrap-4-navbar.js','bootstrap-4-multi-dropdown');
    //JS lodash
	  echo js_asset('lodash.js','lodash');
		//JS propio de la vista
	  echo js_asset('v_panel_principal.js','juridico');

    ?>

</head>
<body>

  <nav id="menu_principal" class="navbar navbar-expand-lg navbar-light bg-light">

    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    	<span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand">
    	<img class="img-fluid" src="assets/modules/juridico/images/logo.gif">
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto items_menu"></ul>
        <ul class="navbar-nav wrapper_cuenta">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="mi_cuenta" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
            <div class="dropdown-menu dropdown-menu-right">
              <a id="mi_cuenta" class="dropdown-item">Mi Cuenta</a>
              <a id="logout" class="dropdown-item">Salir</a>
            </div>
          </li>
        </ul>
    </div>

  </nav><!-- Fin navbar -->

  <div class="contenido">
  	<iframe></iframe>
  </div><!-- Fin .contenido -->

</body>
</html>
