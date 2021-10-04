import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {  
    Row,
    Col,
    Button, Form, FormGroup, Input, Label
  } from "reactstrap"

import { cajaActions, crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const EditCaja = () => {
    const dispatch = useDispatch()  
    const item = useSelector(state => state.cajas.item)   
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('CAJAS_CHANGE',name,value))  
    }
      
    const submitHandle = event => {       
      event.preventDefault()    
         
      
      let dat = {}
      dat.montoInicial = parseInt(item.montoInicial)
      dat.estado = false
      dat.montoEgreso = 0
      dat.montoFinal = parseInt(item.montoInicial)
      dat.montoIngreso = 0
      dat.usuarioId = usuario.id
      console.log(dat)
  
      dispatch(crudActions.createList('CAJAS_DATA','cajas',dat))  
      dispatch({ type: 'RESET_CAJA' });
      
        
   }
  
    useEffect(() => {      
      return () => {
        dispatch({type:'CAJAS_RESET_ITEM'})        
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
                  <Col md={4}>
                    <FormGroup>
                      <Label for="enombre">Nombre</Label>
                      <Input
                            id="montoInicial"
                            type="number"
                            name="montoInicial"                                                        
                            value={item.montoInicial}
                            onChange={changeHandler}                                                   
                          />  
                    </FormGroup>    
                  </Col>                                                                  
                  <Col md={2}>
                    <Button 
                    type="submit"
                    className="btn-md btn-info mt-3">
                    <FontAwesomeIcon icon={faSave} />  
                    {' '} Guardar
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
export default EditCaja;
