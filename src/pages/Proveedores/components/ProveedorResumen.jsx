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
          <Row className="crl">
            <Col md={12}>
             <h5 className="text-center pio"> <b>{this.props.data.razonSocial}</b></h5>
             <h5 className="text-center pio"> {this.props.data.nit}</h5>             
            </Col>            
          </Row>
        </div>

        <Row className="crl">      
        <Col md={4} >
        <div className="sol">
        <Row>
          <Col className="text-center">
            <img alt="articulo"
            className="text-center imglg" 
            src={api + '/static/images/proveedores/lg/'+this.props.data.filename }/>                                             
          </Col>
        </Row>
        <Row>
         <Col className="text-center">
         <div className="clasificacion">
            <Barcode 
            value={this.props.data.codigo}
            width={1} 
            height={20}
            fontSize={12}
            />
            </div>
          </Col> 
        </Row>        
        </div> 
        </Col>      
        <Col md={8}>
          <div className="box mt-2">          
           <Table className="table-reporteh mt-2">
           <tbody>                             
              

          <tr><td><b>Tipo Fiscal :</b></td>
              <td >{this.props.data.tipoFiscal}</td>
          </tr>          

          <tr><td><b>Dirección :</b></td>
              <td >{this.props.data.direccion}</td>
          </tr>          

          <tr><td><b>Pais :</b></td>
              <td >{this.props.data.pais}</td>
          </tr>          

          <tr><td><b>Ciudad :</b></td>
              <td >{this.props.data.ciudad}</td>
          </tr>          

          <tr><td><b>Contacto :</b></td>
              <td >{this.props.data.contacto}</td>
          </tr>

          <tr><td><b>Email :</b></td>
              <td >{this.props.data.email}</td>
          </tr>

          <tr><td><b>Web :</b></td>
              <td >{this.props.data.web}</td>
          </tr>

          <tr><td><b>Teléfono :</b></td>
              <td >{this.props.data.telefono}</td>
          </tr>          
          <tr><td colSpan="2"><b>Observaciones :</b></td></tr>   
          <tr><td colSpan="2">{ this.props.data.observaciones }</td></tr>                    
        </tbody>
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


function ProveedorResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.proveedores)
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'PROVEEDORES_RESET_ITEM'}) 
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
            data={item}
        />
    </div>
     )
}


export default ProveedorResumen