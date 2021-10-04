import React,{useState, useCallback, useEffect} from "react";
import TableServicio from "./components/TableServicio";
import SearchServicio from "./components/SearchServicio";
import EditServicio from "./components/EditServicio";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../actions'
import { Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import classnames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SubMenu from '../../components/subMenu.jsx';
import { InventarioRouter } from '../../routes'


const ServiciosView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.servicios)  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'SERVICIOS_VIEW',view:est})                
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchServicio getComponent={getComponent}/><TableServicio getComponent={getComponent}/></>)
          break;    
        case 'new':
          setComponent(<EditServicio/>)
          break;
        case 'edit':
          dispatch(crudActions.getItem('SERVICIOS_ITEM','Servicios',key)) 
          setComponent(<EditServicio/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga Servicios')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InventarioRouter}/>
         <div className="submenub">      
        <Row>
          <Col className="tabsb" md={2}>
            <h6>Servicios</h6>
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
 

      </div>
    </div>    
    </>
  )

};
export default ServiciosView;
