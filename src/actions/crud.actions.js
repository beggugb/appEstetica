import { crudService } from "../services";
import {toastr} from 'react-redux-toastr'
export const crudActions = {        
  getData,
  getDataUsuario,
  getLista,
  getItem,
  searchList,
  searchItems,
  changeValue,
  createUnit,
  uploadImagen,
  putUnit,
  createList,
  putList,
  putItems,
  deleteList,
  sendItem,
  informes,
  buscarItem
};

function buscarItem(xredux, payload, dato) {
  return (dispatch) => {    
    crudService
      .buscarItem(payload, dato)
      .then((response) => {   
        console.log(response)
        if(!response.result){
          if(xredux === 'ARTICULOS_VERIFICAR')
          {
            toastr.error('Articulo existente', 'código de barras registrado')
          }       
        }
        dispatch(resRedux(xredux, response.result));              
      })
      .catch((err) => {
        toastr.error('Login', err) 
      });
  };
}

function informes(xredux, payload, dato) {
  return (dispatch) => {    
    crudService
      .informes(payload, dato)
      .then((response) => {         
        console.log(response)
        dispatch(resRedux(xredux, response.result));              
      })
      .catch((err) => {
        toastr.error('Login', err) 
      });
  };
}


function sendItem(payload, pky) {  
  return (dispatch) => {
    crudService
      .sendItem(payload, pky)
      .then((response) => {  
        toastr.success(payload, "item enviado")        
      })
      .catch((err) => {
        toastr.error(payload, err)        
      });
  };
}

function deleteList(xredux, payload, dato) {  
  return (dispatch) => {
    crudService
      .deleteList(payload, dato)
      .then((response) => {                          
        if(response.result){
          dispatch(resRedux(xredux, response.result));  
        }                            
        toastr.success(payload, 'Dato eliminado')       
      })
      .catch((err) => {               
        toastr.error(payload, err.parent.detail)       
      });
  };
}
function createList(xredux, payload, dato) {  
  return (dispatch) => {
    crudService
      .createList(payload, dato)
      .then((response) => {                          
        if(response.result){
          if(xredux === 'VENTAS_DIRECTAS'){            
            dispatch(resRedux(xredux, 0));
            dispatch(resRedux('ARTICULOS_LISTA', response.result));                          
          }
          else{
            dispatch(resRedux(xredux, response.result));  
          }          
        }                            
        toastr.success(payload, 'Dato creado')       
      })
      .catch((err) => {      
        if(xredux === 'VENTAS_DIRECTAS'){ 
          toastr.error('Cajas', 'no tiene caja abierta')       
        }else{
          toastr.error(payload, err)       
        }         
      });
  };
}

function putList(xredux,payload, dato) {  
  return (dispatch) => {
    crudService
      .putList(payload, dato)
      .then((response) => {      
        if(response.result){
          dispatch(resRedux(xredux, response.result));  
        }
        toastr.success(payload, 'Dato actualizado') 
      })
      .catch((err) => {        
        toastr.error(payload, err) 
      });
  };
}

function putItems(xredux,payload, dato, id) {  
  return (dispatch) => {
    crudService
      .putItems(payload, dato, id)
      .then((response) => {      
        if(response.result){
          dispatch(resRedux(xredux, response.result));  
        }
        toastr.success(payload, 'Dato actualizado') 
      })
      .catch((err) => {
        toastr.success(payload, err) 
      });
  };
}

function createUnit(xredux, payload, dato) {  
  return (dispatch) => {
    crudService
      .createUnit(payload, dato)
      .then((response) => {                          
        if(response.result){
          dispatch(resRedux(xredux, response.result));  
        }                            
        toastr.success(payload, 'Dato creado')       
      })
      .catch((err) => {       
        toastr.error(payload, err)       
      });
  };
}

function putUnit(payload, dato) {  
  return (dispatch) => {
    crudService
      .putUnit(payload, dato)
      .then((response) => {      
        toastr.success(payload, 'Dato actualizado') 
      })
      .catch((err) => {
        toastr.success(payload, err) 
      });
  };
}

function getItem(xredux, payload, pky) {  
  return (dispatch) => {
    crudService
      .getItem(payload, pky)
      .then((response) => {          
        if(xredux === "COMPRAS_ITEM") {
          let iok = response.result.item.proveedor.razonSocial                    
          dispatch({type: 'COMPRAS_CHANGE', props: 'proveedors', value: iok})
        }
        if(xredux === "VENTAS_ITEM") {
          let iok = response.result.item.cliente.nombres                    
          dispatch({type: 'VENTAS_CHANGE', props: 'clients', value: iok})
        }                    
        dispatch(resRedux(xredux, response.result));
      })
      .catch((err) => {
        toastr.error(payload, err)        
      });
  };
}

function uploadImagen(payload, data, datoId) {
  return (dispatch) => {    
    crudService
      .uploadImagen(payload, data, datoId)
      .then((response) => {       
       toastr.success(payload, 'Imagen cargada') 
      })
      .catch((err) => {        
       
      });
  };
}

function getDataUsuario(xredux, payload, page, num, usuario) {  
  return (dispatch) => {
    crudService
      .getDataUsuario(payload,page,num,usuario)
      .then((response) => {                         
        dispatch(resRedux(xredux, response.result));
      })
      .catch((err) => {
                  
    });
};
}

function getData(xredux, payload, page,num) {  
    return (dispatch) => {
      crudService
        .getData(payload,page,num)
        .then((response) => {                         
          dispatch(resRedux(xredux, response.result));
        })
        .catch((err) => {
                    
      });
  };
}

function getLista(xredux, payload) {  
  return (dispatch) => {
    crudService
      .getLista(payload)
      .then((response) => {     
        console.log(response)                            
        dispatch(resRedux(xredux, response.result));
      })
      .catch((err) => {
                  
    });
};
}

function searchItems(xredux, payload, dato) {    
    return (dispatch) => {
      crudService
        .searchItems(payload, dato)
        .then((response) => {     
          console.log(response) 
          if(response){  
            dispatch(resRedux(xredux, response.result));
          }                    
        })
        .catch((err) => {        
          toastr.error(payload, err)
        });
    };
}

function searchList(xredux, payload, dato) {    
  return (dispatch) => {
    crudService
      .searchList(payload, dato)
      .then((response) => {      
        console.log(response)              
        if(response.result){                   
          dispatch(resRedux(xredux, response.result));        
        } 
      })
      .catch((err) => {        
        toastr.error(payload, err)
      });
  };
}

  function changeValue(xredux, props, values) {  
    return {
      type: xredux, props: props, value: values
    };
  }

    
export function resRedux(xredux, result) {       
      return {
        type: xredux,
        response: result
      };    
  }

  