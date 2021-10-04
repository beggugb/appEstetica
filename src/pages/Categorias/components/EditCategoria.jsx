import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {  
    Row,
    Col,
    Button, Form, FormGroup, Input, Label
  } from "reactstrap"

import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const EditCategoria = () => {
    const dispatch = useDispatch()  
    const item = useSelector(state => state.categorias.item)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('CATEGORIAS_CHANGE',name,value))  
    }
      
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.putList('CATEGORIAS_ADD','categorias',item))            
        }else{
          dispatch(crudActions.createList('CATEGORIAS_ADD','categorias',item))           
        }    
        console.log(item) 
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'CATEGORIAS_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
        <div className="herramientas">                 
        <Row>
          <Col md={12}>
            <Form onSubmit={ submitHandle}>   
              <h5>Formulario de Registro</h5>
               <div className="sub-form">                            
                <Row form>
                  <Col md={11}>
                    <FormGroup>
                      <Label for="enombre">Nombre</Label>
                        <Input type="text" name="nombre" id="enombre" 
                            value={item.nombre || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>                  
                  <Col md={11}>
                    <FormGroup>
                      <Label for="enombreCorto">Abreviación</Label>
                      <Input type="text" name="abreviacion" id="abreviacion"  value={item.abreviacion || ''} 
                          onChange={ (e) => changeHandler(e)}  />
                    </FormGroup>   
                  </Col>
                </Row> 
                
                <Row form>                  
                  <Col md={11}>
                    <Button 
                    type="submit"
                    className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                    <FontAwesomeIcon icon={faSave} />  
                    {' '} {item.id ? " Actualizar" : " Guardar"}
                    </Button> 
                  </Col>
                </Row> 
                </div>   
            </Form>    
          </Col>  
          <Col md={3} >
            
          </Col>            
        </Row>  
      </div>                                             
    );
};
export default EditCategoria;
