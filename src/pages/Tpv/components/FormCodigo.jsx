import React,{useEffect, useState} from "react";
import { Table, Row, Col, Button, Form, FormGroup, Label, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faBarcode, faAmericanSignLanguageInterpreting } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment'
import SearchsCliente from '../../Clientes/components/SearchsCliente'

const FormCodigo = () => {
   const dispatch = useDispatch() 
   const { items, cantidadTotal, sumaTotal, artId }= useSelector(state => state.ventas)
   const { item }= useSelector(state => state.articulos)   
   const [codigo, setCodigo] = useState('');
   const fechaHoy = new Date()
   const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))   
    
   const changeHandler = (event) =>{
    const { name, value } = event.target  
    setCodigo(value)
   }

  const submitHandle = event => {       
    event.preventDefault()         
    /*dispatch(crudActions.buscarItem('VENTAS_CODIGO_BARRAS','tpv',codigo))     */
    let itt = {}
    itt.almacenId = almacenId
    itt.codigo = codigo
    dispatch(crudActions.searchList('VENTAS_CODIGO_BARRAS','tpv',itt)) 
    setCodigo('')

  }



  useEffect(() => {
      /*makeHttpRequestWithPage(1,12)*/
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  return(
                 
            <Form onSubmit={ submitHandle}>     
                    <Row form>
                      <Col md={10}>                                                             
                        <Input 
                            type="number" 
                            name="codigtotal"                             
                            id="total"  
                            value={codigo}  
                            onChange={changeHandler} 
                            />                        
                      </Col>             
                      <Col md={2}>
                      <Button className="btn-md btn-info">
                         <FontAwesomeIcon icon={faBarcode} />                          
                        </Button>
                      </Col>
                    </Row>                      
            </Form>                   
        
  )

};
export default FormCodigo;
