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
const MovimientosView = () => {
  const dispatch = useDispatch() 
  const [value1, onChange1] = useState(new Date());    
  const [value2, onChange2] = useState(new Date());
  const [tipo, setTipo] = useState(""); 
  
  const submitHandle = event => {       
    event.preventDefault()       
    const item = {}
    item.desde = value1
    item.hasta = value2  
    item.tipo = tipo       
    dispatch(crudActions.informes('INFORMES_MOVIMIENTOS','movimientos',item))             
    
  }
  const tipoHandler = prop => event => {                     
    const { value } = event ? event : '' 
    setTipo(value)
    
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
            <h6>Movimientos</h6>
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
                <Col md={4}>
                  <FormGroup className="mt-2">
                    <Label for="eDesde">Desde :</Label>
                    <DatePicker onChange={onChange1} value={value1}/>
                  </FormGroup>    
                </Col>
                <Col md={3}>
                  <FormGroup className="mt-2">
                    <Label for="eHasta">Hasta : </Label>
                    <DatePicker onChange={onChange2} value={value2}/>
                  </FormGroup>   
                </Col> 
                <Col md={3}>
                  <FormGroup>                    
                    <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipo"    
                          id="tipo"                    
                          options={tipos}      
                          isClearable={true}                          
                          value={defaultVal(tipos,tipo)} 
                          onChange={ tipoHandler()}                           
                          />
                  </FormGroup>    
                </Col>               
             
                <Col md={2}>
                  <Button 
                      type="submit"
                      className="btn-md btn-info mt-4">
                      <FontAwesomeIcon icon={faSave} />  
                      {' '} Generar
                  </Button>    
                </Col>
              </Row>
             
        </Form>   
      </div>   
      <Row>
        <Col>
          <Movimientos/>
        </Col>
      </Row>  
      </div>
    </div>    
    </>
  )

};
export default MovimientosView;
