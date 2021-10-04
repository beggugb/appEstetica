import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { CompraRouter } from '../../routes'
import { crudActions } from '../../actions'
import { Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import TableCompras from "./components/TableCompras";
import SearchCompra from "./components/SearchCompra";
import EditCompra from "./components/EditCompra";
import CompraResumen from "./components/CompraResumen"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu'


const Compras = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.compras)  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'COMPRAS_VIEW',view:est})                
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchCompra getComponent={getComponent}/><TableCompras getComponent={getComponent}/></>)
          break;    
        case 'new':
          setComponent(<EditCompra/>)
          break;
        case 'edit':
          dispatch(crudActions.getItem('COMPRAS_ITEM','compras',key)) 
          setComponent(<EditCompra/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga compras')
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={CompraRouter}/>
        <div className="submenub"> 
        <Row>
          <Col className="tabsb" md={2}>
            <h6>Compras</h6>
          </Col>
          <Col className="tabsb" md={1}>                          
            <Button 
              className="btn btn-navi"
              onClick={()=> getComponent('data',1)}
            >
              <FontAwesomeIcon icon={ faList } />{' '} Lista 
            </Button>             
          </Col>
          <Col className="tabsb" md={1}>                          
            <Button className="btn btn-navi" onClick={()=> getComponent('new',2)}>
              <FontAwesomeIcon icon={ faPlus } />{' '} Nuevo 
            </Button>             
          </Col>         
        </Row> 
        </div> 
        {component}      

         <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <CompraResumen/>
          </ModalBody>
        </Modal> 
               
      </div>
    </div>    
  )

};
export default Compras;
