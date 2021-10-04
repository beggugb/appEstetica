import React,{useState, useEffect} from "react";

import { useDispatch } from 'react-redux'
import { crudActions } from '../../actions'
import { Form, Label, FormGroup, Row, Col, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu.jsx';
import { InformeRouter } from '../../routes'
import DatePicker from 'react-date-picker';
import Select from 'react-select'
import Movimientos  from './Movimientos';

const tipos =  [{"value":"alta","label":"Altas"},
                {"value":"baja","label":"Bajas"},
                {"value":"compra","label":"Compras"},
                {"value":"venta","label":"Ventas"},
              ];
              const defaultVal = (options, valor) =>{
                return options.filter(item =>
                    item.value === valor
                  )
              
              }
const InformesView = () => {
  const dispatch = useDispatch() 

  useEffect(() => {


    return () => {
      console.log('descarga cliente')
    };
  }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">
        <SubMenu items={InformeRouter}/>
         <div className="submenub">      
        <Row>
          <Col className="tabsb" md={2}>
            <h6>Cliente</h6>
          </Col>
          <Col className="tabsb" md={1}>                          
               
          </Col>
          <Col className="tabsb" md={1}>                          
            
          </Col>         
        </Row>            
        </div> 

        <div className="sub-form mt-3">              
    
      </div>   
    
      </div>
    </div>    
    </>
  )

};
export default InformesView;
