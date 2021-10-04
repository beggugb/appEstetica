import React,{ useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {  Row, Col, Card, CardBody, CardHeader } from "reactstrap"
import FormVenta from './FormVenta'
import SearchvArticulos from '../../Articulos/components/SearchvArticulo'
import ListaVentas from "./ListaVentas";
import Moment from 'react-moment'

const EditVenta = () => {
  const { item, cantidadTotal, sumaTotal  } = useSelector(state => state.ventas)  
  var d = new Date();
    return (              
        <div className="herramientas">                 
        <Row> 
          <Col md={9}>
            <Card className="cardDetalle">
              <CardHeader>
                <b>DATOS COMPRA</b>
              </CardHeader>
              <CardBody>
                <FormVenta/>
              </CardBody>
            </Card>
          </Col>        
          <Col md={3}>
          <Card className="cardDetalle">
              <CardHeader>
              <b>RESUMEN DE VENTA</b>
              </CardHeader>
              <CardBody>
                <h5><b>Fecha Emisión : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </h5>
                <h5><b>Estado : </b> {item.estado ? 'aprobado': 'pendiente'}</h5>
                <h5><b>Cantidad : </b> {cantidadTotal}</h5>                 
                <h5><b>Valor Total : </b>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(sumaTotal)}</h5>                     
              </CardBody>
            </Card>
          </Col>                  
        </Row>
        <Row> 
          <Col md={12}>
          <Card className="cardArticulos">
              <CardHeader>Articulos</CardHeader>
              <CardBody>
                <SearchvArticulos/>
              </CardBody>
            </Card>
          </Col>          
        </Row> 
        <Row> 
          <Col md={12}>
          <Card className="cardTable">
              <CardHeader>
                sdsd
              </CardHeader>
              <CardBody>
                <ListaVentas/>
              </CardBody>
            </Card>
          </Col>          
        </Row>  
      </div>                                             
    );
};
export default EditVenta;
