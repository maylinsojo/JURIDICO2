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
		//CSS propio de la vista
	    echo css_asset('servicios/evalExterna/v_nuevo_despacho.css','salo');

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
	    echo js_asset('servicios/evalExterna/v_nuevo_despacho.js','salo');

    ?>

</head>
<body>

    <div class="container">
    	<div class="row align-items-center justify-content-center">
        <div class="col col-sm-12">
          <form id="form_planificar">
            <div class="row">
              <div class="form-group col-12">
                <label for="establecimiento">Establecimiento Escolar</label>
                <div id="wrapper_establecimiento" class="dropdown">
                  <input type="text" class="form-control" id="establecimiento" aria-describedby="eeHelp" autocomplete="off">
                  <div id="sugerencias" class="dropdown-menu"></div>
                </div>
                <div class="form-control-feedback"></div>
                <small id="eeHelp" class="form-text text-muted">Escriba el nombre del establecimiento.</small>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label for="fecha_despacho">Fecha Despacho</label>
                <div class="input-group">
                  <input id="calendario" type="text" class="form-control" id="fecha_despacho" autocomplete="off">
                  <span class="input-group-addon">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                </div>
                <div class="form-control-feedback"></div>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-4">
                <label for="imprenta">Imprenta</label>
                <select class="form-control imprenta"></select>
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-4">
                <label for="conductor">Coste Imprenta</label>
                <input type="text" class="form-control" id="coste_imprenta" autocomplete="off">
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-4">
                <label for="producto">Producto</label>
                <select class="form-control producto">
                  <option value="" selected disabled>Seleccione</option>
                  <option value="">Diagnóstico</option>
                  <option value="">Mineduc</option>
                  <option value="">Módulos</option>
                  <option value="">Remediales</option>
                  <option value="">Guias</option>
                  <option value="">Sumativas</option>
                </select>
                <div class="form-control-feedback"></div>
              </div>
            </div>
            <div class="row fila_item_desp">
              <div class="form-group col-4">
                <label>Curso</label>
                <select class="form-control curso">
                  <option value="" selected disabled>Seleccione</option>
                </select>
                <div class="form-control-feedback"></div>
                <small id="cursoHelp" class="form-text text-muted">Debe seleccionar un establecimiento.</small>
              </div>
              <div class="form-group col-4">
                <label>Asignatura</label>
                <select class="form-control asignatura">
                  <option value="" selected>Seleccione</option>
                </select>
                <div class="form-control-feedback mensaje_asignatura"></div>
              </div>
              <div class="form-group col-1">
                <label>Eval.</label>
                <input type="text" class="form-control eval" autocomplete="off">
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-1">
                <label>H.R</label>
                <input type="text" class="form-control rh" autocomplete="off">
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-1">
                <label>Pag.</label>
                <input type="text" class="form-control pag" autocomplete="off">
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-1">
                <label>T</label>
                <input type="text" class="form-control t" autocomplete="off">
                <div class="form-control-feedback"></div>
              </div>
            </div>
            <div class="row fila_item_desp">
              <div class="form-group col-4">
                <label>Módulo</label>
                <select class="form-control modulo">
                  <option value="" selected disabled>Seleccione</option>
                </select>
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-4">
                <label>Sub-total</label>
                <input type="text" class="form-control subtotal" disabled>
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-1 opcion_despacho">
                <label>&nbsp;</label>
                <button type="button" class="btn btn-primary">Agregar nuevo item</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div><!-- Fin .container -->

</body>
</html>
