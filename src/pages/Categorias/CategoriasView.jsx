import React from "react";
import { Row, Col  } from "reactstrap";
import SubMenu from '../../components/subMenu.jsx';
import { InventarioRouter } from '../../routes'
import SearchCategoria from './components/SearchCategoria'
import TableCategorias from "./components/TableCategorias";
import EditCategoria from "./components/EditCategoria"

const CategoriasView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InventarioRouter}/>
         <div className="submenub">      
            <Row>
            <Col className="tabsb" md={2}>
                <h6>Categorías</h6>
            </Col>          
            </Row>            
         </div> 

         <Row>
            <Col md={12}>
            <SearchCategoria/>
            </Col>            
         </Row>
         <Row>
            <Col md={4} className="marco">
            <EditCategoria/>
            </Col>
            <Col md={8} className="marco">
            <TableCategorias/>
            </Col>            
         </Row>
      </div>
    </div>    
    </>
  )

};
export default CategoriasView;
