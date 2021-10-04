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
      valor:0,
      comision:0,
      filename:'default.jpg'      
    }    
  };
  
export function servicios(state = initialState, action) {
    switch (action.type) {      
      case "SERVICIOS_CODIGO_BARRAS":
        return {
          ...state,
          item: action.response
      };
      case "SERVICIOS_VERIFICAR":
        return {
          ...state,
          estado: action.response
        };
       case "SERVICIOS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
      case "SERVICIOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "SERVICIOS_ADD":
        return {
          ...state,
          item: action.response
        };
      case "SERVICIOS_ITEM":
          return {
            ...state,
            item: action.response
          };
      case "SERVICIOS_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "SERVICIOS_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "SERVICIOS_LISTA":
            return {
              ...state,
              items: action.response
            }; 
            

      case "SERVICIOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          }; 
               
      case "SERVICIOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item
        };
      case "SERVICIOS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  
        case "SERVICIOS_RESET_ITEMS":
          return {
            ...state,            
            items: []
          }; 
        
      default:
        return state;
    }
  }
  