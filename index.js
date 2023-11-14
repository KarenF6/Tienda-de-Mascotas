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
}
//Eliminar iten del carrito
function eliminanrItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    //Actualizamos el total del carrito una vez eliminado un item
    actualizarTotalCarrito();
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
    }
}