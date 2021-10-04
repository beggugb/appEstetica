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
import ProveedorImagen from './ProveedorImagen'
import SelectCategoria from '../../Categorias/components/SelectCategoria'
import SelectMarca from '../../Marcas/components/SelectMarca'

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos     = [{"value":"personal","label":"personal"},
                   {"value":"empresa","label":"empresa"},];
                             

const EditProveedores = () => {
    const dispatch = useDispatch()  
    const item = useSelector(state => state.proveedores.item)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('PROVEEDORES_CHANGE',name,value))  
    }
      
   
    const changesHandler = event => {                     
        const {value} = event ? event : ''        
        dispatch(crudActions.changeValue('PROVEEDORES_CHANGE','tipoFiscal',value))          
    }
  
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.putUnit('proveedores',item))            
        }else{
          dispatch(crudActions.createUnit('PROVEEDORES_ADD','proveedores',item))           
        }            
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'PROVEEDORES_RESET_ITEM'})        
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
                      <Label for="tipoFiscal">Tipo Fiscal</Label>
                      <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipoFiscal"    
                          id="tipoFiscal"                    
                          options={tipos}      
                          isClearable={true}                          
                          value={defaultVal(tipos,item.tipoFiscal)}
                          onChange={ (e) => changesHandler(e)}                                                 
                        />   
                    </FormGroup>    
                  </Col>                  
                  <Col md={4}>
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
                      <Label for="razonSocial">Razón Social</Label>
                        <Input type="text" name="razonSocial" id="razonSocial" 
                          value={item.razonSocial || ''}
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
                      <Label for="contacto">Contato</Label>
                      <Input type="text" name="contacto" id="contacto" 
                          value={item.contacto || ''}
                          onChange={ (e) => changeHandler(e)} />   
                    </FormGroup>    
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="pais">País</Label>
                        <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipos"    
                          id="tipos"                    
                          options={tipos}      
                          isClearable={true}                          
                          value={defaultVal(tipos,item.tipo)}                                                 
                        />  
                    </FormGroup>    
                  </Col>                                    
                  <Col md={3}>
                    <FormGroup>
                      <Label for="ciudad">Ciudad</Label>
                        
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
            <ProveedorImagen/>
          </Col>            
        </Row>  
      </div>                                             
    );
};
export default EditProveedores;
