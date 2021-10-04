import React,{useEffect, useCallback} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'

const TableProveedores = ({getComponent}) => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView}= useSelector(state => state.proveedores)

   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(crudActions.getData('PROVEEDORES_DATA','proveedores',page, num))  
    console.log('segui1')
  },[]) 

  const viewArticulo = (pky) => {        
    let est = modalView === true ? false : true;             
    dispatch({type:'PROVEEDORES_VIEW',view:est}) 
    dispatch(crudActions.getItem('PROVEEDORES_ITEM','proveedores',pky))
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
                  <th width="15%">Código</th>
                  <th width="45%">Razon Social</th>
                  <th width="15%">Tipo Fiscal</th>
                  <th width="15%">Nit</th>            
                  <th width="10%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                  {data.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.codigo}</td>
                        <td>{item.razonSocial}</td>
                        <td>{item.tipoFiscal}</td>
                        <td>{item.nit}</td>                                                       
                        <td>
                          <Button className="btn btn-success" 
                            onClick={() => { getComponent('edit',item.id)}}                           >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button className="btn btn-danger" 
                            onClick={() => { viewArticulo(item.id)}}>
                            <FontAwesomeIcon icon={faFilePdf} />
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
export default TableProveedores;
