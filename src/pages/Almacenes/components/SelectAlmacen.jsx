import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { Form, Label, FormGroup, Row, Col, Button  } from "reactstrap";
import Select from "react-select";
const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )
  
  }

const SelectAlmacen = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.almacenes)    

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.getLista('ALMACENES_LISTA','almacenes'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0                    
        dispatch({type:'INFORME_SET_ALMACEN_ID',almacenId:io})
    }     
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
        <>
        <Label for="almaceneId">Almacen :</Label>
        <Select
            defaultValue={data[0]}
            name="almaceneId"    
            id="almaceneId"                    
            options={data}      
            isClearable={true} 
            onChange={ (e) => changeHandler(e) }                         
            /*value={defaultVal(data,item.almaceneId)} */
        />    
        </>                                             
    );
};
export default SelectAlmacen;
