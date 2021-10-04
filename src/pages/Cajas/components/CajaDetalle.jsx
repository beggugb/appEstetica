import React from 'react';
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import {      
    Table,        
    Row,
    Col
  } from "reactstrap";


function CajaDetalle() {              
 


  const item  = useSelector(state => state.cajas.item)
  

  return (    
    <div className="financiera">
      <Row>
        <Col md={11} className="nota">
          <Table className="table-simple">
            <tbody>
            <tr>  
                <th>Num:</th>
                <td>{item.id}</td>
                <th>Fecha:</th>                
                <td><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></td>                                     
            </tr>
            <tr>  
                <th>$ Inicial:</th>                
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>
                <th>$ Ingresos:</th>
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</td>
            </tr>            
            <tr>
                <th>$ Egresos:</th>
              <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>
                <th>$ Total:</th>
              <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</td>
            </tr>            
            </tbody>
          </Table>  
        </Col>
      </Row>
  

     
    </div>

  );
}

export default CajaDetalle