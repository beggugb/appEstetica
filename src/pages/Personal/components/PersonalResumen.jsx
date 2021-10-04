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
             <h5 className="text-center pio"> <b>{this.props.data.nombres}</b></h5>
             <h5 className="text-center pio"> {this.props.data.id}</h5>             
            </Col>            
          </Row>
        </div>

        <Row className="crl">      
        <Col md={4} >
        <div className="sol">
        <Row>
          <Col className="text-center">
            <img alt="persona"
            className="text-center imglg" 
            src={api + '/static/images/personas/lg/'+this.props.data.filename }/>                                             
          </Col>
        </Row>
        <Row>
         <Col className="text-center">
         <div className="clasificacion">
            <Barcode 
            value={this.props.data.id + 100}
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
          <tr><td width="35%"><b>Nombre :</b></td><td >{this.props.data.nombres}</td></tr>                    
          <tr><td><b>Tipo :</b></td><td>{this.props.data.tipo}</td></tr>           
          <tr><td colSpan="2"><b>CI :</b></td></tr>   
          <tr><td colSpan="2">{ this.props.data.ci }</td></tr>
          <tr><td colSpan="2"><b>Teléfono :</b></td></tr>   
          <tr><td colSpan="2">{ this.props.data.telefono }</td></tr>
          <tr><td colSpan="2"><b>Dirección :</b></td></tr>   
          <tr><td colSpan="2">{ this.props.data.direccion }</td></tr>                    
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


function PersonaResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.personas)
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'PERSONAS_RESET_ITEM'}) 
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


export default PersonaResumen