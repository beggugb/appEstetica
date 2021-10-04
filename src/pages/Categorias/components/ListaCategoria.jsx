import React,{useEffect, useCallback} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { Row, Col, Modal, ModalBody, Button, ListGroup, ListGroupItem  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTrash, faHome } from "@fortawesome/free-solid-svg-icons";

const ListaCategoria = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.categorias)    

    const makeHttpRequestWithPage = useCallback(() =>{
        dispatch(crudActions.getLista('CATEGORIAS_LISTA','categorias'))          
      },[])
    
    const changeHandler = (io) => {           
        /*dispatch(crudActions.changeValue('ARTICULOS_CHANGE','categoriaId',io))                */
        let iok ={}
        iok.almacenId = 1
        iok.categoriaId = io
        dispatch(crudActions.searchList('ARTICULOS_LISTA','almacenes',iok))  
    }     
    
    useEffect(() => {
        makeHttpRequestWithPage()
        return () => {            
        };
    }, []);


    return (              
        <>
        <ListGroup horizontal>
        <ListGroupItem tag="a" href="#">
            <Button className="btn btn-warning" onClick={() => { changeHandler(0)}}>
              <FontAwesomeIcon icon={faHome} />
            </Button>
        </ListGroupItem>
        {data.map((item) => (
            <ListGroupItem key={item.value}>
             <Button className="btn" onClick={() => { changeHandler(item.value)}} >
             {item.label}
            </Button>
            </ListGroupItem>        
        ))}
      </ListGroup>
        </>                                             
    );
};
export default ListaCategoria;
