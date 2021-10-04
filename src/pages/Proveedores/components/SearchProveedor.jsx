import React,{useState} from "react";
import { useDispatch } from 'react-redux'
import {  
    Row,
    Col,
    Button, Form, FormGroup, Input, Label
  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchProveedores = ({getComponent}) => {
    const dispatch = useDispatch()    
    const [item, setItem] = useState({
        "nombre":"",
        "codigo":""        
    });
    const changeHandler = event => {    
        const { name, value } = event.target  
        setItem({
          ...item,
          [name]: value
        })  
       }
       const submitHandle = event => {       
        event.preventDefault()    
        dispatch(crudActions.searchList('PROVEEDORES_DATA','proveedores',item))  
    
     }   
    return (              
        <div className="lnsearch">
              <Row>                
                <Col md={12} className="barra">
                  <Form onSubmit={ submitHandle}>     
                    <Row form>
                      <Col md={7}>
                        <FormGroup>   
                        <Label for="eNombre">Nombres</Label>                 
                          <Input 
                            type="text" 
                            name="nombre"                             
                            id="nombre"  
                            value={item.nombre || ''}  
                            onChange={changeHandler} />
                        </FormGroup>
                      </Col>                      
                      <Col md={2}>
                        <Button className="btn-rd btn-info mt-3">
                         <FontAwesomeIcon icon={faSearch} />                          
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row> 
              </div>                    
                         
    );
};
export default SearchProveedores;
