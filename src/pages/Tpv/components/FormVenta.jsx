import React,{useEffect, useState} from "react";
import { Table, Row, Col, Button, Form, FormGroup, Label, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment'
import SearchsCliente from '../../Clientes/components/SearchsCliente'
import SearchsPersonal from '../../Personal/components/SearchsPersonal'

const FormVenta = () => {
   const dispatch = useDispatch() 
   const { items, cantidadTotal, item, sumaTotal, artId }= useSelector(state => state.ventas)
   const iteme = useSelector(state => state.empresas.item)   
   const [ recibido, setRecibido] = useState()    
   const [ cambio, setCambio] = useState()    
   const fechaHoy = new Date()
   const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   
    
   const changeHandler = (event) =>{
    const { name, value } = event.target  
    setRecibido(value)
    setCambio(value - sumaTotal)  
   }

  const submitHandle = event => {       
    event.preventDefault()         
      let it = {              
          "fechaVenta": fechaHoy,
          "tipo":'contado',
          "nroItems":cantidadTotal,
          "total": sumaTotal,
          "observaciones":'Venta de servicios, cliente (' + item.personals + ')',
          "estado": true,
          "usuarioId": usuario.id,
          "clienteId": item.clienteId,
          "personalId": item.personalId          
          }
      let dato = {
        item :it,
        items: items,
        almacenId: almacenId
      }
    console.log(dato)
      dispatch(crudActions.createList('VENTAS_DIRECTAS','tpv',dato))           
  } 

  useEffect(() => {
      /*makeHttpRequestWithPage(1,12)*/
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  return(
    <>    
    <Row>    
      <Col md={6} className="form-factura"> 
      <div className="drecibo"> 
        <div className="dempresa">           
           <h6>{iteme.nombre}</h6>
           <p>{iteme.direccion}</p>
           <p>NIT: {iteme.nit}</p>           
        </div>    
        <div className="dcliente">
          <p>FECHA: <Moment format="YYYY/MM/DD" >{ fechaHoy }</Moment></p>          
          <p>HORA: <Moment format="HH:mm" >{ fechaHoy }</Moment></p>
          <p>SR(A): </p>
        </div>    
        <div className="dconcepto">
        <Table className="table-simple">                    
              <tbody>
                <tr>                                              
                  <th width="10%">CANT.</th>
                  <th width="50%">CONCEPTO</th>
                  <th width="15%">P.U.</th>
                  <th width="25%">IMPORTE</th>                                                           
                </tr>  
                  {items.map((item, index) => (
                      <tr key={item.articuloId}>                                              
                        <td>{item.cantidad}</td>
                        <td>{item.nombre}</td>                        
                        <td>{item.valor}</td>
                        <td>{item.subTotal}</td>                                                           
                      </tr>  
                   ))}
              </tbody>          
        </Table>
        <Table className="table-simple">                    
              <tbody>                              
                <tr>                                              
                  <td >TOTAL</td>                                    
                  <td width="60%"> 
                  {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(sumaTotal)}</td>                                                           
                </tr>                  
              </tbody>          
        </Table>
        </div>    
        <div className="dqr">

        </div>
        </div>      
      </Col>      
      <Col md={6} className="form-cambio"> 
        <SearchsCliente/>
        <SearchsPersonal/> 
        <Form onSubmit={ submitHandle}>     
                    <Row form>
                      <Col md={12}>
                        <FormGroup>   
                        <Label for="total">Total</Label>                 
                          <Input 
                            type="number" 
                            name="total"                             
                            id="total"  
                            value={sumaTotal}  
                            onChange={changeHandler} 
                            readOnly={true}/>
                        </FormGroup>
                      </Col>
                    </Row>  
                    
                    <Row>
                      <Col md={12}>
                        <FormGroup>                    
                        <Label for="recibido">Recibido</Label>
                          <Input 
                            type="text" 
                            name="recibido"                             
                            id="recibido"  
                            value={recibido || ''}  
                            onChange={changeHandler} />
                        </FormGroup>
                      </Col>
                    </Row>  
                    <Row>
                      <Col md={12}>
                        <FormGroup>                    
                        <Label for="cambio">Cambio</Label>
                          <Input 
                            type="text" 
                            name="cambio"                             
                            id="cambio"  
                            value={ cambio || ''}  
                            onChange={changeHandler} 
                            readOnly={true}/>
                        </FormGroup>
                      </Col>
                    </Row>  
                    <Row>
                      <Col md={12}>
                        <Button className={(cambio > 0 && item.clienteId > 0) ? "btn-md btn-info mt-3": "btn-md disabled mt-3"}>
                         <FontAwesomeIcon icon={faSave} />                          
                        </Button>
                      </Col>
                    </Row>
        </Form>                   
      </Col>      
    </Row>       
</>      
  )

};
export default FormVenta;
