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
             <h5 className="text-center pio"> <b>{this.props.data.nombre}</b></h5>
             <h5 className="text-center pio"> {this.props.data.codigo}</h5>             
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
            src={api + '/static/images/articulos/lg/'+this.props.data.filename }/>                                             
          </Col>
        </Row>
        <Row>
         <Col className="text-center">
         <div className="clasificacion">
            <Barcode 
            value={this.props.data.codigoBarras}
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
          <tr><td width="35%"><b>Nombre Corto :</b></td><td >{this.props.data.nombreCorto}</td></tr>          
          <tr><td><b>Categoria :</b></td><td>{this.props.data.categoria.nombre}</td></tr>
          <tr><td><b>Marca :</b></td><td>{this.props.data.marca.nombre}</td></tr> 
          <tr><td><b>Tipo :</b></td><td>{this.props.data.tipo}</td></tr> 
          <tr><td><b>Origen :</b></td><td>{ this.props.data.origen}</td></tr> 

          <tr>
              <td><b>Estado :</b></td>
              <td>{ this.props.data.estado ? <FontAwesomeIcon icon={ faCheckCircle } size="2x" color="green"/> : <FontAwesomeIcon icon={ faPlusCircle } size="2x" color="red"/> }</td>
          </tr>

          <tr>
              <td><b>Catálogo :</b></td>
              <td>{ this.props.data.inCatalogo ? <FontAwesomeIcon icon={ faCheckCircle } size="2x" color="green"/> : <FontAwesomeIcon icon={ faPlusCircle } size="2x" color="red"/> }</td>              
          </tr>           
          <tr>
              <td><b>Oferta :</b></td>
              <td>{ this.props.data.inOferta ? <FontAwesomeIcon icon={ faCheckCircle } size="2x" color="green"/> : <FontAwesomeIcon icon={ faPlusCircle } size="2x" color="red"/> }</td>              
          </tr>           
                   
          <tr><td><b>Precio Costo :</b></td>
          <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.data.precioCosto)}</td></tr>          
          <tr><td><b>Precio Venta :</b></td>
          <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.data.precioVenta)}</td></tr>  
          <tr><td><b>% Ganancia :</b></td>
            <td>{new Intl.NumberFormat('de-DE',{}).format(this.props.data.pGanancia)} %</td>
          </tr>            

          <tr><td colSpan="2"><b>Descripción :</b></td></tr>   
          <tr><td colSpan="2">{ this.props.data.descripcion }</td></tr>                    
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


function ArticuloResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.articulos)
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'ARTICULOS_RESET_ITEM'}) 
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


export default ArticuloResumen