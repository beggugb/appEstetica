import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { crudActions } from '../../actions/crud.actions'
import {     
  Table,
  Row, Col,    
  Button } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'


import ReactToPrint from "react-to-print";


 export class ComponentToPrint extends React.PureComponent {
  render() {
    
    return (
      <>
  <div className="invoice-box">
    <div className="sol">
        <h3 className="text-center mb-2"><b>INFORME GENERAL</b></h3>
        <h6 className="text-center mb-2"><b><Moment format="DD-MM-YYYY">{this.props.tdesde}</Moment> -- <Moment format="DD-MM-YYYY">{this.props.thasta}</Moment></b></h6>        
                   
    </div>
        <div className="ibalance">
            <Row>
              <Col md={6} className="cbalance">              
                <h1>Ingresos</h1>
                <Table className="tbalance">
                  <tbody>                   
                    <tr>
                      <td><b>Total Ingresos</b></td>                      
                      <td><b>{this.props.tmovimientos ? new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.tmovimientos.ingresos) :0}</b></td>
                    </tr>                       
                  </tbody>  
                </Table>
                <h1>Egresos</h1>
                <Table className="tbalance">
                  <tbody>                   
                    <tr>
                      <td><b>Total Egresos</b></td>                      
                      <td><b>{ this.props.tmovimientos ? new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.tmovimientos.egresos): 0}</b></td>
                    </tr>                       
                  </tbody>  
                </Table>
                <h1>Saldo</h1>
                <Table className="tbalance">
                  <tbody>                   
                    <tr>
                      <td><b>Total Saldo</b></td>                      
                      <td><b>{this.props.tmovimientos? new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.tmovimientos.ingresos - this.props.tmovimientos.egresos): 0}</b></td>
                    </tr>                       
                  </tbody>  
                </Table>
              </Col>              
              <Col md={6} className="cbalance">
              <h1>Comisiones</h1>
                <Table className="tbalance">
                  <tbody>                    
                    <tr>
                      <td>Comisión servicios</td>                      
                      <td>{this.props.tcomisiones ? new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.tcomisiones.articulos.valores): 0}</td>
                    </tr>
                    <tr>
                      <td>Comisión artículos</td>                      
                      <td>{this.props.tcomisiones ? new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.tcomisiones.servicios.valores): 0}</td>
                    </tr>                                          
                  </tbody>  
                </Table>
                <h1>Ventas</h1>
                <Table className="tbalance">
                  <tbody>                
                  <tr>
                      <td>Venta de servicios</td>                      
                      <td>{this.props.tconsolidado ?new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.tconsolidado.servicios.ventas) : 0}</td>
                    </tr>
                    <tr>
                      <td>Venta de artículos</td>                      
                      <td>{this.props.tconsolidado ? new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.tconsolidado.articulos.ventas) : 0}</td>                      
                    </tr>                    
                  </tbody>  
                </Table>
              </Col>
            </Row>                  
        </div>
    <p><b> Usuario : </b>{this.props.puser.nombre}</p>    
    </div>     
    </> 
    );
  }}


function Balance () {    
  const componentRef = useRef();   
  const { tventas, tcompras, tconsolidado, tmovimientos, tcomisiones, desde, hasta } = useSelector(state => state.informes)  
  
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const dispatch = useDispatch()
  
  
  useEffect(() =>{      
    return () =>{             
      /*dispatch(crudActions.setReset('INFORMES_RESET'))               */
      dispatch({type:'INFORMES_RESET'}) 

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
            puser={user}
            tventas={tventas} 
            tcompras={tcompras} 
            tconsolidado={tconsolidado} 
            tmovimientos={tmovimientos} 
            tcomisiones={tcomisiones}
            tdesde={desde}
            thasta={hasta}
        />
    </div>
     )
}


export default Balance