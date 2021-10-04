import { usuarioService } from "../services";
import { history } from "../helpers";
import { toastr } from "react-redux-toastr";


export const usuarioActions = {  
  login,
  logout
};
/*---------------------------------------------------------------*/
function login(user) {
  return (dispatch) => {    
    usuarioService
      .login(user)
      .then((response) => {    
        console.log(response)                             
        if(response.user.usuario){          
          dispatch(dlogin(response.user));
          history.push("/admin");          
        }else{
          toastr.error('Error', response.user.message)
        }              
      })
      .catch((err) => {  
        
      });
  };
}

export function dlogin(resp) {     
  
  return {
    type: "LOGIN_SUCCESS",
    response: resp.usuario
  };
}
/*---------------------------------------------------------------*/
function logout() {    
  return (dispatch) => {
    usuarioService.logout();
    dispatch(loginOut());
    history.push("/admin");
  };
}

export function loginOut() {
  return {
    type: "LOGIN_LOGOUT",
  };
}
/*---------------------------------------------------------------*/