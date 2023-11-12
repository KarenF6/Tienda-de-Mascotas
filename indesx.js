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
}

