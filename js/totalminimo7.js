document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const totalMinimo7 = () => {
      const totalMinimo7 = document.getElementById("totalMinimo7");
      const inputs = document.querySelectorAll(".minimo7");

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

        // Hacer lo que necesites con el total, como mostrarlo en algún lugar de la página
      };

      // Agregar el evento change a cada input
      inputs.forEach((input) => {
        input.addEventListener("change", calcularTotal);
      });
    };

    const totalMinimo20 = () => {
      const totalMinimo20 = document.getElementById("totalMinimo20");
      const inputs = document.querySelectorAll(".minimo20");

      const calcularTotal = () => {
        let total = 0;
        inputs.forEach((input) => {
          total += parseFloat(input.value || 0);
        });

        if (total <= 19) {
          totalMinimo20.textContent = "20 não alcançado";
        } else {
          totalMinimo20.textContent = total;
        }

        // Hacer lo que necesites con el total, como mostrarlo en algún lugar de la página
      };

      // Agregar el evento change a cada input
      inputs.forEach((input) => {
        input.addEventListener("change", calcularTotal);
      });
    };

    // Llama a la función para que se ejecute
    totalMinimo7();
    totalMinimo20();
  }, 1000);
});
