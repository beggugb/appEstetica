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

    <h5 className="text-center mb-2">INFORME DE MOVIMIENTOS</h5>        
    <h6 className="ml-3" >Total: 
     {new Intl.NumberFormat().format(this.props.pdetalle)}
    </h6>      
 </div>

    <div className="sol"> 
          <Table className="table-reporteb">
            <thead>
                <tr>                      
                  <th width="10%" className="text-dark">Almacen</th>
                  <th width="20%" className="text-dark">Código</th>
                  <th width="30%" className="text-dark">Artículo</th>
                  <th width="15%" className="text-dark">$Venta</th>
                  <th width="10%" className="text-dark">Stock</th>
                  <th width="15%" className="text-dark">Σ</th>                                                            
                </tr>
            </thead>
        {this.props.pdata.data && (
            <tbody>
                {this.props.pdata.data.map((item) => (
                  <tr key={item.id}>  
                    <td>{item.almacen.nombre || ''}</td>
                    <td>{item.articulo.codigoBarras || ''}</td>
                    <td>{item.articulo.nombre || ''}</td>                    
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.articulo.precioVenta)}</td>
                    <td>{item.stock}</td>                                                                                         
                    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.stock * item.articulo.precioVenta)}</td>                                       
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


function Existencias () {    
  const componentRef = useRef();   
  const { detalle, existencias } = useSelector(state => state.informes)  
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
            pdetalle={detalle}
            pdata={existencias}            
        />
    </div>
     )
}


export default Existencias