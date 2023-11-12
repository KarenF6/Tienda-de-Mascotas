// Variable que mantiene el estado del carrito
var carritoVisible = false;

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(vari=0; i< botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', EliminarItemCarrito);
    }

    //agrego funcionalidad al boton sumar cantidad
    
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