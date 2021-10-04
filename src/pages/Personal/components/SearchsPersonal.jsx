import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {  
    Row,
    Col,
    Button, FormGroup, Input, Label, Modal, ModalBody, Table
  } from "reactstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import SearchPersonal from "./SearchPersonal";

const SearchsPersonal = () => {
    const dispatch = useDispatch()   
    const [modalView, setmodalView] = useState(false); 
    const { data  } = useSelector(state => state.personas) 
    const itt  = useSelector(state => state.ventas.item) 
   
    const toggleModalView = () => {    
        let est = modalView === true ? false : true;             
        setmodalView(est)                          
    };

    const asignar = (item) => {    
        let est = modalView === true ? false : true;                     
        dispatch({type: 'VENTAS_CHANGE', props: 'personalId', value: item.id})
        dispatch({type: 'VENTAS_CHANGE', props: 'personals', value: item.nombres})        
        setmodalView(est)  
        dispatch({type:'PERSONAS_RESET_DATA'})             
    };

    useEffect(() => {        
    
        return () => {
          dispatch({type:'PERSONAS_RESET'})   
        };
      }, []);

    return (                      
      <>
        <Row form>          
            <Col md={10}>        
             <FormGroup>
              <Label for="clients">Personal</Label>
              <Input type="text" name="personals" id="personals" 
                    value={itt.personals}
                    readOnly={true}/>              
             </FormGroup>       
            </Col>          
            <Col md={2}>        
            <Button className="btn-rd btn-info mt-4" onClick={() => toggleModalView()}>
                <FontAwesomeIcon icon={faSearch} />                          
            </Button>
          </Col>
        </Row>
       <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
          <Row>
            <Col>
              <SearchPersonal/>
            </Col>
          </Row>

           <Row>
            <Col>
            <div className="table-single">     
                    <Table className="table-simple">
                    <thead>
                        <tr>  
                            <th width="15%">Id</th>
                            <th width="45%">Nombres</th>
                            <th width="15%">Dirección</th>
                            <th width="15%">Nit</th>            
                            <th width="10%"></th>                
                        </tr>
                    </thead>
                    {data && (
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>                      
                                    <td>{item.id}</td>
                                    <td>{item.nombres}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.nit}</td>                                                       
                                    <td>
                                    <Button className="btn btn-success" 
                                    onClick={() => { asignar(item)}}                           >
                                    <FontAwesomeIcon icon={faArrowRight} />
                                    </Button>              
                                    </td>
                                </tr>  
                                ))}
                        </tbody>
                    )}
                    </Table>
            </div>
            </Col>
          </Row>  
          </ModalBody>
        </Modal>

       </>
    );
};
export default SearchsPersonal;
