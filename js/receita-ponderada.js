document.addEventListener("DOMContentLoaded", function () {
  var tablaPrecios = document.getElementById("table-receita-ponderada");

  // Cargar los datos desde el archivo JSON
  fetch("./receita-ponderada.json")
    .then((response) => response.json())
    .then((data) => {
      // Crear la estructura de la tabla
      var tablaHTML = '<div class="table-responsive">';
      tablaHTML += '<table class="table">';
      tablaHTML += "<thead>";
      tablaHTML += "<tr>";
      tablaHTML += "<th></th>";
      tablaHTML += "<th>Diario</th>";
      tablaHTML += "<th>Semanal</th>";
      tablaHTML += "<th>Quinzenal</th>";
      tablaHTML += "<th>Mensal</th>";
      tablaHTML += "<th>Valor Ponderado</th>";
      tablaHTML += "<th>Acordo</th>";
      tablaHTML += "<th>Desc 7 ferr</th>";
      tablaHTML += "<th>Desc 20 ferr</th>";
      tablaHTML += "</tr>";
      tablaHTML += "</thead>";
      tablaHTML += "<tbody>";

      // Iterar sobre los datos del JSON y generar filas de tabla
      data.forEach((item) => {
        tablaHTML += "<tr>";
        tablaHTML += "<td>" + item.nombre + "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<span class="input-group-text" id="basic-addon1">R$</span>';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control diarioresultado" placeholder="0" id="' +
          item.id +
          'diariores"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<span class="input-group-text" id="basic-addon1">R$</span>';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'semanalres"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<span class="input-group-text" id="basic-addon1">R$</span>';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'quincenalres"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<span class="input-group-text" id="basic-addon1">R$</span>';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'mensualres"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        // Nuevas columnas agregadas después de "Mensual"
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'valorponderado"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";

        // ACORDO y DESCONTOS
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'acordo"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";

        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'desct7ferr"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";

        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'desct20ferr"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        // Fin de las nuevas columnas
        tablaHTML += "</tr>";
      });

      tablaHTML += "</tbody>";
      tablaHTML += "</table>";
      tablaHTML += "</div>";

      // Insertar la tabla generada en el contenedor
      tablaPrecios.innerHTML = tablaHTML;
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });
});
