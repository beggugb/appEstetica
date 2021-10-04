import React,{useState, useCallback, useEffect} from "react";
import InventarioDashboard from "./components/InventarioDashboard";
import { InventarioRouter } from '../../routes'
import { Row, Col, Button  } from "reactstrap";
import SubMenu from '../../components/subMenu'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList } from "@fortawesome/free-solid-svg-icons";

const Inventario = () => {  
  const [component, setComponent] = useState('data');  
  
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<InventarioDashboard/>)
          break;    
        case 'new':
          
          break;
        case 'edit':
          
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga articulos')
    };
  }, []);

  return(
    <div className="content">     
      <div className="main-contenido">        
        <SubMenu items={InventarioRouter}/>
        <div className="submenub">      
        <Row>
          <Col className="tabsb" md={2}>
            <h6>Inventario</h6>
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
  )

};
export default Inventario;
