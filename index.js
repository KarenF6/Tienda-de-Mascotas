//INTEGRANTES:
//Karen Dayana Fuentes Mendoza
//Cesar Luis Alean Hernandez


// Variable que mantiene el estado del carrito
var carritoVisible = false;

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    //Funcionalidad a los botones de eliminar 
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminanrItemCarrito);
    }

    //Agrego funcionalidad al boton de sumar
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i< botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }
    //Agrego funcionalidad al boton de restar
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0; i< botonesRestarCantidad.length;i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agrego funcionalidad a los botones agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}
//Eliminar iten del carrito
function eliminanrItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    //Actualizamos el total del carrito una vez eliminado un item
    actualizarTotalCarrito();

    //La siguiente funcion controla si hay elementos en el carrito una vez que se elimino
    //Si no hay debe ocultar el carrito
    ocultarCarrito();
}

//Actualizar el total del carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for(var i=0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio'[0]);
        console.log(precioElemento);
        //Quitamos el simbolo peso y el punto de milesimo
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad') [0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;
    document.getElementsByClassName('carrito-precio-total') [0].innerText = total.toLocaleString("es" + ',00');
}       

function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight ='-100%';
        carrito.style.opacity='0';
        carritoVisible = false;

        //Ahora maximiso el contenedor de los elementos 
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
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
    actualizarTotalCarrito();

 }
 //Aumento en uno la cantidad del elemento seleccionado
 function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;

    if(cantidadActual>=1){
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    }
 }
 function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);
 }
 function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    var nombresItemsCarrito = item.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i< nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `

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

                item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminanrItemCarrito);

                var botonesSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
                botonesSumarCantidad.addEventListener('click', sumarCantidad);

                var botonesRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
                botonesRestarCantidad.addEventListener('click', restarCantidad);


 }

 function pagarClicked(event){
    alert('Gracias por tu compra');
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }

    actualizarTotalCarrito();
 }

