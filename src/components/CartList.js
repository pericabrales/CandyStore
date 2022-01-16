/**@jsxImportSource @emotion/react */

import React from 'react';
import {css} from '@emotion/react';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';

import {getCart} from '../redux/selectors';
import {checkout} from '../redux/actions'
import CartItem from './CartItem';

function CartList(){
    console.log("in cartList");
    //styling const
    const innerCartStyle = css`
    div{
        display: inline-block;
        verticle-align: middle;
        position: relative;
        left: 12%;
        overflow-x: hidden;
        overflow-y: hidden;
        padding: 0px;
        //background: black;
    }

    `;

    const btnStyle = css`
        div{
            text-align: center;
        }
        #checkout-btn{
            position: relative;
            background: white;
            padding-top: 0px;
            //left: 85%;
            width: 120px;
            font-size: 20px;
            font-weight: bold;
            border-radius: 25px;
        }

    `;

    const fullCartStyle = css`
        #cart-header{
            text-decoration: underline;
            position: relative;
            left: 44%;
        }
    `;

    const cart = useSelector(getCart);
    console.log("cart from getCart: ", cart);

    const dispatch = useDispatch();

    return(
        <div css={fullCartStyle}>
            <h2 id="cart-header">Cart</h2>
            <div css={btnStyle}>
                <button id="checkout-btn" style={{display: 'none'}} onClick={() => {
                    //checkout and delete all stuff in the array without adding back to any stock
                    const deleteCart = checkout();
                    dispatch(deleteCart);

                    //put everything away again
                    //cover the cart text
                    var cartTxt = document.getElementById("in-cart-text");
                    if(cartTxt.style.display === "block"){
                        cartTxt.style.display = "none";
                    }

                    //re-hide the cart div
                    var right = document.getElementById("cart-list");
                    if(right.style.display === "block"){
                        right.style.display = "none";
                    }
                }}>Checkout</button>
            </div>
    
            <div css={innerCartStyle}>
                {/* throw to Product to display each product */}
                {cart.map(i => <CartItem key={i.id} {...i}/>)}
            </div>
        </div>
    );
}

export default CartList;