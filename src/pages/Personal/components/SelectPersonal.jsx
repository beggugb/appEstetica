import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import Select from "react-select";
const defaultVal = (options, valor) =>{
    return options.filter(item =>
        item.value === valor
      )
  
  }

const SelectPersonal = () => {
    const dispatch = useDispatch()    
    const { data, item } = useSelector(state => state.personas)    

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.getLista('PERSONAS_LISTA','personas'))          
      },[])
    
    const changeHandler = event => {    
        let io = event ? event.value: 0            
        dispatch({type:'PERSONAS_CHANGE',props:'id',value:io}) 
    }     
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {
            
        };
    }, []);


    return (              
        <>
        <Select
            defaultValue={data[0]}
            name="id"    
            id="id"                    
            options={data}      
            isClearable={false} 
            onChange={ (e) => changeHandler(e) }                         
            value={defaultVal(data,item.id)} 
        />    
        </>                                             
    );
};
export default SelectPersonal;
