import {USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGOUT,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,UPDATE_USER,GET_ME,USER_CLEAR_ERROR} from '../types'


const initState ={
    loading:false,
    user:[],
    error:null,
    token:null,
    isAuthenticated:false,
    success:null
}


const userReducer = (state=initState,action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return {...state,loading:true}
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {...state,loading:false,isAuthenticated:true,user:action.payload,token:action.token}
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {...state,loading:false,isAuthenticated:false,error:action.payload,token:''}
        case UPDATE_USER:
            return {...state,loading:false,isAuthenticated:true,user:action.payload,success:'User informations updated successfully.'}
        case USER_CLEAR_ERROR:
        return {...state,error:null}
        case GET_ME:
            return {...state,loading:false,isAuthenticated:true,user:action.payload}
        case USER_LOGOUT:
            return {...state,loading:false,isAuthenticated:false,user:[]}
            default:
                return state;
    }
}

export default userReducer;