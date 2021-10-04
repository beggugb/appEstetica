import React,{useEffect, useCallback, useState} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf,faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'

const TableServicios = ({getComponent}) => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView}= useSelector(state => state.servicios)   
   

   const makeHttpRequestWithPage = useCallback((page,num) =>{          
     dispatch(crudActions.getData('SERVICIOS_DATA','servicios',page, num ))      
  },[]) 



  const deleteItem = (pky) => {                
    dispatch(crudActions.deleteList('SERVICIOS_DATA','servicios',pky))
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
                  <th width="10%" >Código</th>
                  <th width="70%">Nombre</th>                                  
                  <th width="20%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>                                                          
                        <td>
                          <Button className="btn btn-success" 
                            onClick={() => { getComponent('edit',item.id)}}                           >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>                          
                          <Button className="btn btn-danger" 
                            onClick={() => { deleteItem(item.id)}}                           >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>                 
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
export default TableServicios;
