import React,{ useEffect, useState } from "react";
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
import ArticuloImagen from './ArticuloImagen'
import SelectCategoria from '../../Categorias/components/SelectCategoria'
import SelectMarca from '../../Marcas/components/SelectMarca'

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

const EditArticulos = () => {
    const dispatch = useDispatch()  
    const { item, estado } = useSelector(state => state.articulos)   
    const [isServicio, setisServicio] = useState("false");

    const changeHandler = event => {    
        const { name, value } = event.target  
        dispatch(crudActions.changeValue('ARTICULOS_CHANGE',name,value))  
    }
      
    const changesHandler = event => {                     
        const { value } = event ? event : '' 
        dispatch(crudActions.changeValue('ARTICULOS_CHANGE','tipo',value))            
    }
    const changesoHandler = event => {                     
      const { value } = event ? event : '' 
      dispatch(crudActions.changeValue('ARTICULOS_CHANGE','origen',value))            
  }
    const changeCatalogo = (checked) => {                  
      dispatch(crudActions.changeValue('ARTICULOS_CHANGE','inCatalogo',checked))  
    }
    const changeOferta = (checked) => {                  
      dispatch(crudActions.changeValue('ARTICULOS_CHANGE','inOferta',checked))  
    }
    const changeEstado = (checked) => {                  
      dispatch(crudActions.changeValue('ARTICULOS_CHANGE','estado',checked))  
    }

    const changeServicio = (checked) => {                  
      dispatch(crudActions.changeValue('ARTICULOS_CHANGE','isService',checked))  
    }

    const changeVerificar = (codigo) => {                  
     dispatch(crudActions.buscarItem('ARTICULOS_VERIFICAR','articulos',codigo))  
     
    }
    const submitHandle = event => {       
        event.preventDefault()        
        if(item.id)
        {
          dispatch(crudActions.putUnit('articulos',item))            
        }else{
          dispatch(crudActions.createUnit('ARTICULOS_ADD','articulos',item))           
        }    
        console.log(item) 
     }  
    useEffect(() => {      
      return () => {
        dispatch({type:'ARTICULOS_RESET_ITEM'})        
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
                  <Col md={5}>
                    <FormGroup>
                      <Label for="codigoBarras">Código Barras</Label>
                        <Input  type="text" name="codigoBarras" id="codigoBarras"
                          placeholder="codigo"  value={item.codigoBarras || ''}
                          onChange={ (e) => changeHandler(e)} 

                         
                        />    
                    </FormGroup>    
                  </Col>
                  <Col md={3}>
                  <FormGroup>
                      <Label for="estado">Servicio</Label>
                      <Switch                         
                        className="mt-3"                         
                        onChange={ changeServicio }  
                        checked={item.isService} />
                    </FormGroup>     
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="estado">Estado</Label>
                      <Switch                         
                        className="mt-3"                         
                        onChange={ changeEstado }  
                        checked={item.estado} />
                    </FormGroup>   
                  </Col>                 
                </Row>
                <Row form>
                  <Col md={8}>
                    <FormGroup>
                      <Label for="enombre">Nombre</Label>
                        <Input type="text" name="nombre" id="enombre" 
                          placeholder="nombre"  value={item.nombre || ''}
                          required={true}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                  
                  <Col md={4}>
                    <FormGroup>
                      <Label for="enombreCorto">Nombre Corto</Label>
                      <Input type="text" name="nombreCorto" id="enombreCorto"  value={item.nombreCorto || ''} 
                          onChange={ (e) => changeHandler(e)}  />
                    </FormGroup>   
                  </Col>
                </Row> 
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="eId">Categoría</Label>
                      <SelectCategoria/>  
                    </FormGroup>    
                  </Col>                  
                  <Col md={4}>
                    <FormGroup>
                      <Label for="eEstado">Marca</Label>
                      <SelectMarca/>  
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
                  <Col md={8}>
                    <FormGroup>
                      <Label for="edescripcion">Descripción</Label>
                        <Input type="text" name="descripcion" id="edescripcion" 
                          placeholder="descripcion"  value={item.descripcion || ''}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>    
                  </Col>                  
                  <Col md={2}>
                    <FormGroup>
                      <Label for="einCatalogo">Catálogo</Label>
                      <Switch                         
                        className="mt-3"                         
                        onChange={ changeCatalogo }
                        checked={item.inCatalogo} />
                    </FormGroup>   
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="einOferta">Oferta</Label>
                      <Switch
                        className="mt-3"                         
                        onChange={ changeOferta }  
                        checked={item.inOferta} />
                    </FormGroup>   
                  </Col>
                </Row> 
                <h6>Costos/Ventas</h6> 
                <Row form>                                 
                  <Col md={4}>
                    <FormGroup>
                      <Label for="precioVenta">Precio Venta</Label>
                      <Input type="number" name="precioVenta" id="precioVenta"  value={item.precioVenta || ''} 
                          onChange={ (e) => changeHandler(e)}  
                          required={true}/>
                    </FormGroup>   
                  </Col>
                  <Col md={4}>
                  <FormGroup>
                      <Label for="estockMinimo">Stock Mínimo</Label>
                        <Input type="number" name="stockMinimo" id="stockMinimo" 
                          value={item.stockMinimo || ''}
                          required={true}
                          onChange={ (e) => changeHandler(e)} />    
                    </FormGroup>  
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="comision">Comisión (%)</Label>
                      <Input type="number" name="comision" id="comision"  value={item.comision || ''} 
                          onChange={ (e) => changeHandler(e)}  
                          required={true}
                          />
                    </FormGroup>   
                  </Col>
                </Row>  
         
              
                {item.id || estado ? 
                <Button 
                  type="submit"
                  className={item.id ?"btn-md btn-warning mt-2" : "btn-md btn-info mt-2"}>
                  <FontAwesomeIcon icon={faSave} />  {' '} Actualizar </Button>
                  : null                 
                }
                           
                </div>   
            </Form>    
          </Col>  
          <Col md={3} >
            <ArticuloImagen/>
          </Col>            
        </Row>  
      </div>                                             
    );
};
export default EditArticulos;
