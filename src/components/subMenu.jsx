import React from "react";
import { Row, Col, Nav, NavItem  } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const subMenu = ({items}) => {     
  return(
    <>    
    <div className="submenu">      
        <Row>
          <Col className="tabs" md={12}>
            <Nav tabs>  
            {items.map((item, index) => (
              <NavItem key={index}> 
                <Link to={`/admin/${item.link}/`} >          
                <FontAwesomeIcon icon={ faChevronRight } />{' '} {item.name}</Link> 
               </NavItem>              
            ))}                            
          </Nav>
          </Col>
      
        </Row>            
      </div>     
    </>         
  )

};
export default subMenu;
