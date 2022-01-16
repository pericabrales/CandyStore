/**@jsxImportSource @emotion/react */

import React from 'react';
import {css} from '@emotion/react';
import {Route, Switch, NavLink, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

import {getCart} from './redux/selectors';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import CartList from './components/CartList';

function App() {
  
  const style = css`
    margin-top: 10px;
    padding: 0px;
    overflow: hidden;
    overflow-x: hidden;
    //background: LightBlue;
    border: 2px solid black;
    background-image: url("http://1-background.com/images/vellum/vellum-pink-seamless-tile3.jpg");

    .left{
      //width: 67%;
      float: center;
      border: 2px solid black;
    }

    .right{
      margin-left: 70%;
      position: absolute;
      overflow-x: hidden;
      //overflow-y: scroll;
      z-index: 1;
      //left: 0;
      top: 10%;
      right: 1%;
      width: 25%;
      height: 90%;
      background: rgb(220,246,174);;
      border: 3px solid black;

    }

  `;

  const navBar = css`
    //background: LightBlue;
    background: rgb(216,245,241);
  `;

  const topStyle = css`
    background: rgb(216,245,241);
    border: 2px solid black;
    padding-top: 20px;

  h1{
    text-align: center;
    padding-top: 0;
    padding-bottom: 10px;
    font-size: 40px;
  }
  
  a:link{
    text-decoration: none;
    color: black;
  }

  a:visited{
    text-decoration: none;
    color: black;
  }

  #cart-btn{
    position: relative;
    padding:0;
    margin: 0;
    left: 90%;
    height: 40px;
    width: 45px
  }

  #in-cart-text{
    position: relative;
    background: white;
    padding-top: 0px;
    left: 85%;
    font-weight: bold;
    font-size: 20px;
    width: 100px;
    border-radius: 25px;
  }

  `;


  //gotta get the whole url so we can then get the necessary info
  var curUrl = window.location.href;
  console.log(curUrl);
  var newUrl = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
  console.log(newUrl);

  //var cartUrl ="/cart";

  const cart = useSelector(getCart);

  //grab the necessary products
  AddProduct();

  return (
    <div>
      <div css={topStyle}>
        {/* <button><img src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"/></button> */}
        <div css={navBar}>
            {/* <input type="image" src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png" id="cart-btn"/> */}
          {/* <img src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png" alt="Shopping Cart" id="cart-btn" style={{display: 'none'}}/> */}
            <button id ="in-cart-text" style={{display: 'none'}} onClick={() => {
              //uncover the cart div
              var cartTxt = document.getElementById("cart-list");
              if(cartTxt.style.display === "none"){
                  cartTxt.style.display = "block";
              }
              else if(cartTxt.style.display === "block"){
                cartTxt.style.display = "none";
            }
            }}>Cart ({getNumInCart(cart)})</button>
          <a href={`${newUrl}`}>
            <h1>Penny Candy Store</h1>
          </a>
        </div>
      </div>

      <div css={style}>
        <div id="product-list" className="left">
          <ProductList/>
        </div>
            
        <div id="cart-list" className="right" style={{display: 'none'}}>
          <CartList/>
        </div>
      </div>
    </div>
  );
}

//this is to get the number of items in the cart currently
function getNumInCart(cart){
  var numItems = 0;
  cart.map(i => numItems++);
  console.log("number of items in cart: ", numItems);
  return numItems;
}

export default App;
