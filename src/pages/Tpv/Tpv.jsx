import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { TpvRouter } from '../../routes'
import { crudActions } from '../../actions'
import { Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu'
import ListaCategoria from "../Categorias/components/ListaCategoria";
import ListaArticulos from "../Articulos/components/ListaArticulos";
import ListaItems from "./components/ListaItems";
import ButtonTpv from "./components/ButtonTpv"
import FormVenta from "./components/FormVenta"
import FormCodigo from "./components/FormCodigo"

const Tpv = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.ventas) 

  const makeHttpRequestWithPage = useCallback(() =>{          
    dispatch(crudActions.getItem('EMPRESAS_ITEM','empresas',1))
 },[]) 

  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'VENTAS_VIEW',view:est})                
  };

  useEffect(() => {
    makeHttpRequestWithPage()
    return () => {
      dispatch({type:'VENTAS_RESET_ITEMS'})  
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={TpvRouter}/>
        <div className="submenub"> 
        <Row>
          <Col className="tabsb" md={2}>
            <h6>Punto de Venta</h6>
          </Col>
          <Col className="tabsb" md={1}>                          

          </Col>
          <Col className="tabsb" md={1}>                          
                      
          </Col>         
        </Row> 
        </div> 

        <div className="tpv">
          <Row>
            <Col className="contenidos" md={4}>
                <div className="items">
                    <ListaItems/>
                </div>
                <div className="botones">
                   <ButtonTpv/> 
                </div>     
            </Col>
            <Col className="totales" md={8}>
                <div className="codigo">
                   <FormCodigo/>
                </div>
                <div className="categorias">
                   <ListaCategoria/> 
                </div>
                <div className="productos">
                   <ListaArticulos/> 
                </div>
            </Col>  
          </Row>
        </div>

        <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <FormVenta/>
          </ModalBody>
        </Modal>

      </div>
    </div>    
  )

};
export default Tpv;
