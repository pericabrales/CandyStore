/**@jsxImportSource @emotion/react */

import {css} from '@emotion/react';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import { useSelector } from 'react-redux';

import {getProducts} from '../redux/selectors';
import {addToCart, decreaseStock} from '../redux/actions';


//function that will create the card that will showcase the product and its info
//will also hold a button with '+' and '-' buttons and num in the middle that starts at 0
function Product({id, name, price, inStock, photoUrl}){
    //make a const for emotion style
    const productContainer = css`
    display: inline-block;
    margin: 20px;
    height: 250px;
    width: 300px;
    padding-top: 7px;
    padding-bottom: 7px;
    margin: 10px;
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
    form{
        display: inline-block;
        position: relative;
        left: 20%;
    }
    input{
        width: 50%;
    }


    `;

    const dispatch = useDispatch();
    const [ units, setUnits ] = useState(0);

    const prods = useSelector(getProducts);

    //var to keep track of when a product is out of 

    return(
        // if button is pressed, have to add to card
        <div css={productContainer} onSubmit={(e) => {
            //this prevents refreshing
            e.preventDefault();

            var stock = 0;
            var numItems = 0;
            prods.map(i => numItems++);

            //get true or false (true = more than 0, false = 0)
            prods.map(i => {
                if(i.id === id){
                    console.log("inside if statement in map: ", (i.inStock-units));
                    stock = (i.inStock-units);
                }
            });

            console.log("stock after: ", stock);

            //var el = document.getElementById("add-to-cart-'+id+'");
            var el = document.getElementsByClassName("add-to-cart")[numItems-id];
            console.log("id-1 is: ", (numItems-id));
            if(stock == 0){
                
                el.setAttribute("disabled", true);
                //set the content
                el.textContent = "Out of Stock";
            }
            else if(stock < 0 || stock > 0){
                el.removeAttribute("disabled");
                el.textContent = "Add to Cart";
            }

            if(stock >= 0){
                if(units > 0){
                    //uncover the cart text
                    var cartTxt = document.getElementById("in-cart-text");
                    if(cartTxt.style.display === "none"){
                        cartTxt.style.display = "block";
                    }

                    //uncover checkout button
                    var checkout = document.getElementById("checkout-btn");
                    if(checkout.style.display === "none"){
                        checkout.style.display = "block";
                    }
                }

                const addProdToCart = addToCart(id, name, price, Number(units), (units*price), photoUrl);
                const decreaseFromStock = decreaseStock(id, units);
                console.log("added new cart item: ", addProdToCart);
                dispatch(addProdToCart);
                dispatch(decreaseFromStock);
                setUnits(0);
            }
            else{
                alert("Invalid Request \r\nYou can't add more units than are in stock!");
            }
        }}>
            <img src={photoUrl} alt={name}/>
            <h2>{name}</h2>
            <h3>${price}</h3>
            <h3>Units in stock: {inStock}</h3>
            <form id="product-num-form">
                {/* <input type="text" id="product-num-input" defaultValue="0"/> */}
                <input value={units} onChange={(e) => setUnits(e.target.value)}/>
                <button className="add-to-cart" id="add-cart-btn">Add to Cart</button>
            </form> 
        </div>
    );
}

//function that will say if there are no more products and change the functionality of the button now
function checkInStock(prods) {
    //get true or false (true = more than 0, false = 0)
    var stock = prods.map(i => {
        return (i.inStock > 0);
    });

    if(stock){
        return "Add to Cart";
    }
    else{
        return ""
    }

}

export default Product;