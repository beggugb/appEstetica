import React,{useEffect, useCallback} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash, FilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'

const TableCategorias = () => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView}= useSelector(state => state.categorias)

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.getData('CATEGORIAS_DATA','categorias',page, num))  
    console.log('segui1')
  },[]) 

  const deleteItem = (pky) => {                
    dispatch(crudActions.deleteList('CATEGORIAS_ADD','categorias',pky))
  };
  const getItem = (pky) => {                
    dispatch(crudActions.getItem('CATEGORIAS_ITEM','categorias',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
        dispatch({type:'CATEGORIAS_RESET_DATA'})   
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
                  <th width="10%">Código</th>
                  <th width="55%">Nombre</th>
                  <th width="20%">Abreviación</th>                             
                  <th width="15%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        <td>{item.abreviacion}</td>
                        <td>
                          <Button className="btn btn-warning" 
                            onClick={() => { getItem(item.id)}}                           >
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
export default TableCategorias;
