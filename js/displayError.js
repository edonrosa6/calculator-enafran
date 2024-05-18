const displayError = () => {
  const diario = parseInt(document.getElementById("diario").value);
  const semanal = parseInt(document.getElementById("semanal").value);
  const quincenal = parseInt(document.getElementById("quincenal").value);
  const mensual = parseInt(document.getElementById("mensual").value);

  const display = document.getElementById("error-percentage");

  console.log(diario);
  console.log(semanal);
  console.log(quincenal);
  console.log(mensual);

  if (diario + semanal + quincenal + mensual === 1) {
    display.textContent = "correcto";
  } else {
    display.textContent = "debe dar 100%";
  }
};

displayError();
