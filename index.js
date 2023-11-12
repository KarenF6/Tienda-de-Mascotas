// Variable que mantiene el estado del carrito
var carritoVisible = false;

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i< botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', EliminarItemCarrito);
    }

    //agrego funcionalidad al boton sumar cantidad
    var botonesSumarcantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i <botonesSumarcantidad.length;i++){
        var button = botonesSumarcantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //agrego funcionalidad al boton restar cantidad
    var botonesRestarcrantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0; i <botonesRestarcrantidad.length;i++){
        var button = botonesRestarcrantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Agrego funcionalidad a los botones Agregras al Carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i <botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);

}

function EliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    actualizarTotalCarrito();

    //La siguiente funcion controla si hay elementos en el carrito una vez que se elimino
    //si no hay debo ocultar el carrito
    ocultarCarrito();
}

function actualizarTotalCarrito(){
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for(var i=0; i <carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);

        var precio = parseFloat(precioElemento.innerText.replace('$',''), replace ('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad)
        total = total + (precio * cantidad);
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount ==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.computedStyleMap.opacity='0';
        carritoVisible = false;


        var items = document.getElementsByClassName('contenedor-items')[0];
        items.Style.width = '100%';
    }
}
//Aumento en uno la cantidad del elemento seleccionado 
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //Actualizamos el total
    actualizarTotalCarrito();


}
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    //controlamos que no sea menor que 1
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //Actualizamos el total
    actualizarTotalCarrito();
    }
    
}

function agregarAlCarritoClicked(event){
    var button = event.target;
    var item =button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('pecio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    //La siguiente funcion agrega el elemento al carrito.
    agregarItemCarrito(titulo, precio, imagenSrc);
}
function agregarItemCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText=titulo){
            alert("El item ya se escuentra en el carrito");
            return;
        }
    }
    
    var itemCarritoContenido =`
    <div class="carrito-item">
    <img src="${imagenSrc}" alt="" width="80px">
    <div class="carrito-item-detalles">
        <span class="carrito-item-titulo">${titulo}</span>
        <div class="selector-cantidad">
            <i class="fa-solid fa-minus restar-cantidad"></i>
            <input type="text" value="1" class="carrito-item-cantidad" disabled>
            <i class="fa-solid fa-plus sumar-cantidad"></i>
        </div>
        <span class="carrito-item-precio">${precio}</span>
    </div>
    <span class="btn-eliminar">
        <i class="fa-solid fa-trash"></i>
    </span>
</div> 
    `
item.innerHTML = itemCarritoContenido;
itemsCarrito.append(item);

//agregamos la funcionalidad eliminar del nunevo item
item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', EliminarItemCarrito);

//Agregamos la funcionalidad de sumar del nuevo item
var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
botonSumarCantidad.addEventListener('click', sumarCantidad);

//Agregamos la funcionalidad de restal del nuevo item 
var botonRestarrCantidad = item.getElementsByClassName('restar-cantidad')[0];
botonRestarCantidad.addEventListener('click', restarCantidad);


}
