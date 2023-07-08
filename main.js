//definicion de variables//
const contenedor = document.querySelector(`tbody`)
const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector(`form`)
const descripcion = document.getElementById(`description`)
const precio = document.getElementById(`precio`)
const stock = document.getElementById(`stock`)
var productos = localStorage.getItem("productos") ? JSON.parse(localStorage.getItem("productos")) : []
let editando = false
var descripcionprevia = "";

function crear() {
    descripcion.value = ""
    precio.value = ""
    stock.value = ""
}

function eliminar(articulo) {
    console.log("valor", articulo);

    productos = productos.filter(item => item.descripcion != articulo)

    localStorage.setItem("productos", JSON.stringify(productos))
    mostrar()
}

function mostrar() {
    const tablaproductos = document.querySelector("#tablaproductos")
    tablaproductos.innerHTML = "";
    productos.forEach(item => {
        const tr = document.createElement("tr")
        const tddesc = document.createElement("td")
        const tdprecio = document.createElement("td")
        const tdstock = document.createElement("td")
        tddesc.textContent = item.descripcion;
        tr.appendChild(tddesc)
        tdprecio.textContent = item.precio;
        tr.appendChild(tdprecio)
        tdstock.textContent = item.stock;
        tr.appendChild(tdstock)
        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger", "float-center", "mr-2");
        btnEliminar.addEventListener("click", () => eliminar(item.descripcion));
        btnEliminar.textContent = "Eliminar"

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn", "btn-warning", "float-center", "mr-2");
        btnEditar.addEventListener("click", () => editar(item));
        btnEditar.textContent = "Editar"
        btnEditar.setAttribute("data-bs-toggle", "modal");
        btnEditar.setAttribute("data-bs-target", "#modalArticulo");
        tr.appendChild(btnEliminar)
        tr.appendChild(btnEditar)


        tablaproductos.appendChild(tr);

    })
}

function guardar() {
    if (editando) {
        editando = false
        console.log("Entro a editar");
        productos = productos.filter(articulo => {
            if (articulo.descripcion === descripcionprevia) {
                articulo.descripcion = descripcion.value
                articulo.precio = precio.value
                articulo.stock = stock.value
                console.log("Encontro ", articulo.descripcion + " de la descprevia", descripcionprevia);
                return articulo
            }
            return articulo;
        })
        localStorage.setItem("productos", JSON.stringify(productos))

    } else {
        console.log("Entro a guardar");
        const producto = { descripcion: descripcion.value, precio: precio.value, stock: stock.value }
        productos.push(producto)
        localStorage.setItem("productos", JSON.stringify(productos))

    }

    mostrar()
}


function editar(producto) {
    //primero asignamos el valor previo
    descripcionprevia = producto.descripcion;
    producto.descripcion = descripcion.value
    producto.precio = precio.value
    producto.stock = stock.value
    editando = true
}


//localStorage.clear()
mostrar()