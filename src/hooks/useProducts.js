import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import productsData from '../data/products.json';
import {receiveProducts} from '../redux/actions';
import Product from '../components/Product';

/*
 * This hook simulates an asynchronous call to an API to fetch product data for
 * the application.  It returns an object with the keys `products` and
 * `isLoading`, which respectively contain the array of products data and a
 * boolean value indicating whether the data is being "loaded".  A simple timer
 * is used to create the effect of an asynchronous operation.
 */
function useProducts() {
  const [ products, setProducts ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    /*
     * "Fetch" products data with a delay of 1000ms.
     */
    setIsLoading(true);
    setTimeout(() => {
      setProducts(productsData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { products, isLoading };
}

//const dispatch = useDispatch();

//return the stuff
// return (
//   <div>
//     {products.map(i => {
//       const addProduct = receiveProducts(i.id, i.name, i.price, i.inStock, i.photoUrl);
//       dispatch(addProduct);
//     }
//     )}
//   </div>
//);

export default useProducts;
