document.addEventListener("DOMContentLoaded", function () {
  const data = [
    {
      id: "marteleteTE3ML",
      nombre: "Martelete TE 3-ML",
      acordo: 140.56,
      desconto7: 123.69,
      desconto20: 119.48,
    },
    {
      id: "rompedorTE500",
      nombre: "Rompedor TE 500",
      acordo: 239.2,
      desconto7: 239.2,
      desconto20: 239.2,
    },
    {
      id: "rompedorTE700",
      nombre: "Rompedor TE 700",
      acordo: 350.9,
      desconto7: 333.36,
      desconto20: 326.34,
    },
    {
      id: "rompedorTE800",
      nombre: "Rompedor TE 800",
      acordo: 375.06,
      desconto7: 356.31,
      desconto20: 348.81,
    },
    {
      id: "rompedorTE1000",
      nombre: "Rompedor TE 1000",
      acordo: 480.76,
      desconto7: 456.72,
      desconto20: 447.11,
    },
    {
      id: "rompedorTE2000",
      nombre: "Rompedor TE 2000",
      acordo: 635.66,
      desconto7: 584.81,
      desconto20: 572.09,
    },
    {
      id: "rompedorTE3000",
      nombre: "Rompedor TE 3000",
      acordo: 820.6,
      desconto7: 754.95,
      desconto20: 738.54,
    },
    {
      id: "combinadoTE50",
      nombre: "Combinado TE 50",
      acordo: 534.55,
      desconto7: 470.4,
      desconto20: 454.37,
    },
    {
      id: "combinadoTE70",
      nombre: "Combinado TE 70",
      acordo: 628.03,
      desconto7: 552.67,
      desconto20: 533.83,
    },
  ];

  const tbody = document.querySelector("#table-simple tbody");
  const totalDesconto7FerrElem = document.querySelector("#totalDesconto7Ferr");
  const totalFerr7a36MesesElem = document.querySelector("#totalFerr7a36Meses");
  const totalDesconto20FerrElem = document.querySelector(
    "#totalDesconto20Ferr"
  );
  const totalFerr20a36MesesElem = document.querySelector(
    "#totalFerr20a36Meses"
  );

  data.forEach((item) => {
    const row = document.createElement("tr");

    const cellNombre = document.createElement("td");
    cellNombre.textContent = item.nombre;
    row.appendChild(cellNombre);

    const cellQuantidade = document.createElement("td");
    const inputQuantidade = document.createElement("input");
    inputQuantidade.type = "number";
    inputQuantidade.value = 1; // Valor predeterminado
    inputQuantidade.addEventListener("change", function () {
      recalcularValores(row, item);
    });
    cellQuantidade.appendChild(inputQuantidade);
    row.appendChild(cellQuantidade);

    const diferencaDesconto7Ferr = item.acordo - item.desconto7;
    const cellDiferencaDesconto7Ferr = document.createElement("td");
    cellDiferencaDesconto7Ferr.textContent = diferencaDesconto7Ferr.toFixed(2);
    row.appendChild(cellDiferencaDesconto7Ferr);

    const ferr7a36Meses = diferencaDesconto7Ferr * 36;
    const cellFerr7a36Meses = document.createElement("td");
    cellFerr7a36Meses.textContent = ferr7a36Meses.toFixed(2);
    row.appendChild(cellFerr7a36Meses);

    const diferencaDesconto20Ferr = item.acordo - item.desconto20;
    const cellDiferencaDesconto20Ferr = document.createElement("td");
    cellDiferencaDesconto20Ferr.textContent =
      diferencaDesconto20Ferr.toFixed(2);
    row.appendChild(cellDiferencaDesconto20Ferr);

    const ferr20a36Meses = diferencaDesconto20Ferr * 36;
    const cellFerr20a36Meses = document.createElement("td");
    cellFerr20a36Meses.textContent = ferr20a36Meses.toFixed(2);
    row.appendChild(cellFerr20a36Meses);

    tbody.appendChild(row);
  });

  function recalcularValores(row, item) {
    const quantidade = parseFloat(row.querySelector("input").value);

    const diferencaDesconto7Ferr = quantidade * (item.acordo - item.desconto7);
    const ferr7a36Meses = quantidade * (diferencaDesconto7Ferr * 36);

    const diferencaDesconto20Ferr =
      quantidade * (item.acordo - item.desconto20);
    const ferr20a36Meses = quantidade * (diferencaDesconto20Ferr * 36);

    row.querySelectorAll("td")[2].textContent =
      diferencaDesconto7Ferr.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      });
    row.querySelectorAll("td")[3].textContent = ferr7a36Meses.toLocaleString(
      "pt-BR",
      { minimumFractionDigits: 2 }
    );
    row.querySelectorAll("td")[4].textContent =
      diferencaDesconto20Ferr.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      });
    row.querySelectorAll("td")[5].textContent = ferr20a36Meses.toLocaleString(
      "pt-BR",
      { minimumFractionDigits: 2 }
    );

    calcularTotale();
  }

  function calcularTotale() {
    let totalFerr7a36Meses = 0;
    let totalFerr20a36Meses = 0;

    tbody.querySelectorAll("tr").forEach((row) => {
      // Obtener el valor numérico de la celda 3 (Ferramenta 7% a 36 Meses)
      const valorFerr7 =
        parseFloat(
          row
            .querySelectorAll("td")[3]
            .textContent.replace(",", ".")
            .replace(/\./g, "")
            .replace(",", ".")
        ) || 0;
      // Obtener el valor numérico de la celda 5 (Ferramenta 20% a 36 Meses)
      const valorFerr20 =
        parseFloat(
          row
            .querySelectorAll("td")[5]
            .textContent.replace(",", ".")
            .replace(/\./g, "")
            .replace(",", ".")
        ) || 0;

      // Sumar los valores a los totales correspondientes
      totalFerr7a36Meses += valorFerr7;
      totalFerr20a36Meses += valorFerr20;
    });

    // Actualizar los elementos del DOM con los totales formateados correctamente
    totalFerr7a36MesesElem.textContent = (
      totalFerr7a36Meses / 100
    ).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    totalFerr20a36MesesElem.textContent = (
      totalFerr20a36Meses / 100
    ).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  calcularTotale();
});
