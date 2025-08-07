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
}

export function switchCurrencies(select1, select2) {
  const tempValue = select1.value;
  select1.value = select2.value;
  select2.value = tempValue;
}