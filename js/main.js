
let productos = [];

fetch("../js/productos.json")
   .then(response => response.json())
   .then(data => {
       productos = data;
       cargarProductos(productos);
 })

const contenedorProductos = document.querySelector("#contenedor-productos");
const contenedorCarrito = document.querySelector("#numerito");

/* DOM */

function cargarProductos() {

   contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("gallery-item");
    div.innerHTML = `
        <h2 class="gallery-title"> ${producto.titulo} </h2>
        <img  class="gallery-img" src="${producto.imagen}" alt= "imagen de proteccion visual">
        <div class="producto-detalles">
         <p class="producto-precio">$${producto.precio}</p>
         <button class="producto-agregar" id= "${producto.id}"> Agregar </button>
       </div>
      </div>`;

    contenedorProductos.appendChild(div);

    //BOTONES

    const boton = document.getElementById(`${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
}



//BOTONES


let productoEnCarrito = [];
let productosCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosCarritoLS){
  productoEnCarrito = JSON.parse(productosCarritoLS);
  actualizarNumerito();
}else{
  productoEnCarrito = []
};


const agregarAlCarrito = (prodId) => {

  //TOASTIFY
  Toastify({
    text: "Producto Agregado",
    duration: 1200,
    close: true,
    gravity: "top", 
    position: `right`, 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #1f1d1d, #a4a4a4)",
      borderRadius: "1.5rem",
      textTransform: "uppercase",
      fontSize: "0.75rem",
    },
    offset: {
      x: "1.5rem", 
      y: "1rem" 
    },
    onClick: function(){} 
  }).showToast();

  const item = productos.find((prod) => prod.id === prodId);
  productoEnCarrito.push(item);

  actualizarNumerito();

  //CONVIERTO JSON
  const enJSON = JSON.stringify(productoEnCarrito);
  // console.log(enJSON);

  //LO GUARDO EN LOCALSTORAGE
  localStorage.setItem("productos-en-carrito", enJSON);
};

function actualizarNumerito() {
  let nuevoNumerito = productoEnCarrito.reduce((acc, producto) => acc + 1, 0);
  contenedorCarrito.innerText = nuevoNumerito;
}
