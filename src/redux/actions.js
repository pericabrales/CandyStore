
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_STOCK = "DECREASE_STOCK";
export const INCREASE_STOCK = "INCREASE_STOCK";
export const ADD_SAME_PRODUCT_TO_CART = "ADD_SAME_PRODUCT_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const CHECKOUT ="CHECKOUT";


//function that will get all of the info of a product
export function receiveProducts(id, name, price, inStock, photoUrl){
    return{
        type: RECEIVE_PRODUCTS,
        id,
        name,
        price,
        inStock,
        photoUrl
    };
}

//add a new product to the checkout cart
export function addToCart(id, name, price, unitsAdded, totalCost, photoUrl){
    return{
        type: ADD_TO_CART,
        id,
        name,
        price,
        unitsAdded,
        totalCost,
        photoUrl
    }
}

//decrease the number of items in stock
export function decreaseStock(id, unitsAdded){
    return{
        type: DECREASE_STOCK,
        id,
        unitsAdded
    }
}

//when adding more of a product that's already been added to the cart, increase the units added, and increase the total cost 
export function addSameProductToCard(id, unitsAdded, totalCost){
    return{
        type: ADD_SAME_PRODUCT_TO_CART,
        id,
        unitsAdded,
        totalCost
    }
}

//when deleting a product from the cart
export function deleteFromCart(id){
    return{
        type: DELETE_FROM_CART,
        id
    }
}

//when we delete from cart, we have to give the product back its stock
export function increaseStock(id, unitsAdded){
    return{
        type: INCREASE_STOCK,
        id,
        unitsAdded
    }
}

//this is when we checkout. we just delete it all
export function checkout(){
    return{
        type: CHECKOUT
    }
}