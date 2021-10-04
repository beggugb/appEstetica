const initialState = {
    data: [],
    items: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    orden: 'ASC',
    modalView: false,
    estado:true,
    item:{            
      nombre:'',
      direccion:'',
      tipo:'',
      telefono:'',
      email:'',
      observaciones:'',     
      filename:'default.jpg'      
    }    
  };
  
export function personas(state = initialState, action) {
    switch (action.type) {      
      case "PERSONAS_CODIGO_BARRAS":
        return {
          ...state,
          item: action.response
      };
      case "PERSONAS_VERIFICAR":
        return {
          ...state,
          estado: action.response
        };
       case "PERSONAS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
      case "PERSONAS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "PERSONAS_ADD":
        return {
          ...state,
          item: action.response
        };
      case "PERSONAS_ITEM":
          return {
            ...state,
            item: action.response
          };
      case "PERSONAS_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "PERSONAS_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "PERSONAS_LISTA":
            return {
              ...state,
              data: action.response
            };             

      case "PERSONAS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          }; 
               
      case "PERSONAS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item
        };
      case "PERSONAS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  
        case "PERSONAS_RESET_ITEMS":
          return {
            ...state,            
            items: []
          };
        case "PERSONAS_RESET_DATA":
            return {
              ...state,            
              data: [],
              pagina: 0,
              paginas: 0,
              total: 0
            }; 
        
      default:
        return state;
    }
  }
  