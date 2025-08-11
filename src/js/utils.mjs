export function expandDetails() {
  document.querySelectorAll('.faq-list details').forEach((detail) => {
    const summary = detail.querySelector('summary');
    const content = detail.querySelector('.content');

    // Remove the 'open' attribute and class initially
    detail.removeAttribute('open');
    content.style.maxHeight = '0px';

    summary.addEventListener('click', (e) => {
      e.preventDefault();

      const isOpen = detail.classList.contains('open');

      if (isOpen) {
        // Close with animation
        content.style.maxHeight = content.scrollHeight + 'px';
        requestAnimationFrame(() => {
          content.style.maxHeight = '0px';
        });

        detail.classList.remove('open');

        setTimeout(() => {
          detail.removeAttribute('open');
        }, 400); // Duration equal to the transition
      } else {
        // Open with animation
        detail.setAttribute('open', true);
        detail.classList.add('open');

        content.style.maxHeight = '0px';
        requestAnimationFrame(() => {
          content.style.maxHeight = content.scrollHeight + 'px';
        });
      }
    });
  });
}

// Fetch exchange rates from an API

export async function loadCoins(url, select1, select2) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // clear existing options
    select1.innerHTML = '';
    select2.innerHTML = '';

    // Add default options
    const defaultOption1 = document.createElement("option");
    defaultOption1.value = "";
    defaultOption1.textContent = "Select base currency";
    defaultOption1.disabled = true;
    defaultOption1.selected = true;
    select1.appendChild(defaultOption1);

    const defaultOption2 = document.createElement("option");
    defaultOption2.value = "";
    defaultOption2.textContent = "Select target currency";
    defaultOption2.disabled = true;
    defaultOption2.selected = true;
    select2.appendChild(defaultOption2);

    if (data.result === "success") {
      data.supported_codes.forEach(([code, name]) => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = `${code} - ${name}`;
        select1.appendChild(option);
        select2.appendChild(option.cloneNode(true)); // Clone the option for the second select
      });
    } else {
      select1.innerHTML = '<option value="">Error loading coins</option>';
      select2.innerHTML = '<option value="">Error loading coins</option>';
    }
  } catch (error) {
    console.error("Error loading coins:", error);
    select1.innerHTML = '<option value="">Error connecting to API</option>';
    select2.innerHTML = '<option value="">Error connecting to API</option>';
  }
}

// Convert coins using the API

export async function convertCoins(apiKey, fromCurrency, toCurrency, amountInput, resultText) {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (!from || !to || isNaN(amount) || amount <= 0) {
    alert("Please enter valid data.");
    return;
  }

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
    const data = await res.json();

    if (data.result === "success") {
      resultText.textContent = `${to} ${data.conversion_result.toFixed(2)}`;
    } else {
      resultText.textContent = "Error in conversion.";
    }
  } catch (error) {
    console.error("Error converting:", error);
    resultText.textContent = "Error connecting to API.";
  }
  // Store the last conversion in localStorage
  const lastConversion = {
    from: fromCurrency.value,
    to: toCurrency.value,
    amount: amountInput.value,
    result: resultText.textContent,
  };
  let history = JSON.parse(localStorage.getItem('conversionHistory')) || [];
  history.push(lastConversion);
  localStorage.setItem('conversionHistory', JSON.stringify(history));

}

export function switchCurrencies(select1, select2) {
  const tempValue = select1.value;
  select1.value = select2.value;
  select2.value = tempValue;
}

// Get the date range based on the selected option
export function getDateRange(range) {
    const today = new Date();
    const end = today.toISOString().split("T")[0];
    let start;

    if (range === "last_week") {
        const d = new Date();
        d.setDate(today.getDate() - 7);
        start = d.toISOString().split("T")[0];
    } else if (range === "last_month") {
        const d = new Date();
        d.setMonth(today.getMonth() - 1);
        start = d.toISOString().split("T")[0];
    }
    return { start, end };
}

//Alerts currency selection
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";

    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000); // It hides after 3 seconds
}

let chart; //Reference to update the chart

export async function fetchDataAndPlot(select1, select2, rangeSelect, ctx) {
  const base = select1.value;
  const target = select2.value;
  const { start, end } = getDateRange(rangeSelect.value);

  if (base === target) {
      showToast("Select different currencies");
      return;
  }

  // Avoid future dates
  const today = new Date().toISOString().split("T")[0];
  const safeEnd = end > today ? today : end;

  try {
      const res = await fetch(`https://api.frankfurter.app/${start}..${safeEnd}?from=${base}&to=${target}`);

      if (!res.ok) {
          showToast("No data found for this combination of dates and currencies.");
          return;
      }

      const data = await res.json();

      if (!data.rates || Object.keys(data.rates).length === 0) {
          alert("No historical data available.");
          return;
      }

      const labels = Object.keys(data.rates);
      const values = labels.map(date => data.rates[date][target]);

      // Destruir gráfico anterior si existe
      if (chart) chart.destroy();

      chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels,
              datasets: [{
                  label: `${base} to ${target}`,
                  data: values,
                  borderColor: 'blue',
                  backgroundColor: 'rgba(0, 0, 255, 0.2)',
                  fill: true
              }]
          },
          options: {
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                  x: { title: { display: true, text: 'Date' } },
                  y: { title: { display: true, text: 'Price' } }
              }
          }
      });

  } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching the data.");
  }
}