import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { crudActions, cajaActions} from '../../../actions'
import {  
  Row,Col,Button, Form, FormGroup, Input, Label
} from "reactstrap"
import { stylesErp } from '../../../helpers'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )

}

const tipos =  [                                
                {"value":"ingreso","label":"ingreso"},
                {"value":"egreso","label":"egreso"},                                              
                ];



function CajasItemsForm () {     
  const dispatch = useDispatch()  
  const caja = useSelector(state => state.cajas.item)   
  const item = useSelector(state => state.cajasitems.item)
  const changeHandler = event => {    
  const { name, value } = event.target  
   dispatch(crudActions.changeValue('CAJAS_ITEMS_CHANGE',name,value))  
 }

 const changesHandler = prop => event => {                     
    const { value } = event ? event : '' 
    dispatch(crudActions.changeValue('CAJAS_ITEMS_CHANGE',prop,value))  
    
 }

const submitHandle = event => {       
    event.preventDefault()           
    
    let dat = {}
    dat.monto = parseInt(item.monto)
    dat.tipo = item.tipo
    dat.label = item.label
    dat.cajaId = caja.id    
    dispatch(cajaActions.createList('CAJAS_ITEMS_DATAS','cajasitems',dat))      
    
       
 }


         
  return (    
      <div className="herramientas">                     
           <div className="subcaja">           
         <Row>
          <Col md={12} >
           <Form onSubmit={ submitHandle}>              
            <div className="sub-form">              
                <Row>
                  <Col md="2" className="subcajas">
                      <Label>$ :</Label>
                    </Col>   
                    <Col md="4" className="subcajas">
                      <FormGroup>                          
                       <Input
                            id="monto"
                            type="number"
                            name="monto"                                                        
                            value={item.monto}
                            onChange={changeHandler}                                                   
                          />
                      </FormGroup>
                    </Col>
                    <Col md="6" className="subcajas">
                     <FormGroup>                          
                      <Select                                                               
                          defaultValue={tipos[0]}
                          name="tipo"    
                          id="tipo"                    
                          options={tipos}      
                          isClearable={true}                          
                          value={defaultVal(tipos,item.tipo)}                                                                                                                                
                          onChange={ changesHandler('tipo')}                           
                          />
                      </FormGroup>
                    </Col>                                                                                         
                </Row>
                  <Row>                
                    <Col md="8" className="subcajas">
                      <FormGroup>                          
                       <Input
                            id="label"
                            type="text"
                            name="label"                                                        
                            value={item.label}
                            onChange={changeHandler}                                                   
                          />
                      </FormGroup>
                    </Col>   
                    <Col md="4" className="subcajas">
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
          </Row> 

        </div>                           

     </div>                              
  );
}

export default CajasItemsForm