import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { VentaRouter } from '../../routes'
import { crudActions } from '../../actions'
import { Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import TableVentas from "./components/TableVentas";
import SearchVenta from "./components/SearchVenta";
import EditVenta from "./components/EditVenta";
import VentaResumen from "./components/VentaResumen"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu'


const Ventas = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.ventas)  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'VENTAS_VIEW',view:est})                
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchVenta getComponent={getComponent}/><TableVentas getComponent={getComponent}/></>)
          break;    
        case 'new':
          setComponent(<EditVenta/>)
          break;
        case 'edit':
          dispatch(crudActions.getItem('VENTAS_ITEM','ventas',key)) 
          setComponent(<EditVenta/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga ventas')
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={VentaRouter}/>
        <div className="submenub"> 
        <Row>
          <Col className="tabsb" md={2}>
            <h6>Ventas</h6>
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
            <VentaResumen/>
          </ModalBody>
        </Modal> 
               
      </div>
    </div>    
  )

};
export default Ventas;
