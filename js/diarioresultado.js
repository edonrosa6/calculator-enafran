function calcularValores(
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

function generarTabla(taxasOcupacao) {
  return `
      <table class="table">
      <thead>
          <tr>
              <th></th>
              <th colspan="5" class="periodos text-center h5 bg-main text-white">Receita ponderada por ferramenta</th>
              <th colspan="3" class="descuentos text-center h5 bg-main text-white">Lucratividade mensal por ferramente</th>
          </tr>
          <tr>
              <th></th>
              <th>Diario</th>
              <th>Semanal</th>
              <th>Quinzenal</th>
              <th>Mensal</th>
              <th>Valor</th>
              <th class="border-left">Acordo</th>
              <th>Desc 7 ferr</th>
              <th>Desc 20 ferr</th>
          </tr>
      </thead>
      <tbody>
        ${taxasOcupacao
          .map((item) => {
            const acordo = (item.sumaTotal - item.acordo).toFixed(2);
            const desc7ferr = (item.sumaTotal - item.desconto7).toFixed(2);
            const desc20ferr = (item.sumaTotal - item.desconto20).toFixed(2);

            const isBgRemarked =
              parseFloat(acordo) > 0 ||
              parseFloat(desc7ferr) > 0 ||
              parseFloat(desc20ferr) > 0 ||
              parseFloat(item.valorDiarioTotal) > 0 ||
              parseFloat(item.valorSemanalTotal) > 0 ||
              parseFloat(item.valorQuincenalTotal) > 0 ||
              parseFloat(item.valorMensualTotal) > 0;

            return `
            <tr class="${isBgRemarked ? "bg-gray" : ""}">
              <td>${item.nombre}</td>
              <td>${item.valorDiarioTotal.toFixed(2)}</td>
              <td>${item.valorSemanalTotal.toFixed(2)}</td>
              <td>${item.valorQuincenalTotal.toFixed(2)}</td>
              <td>${item.valorMensualTotal.toFixed(2)}</td>
              <td>${item.sumaTotal.toFixed(2)}</td>
              <td class="border-left">${acordo < 0 ? "0.00" : acordo}</td>
              <td>${desc7ferr < 0 ? "0.00" : desc7ferr}</td>
              <td>${desc20ferr < 0 ? "0.00" : desc20ferr}</td>
            </tr>
            `;
          })
          .join("")}
      </tbody>
      </table>
  `;
}

function calcularTabla() {
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

  const valoresCalculados = calcularValores(
    taxasOcupacao,
    valorDiario,
    valorSemanal,
    valorQuincenal,
    valorMensual
  );
  const nuevaTablaHTML = generarTabla(valoresCalculados);

  document.getElementById("nuevaTabla").innerHTML = nuevaTablaHTML;
}

const calcularBtn = document.getElementById("calcularTabla");
calcularBtn.addEventListener("click", calcularTabla);
