import React,{useState, useCallback, useEffect} from "react";
import TableProveedores from "./components/TableProveedores";
import SearchProveedores from "./components/SearchProveedor";
import EditProveedores from "./components/EditProveedor";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../actions'
import { Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SubMenu from '../../components/subMenu.jsx';
import { CompraRouter } from '../../routes'
import ProveedorResumen from "./components/ProveedorResumen";

const ProveedoresView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.proveedores)  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'PROVEEDORES_VIEW',view:est})                
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchProveedores getComponent={getComponent}/><TableProveedores getComponent={getComponent}/></>)
          break;    
        case 'new':
          setComponent(<EditProveedores/>)
          break;
        case 'edit':
          dispatch(crudActions.getItem('PROVEEDORES_ITEM','proveedores',key)) 
          setComponent(<EditProveedores/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga proveedores')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={CompraRouter}/>
         <div className="submenub">      
        <Row>
          <Col className="tabsb" md={2}>
            <h6>Proveedores</h6>
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
            <ProveedorResumen/>
          </ModalBody>
        </Modal>

      </div>
    </div>    
    </>
  )

};
export default ProveedoresView;
