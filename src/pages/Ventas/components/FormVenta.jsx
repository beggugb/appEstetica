import React,{ useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {  
    Row,
    Col,
    Button, Form, FormGroup, Input, Label, Card, CardBody, CardHeader
  } from "reactstrap"
import Select from 'react-select'  
import Switch from 'react-switch'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSearch, faMailBulk } from "@fortawesome/free-solid-svg-icons";

import SearchsCliente from '../../Clientes/components/SearchsCliente'

const defaultVal = (options, valor) =>{
  return options.filter(item =>
      item.value === valor
    )
}

const tipos =  [{"value":"contado","label":"contado"},
                {"value":"credito","label":"credito"}];
                          

const FormVenta = () => {
    const dispatch = useDispatch()  
    const { item, items, cantidadTotal, sumaTotal } = useSelector(state => state.ventas)   
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))    
    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('VENTAS_CHANGE',name,value))  
    }
      
    const changesHandler = event => {                     
        const { value } = event ? event : '' 
        dispatch(crudActions.changeValue('VENTAS_CHANGE','tipo',value)) 
    }

    const sendPedido = () => {                     
      dispatch(crudActions.sendItem('ventas',item.id)) 
    }
    const submitHandle = () => { 
      let dato = {}              
        if(item.id)
        {
          let eItem = item          
          eItem.nroItems = cantidadTotal          
          dato={
            item: eItem,
            items:items
          }
          dispatch(crudActions.putItems('VENTAS_ADD','ventas',dato,item.id))

        }else{
          let eItem = item
          eItem.fechaVenta = new Date()
          eItem.nroItems = cantidadTotal
          eItem.nro = 1
          eItem.total = sumaTotal
          eItem.usuarioId = usuario.id          
          dato={
            item: eItem,
            items:items
          }
          dispatch(crudActions.createUnit('VENTAS_ADD','ventas',dato))           
        }    
    
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'VENTAS_RESET_ITEM'})        
      };
    }, []); 
     
    return (              
      <>                                  
                <Row form>
                  <Col md={1}>
                    <FormGroup>
                      <Label for="estado">Nro.</Label>
                        <Input type="text" name="id" id="id" 
                          value={item.id || ''}
                          readOnly={true}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>      
                  <Col md={3}>
                    <FormGroup>
                      <Label for="enombre">Forma de Pago</Label>  
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
                  <SearchsCliente/>
                  <Col md={1}>
                    <FormGroup>                    
                      <Button 
                        className="btn-view btn-danger mt-3"  
                        onClick={() => sendPedido()} >
                        <FontAwesomeIcon icon={faMailBulk} />
                      </Button>
                    </FormGroup>    
                  </Col>                                      
                </Row>                           
        
                <Row form>                                    
                <Col md={10}>
                    <FormGroup>
                      <Label for="observaciones">Glosa</Label>
                      <Input type="text" name="observaciones" id="observaciones" 
                          value={item.observaciones || ''}                          
                          onChange={ (e) => changeHandler(e)} />
                    </FormGroup>   
                  </Col>
                  <Col md={2}>
                    <Button
                        className={item.id ?"btn-md btn-warning mt-4" : "btn-md btn-info mt-4"}
                        onClick={() => submitHandle()}
                        >
                        <FontAwesomeIcon icon={faSave} />  
                        {' '} {item.id ? " Actualizar" : " Guardar"}
                        
                    </Button>    
                  </Col>                  
                </Row>
                </>
                                      
    );
};
export default FormVenta;
