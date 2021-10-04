import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { crudActions } from '../../actions/crud.actions'
import {     
  Table,    
  Button } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'


import ReactToPrint from "react-to-print";


 export class ComponentToPrint extends React.PureComponent {
  render() {
    
    return (
      <>
  <div className="invoice-box">
  <div className="sol">

    <h5 className="text-center mb-2">INFORME DE COMISIONES</h5>        
    <h6 className="ml-3" >Total Comisiones :  
    {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.pdetalle)}
    </h6>      
 </div>

    <div className="sol"> 
          <Table className="table-reporteb">
            <thead>
                <tr>                      
                  <th width="20%" className="text-dark">Fecha Registro</th>
                  <th width="40%" className="text-dark">Nombres</th>                  
                  <th width="20%" className="text-dark">Σ $Venta</th>
                  <th width="20%" className="text-dark">Σ Comisiones</th>                  
                </tr>
            </thead>
        {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item, index) => (
                  <tr key={index}>  
                    <td>{item.fechaRegistro || ''}</td>
                    <td>{item.personal.nombres || ''}</td>                    
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.tVenta)}</td>                                       
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.tComision)}</td>                                       
                    </tr>  
                    ))}
            </tbody>
        )}
         </Table>                    
    </div>    
      <p><b> Usuario : </b>{this.props.puser.nombre}</p>    
    </div>     
    </> 
    );
  }}


function Comisiones () {    
  const componentRef = useRef();   
  const { total, comisiones } = useSelector(state => state.informes)  
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
            pdetalle={total}
            pdata={comisiones}            
        />
    </div>
     )
}


export default Comisiones