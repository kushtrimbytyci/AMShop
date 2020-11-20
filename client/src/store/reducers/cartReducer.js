const {CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS,SAVE_PAYMENT_METHOD,CLEAR_CART} = require('../types')

const initState = {
cartItems:[],
shippingAddress:{},
paymentMethod:''
}

const cartReducer = (state=initState,action)=>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existsItem = state.cartItems.find((x)=>{
             return   x.id===item.id
            })
            if(existsItem){             //it returns a new array, that's why it won't get replicated
                return {...state,cartItems:state.cartItems.map(x => x.id ===existsItem.id?item : x)}
            }else{
                return {...state,cartItems:[...state.cartItems, item]}
            }
        case CART_REMOVE_ITEM:
            return {...state,cartItems:action.payload}
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state,shippingAddress:action.payload}
        case CLEAR_CART:
            return {...state,cartItems:[]}
        case SAVE_PAYMENT_METHOD:
            return {...state,paymentMethod:action.payload}
        
        default:
            return state
    }
}

export default cartReducer;