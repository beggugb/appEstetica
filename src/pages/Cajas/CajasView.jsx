import React,{useEffect} from "react";
import { Row, Col  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import SubMenu from '../../components/subMenu.jsx';
import { TpvRouter } from '../../routes'
import TableCajas from "./components/TableCajas";
import EditCaja from "./components/EditCaja"
import { cajaActions, crudActions } from '../../actions'
const CajasView = () => { 
  const dispatch = useDispatch()       
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))

useEffect(() =>{                       
     /*dispatch(cajaActions.getListDetalle('CAJAS_DATA','cajas',1,12, usuario.id))           */
     return () =>{            
      dispatch({type:'CAJAS_RESET'})  
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={TpvRouter}/>
         <div className="submenub">      
            <Row>
            <Col className="tabsb" md={2}>
                <h6>Cajas</h6>
            </Col>          
            </Row>            
         </div> 

         <Row>
            <Col md={12}>
            <EditCaja/>
            </Col>            
         </Row>
         <Row>
            <Col md={12} className="marco">
            <TableCajas/>
            </Col>            
         </Row>
      </div>
    </div>    
    </>
  )

};
export default CajasView;
