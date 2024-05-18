document.addEventListener("DOMContentLoaded", function () {
  var tablaPrecios = document.getElementById("tablaPrecios");

  // Cargar los datos desde el archivo JSON
  fetch("./datos.json")
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
      tablaHTML += "<th>Taxa de Ocupação (%)</th>";
      tablaHTML += "<th>Minimo 7</th>";
      tablaHTML += "<th>Minimo 20</th>";
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
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'diarioPrecio"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<span class="input-group-text" id="basic-addon1">R$</span>';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'semanalPrecio"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<span class="input-group-text" id="basic-addon1">R$</span>';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'quincenalPrecio"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<span class="input-group-text" id="basic-addon1">R$</span>';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'mensualPrecio"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        // Nuevas columnas agregadas después de "Mensual"
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<span class="input-group-text" id="basic-addon1">%</span>';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control" placeholder="0" id="' +
          item.id +
          'TaxaOcupacao"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control minimo7" placeholder="0" id="' +
          item.id +
          'Minimo7"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";
        tablaHTML += "<td>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML +=
          '<input style="width: 100px" type="number" class="form-control minimo20" placeholder="0" id="' +
          item.id +
          'Minimo20"/>';
        tablaHTML += "</div>";
        tablaHTML += "</td>";

        // nuevas columnas para valores absolutos ACORDO, DESCONTO7, DESCONTO20
        tablaHTML += "<td class='d-none'>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML += `<input style="width: 100px" type="number" class="form-control" value="${item.acordo}" placeholder="0" id="${item.id}acordo"/>`;
        tablaHTML += "</div>";
        tablaHTML += "</td>";

        tablaHTML += "<td class='d-none'>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML += `<input style="width: 100px" type="number" class="form-control" value="${item.desconto7}" placeholder="0" id="${item.id}desconto7"/>`;
        tablaHTML += "</div>";
        tablaHTML += "</td>";

        tablaHTML += "<td class='d-none'>";
        tablaHTML += '<div class="input-group flex-nowrap">';
        tablaHTML += `<input style="width: 100px" type="number" class="form-control" value="${item.desconto20}" placeholder="0" id="${item.id}desconto20"/>`;
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

      // Agregar eventos a los inputs después de que la tabla esté en el DOM
      const inputs = document.querySelectorAll(".minimo7");
      const totalMinimo7 = document.getElementById("totalMinimo7");

      const calcularTotal = () => {
        let total = 0;
        inputs.forEach((input) => {
          total += parseFloat(input.value || 0);
        });

        if (total <= 6) {
          totalMinimo7.textContent = "7 não alcançado";
        } else {
          totalMinimo7.textContent = total;
        }
      };

      inputs.forEach((input) => {
        input.addEventListener("change", calcularTotal);
      });
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });
});
