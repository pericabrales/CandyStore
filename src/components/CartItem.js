/**@jsxImportSource @emotion/react */

import {css} from '@emotion/react';
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';

import {getCart, getProducts} from '../redux/selectors';
import {deleteFromCart, increaseStock} from '../redux/actions';

function CartItem({id, name, price, unitsAdded, totalCost, photoUrl}){
        //make a const for emotion style
        const cartItemStyle = css`
        display: inline-block;
        position: relative;
        //left: 10%;
        margin: 20px;
        height: 250px;
        width: 250px;
        padding-top: 7px;
        padding-bottom: 7px;
        background: white;
        border: 4px solid black;
    
        h2{
            text-align: center;
            font-size: 15px;
        }
    
        h3{
            text-align: center;
        }
    
        img{
            display: block;
            max-width: 100px;
            width: 100px;
            height: 100px;
            margin-left: auto;
            margin-right: auto;
        }
    
        `;

        const dispatch = useDispatch();
        const cart = useSelector(getCart);
        const prods = useSelector(getProducts);

        return(
            <div css={cartItemStyle}>
                <button id="remove-btn" onClick={() =>{
                    //checking to see how many things we have in this cart state
                    var numItems = 0;
                    cart.map(i => numItems++);
                    //if there are no items left, hide the checkout button and the cart button at the top
                    //have to do -1 because it doesnt trigger deleting the item until after this function ends
                    if((numItems-1) == 0){
                        console.log("inside numItems is 0");
                        //cover the cart text
                        var cartTxt = document.getElementById("in-cart-text");
                        if(cartTxt.style.display === "block"){
                            cartTxt.style.display = "none";
                        }
                
                        // //cover checkout button
                        // var checkout = document.getElementById("checkout-btn");
                        // if(checkout.style.display === "block"){
                        //     checkout.style.display = "none";
                        // }

                        //re-hide the cart div
                        var right = document.getElementById("cart-list");
                        if(right.style.display === "block"){
                            right.style.display = "none";
                        }
                    }

                    //checking to see if we can bring back an "Add to cart" button
                    var stock = 0;
                    var numItemsProd = 0;
                    prods.map(i => numItemsProd++);

                    console.log("cur prod name: ", name);

                    //get true or false (true = more than 0, false = 0)
                    prods.map(i => {
                        if(i.id === id){
                            console.log("name of prod we got with same id: ", i.name);
                            console.log("inside if statement in map: ", (i.inStock+unitsAdded));
                            stock = (i.inStock+unitsAdded);
                        }
                    });

                    console.log("stock after: ", stock);

                    //find the add to cart button of the correct product and disable it if there are no more items to give
                    var el = document.getElementsByClassName("add-to-cart")[numItemsProd-id];
                    console.log("id-1 is: ", (numItemsProd-id));
                    if(stock <= 0){
                        
                        el.setAttribute("disabled", true);
                        el.textContent = "Out of Stock";
                    }
                    else{
                        el.removeAttribute("disabled");
                        el.textContent = "Add to Cart";
                    }


                    //remove a product from the cart
                    const removeProd = deleteFromCart(id);
                    dispatch(removeProd);

                    //give a product its stock back
                    const incStock = increaseStock(id, unitsAdded);
                    dispatch(incStock);

                }}>Remove</button>
                <img src={photoUrl} alt={name}/>
                <h2>{name}</h2>
                <h3>${price} per unit</h3>
                <h3>Units: {unitsAdded}</h3>
                <h3>Total Cost: ${Number((totalCost).toFixed(2))}</h3>
            </div>
        );
}

export default CartItem;