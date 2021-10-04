import React,{useEffect, useCallback} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf, faCheck, faTrash, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'

const TableVentas = ({getComponent}) => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView}= useSelector(state => state.ventas)
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.getData('VENTAS_DATA','ventas',page, num))  
    console.log('segui1')
  },[]) 

  const viewVenta = (pky) => {        
    let est = modalView === true ? false : true;             
    dispatch({type:'VENTAS_VIEW',view:true}) 
    dispatch(crudActions.getItem('VENTAS_ITEM','ventas',pky))
  };

  const aprobarVenta = (item) => {   
    let dato ={
      "id": item.id,
      "tipo": "venta",
      "observaciones": "ningun",
      "almacenId": 1,
      "fechaAprobacion": new Date(),
      "usuarioId" : usuario.id,
      "clienteId": item.cliente.id      
    }
    dispatch(crudActions.putList('VENTAS_DATA','ventas',dato)) 
    
  };

  const deleteItem = (pky) => {                
    dispatch(crudActions.deleteList('VENTAS_DATA','ventas',pky))
  };



  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
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
                  <th width="10%">Nro.</th>
                  <th width="10%">Fecha</th>
                  <th width="25%">Glosa</th>
                  <th width="10%">Total</th>
                  <th width="10%">Estado</th>
                  <th width="20%">Proveedor</th>
                  <th width="15%"></th>
                  
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.id}</td>
                        <td>{item.fechaVenta}</td>                        
                        <td>{item.observaciones}</td>
                        <td>{item.tipo}</td>
                        <td>{item.estado ? "cerrado":"pendiente"}</td>
                        <td>{item.cliente ? item.cliente.nombres: ''}</td>                                                         
                        <td>
                          {item.estado ?
                            <>
                            <Button className="btn btn-danger" 
                              onClick={() => { viewVenta(item.id)}}>
                              <FontAwesomeIcon icon={faFilePdf} />
                            </Button> 
                            </>
                            :
                            <>                              
                            <Button className="btn btn-warning" 
                              onClick={() => { getComponent('edit',item.id)}}                           >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button className="btn btn-success" 
                              onClick={() => { aprobarVenta(item)}}                           >
                              <FontAwesomeIcon icon={faCheck} />
                            </Button>
                   
                            <Button className="btn btn-danger" 
                              onClick={() => { deleteItem(item.id)}}                           >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            </>
                          }
                          
                                           
                        </td>
                      </tr>  
                      ))}
              </tbody>
          )}
        </Table>
      </div>
      <div className="navegador" >
      <Pagination
        makeHttpRequestWithPage={ makeHttpRequestWithPage }
        total={total}
        paginas={paginas}
        current= {pagina} 
        pagina= {12}
      />
      </div>

      </Col>
    </Row>       
</>      
  )

};
export default TableVentas;
