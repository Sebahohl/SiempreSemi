
// let nombre = prompt ("Ingresa tu nombre ")
// alert("Bienvenida/o a siempre semi "+nombre );
// alert("Siempre semi es mi emprendimiento, es mi pasión hacer uñas y espero que te gusten mis servicios :D");

// menuOpt = prompt("Desea saber que servicios hay? (si/no)");

// let unias=prompt("Ingresa el tipo de uñas que desea realizarse (Kapping - Esculpidas - Esmaltado semipermanente) (s para salir)");

// while(unias!="s"){
//     switch (unias){
//         case "Kapping":
//             alert("El precio de las uñas kapping es de $800");
//             break;
//         case "Esculpidas":
//             alert("El precio de las uñas esculpidas es de $1200");
//             break;
//         case "Esmaltado semipermanente":
//             alert("El precio de las uñas de esmaltado semipermanente es de $800");
//             break;
//     }

//     unias=prompt("Desea ver algun precio más? (s para salir)");
// }


// const servicios = ["Uñas Kapping $800","Uñas esculpidas $1200","Uñas esmaltado semipermanente $800"];

// console.log(servicios)


const carrito = [];
let totalCarrito;
let contenedor = document.getElementById("misprods");

function renderizarProds(){
    for(const producto of productos){
        contenedor.innerHTML += `
        <div class="card col-sm-2">
        <img src= ${producto.foto} class="card-img-top" alt="...">
            <div class=card-body">
                <h5 class="card-title">${producto.id}</h5>
                <p class="card-text">${producto.nombre}</p>
                <p class="card-text">$ ${producto.precio}</p>
                <button id="boton" class="btn btn-primary">Comprar</button>
            </div>
        </div>
        `;
    }
}
renderizarProds();


//EVENTOS
    productos.forEach(producto => {
        //evento para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })


renderizarProds();

function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
    console.table(carrito);
    alert("Producto: "+productoComprado.nombre+" agregado al carrito!");
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${productoComprado.id}</td>
            <td>${productoComprado.nombre}</td>
            <td>${productoComprado.precio}</td>
        </tr>
    `;
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;

}
