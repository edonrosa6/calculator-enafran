document.addEventListener("DOMContentLoaded", function () {
  // Tu código aquí
  const calculoAcordo = (valorPonderado, acordo) => {
    return valorPonderado - acordo;
  };

  const calcular = () => {
    const valorPonderado = parseFloat(
      document.getElementById("marteleteTE3MLvalorponderado").value
    );
    const acordo = parseFloat(document.getElementById("acordo").value);

    if (isNaN(valorPonderado) || isNaN(acordo)) {
      document.getElementById("resultado").innerText =
        "Por favor, ingrese números válidos.";
      document.getElementById("acordo-mensal").innerText = "";
    } else {
      const resultado = calculoAcordo(valorPonderado, acordo);
      document.getElementById("resultado").innerText =
        "El resultado es: " + resultado;
      document.getElementById("acordo-mensal").innerText = resultado;
    }
  };

  const calculoRompedorTE700 = () => {
    const rompedorTE700diarioPrecio = document.getElementById(
      "rompedorTE700diarioPrecio"
    );
    const rompedorTE700semanalPrecio = document.getElementById(
      "rompedorTE700semanalPrecio"
    );
    const rompedorTE700quincenalPrecio = document.getElementById(
      "rompedorTE700quincenalPrecio"
    );
    const rompedorTE700mensualPrecio = document.getElementById(
      "rompedorTE700mensualPrecio"
    );
    const rompedorTE700TaxaOcupacao = document.getElementById(
      "rompedorTE700TaxaOcupacao"
    );
    const rompedorTE700Minimo7 = document.getElementById(
      "rompedorTE700Minimo7"
    );
    const rompedorTE700Minimo20 = document.getElementById(
      "rompedorTE700Minimo20"
    );
  };
});
