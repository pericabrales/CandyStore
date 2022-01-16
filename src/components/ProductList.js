/**@jsxImportSource @emotion/react */

import React from 'react';
import {css} from '@emotion/react';
import { useSelector } from 'react-redux';

import Product from './Product';
import {getProducts} from '../redux/selectors';


function ProductList(){
    
    //styling const
    const productStyle = css`
        padding: 0px;
        overflow-x: hidden;

        div{
            position: relative;
            left: 7%;
        }
    `;

    const products = useSelector(getProducts);
    console.log("products from getProducts: ", products);

    return(
        <div css={productStyle}>
            {/* throw to Product to display each product */}
            {products.map(i => <Product key={i.id} {...i}/>)}

        </div>
    );
}

export default ProductList;