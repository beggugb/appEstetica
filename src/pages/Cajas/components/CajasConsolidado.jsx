import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch } from 'react-redux'
import { crudActions } from '../../../actions/crud.actions'
import {     
  Table,    
  Button } from "reactstrap";

import ReactToPrint from "react-to-print";


 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date();         
    return (
      <>
    <div className="invoice-consolidado">                    
    <h5 className="text-center"><b>Resumen de Caja</b></h5>    
    <p className="text-center"><b> Fecha Caja: <Moment format="DD/MM/YYYY">{ this.props.pcaja.createdAt }</Moment></b></p>
    <p className="text-left mt-2 ml-2">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></p>
    
    <div className="soli">     
     <Table className="table-reporte">
            <tbody>
            <tr>  
                <td>Nro:</td><td>{this.props.pcaja.id}</td>                                                        
            </tr>
            <tr>  
                <td>Usuario:</td><td>{this.props.pcaja.usuario.nombres}</td>                                                        
            </tr>
            <tr>  
                <td>$ Inicial:</td>                
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoInicial)}</td>
                <td>$ Ingresos:</td>
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoIngreso)}</td>
            </tr>            
            <tr>
                <td>$ Egresos:</td>
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoEgreso)}</td>
                <td>$ Total:</td>
                <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pcaja.montoFinal)}</td>
            </tr>            
            </tbody>
          </Table>  
          </div>
    </div>   
    </> 
    );
  }}


function CajasConsolidado ({ user, caja }) {    
const dispatch = useDispatch()
const componentRef = useRef();   
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
 useEffect(() =>{        
     return () =>{                    
        dispatch({type:'CAJAS_RESET_ITEM'})  
        dispatch({type:'CAJAS_ITEMS_RESET'})  
    };
  }, []);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}          
            puser={usuario}
            pcaja={caja}            
        />
    </div>
     )
}


export default CajasConsolidado