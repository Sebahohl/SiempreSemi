
let totalCarrito;
let contenedor = document.getElementById("misprods");
let botonFinalizar = document.getElementById("finalizar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
if(carrito.length != 0){
    console.log("Recuperando carro")
    dibujarTabla();
}

//LUXON
const DateTime = luxon.DateTime;
//momento en que se ingresa a la web
const ahora = DateTime.now();
console.log(ahora.toString());
console.log(ahora.zoneName);
console.log(ahora.daysInMonth);
console.log(ahora.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS));
const masTarde = ahora.plus({ hours: 5, minutes: 15 });
console.log(masTarde.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS));

function dibujarTabla(){
    for(const producto of carrito){
        document.getElementById("tablabody").innerHTML += `
        <tr>
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td><button class="btn btn-light" onclick="eliminar(event)">🗑️</button></td>
        </tr>
    `;
    }
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;
}

function renderizarProds(){
    for(const producto of productos){
        contenedor.innerHTML += `
            <div class="card col-sm-2">
                <img src=${producto.foto} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.id}</h5>
                    <p class="card-text">${producto.nombre}</p>
                    <p class="card-text">$ ${producto.precio}</p>
                    <button id="btn${producto.id}" class="btn btn-primary">Comprar</button>
                </div>
            </div>
        `;
    }

    //EVENTOS
    productos.forEach(producto => {
        //evento para cada boton
        document.getElementById(`btn${producto.id}`).addEventListener("click",function(){
            agregarAlCarrito(producto);
        });
    })
}

renderizarProds();

function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
    console.table(carrito);
    //alert("Producto: "+productoComprado.nombre+" agregado al carrito!");
    //sweet alert
    Swal.fire({
        title: productoComprado.nombre,
        text: 'Agregado al carrito',
        imageUrl: productoComprado.foto,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: productoComprado.nombre,
        showConfirmButton: false,
        timer: 1500
        })
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
    //storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

async function obtenerJSON() {
    const URLJSON="productos.json";
    const resp = await fetch(URLJSON);
    const data = await resp.json();
    productosJSON = data;
    //ya tengo el dolar y los productos, renderizo las cartas
    renderizarProds();
}




//Cerrando al compra
botonFinalizar.onclick = () => {
    if(carrito.length==0){
        Swal.fire({
            title: 'El carro está vacío',
            text: 'compre algun producto',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
    }else{
        carrito = [];
        document.getElementById("tablabody").innerHTML="";
        let infoTotal = document.getElementById("total");
        infoTotal.innerText="Total a pagar $: ";
        Toastify({
            text: "Pronto recibirá un mail de confirmacion",
            duration: 3000,
            gravity: 'bottom',
            position: 'left',
            style: {
                background: 'linear-gradient(to right, #00b09b, #96c92d)'
            }
        }).showToast();

        //Quiero medir intevalo
        const cierreDeCompra=DateTime.now();
        const Interval = luxon.Interval;
        const tiempo = Interval.fromDateTimes(ahora,cierreDeCompra);
        console.log("Tardaste "+tiempo.length('seconds')+" en comprar");
        localStorage.removeItem("carrito");
    }
}

function eliminar(ev){
    console.log(ev);
    let fila = ev.target.parentElement.parentElement;
    console.log(fila);
    let id = fila.children[0].innerText;
    console.log(id);
    let indice = carrito.findIndex(producto => producto.id == id);
    console.log(indice)
    //remueve el producto del carro
    carrito.splice(indice,1);
    console.table(carrito);
    //remueve la fila de la tabla
    fila.remove();
    //recalcular el total
    let preciosAcumulados = carrito.reduce((acumulador,producto)=>acumulador+producto.precio,0);
    total.innerText="Total a pagar $: "+preciosAcumulados;
    //storage
    localStorage.setItem("carrito",JSON.stringify(carrito)); 
}