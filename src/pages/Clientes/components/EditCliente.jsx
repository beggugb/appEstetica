import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {  
    Row,
    Col,
    Button, Form, FormGroup, Input, Label
  } from "reactstrap"
import Select from 'react-select'  
import Switch from 'react-switch'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ClienteImagen from './ClienteImagen'


const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos     = [{"value":"personal","label":"personal"},
                   {"value":"empresa","label":"empresa"},];
                             

const EditClientes = () => {
    const dispatch = useDispatch()  
    const { item } = useSelector(state => state.clientes)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('CLIENTES_CHANGE',name,value))  
    }
      
   
    const changesHandler = event => {                     
        const {value} = event ? event : ''        
        dispatch(crudActions.changeValue('CLIENTES_CHANGE','tipo',value))          
    }
  
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.putUnit('clientes',item))            
        }else{
          dispatch(crudActions.createUnit('CLIENTES_ADD','clientes',item))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'CLIENTES_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
        <div className="herramientas">                 
        <Row>
          <Col md={7}>
            <Form onSubmit={ submitHandle}>   
              <h5>Formulario de Registro</h5>
               <div className="sub-form">   
               <h6>Datos Generales</h6>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="codigo">Código</Label>
                        <Input type="text" name="codigo" id="codigo" 
                          value={item.codigo || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="tipo">Tipo</Label>
                      <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipo"    
                          id="tipo"                    
                          options={tipos}      
                          isClearable={true}                          
                          value={defaultVal(tipos,item.tipo)}
                          onChange={ (e) => changesHandler(e)}                                                 
                        />   
                    </FormGroup>    
                  </Col>                  
                  <Col md={5}>
                    <FormGroup>
                      <Label for="nit">Nit</Label>
                        <Input type="text" name="nit" id="nit" 
                          value={item.nit || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                  
                </Row>

                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="nombres">Nombres</Label>
                        <Input type="text" name="nombres" id="nombres" 
                          value={item.nombres || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="direccion">Dirección</Label>
                        <Input type="text" name="direccion" id="direccion" 
                          value={item.direccion || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                <Row form>                
                  <Col md={6}>
                    <FormGroup>
                      <Label for="pais">País</Label>
                        <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipos"    
                          id="tipos"                    
                          options={tipos}      
                          isClearable={true}                          
                          value={defaultVal(tipos,item.ciudad)}                                                 
                        />  
                    </FormGroup>    
                  </Col>                                    
                  <Col md={6}>
                    <FormGroup>
                      <Label for="ciudad">Ciudad</Label>
                      <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipos"    
                          id="tipos"                    
                          options={tipos}      
                          isClearable={true}                          
                          value={defaultVal(tipos,item.ciudad)}                                                 
                        />  
                    </FormGroup>    
                  </Col>                                                                                          
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input type="text" name="email" id="email" 
                          value={item.email || ''}
                          onChange={ (e) => changeHandler(e)} />   
                    </FormGroup>    
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="web">Web</Label>
                      <Input type="text" name="web" id="web" 
                          value={item.web || ''}
                          onChange={ (e) => changeHandler(e)} />   
                        
                    </FormGroup>    
                  </Col>                                    
                  <Col md={3}>
                    <FormGroup>
                      <Label for="telefono">Teléfono</Label>
                      <Input type="text" name="telefono" id="telefono" 
                          value={item.telefono || ''}
                          onChange={ (e) => changeHandler(e)} />   
                        
                    </FormGroup>    
                  </Col>                                                                                          
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="observacione">Observaciones</Label>
                        <Input type="text" name="observaciones" id="observaciones" 
                          value={item.observaciones || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                                    
                </Row>
                
                <Button 
              type="submit"
              className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
              <FontAwesomeIcon icon={faSave} />  
              {' '} {item.id ? " Actualizar" : " Guardar"}
            </Button>


                            
                </div>   
            </Form>    
          </Col>  
          <Col md={5} >
            <ClienteImagen/>
          </Col>            
        </Row>  
      </div>                                             
    );
};
export default EditClientes;
