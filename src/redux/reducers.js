import {combineReducers} from 'redux';
import {
    RECEIVE_PRODUCTS,
    ADD_TO_CART,
    DECREASE_STOCK,
    INCREASE_STOCK,
    ADD_SAME_PRODUCT_TO_CART,
    DELETE_FROM_CART,
    CHECKOUT
    }
    from './actions';

const curState = {products: [], cart: []};

function productsReducer(state = [], action){
    console.log("action type: ", action.type);
    switch(action.type){
        case RECEIVE_PRODUCTS:
            //had trouble with the product array dublicating, so this is to make sure no duplications happen
            if(!state.some(s => s.id === action.id)){
                return [
                    {
                        id: action.id,
                        name: action.name,
                        price: action.price,
                        inStock: action.inStock,
                        photoUrl: action.photoUrl
                    },
                    ...state
                ];
            }
            return state;

        case DECREASE_STOCK:
            return state.map(i => (
                i.id === action.id ? {
                    ...i,
                    inStock: i.inStock -= action.unitsAdded
                }: i
            ));

        case INCREASE_STOCK:
            return state.map(i => (
                i.id === action.id ? {
                    ...i,
                    inStock: i.inStock += action.unitsAdded
                }: i
            ));

        default:
            return state;
    }
}

function cartReducer(state = [], action){
    console.log("action type: ", action.type);
    switch(action.type){
        case ADD_TO_CART:
            if(!state.some(s => s.id === action.id)){
                return[
                    {
                        id: action.id,
                        name: action.name,
                        price: action.price,
                        unitsAdded: action.unitsAdded,
                        totalCost: action.totalCost,
                        photoUrl: action.photoUrl
                    },
                    ...state
                ];
            }
            else{
                return state.map(i => {
                    if(i.id !== action.id){
                        return i;
                    }
    
                    return{
                        ...i,
                        unitsAdded: i.unitsAdded += action.unitsAdded,
                        totalCost: i.totalCost += action.totalCost
                    }
                })
            }

        case ADD_SAME_PRODUCT_TO_CART:
            return state.map(i => {
                if(i.id !== action.id){
                    return i;
                }

                return{
                    ...i,
                    unitsAdded: i.unitsAdded += action.unitsAdded,
                    totalCost: i.totalCost += action.totalCost
                }
            })
          
        case DELETE_FROM_CART:
            // let newState = [...state];
            // newState.splice(action.index, 1);
            // return newState;

            return [
                ...state.filter(i => i.id !== action.id)
            ];

        //delete it all
        case CHECKOUT:
            let emptyState = [];
            return emptyState;

        default:
            return state;     
    }
}

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});

export default rootReducer;

