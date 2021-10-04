import { cajaService, crudService } from "../services";
import {toastr} from 'react-redux-toastr'
export const cajaActions = {  
  /*GET*/  
  getListDetalle,
  getItems,
  viewModal,
  getItemo,
  createList
};

/*---------------------------------------------------------------*/
function createList(xredux, payload, dato) {  
  return (dispatch) => {
    crudService
      .createList(payload, dato)                
      .then((response) => {                                         
        dispatch(ItemGet('CAJAS_ITEMS_DATA', response.result.items));           
        dispatch(ListaPost("CAJAS_ITEM", response.result.caja));     
        toastr.success(payload, 'Dato creado')     
      
      })
      .catch((err) => {        
        
      });
  };
}



export function ListaPost(xredux, result) { 
  return {  
    type: xredux,
    response: result
  };
}

/*---------------------------------------------------------------*/
function viewModal(xredux, est) {  
  return (dispatch) => {    
    dispatch({type: xredux, view:est});
  };
}
/*---------------------------------------------------------------*/
function getItems(xredux, payload, pky) {  
  return (dispatch) => {
    cajaService
      .getItems(payload, pky)
      .then((response) => {                                         
          dispatch(ItemGet('CAJAS_ITEM', response.result.cajau));
          dispatch(ItemGet('CAJAS_ITEMS_DATAS', response.result.itemsu));                  
      })
      .catch((err) => {
         
      });
  };
}
export function ItemGet(xredux, result) {  
  return {
    type: xredux,
    response: result
  };
}
/*---------------------------------------------------------------*/
function getListDetalle(xredux, payload, page,num,dato) {  
  return (dispatch) => {
    cajaService
      .getListDetalle(payload, page,num,dato)
      .then((response) => {                                   
        dispatch(ListaGet(xredux, response.result));
      })
      .catch((err) => {
        toastr.error('Error', err)      
        
      });
  };
}

export function ListaGet(xredux, result) {  
 
  return {
    type: xredux,
    response: result
  };
}


function getItemo(xredux, payload, pky) {  
  return (dispatch) => {
    cajaService
      .getItem(payload, pky)
      .then((response) => {                                        
          dispatch(ItemGet('CAJAS_ITEM', response.result.cajau));
          dispatch(ItemGet('CAJAS_ITEMS_DATA', response.result.itemsu));           
       
      })
      .catch((err) => {        
        
      });
  };
}