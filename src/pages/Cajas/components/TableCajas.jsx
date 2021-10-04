import React,{useEffect, useState, useCallback} from "react";
import { Table, Row, Col, Button, Modal, ModalBody  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { cajaActions, crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faEdit,
  faLock,
  faLockOpen,
  faFile,
  faFilePdf,
  faTimes } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'
import Moment from 'react-moment'
import CajasItemsDetalle from './CajasItemsDetalle'
import CajasConsolidado from "./CajasConsolidado";

const TableCajas = () => {
   const dispatch = useDispatch() 
   const {data,total,pagina,paginas,modalView, item}= useSelector(state => state.cajas)
   const citems = useSelector(state => state.cajasitems.data)
   const [estado, setEstado] = useState('detalle');
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   const makeHttpRequestWithPage = useCallback((page, num) =>{
    dispatch(cajaActions.getListDetalle('CAJAS_DATA','cajas',1,12, usuario.id))
    console.log('segui1')
  },[]) 

  const closeHandler = (pky) => {     
    let dato = pky
    dato.usuarioId = usuario.id       
    dato.estado = true
    dispatch(crudActions.putList('CAJAS_DATA','cajas',dato))            
 }


  
  const toggleModalView = (item, iok) => {    
   let est = modalView === true ? false : true;    
   setEstado(iok)
   
   if(item){
     dispatch(cajaActions.getItems('CAJAS_ITEMS_DATA','cajas',item.id))
   }   
   dispatch(cajaActions.viewModal('CAJAS_VIEW',est))        
       
 };

  
  useEffect(() => {
      makeHttpRequestWithPage(1,12)
      return () => {
        dispatch({type:'CAJAS_RESET_DATA'})   
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
              <th width="10%">Fecha</th>
                <th width="20%">Usuario</th>
                <th width="10%">$ Inicial</th>
                <th width="10%">$ Ingreso</th>
                <th width="10%">$ Egreso</th>
                <th width="10%">$ Final</th>
                <th width="10%">Estado</th>   
                <th width="10%">F.Cierre</th> 
                <th width="10%"></th>                
              </tr>
          </thead>
          {data && (
              <tbody>
                   {data.map((item) => (
                    <tr key={item.id}>                      
                      <td><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></td>     
                      <td>{item.usuario.nombres}</td>     
    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>
    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</td>
    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>
    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</td>
                      
                      <td>{item.estado ? 
                        <Button className={"btn btn-danger btn-xs"}>
                          <FontAwesomeIcon icon={faLock} />
                        </Button>  
                        : 
                        <Button className={"btn btn-success btn-xs"}>
                          <FontAwesomeIcon icon={faLockOpen} />
                        </Button>  
                      }</td>
                      <td>
                      {item.fechaCierre ? 
                        <Moment format="DD/MM/YYYY">{item.fechaCierre}</Moment>
                        :
                        <span>abierto</span>
                      }                      
                      </td>  
                      <td>                      
                       {item.estado ? 
                          <>
                          <Button className={"btn btn-danger btn-xs"} 
                            onClick={() => {toggleModalView(item,'detalle')}}
                          >
                            <FontAwesomeIcon icon={faFilePdf} />
                          </Button>
                          <Button className={"btn btn-info btn-xs"} 
                            onClick={() => {toggleModalView(item,'consolidado')}}
                          >
                            <FontAwesomeIcon icon={faFile} />
                          </Button>
                          </>
                        :
                        <>
                        <Link to={`/admin/cajasitems/${item.id}`}>
                           <Button className={"btn btn-info btn-xs"}>
                              <FontAwesomeIcon icon={faEdit} />
                           </Button>
                        </Link>
                        <Button 
                            className={"btn btn-warning btn-xs"}
                            onClick={() => {closeHandler(item)}}
                            >
                              <FontAwesomeIcon icon={faTimes} />
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
      <Modal isOpen={modalView} toggle={toggleModalView}>
      <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
        <ModalBody>
            {estado === 'detalle'?
              <CajasItemsDetalle
                  user={usuario}          
                  caja={item}
                  data={citems}
                />    
            :
              <CajasConsolidado
                user={usuario}          
                caja={item}                
              />          
            }            
        </ModalBody>
      </Modal>
      </Col>
    </Row>       
</>      
  )

};
export default TableCajas;
