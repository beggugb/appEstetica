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
                    <th width="10%" className="text-dark">Nº</th>
                    <th width="30%" className="text-dark">Glosa</th>
                    <th width="10%" className="text-dark">F.Movimiento</th>                                        
                    <th width="10%" className="text-dark">Tipo</th>          
                    <th width="10%" className="text-dark">NºItems</th>          
                    <th width="10%" className="text-dark">Total</th>
                    <th width="10%" className="text-dark">A.Origen</th>          
                    <th width="10%" className="text-dark">A.Destino</th>          
                </tr>
            </thead>
        {this.props.pdata.data && (
            <tbody>
                {this.props.pdata.data.map((item) => (
                  <tr key={item.id}>  
                    <td>{item.id}</td>
                    <td>{item.observaciones}</td>                                                  
                    <td><Moment format="DD-MM-YYYY">{item.fechaInventario}</Moment></td>
                    <td>{item.tipo}</td>
                    <td>{item.nroItems}</td>
                    <td>{item.total}</td>
                    <td>{item.aorigen.nombre || ''}</td>
                    <td>{item.adestino.nombre || ''}</td>
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


function Movimientos () {    
  const componentRef = useRef();   
  const { detalle, movimientos } = useSelector(state => state.informes)  
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
            pdata={movimientos}            
        />
    </div>
     )
}


export default Movimientos