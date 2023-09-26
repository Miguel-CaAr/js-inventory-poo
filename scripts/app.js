/**
 * Plantilla de producto que construir objetos e inicializar sus propiedades.
 */
class Product {
  constructor(name, price, quantity, date) {
    //Metodo constructor con parametros
    this.name = name; //Propiedad que adquiere el valor del parametro
    this.price = price;
    this.quantity = quantity;
    this.date = date;
  }
}

//Se obtiene el elemento product-form del html por su id.
const productForm = document.querySelector("#product-form");

//Se establece la fecha actual por defecto.
// console.log(document.querySelector("#date").value = new Date().toLocaleDateString())
document.querySelector("#date").value = new Date().toISOString().split("T")[0];

//Metodo para escuchar el evento 'submit' del formulario y ejectuar una funcion con parametro (event)
productForm.addEventListener("submit", (event) => {
  event.preventDefault(); //Metodo para evitar el comportamiento del evento (enviar y recargar)
  const name = document.querySelector("#name").value; //Obtener valor del elemento (input)
  const price = document.querySelector("#price").value;
  const quantity = document.querySelector("#quantity").value;
  const date = document.querySelector("#date").value;

  //Se instancia el constructor con los parametros de los valores obtenidos y se crea el objeto 'product'
  const product = new Product(name, price, quantity, date);

  //Instancia de la clase UI para acceder a sus metodos.
  const ui = new UI();

  //Validacion
  name == "" && price == "" && quantity == ""
    ? ui.showMessage("Enter valid data", "alert-warning") //Metodo de la clase ui que recibe de parametro al objeto.
    : (ui.addProduct(product),
      ui.showMessage(`The ${product.name} product has been added.`, "alert-success"));

  ui.resetForm();
});

const table = document.querySelector(".table");

table.addEventListener("click", (event) => {
  const ui = new UI();
  console.log("click");
  ui.deleteProduct(event.target.id); //Se manda como parametro el id del elemento al cual se le escucho el click
});

/**
 * Clase UI con metodos para realizar tareas especificas en el formulario
 * en base a la interaccion con el usuario.
 */
class UI {
  /**
   * Metodo para agregar al html las propiedades del objeto recibido.
   * Cada propiedad se agregan en <td> (table data) de un <tr> (table row) creado
   * y asociado como elemento hijo de un <tbody>
   * @param {Object{}} product Objeto producto
   */
  addProduct(product) {
    const productList = document.querySelector("tbody");
    const item = document.createElement("tr");
    item.id = `${product.name}`;
    item.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td>${product.date}</td>
      <td>
      <button id="${product.name}" class="btn btn-danger">Delete</botton>
      </td>
    `;
    productList.appendChild(item);
  }

  /**
   * Metodo para vaciar los campos del formulario
   */
  resetForm() {
    const productForm = document.querySelector("#product-form");
    productForm.reset(); //Funcion para regresar el formulario por defecto.
    //Se establece la fecha actual por defecto.
    document.querySelector("#date").value = new Date()
      .toISOString()
      .split("T")[0];
  }

  /**
   * Metodo que recibe de parametro un id y se elimina del HTML el elemento con dicho id
   * @param {String} product ID del elemento HTML
   */
  deleteProduct(product) {
    if (product != "") {
      const item = document.getElementById(`${product}`);
      item.remove();
    }
  }
/**
 * Funcion para mostrar un mensaje en la interfaz
 * @param {string} text Mensaje descriptivo si se realizo o hay algun error 
 * @param {string} color Clase que recibe como parametro para mostrar el color del mensaje
 */
  showMessage(text, color) {
    const productList = document.querySelector("#product-list");
    const table = document.querySelector(".table");
    const message = document.createElement("h5");
    message.id = "message";
    message.textContent = `${text}`;
    message.classList.add("col-md-12", "text-center", "alert", `${color}`);
    productList.insertBefore(message, table);
    setTimeout(() => {
      productList.removeChild(message);
    }, 1400);
  }
}
