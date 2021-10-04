import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { Card, Row, Col, Modal, ModalBody, Button, ListGroup, ListGroupItem  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash, faHome } from "@fortawesome/free-solid-svg-icons";
import {toastr} from 'react-redux-toastr'
import { api } from "../../../helpers";
const ListaArticulos = () => {
    const dispatch = useDispatch()    
    const articulos = useSelector(state => state.articulos.items)  
    const { items, cantidadTotal, sumaTotal } = useSelector(state => state.ventas)  
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  


    const handleAsignar = (articulo) => {         
      if(articulo.stock > 0)
      {
      let ites = [...items]
      let cTotal = cantidadTotal
      let sTotal = sumaTotal
      let repeat = false
        ites.map((item, index) =>{                              
          if(item.articuloId === articulo.articulo.id && item.stock < articulo.stock)
          { 
            ites[index].cantidad = parseFloat(ites[index].cantidad) + 1 
            ites[index].subTotal = ites[index].subTotal + parseInt(articulo.articulo.precioVenta)        
            ites[index].stock = ites[index].stock + 1
            cTotal = parseInt(cTotal) + 1;    
            sTotal = parseInt(sTotal) + parseInt(articulo.articulo.precioVenta) 
            repeat = true;
          }
          if(item.articuloId === articulo.articulo.id)
          {                        
            repeat = true;
          }
          return null
        }) 
        if(!repeat)
        {
        let itemVenta = {};
          itemVenta.cantidad = 1;          
          itemVenta.articuloId = articulo.articulo.id;        
          itemVenta.valor = articulo.articulo.precioVenta;
          itemVenta.unidad = articulo.articulo.unidad;
          itemVenta.stock = 1;
          itemVenta.subTotal = parseInt(1) * parseInt(articulo.articulo.precioVenta);        
          itemVenta.nombre = articulo.articulo.nombreCorto;       
          itemVenta.comision =  articulo.articulo.comision;     
          itemVenta.isService = articulo.articulo.categoriaId === 1 ? true : false;         
          ites.push(itemVenta);   
          cTotal = parseInt(cTotal) +parseInt(1);    
          sTotal = parseInt(sTotal) +parseInt(itemVenta.subTotal)          
        }
        dispatch({type:'VENTAS_SET_ITEMS',values:ites, cantidad: cTotal, suma: sTotal})
        }else{
          toastr.error(articulo.articulo.nombreCorto, 'Sin Stock') 
        }
    }  

    const makeHttpRequestWithPage = useCallback(() =>{
        let iok ={}
        iok.almacenId = almacenId
        iok.categoriaId = 0
        dispatch(crudActions.searchList('ARTICULOS_LISTA','almacenes',iok))          
      },[])
    
   
    
    useEffect(() => {
        makeHttpRequestWithPage(0)
        return () => {   
            dispatch({type:'ARTICULOS_RESET_ITEMS'})          
        };
    }, []);


    return (              
        <>        
        {articulos.map((item) => (
        <Card key={item.id} className="articulo" onClick={() => handleAsignar(item) }>
          <div className="precio">
          {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.articulo.precioVenta)}  
          </div>            
            <img
            alt="artículo"
            className="img-articulo"
            src={api + "/static/images/articulos/md/" + item.articulo.filename}
            />          
          <div className="nombre">{item.articulo.nombreCorto}</div>
          <div className={item.stock > 0 ?"stocki" :"stock"}>{item.stock}</div>                              
        </Card>
        ))}        
        </>                                             
    );
};
export default ListaArticulos;
