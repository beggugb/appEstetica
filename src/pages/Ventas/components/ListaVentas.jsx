import React,{useEffect, useCallback} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";


const ListaVentas = () => {
   const dispatch = useDispatch() 
   const {items, cantidadTotal}= useSelector(state => state.ventas)


   const removeItem = (index) => {     
    var array = [...items];          
    let cc    = cantidadTotal      
    cc = cc - parseFloat(array[index].cantidad);
    array.splice(index, 1);
    /*addItem(array, tt, cc); */
    dispatch({type:'VENTAS_SET_ITEMS',values:array, cantidad: cc}) 
      
    } 
   
   useEffect(() => {    
    return () => {
      dispatch({type:'VENTAS_RESET_ITEMS'})   
    };
}, []);
  return(
    <>    
    <Row>
      <Col>
      <div className="table-single">     
        <Table className="table-simple">
          <thead>
              <tr>  
                <th width="15%" >Código</th>
                <th width="30%">Nombre</th>
                <th width="10%">Categoría</th>
                <th width="10%">Marca</th>
                <th width="10%">Valor</th>
                <th width="10%">Cantidad</th>                
                <th width="10%">SubTotal</th>            
                <th width="5%"></th>                   
              </tr>
          </thead>
          {items && (
              <tbody>
                  {items.map((item, index) => (
                      <tr key={item.articuloId}>                      
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>                                          
                        <td>{item.categoria}</td>
                        <td>{item.marca}</td>                        
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)}</td>
                        <td>{item.cantidad}</td>
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.subTotal)}</td>

                        <td>
                          <Button className="btn btn-danger" 
                            onClick={() => { removeItem(index)}}                           >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>                                           
                        </td>
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
      </div>

      </Col>
    </Row>       
</>      
  )

};
export default ListaVentas;
