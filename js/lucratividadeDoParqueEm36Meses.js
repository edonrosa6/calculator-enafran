function calcularValores2(
  taxasOcupacao,
  valorDiario,
  valorSemanal,
  valorQuincenal,
  valorMensual
) {
  return taxasOcupacao.map((item) => {
    const valorDiarioTotal = valorDiario * item.taxaOcupacao * item.diario * 22;
    const valorSemanalTotal =
      valorSemanal * item.taxaOcupacao * item.semanal * 4;
    const valorQuincenalTotal =
      valorQuincenal * item.taxaOcupacao * item.quincenal * 2;
    const valorMensualTotal =
      valorMensual * item.taxaOcupacao * item.mensual * 1;
    const sumaTotal =
      valorDiarioTotal +
      valorSemanalTotal +
      valorQuincenalTotal +
      valorMensualTotal;
    return {
      ...item,
      valorDiarioTotal,
      valorSemanalTotal,
      valorQuincenalTotal,
      valorMensualTotal,
      sumaTotal,
    };
  });
}

function generarTabla2(taxasOcupacao) {
  return `
      <table class="table" id="table36meses">
      <thead>
          <tr>
              <th scope="col"></th>
              <th scope="col">Acordo</th>
              <th scope="col">Desc 7 ferr</th>
              <th scope="col">Acordo</th>
              <th scope="col">Desc 20 ferr</th>
          </tr>
      </thead>
      <tbody>
          ${taxasOcupacao
            .map(
              (item) => `
              <tr>
                  <td>${item.nombre}</td>
                  <td>${(
                    (item.sumaTotal - item.acordo).toFixed(2) *
                    36 *
                    item.minimo7
                  ).toFixed(2)}</td>
                  <td>${(
                    (item.sumaTotal - item.desconto7).toFixed(2) *
                    36 *
                    item.minimo7
                  ).toFixed(2)}</td>
                  <td>${(
                    (item.sumaTotal - item.acordo).toFixed(2) *
                    36 *
                    item.minimo20
                  ).toFixed(2)}</td>
                  <td>${(
                    (item.sumaTotal - item.desconto20).toFixed(2) *
                    36 *
                    item.minimo20
                  ).toFixed(2)}</td>
              </tr>
          `
            )
            .join("")}
      </tbody>
      <tfoot>
        <tr class="bg-yellow fw-bold">
          <td>Total</td>
          <td id="totalColumna1"></td>
          <td id="totalColumna2"></td>
          <td id="totalColumna3"></td>
          <td id="totalColumna4"></td>
        </tr>
      </tfoot>
      </table>
  `;
}

function sumarTotales() {
  const tabla = document.getElementById("table36meses");
  const tbody = tabla.getElementsByTagName("tbody")[0];
  const filas2 = tbody.getElementsByTagName("tr");

  let totalColumna1 = 0;
  let totalColumna2 = 0;
  let totalColumna3 = 0;
  let totalColumna4 = 0;

  for (let i = 0; i < filas2.length; i++) {
    const celdas = filas2[i].getElementsByTagName("td");

    totalColumna1 += parseFloat(
      celdas[1].textContent.replace("R$ ", "").replace(",", ".")
    );
    totalColumna2 += parseFloat(
      celdas[2].textContent.replace("R$ ", "").replace(",", ".")
    );
    totalColumna3 += parseFloat(
      celdas[3].textContent.replace("R$ ", "").replace(",", ".")
    );
    totalColumna4 += parseFloat(
      celdas[4].textContent.replace("R$ ", "").replace(",", ".")
    );
  }

  // Actualizar los elementos del pie de tabla con los totales
  document.getElementById(
    "totalColumna1"
  ).textContent = `${totalColumna1.toFixed(2)}`;
  document.getElementById(
    "totalColumna2"
  ).textContent = `${totalColumna2.toFixed(2)}`;
  document.getElementById(
    "totalColumna3"
  ).textContent = `${totalColumna3.toFixed(2)}`;
  document.getElementById(
    "totalColumna4"
  ).textContent = `${totalColumna4.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", sumarTotales);

function calcularTabla2() {
  const selectDiario = document.getElementById("diario");
  const selectSemanal = document.getElementById("semanal");
  const selectQuincenal = document.getElementById("quincenal");
  const selectMensual = document.getElementById("mensual");

  const valorDiario = parseFloat(selectDiario.value) || 0;
  const valorSemanal = parseFloat(selectSemanal.value) || 0;
  const valorQuincenal = parseFloat(selectQuincenal.value) || 0;
  const valorMensual = parseFloat(selectMensual.value) || 0;

  const tablaPrecios = document.getElementById("tablaPrecios");
  const filas = tablaPrecios.querySelectorAll("tbody tr");

  const taxasOcupacao = [];

  filas.forEach((fila) => {
    const nombre = fila.cells[0].textContent;
    const diario = parseFloat(fila.cells[1].querySelector("input").value) || 0;
    const semanal = parseFloat(fila.cells[2].querySelector("input").value || 0);
    const quincenal = parseFloat(
      fila.cells[3].querySelector("input").value || 0
    );
    const mensual = parseFloat(fila.cells[4].querySelector("input").value || 0);
    let taxaOcupacao =
      parseFloat(fila.cells[5].querySelector("input").value) || 0;

    let acordo = parseFloat(fila.cells[8].querySelector("input").value) || 0;
    let desconto7 = parseFloat(fila.cells[9].querySelector("input").value) || 0;
    let desconto20 =
      parseFloat(fila.cells[10].querySelector("input").value) || 0;

    let minimo7 = parseFloat(fila.cells[6].querySelector("input").value) || 0;
    let minimo20 = parseFloat(fila.cells[7].querySelector("input").value) || 0;

    console.log("acordo:", acordo);

    if (taxaOcupacao) {
      taxaOcupacao = taxaOcupacao / 100;
    }

    taxasOcupacao.push({
      nombre,
      taxaOcupacao,
      diario,
      semanal,
      quincenal,
      mensual,
      acordo,
      desconto7,
      desconto20,
      minimo7,
      minimo20,
    });
  });

  const valoresCalculados = calcularValores2(
    taxasOcupacao,
    valorDiario,
    valorSemanal,
    valorQuincenal,
    valorMensual
  );
  const nuevaTablaHTML = generarTabla2(valoresCalculados);
  document.getElementById("meses36table").innerHTML = nuevaTablaHTML;

  //sumar totales
  sumarTotales();
}

const calcularBtn2 = document.getElementById("calcularTabla");
calcularBtn2.addEventListener("click", calcularTabla2);
