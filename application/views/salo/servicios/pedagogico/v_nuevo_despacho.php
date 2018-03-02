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
	  echo css_asset('servicios/pedagogico/v_nuevo_despacho.css','salo');

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
	  echo js_asset('servicios/pedagogico/v_nuevo_despacho.js','salo');

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
                <label for="transportistas">Transportista</label>
                <select class="form-control transportistas"></select>
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-4">
                <label for="conductor">Conductor</label>
                <select class="form-control conductor">
                  <option value="" selected disabled>Seleccione Transportista</option>
                </select>
                <div class="form-control-feedback"></div>
              </div>
              <div class="form-group col-4">
                <label for="fecha_despacho">Fecha Despacho</label>
                <div class="input-group">
                  <input id="calendario" type="text" class="form-control" id="fecha_despacho" autocomplete="off">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-calendar" aria-hidden="true"></i>
                    </span>
                  </div>
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
                <select class="form-control productoServ">
                  <option value="" selected disabled>Seleccione</option>
                </select>
                <div class="form-control-feedback"></div>
              </div>
            </div>
            <h4 class="titulo pivote">Detalle del despacho</h4>
            <div class="row wrapper_item">
              <div class="col-12">
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
                    <label>Materiales</label>
                    <select class="form-control modulo">
                      <option value="" selected disabled>Seleccione</option>
                    </select>
                    <div class="form-control-feedback"></div>
                  </div>
                  <div class="form-group col-1">
                    <label>Eval.</label>
                    <input type="text" class="form-control eval" autocomplete="off">
                    <div class="form-control-feedback"></div>
                  </div>
                  <div class="form-group col-1">
                    <label>H.R</label>
                    <input type="text" class="form-control hr" autocomplete="off">
                    <div class="form-control-feedback"></div>
                  </div>
                  <div class="form-group col-1">
                    <label>Pag.</label>
                    <input type="text" class="form-control pag" autocomplete="off">
                    <div class="form-control-feedback"></div>
                  </div>
                  <div class="form-group col-1">
                    <label>T</label>
                    <input type="text" class="form-control t" autocomplete="off" disabled>
                    <div class="form-control-feedback"></div>
                  </div>
                </div>
                <div class="row fila_item_desp">
                  <div class="form-group col-4">
                    <label>Asignatura</label>
                    <select class="form-control asignatura">
                      <option value="" selected>Seleccione</option>
                    </select>
                    <div class="form-control-feedback mensaje_asignatura"></div>
                  </div>
                  <div class="form-group col-4">
                    <label>Sub-total</label>
                    <input type="text" class="form-control subtotal" disabled autocomplete="off">
                    <div class="form-control-feedback"></div>
                  </div>
                  <div class="form-group col-4 opcion_despacho">
                    <label>&nbsp;</label>
                    <button type="button" class="btn btn-primary agregarItem">Agregar item</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 text-right">
                <label class="mr-sm-2" for="total">Total</label>
                <input type="text" class="form-control total col-4" disabled autocomplete="off">
              </div>
              <div class="col-6 text-left wrapper_btn_desp">
                <button id="guardar_despacho" type="button" class="btn btn-success">Despachar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div><!-- Fin .container -->

</body>
</html>
