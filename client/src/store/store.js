import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'


const cartFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
const token = localStorage.getItem('token')?localStorage.getItem('token'):''
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):''


const initState = {
    cart:{
        cartItems:cartFromLocalStorage,
        shippingAddress:shippingAddressFromLocalStorage,
        paymentMethod:paymentMethodFromLocalStorage
    },
    user:{
        token,
        isAuthenticated:false
    }
}
const middleware = [thunk]

const store = createStore(rootReducer,initState,composeWithDevTools(applyMiddleware(...middleware)))


export default store;