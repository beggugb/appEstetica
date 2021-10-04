import React,{useState, useCallback, useEffect} from "react";
import TablePersonal from "./components/TablePersonal";
import SearchPersonal from "./components/SearchPersonal";
import EditPersonal from "./components/EditPersonal";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../actions'
import { Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import classnames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SubMenu from '../../components/subMenu.jsx';
import { PersonalRouter } from '../../routes'
import PersonalResumen from "./components/PersonalResumen";

const PersonalView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState('data');  
  const { modalView } = useSelector(state => state.personas)  
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'PERSONAS_VIEW',view:est})                
  };

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchPersonal getComponent={getComponent}/><TablePersonal getComponent={getComponent}/></>)
          break;    
        case 'new':
          setComponent(<EditPersonal/>)
          break;
        case 'edit':
          dispatch(crudActions.getItem('PERSONAS_ITEM','personas',key)) 
          setComponent(<EditPersonal/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga personal')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={PersonalRouter}/>
         <div className="submenub">      
        <Row>
          <Col className="tabsb" md={2}>
            <h6>Personal</h6>
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
            <PersonalResumen/>
          </ModalBody>
        </Modal>

      </div>
    </div>    
    </>
  )

};
export default PersonalView;
