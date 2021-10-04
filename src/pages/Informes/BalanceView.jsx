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
import Balance  from './Balance';


const BalanceView = () => {
  const dispatch = useDispatch() 
  const [value1, onChange1] = useState(new Date());    
  const [value2, onChange2] = useState(new Date());
  const [tipo, setTipo] = useState(""); 
  
  const submitHandle = event => {       
    event.preventDefault()       
    const item = {}
    item.desde = value1
    item.hasta = value2       
    dispatch(crudActions.informes('INFORMES_BALANCE','balance',item))  
    dispatch({type:'INFORME_SET_FECHA',d:value1,h:value2})                
    
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
         <div className="submenub mt-1">      
        <Row>
          <Col className="tabsb" md={2}>
            <h6>BALANCE</h6>
          </Col>
          <Col className="tabsb" md={1}>                          
               
          </Col>
          <Col className="tabsb" md={1}>                          
            
          </Col>         
        </Row>            
        </div> 

        <div className="sub-form mt-1">              
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
          <Balance/>
        </Col>
      </Row>  
      </div>
    </div>    
    </>
  )

};
export default BalanceView;
