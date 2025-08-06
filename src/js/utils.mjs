// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//Retrieves the product code from the url
export function getParam(param) {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const product = urlParams.get(param)
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false){
  const htmlStrings = list.map(templateFn)

  if(clear){
    parentElement.innerHTML = ''
  }

  parentElement.insertAdjacentHTML(position, htmlStrings.join(''))
}

export function renderWithTemplate(template, parentElement, data, callback){
  parentElement.innerHTML = template
  if (callback){
    callback(data)
  }
}

export async function loadTemplate(path) {
try {
  const response = await fetch(path)
  if (!response.ok){
    throw new Error(`HTML error! Status: ${response.status}`)
  }
  const template = await response.text()
  return template
} catch (error) {
  console.error("There was an error fetching the data: ", error)
}

}

// Load the header and footer templates in from the partials using the loadTemplate.
// Grab the header and footer placeholder elements out of the DOM.
// Render the header and footer using renderWithTemplate.
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html")

  const footerElement = document.querySelector('footer')
  const headerElement = document.querySelector('.divider')
  
  renderWithTemplate(footerTemplate, footerElement)
  renderWithTemplate(headerTemplate, headerElement)
}

//Update cart superscript
export function updateCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  const count = cart.reduce((sum, item) => sum + (item.Quantity || 1), 0);
  const cartCountEl = document.getElementById("cart-count");

  if (cartCountEl) {
    cartCountEl.textContent = count > 0 ? count : "";
    cartCountEl.style.display = count > 0 ? "inline-block" : "none";
  }
}

export function formDataToJSON(formData) {
  const json = {};
  for (const [key, value] of formData.entries()) {
    json[key] = value;
  }
  return json;
}


export function alertMessage(message, scroll=true){
  const alert = document.createElement('div')
  alert.classList.add('alert')

  alert.innerHTML = `<span class="alert-message">${message}</span>
  <button class="closeBtn" aria-label="Close alert">x</button>
  `;

  alert.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('closeBtn')) {
      alert.remove()
    }
  })

  const main = document.querySelector('main')
  if (main) {
    main.prepend(alert)
  }

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

