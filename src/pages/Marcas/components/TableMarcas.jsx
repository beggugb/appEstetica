import React,{useEffect, useCallback} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash, FilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'

const TableMarcas = () => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas}= useSelector(state => state.marcas)

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.getData('MARCAS_DATA','marcas',page, num))  
    console.log('segui1')
  },[]) 

  const deleteItem = (pky) => {                
    dispatch(crudActions.deleteList('MARCAS_ADD','marcas',pky))
  };
  const getItem = (pky) => {                
    dispatch(crudActions.getItem('MARCAS_ITEM','marcas',pky))
  };

  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
        dispatch({type:'MARCAS_RESET_DATA'})   
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
export default TableMarcas;
