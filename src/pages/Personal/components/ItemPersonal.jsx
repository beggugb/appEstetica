import React,{useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  
    Row,
    Col,
    Button, Form, FormGroup, Input, Label,Card,CardBody,ListGroup, ListGroupItem
  } from "reactstrap"
import { crudActions } from '../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlusCircle, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const ItemArticulo = ({getComponent}) => {
    const dispatch = useDispatch()   
    const { data  } = useSelector(state => state.articulos)      
    const [open, setOpen] = useState(false); 
    const [name, setName] = useState('');    
    const [valor, setValor] = useState(0);
    const [articulo, setArticulo] = useState({});
    
    const changeHandler = event => {    
      const { value } = event.target  
      const name = value.toLowerCase().trim();
      if (!value) {      
        clearInput();        
        dispatch({type:'INFORME_SET_ARTICULO_ID',articuloId:0})
        return;
      }
  
      setName(value)
      setOpen(true)
  
      if (name) {
        search(name);
      }       
    } 
    const search = (searchTerm) =>{
      /*this.props.searchArticuloItems(searchTerm);*/
      let iok ={}
      iok.codigo = ''
      iok.nombre = searchTerm      
      dispatch(crudActions.searchItems('ARTICULOS_DATA','articulos',iok)) 
    }  

    const clearInput = () => {
      setName('')
      setOpen(false)      
    } 


    const handleAsignar = (articulo) =>{        
      dispatch({type:'INFORME_SET_ARTICULO_ID',articuloId:articulo.id})   
      setArticulo(articulo)  
      setName(articulo.nombre)    
      setOpen(false)
    }

 
    return (              
        <div className="lnsearch">
                         
                    <Row form>                      
                      <Col md={12}>
                        <FormGroup>   
                        <Label for="eNombre">Articulo</Label>                 
                          <Input 
                            type="text" 
                            name="name"                             
                            id="name"  
                            value={name || ''}  
                            onChange={changeHandler} />
                        </FormGroup>
                      </Col>                     
                    </Row>                  
              
              
              { open ?              
                <Card className="resultArti">           
                  <CardBody>
                    {data &&
                    <ListGroup>
                      {data.map(item =>(
                        <ListGroupItem
                          key={item.id}
                          onClick={() => handleAsignar(item) }
                        >
                        <b>{item.codigo}</b> - {item.nombre}  
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                    }
                  </CardBody>  
                </Card>           
              : null}                

        </div>                    
                         
    );
};
export default ItemArticulo;
