import React,{useState, useEffect} from "react";

import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../actions'
import { Form, Label, FormGroup, Row, Col, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import SubMenu from '../../components/subMenu.jsx';
import { InformeRouter } from '../../routes'
import DatePicker from 'react-date-picker';
import Select from 'react-select'
import Existencias  from './Existencias';
import ItemArticulo from '../Articulos/components/ItemArticulo'
import SelectAlmacen from "../Almacenes/components/SelectAlmacen";

const ExistenciasView = () => {
  const dispatch = useDispatch() 
  const { articuloId, almacenId  } = useSelector(state => state.informes) 
  
  const submitHandle = event => {       
    event.preventDefault()       
    const item = {}
    item.almacenId = almacenId
    item.articuloId = articuloId 
    dispatch(crudActions.informes('INFORMES_EXISTENCIAS','existencias',item))                 
  }  

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
            <h6>Existencias</h6>
          </Col>
          <Col className="tabsb" md={1}>                          
               
          </Col>
          <Col className="tabsb" md={1}>                          
            
          </Col>         
        </Row>            
        </div> 

        <div className="sub-form mt-3">              
      <Form onSubmit={ submitHandle}>         
              <Row form>                
                <Col md={5}>
                  <FormGroup className="mt-2">                    
                    <SelectAlmacen/>
                  </FormGroup>    
                </Col>
                <Col md={5}>                                
                    <ItemArticulo/>
                </Col> 
                <Col md={2}>
                  <Button 
                      type="submit"
                      className="btn-md btn-info mt-2">
                      <FontAwesomeIcon icon={faSave} />  
                      {' '} Generar
                  </Button>    
                </Col>
              </Row>
             
        </Form>   
      </div>   
      <Row>
        <Col>
          <Existencias/>
        </Col>
      </Row>  
      </div>
    </div>    
    </>
  )

};
export default ExistenciasView;
