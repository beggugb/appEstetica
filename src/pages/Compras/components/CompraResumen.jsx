import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../../actions/crud.actions'
import { api } from "../../../helpers";
import Barcode from 'react-barcode'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {     
  Table,
  Col,
  Card,
  Row,    
  Button } from "reactstrap";

import ReactToPrint from "react-to-print";


 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date(); 
    return (
      <>
    <div className="reporte">     
      <div className="invoice-box">        
        <div className="sol">
          <Row >
            <Col md={12} className="tit">
             <h5 className="text-center pio"> <b>Compra # {this.props.dato.id}</b></h5>
             <h5 className="text-center pio"> Fecha : {this.props.dato.fechaCompra}</h5>             
            </Col>            
          </Row>
        </div>

        <Row>         
          <Col md={12}>
            <div className="box mt-2">          
            <Table className="table-reporteh mt-2">                      
              <tbody>                  
                <tr>                      
                  <td><b>Nº Items</b></td>
                  <td>{this.props.dato.nroItems}</td>                                          
                  <td><b>Tipo : </b></td>
                  <td>{this.props.dato.tipo}</td>
                </tr>                
                <tr>      
                  <td><b>Total : </b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.dato.total)}</td>                     
                  <td><b>Proveedor : </b></td>
                  <td>{this.props.dato.proveedor.razonSocial} </td>
                </tr>
                <tr>      
                  <td><b>Glosa : </b></td>
                  <td colSpan="3">{ this.props.dato.observaciones }</td>                                       
                </tr>                  
              </tbody>          
            </Table>
            </div>     
          </Col>      
        </Row> 

        <Row>         
          <Col md={12}>
            <div className="box mt-2">          
            <Table className="table-reporteh mt-2">
            <thead>
              <tr>  
                <th width="15%" >Código</th>
                <th width="45%">Nombre</th>
                <th width="10%">Categoría</th>
                <th width="10%">Marca</th>
                <th width="10%">Cantidad</th>
                <th width="10%">Valor</th>                                             
              </tr>
          </thead>
          {this.props.data && (
              <tbody>
                  {this.props.data.map((item, index) => (
                      <tr key={item.articuloId}>                      
                        <td>{item.codigo}</td>
                        <td>{item.articulo ? item.articulo.nombre:''}</td>
                        <td>{item.articulo.categoria ? item.articulo.categoria.nombre:''}</td>                                          
                        <td>{item.articulo.marca ? item.articulo.marca.nombre:''}</td>                        
                        <td>{item.cantidad}</td>
                        <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)}</td>                     
                      </tr>  
                      ))}
              </tbody>
          )}
            </Table>
            </div>     
          </Col>      
        </Row> 
    </div>
    </div>  
    </> 
    );
  }
}


function ArticuloResumen () {    
const dispatch = useDispatch()
const { item, items } = useSelector(state => state.compras)
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'COMPRAS_RESET_ITEMS'}) 
        dispatch({type:'COMPRAS_RESET_ITEM'}) 
    };
  }, [dispatch]);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}                      
            dato={item}
            data={items}
        />
    </div>
     )
}


export default ArticuloResumen