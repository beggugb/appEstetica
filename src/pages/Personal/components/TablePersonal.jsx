import React,{useEffect, useCallback, useState} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf,faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'

const TablePersonal = ({getComponent}) => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView}= useSelector(state => state.personas)   
   

   const makeHttpRequestWithPage = useCallback((page,num) =>{          
     dispatch(crudActions.getData('PERSONAS_DATA','personas',page, num ))      
  },[]) 

  const viewArticulo = (pky) => {        
    let est = modalView === true ? false : true;             
    dispatch({type:'PERSONAS_VIEW',view:true}) 
    dispatch(crudActions.getItem('PERSONAS_ITEM','personas',pky))
  };

  const deleteItem = (pky) => {                
    dispatch(crudActions.deleteList('PERSONAS_DATA','personas',pky))
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
                  <th width="5%" >Código</th>
                  <th width="45%">Nombres</th>
                  <th width="20%">Dirección</th>
                  <th width="20%">Teléfono</th>            
                  <th width="10%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item, index) => (
                      <tr key={index}>                      
                        <td>{item.id}</td>
                        <td>{item.nombres}</td>
                        <td>{item.direccion}</td>
                        <td>{item.telefono}</td>                                          
                        <td>
                          <Button className="btn btn-success" 
                            onClick={() => { getComponent('edit',item.id)}}                           >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button className="btn btn-info" 
                            onClick={() => { viewArticulo(item.id)}}>
                            <FontAwesomeIcon icon={faFilePdf} />
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
export default TablePersonal;
