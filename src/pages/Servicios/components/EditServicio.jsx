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
import ServicioImagen from './ServicioImagen'


const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos     = [{"value":"artículo","label":"artículo"},
                 {"value":"servicio","label":"servicio"},];
const origenes  = [{"value":"compra","label":"compra"},
                 {"value":"producción","label":"producción"},];
const impuestos = [{"value":0,"label":13},
                 {"value":1,"label":20},];                                 

const EditServicio = () => {
    const dispatch = useDispatch()  
    const { item, estado } = useSelector(state => state.servicios)   

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('SERVICIOS_CHANGE',name,value))  
    }
      
    const changesHandler = event => {                     
        const { value } = event ? event : '' 
        dispatch(crudActions.changeValue('SERVICIOS_CHANGE','tipo',value))            
    }
    const changesoHandler = event => {                     
      const { value } = event ? event : '' 
      dispatch(crudActions.changeValue('SERVICIOS_CHANGE','origen',value))            
  }
    const changeCatalogo = (checked) => {                  
      dispatch(crudActions.changeValue('SERVICIOS_CHANGE','inCatalogo',checked))  
    }
    const changeOferta = (checked) => {                  
      dispatch(crudActions.changeValue('SERVICIOS_CHANGE','inOferta',checked))  
    }
    const changeEstado = (checked) => {                  
      dispatch(crudActions.changeValue('SERVICIOS_CHANGE','estado',checked))  
    }

    const changeVerificar = (codigo) => {                  
     dispatch(crudActions.buscarItem('SERVICIOS_VERIFICAR','servicios',codigo))  
     
    }
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.putUnit('servicios',item))            
        }else{
          dispatch(crudActions.createUnit('SERVICIOS_ADD','servicios',item))           
        }    
        console.log(item) 
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'SERVICIOS_RESET_ITEM'})        
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
                  <Col md={12}>
                    <FormGroup>
                      <Label for="enombre">Nombre</Label>
                        <Input type="text" name="nombre" id="enombre" 
                          placeholder="nombre"  value={item.nombre || ''}
                          required={true}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>       
                </Row> 
          
                <Row form>                                 
                  <Col md={4}>
                    <FormGroup>
                      <Label for="precioVenta">Precio</Label>
                      <Input type="number" name="valor" id="valor"  value={item.valor || ''} 
                          onChange={ (e) => changeHandler(e)}  
                          required={true}/>
                    </FormGroup>   
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <Label for="estockMinimo">% Comisión</Label>
                        <Input type="number" name="comision" id="comision" 
                          value={item.comision || ''}
                          required={true}
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
            <ServicioImagen/>
          </Col>            
        </Row>  
      </div>                                             
    );
};
export default EditServicio;
