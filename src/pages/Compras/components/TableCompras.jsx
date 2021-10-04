import React,{useEffect, useCallback} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf, faCheck, faTrash, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'

const TableCompras = ({getComponent}) => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView}= useSelector(state => state.compras)
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.getData('COMPRAS_DATA','compras',page, num))  
    console.log('segui1')
  },[]) 

  const viewCompra = (pky) => {        
    let est = modalView === true ? false : true;             
    dispatch({type:'COMPRAS_VIEW',view:true}) 
    dispatch(crudActions.getItem('COMPRAS_ITEM','compras',pky))
  };

  const aprobarCompra = (pky) => {   
    let dato ={
      "id": pky,
      "tipo": "compra",
      "observaciones": "ningun",
      "almacenId": 1,
      "fechaAprobacion": new Date(),
      "usuarioId" : usuario.id
    }
    dispatch(crudActions.putList('COMPRAS_DATA','compras',dato)) 
    console.log(pky)
  };

  const deleteItem = (pky) => {                
    dispatch(crudActions.deleteList('COMPRAS_DATA','compras',pky))
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
                        <td>{item.fechaCompra}</td>                        
                        <td>{item.observaciones}</td>
                        <td>{item.tipo}</td>
                        <td>{item.estado ? "cerrado":"pendiente"}</td>
                        <td>{item.proveedor ? item.proveedor.razonSocial: ''}</td>                                                         
                        <td>
                          {item.estado ?
                            <>
                            <Button className="btn btn-danger" 
                              onClick={() => { viewCompra(item.id)}}>
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
                              onClick={() => { aprobarCompra(item.id)}}                           >
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
export default TableCompras;
