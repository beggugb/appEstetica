const initialState = { 
    user : {}
   } 
  
  export function usuarios(state = initialState, action) {
    switch (action.type) {             
      case 'LOGIN_SUCCESS':
        return {        
          ...state, 
            loggingIn: true,
            user: action.response
        };
      case 'LOGIN_USER':
        return {           
            ...state
        };
      case 'LOGIN_LOGOUT':
        return {           
            
        };                                          
      default:
        return state
    }
  }
  
  