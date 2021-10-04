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
import PersonalImagen from './PersonalImagen'


const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos     = [{"value":"eventual","label":"eventual"},
                   {"value":"permanente","label":"permanente"},];                        

const EditPersonal = () => {
    const dispatch = useDispatch()  
    const { item, estado } = useSelector(state => state.personas)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('PERSONAS_CHANGE',name,value))  
    }
      
    const changesHandler = event => {                     
        const { value } = event ? event : '' 
        dispatch(crudActions.changeValue('PERSONAS_CHANGE','tipo',value))            
    }
 


    const changeVerificar = (codigo) => {                  
     dispatch(crudActions.buscarItem('PERSONAS_VERIFICAR','personas',codigo))  
     
    }
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.putUnit('personas',item))            
        }else{
          dispatch(crudActions.createUnit('PERSONAS_ADD','personas',item))           
        }    
        console.log(item) 
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'PERSONAS_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
        <div className="herramientas">                 
        <Row>
          <Col md={9}>
            <Form onSubmit={ submitHandle}>   
              <h5>Formulario de Registro</h5>
               <div className="sub-form">   
               <h6>Datos Generales</h6>                
                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="enombre">Nombres</Label>
                        <Input type="text" name="nombres" id="enombres" 
                          placeholder="nombres"  value={item.nombres || ''}
                          required={true}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                  
                  <Col md={4}>
                    <FormGroup>
                    <Label for="eEstado">Tipo</Label>
                        <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipos"    
                          id="tipos"                    
                          options={tipos}      
                          isClearable={true}                          
                          value={defaultVal(tipos,item.tipo)}  
                          onChange={ (e) => changesHandler(e)}                                               
                        />
                    </FormGroup>   
                  </Col>
                </Row> 
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="eId">Dirección</Label>
                      <Input type="text" name="direccion" id="edireccion" 
                          placeholder="direccion"  value={item.direccion || ''}
                          required={true}
                          onChange={ (e) => changeHandler(e)} /> 
                    </FormGroup>    
                  </Col>                  
                  <Col md={4}>
                    <FormGroup>
                      <Label for="eEstado">Teléfono</Label>
                      <Input type="text" name="telefono" id="etelefono" 
                          placeholder="telefono"  value={item.telefono || ''}
                          required={true}
                          onChange={ (e) => changeHandler(e)} /> 
                    </FormGroup>   
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <Label for="eCi">C.I.</Label>
                      <Input type="text" name="ci" id="eci" 
                          placeholder="ci"  value={item.ci || ''}
                          required={true}
                          onChange={ (e) => changeHandler(e)} /> 
                    </FormGroup> 
                  </Col>
                </Row> 
                <Row form>
                <Col md={12}>
                    <FormGroup>
                      <Label for="edescripcion">Descripción</Label>
                        <Input type="text" name="descripcion" id="edescripcion" 
                          placeholder="descripcion"  value={item.descripcion || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                         
                </Row> 
                <Button 
                  type="submit"
                  className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                  <FontAwesomeIcon icon={faSave} /> {item.id ? 'Actualizar' : 'Guardar'}  
                  </Button>  
                           
                </div>   
            </Form>    
          </Col>  
          <Col md={3} >
            <PersonalImagen/>
          </Col>            
        </Row>  
      </div>                                             
    );
};
export default EditPersonal;
