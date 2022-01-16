import { useDispatch } from 'react-redux';

import productsData from '../data/products.json';
import {receiveProducts} from '../redux/actions';

function AddProduct(){
    //get an array of the products
    var products = Object.keys(productsData).map(ind => {
        return productsData[ind]
    })

    const dispatch = useDispatch();

    //return the stuff
    return (
        products.map(i => {
            const addProduct = receiveProducts(i.id, i.name, i.price, i.inStock, i.photoUrl);
            console.log("adding new product: ", addProduct);
            dispatch(addProduct);
        }
        )
    );
        
    
}

export default AddProduct;