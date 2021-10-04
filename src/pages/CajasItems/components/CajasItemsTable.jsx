import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { cajaActions, crudActions } from '../../../actions'
import Moment from 'react-moment'
import {      
    Table,    
    Button,
       Modal,
    ModalBody
  } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {   
  faFilePdf,
  faTimes,
  
} from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'


import CajasRecibo from './CajasRecibo'

function CajasItemsTable () {              
  
  const dispatch = useDispatch()  
  const [mount] = useState(false)
  const {data, pagina, paginas, total, modalView } = useSelector(state => state.cajasitems)
  const cajai = useSelector(state => state.cajas.item)

  const [citem, setCitem] = useState({
    id:"",
    createdAt:"",
    label:"",
    tipo:"",
    monto:""
  })
    
  let us = JSON.parse(localStorage.getItem('user'))
  
  const makeHttpRequestWithPage = (page, num) =>{        
    dispatch(cajaActions.getListDetalle('CAJAS_ITEMS_DATA','cajasitems',page, num, cajai.id))  
  }


  useEffect(() =>{    
      
     return () =>{            
        /*dispatch(crudActions.setReset('CAJAS_ITEMS_RESET'))
        dispatch(crudActions.setReset('CAJAS_RESET_ITEM'))   */
        dispatch({type:'CAJAS_ITEMS_RESET'}) 
        dispatch({type:'CAJAS_RESET_ITEM'})      
    };
  }, [dispatch, mount]);

  const toggleModalView = (item) => {    
    let est = modalView === true ? false : true;    
    if(item){
      setCitem(item)  
    }else{
      setCitem({id:"",
    createdAt:"",
    label:"",
    tipo:"",
    monto:""})
    }
    
    dispatch(cajaActions.viewModal('CAJAS_ITEMS_VIEW',est))             
  };
   
  return (    
    <>
    <div className="table-single">             
        <Table className="table-simple">
        <thead>
            <tr>  
                <th width="10%">#</th>
                <th width="10%">Fecha</th>
                <th width="40%">Label</th>
                <th width="10%">Tipo</th>
                <th width="20%">Monto</th>
                <th width="10%"></th>                
            </tr>
        </thead>
        {data && (
            <tbody>
                {data.map((item) => (
    <tr key={item.id}>
    <td>{item.id}</td>                      
    <td><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></td>                           
    <td>{item.label}</td>
    <td>{item.tipo}</td>
    <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>
                                              
                      <td>                      
                        <Button className="btn btn-danger btn-xs" onClick={() => {toggleModalView(item)}} >
                          <FontAwesomeIcon icon={faFilePdf} />
                        </Button>
                      </td>      
                    </tr>  
                    ))}
            </tbody>
        )}
    </Table>    
 </div> 
 <div className="navegador" >
    <Pagination
    makeHttpRequestWithPage={ makeHttpRequestWithPage }
    total={total}
    paginas={paginas}
    current= {pagina} 
    pagina= {12}
    />
 </div>
 <Modal isOpen={modalView} toggle={toggleModalView}>
      <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <ModalBody>
            <CajasRecibo
              recibo = {citem}
              user = {us}
            />    
      </ModalBody>
    </Modal>
 </>
  );
}

export default CajasItemsTable