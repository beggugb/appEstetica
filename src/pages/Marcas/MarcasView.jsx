import React from "react";
import { Row, Col  } from "reactstrap";
import SubMenu from '../../components/subMenu.jsx';
import { InventarioRouter } from '../../routes'
import SearchMarca from './components/SearchMarca'
import TableMarcas from "./components/TableMarcas";
import EditMarca from "./components/EditMarca"

const MarcasView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InventarioRouter}/>
         <div className="submenub">      
            <Row>
            <Col className="tabsb" md={2}>
                <h6>Marcas</h6>
            </Col>          
            </Row>            
         </div> 

         <Row>
            <Col md={12}>
            <SearchMarca/>
            </Col>            
         </Row>
         <Row>
            <Col md={4} className="marco">
            <EditMarca/>
            </Col>
            <Col md={8} className="marco">
            <TableMarcas/>
            </Col>            
         </Row>
      </div>
    </div>    
    </>
  )

};
export default MarcasView;
