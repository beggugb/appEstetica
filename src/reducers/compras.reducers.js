const initialState = {
    data: [],
    items: [],    
    pagina: 0,
    paginas: 0,
    total: 0,
    cantidadTotal:0,
    sumaTotal:0,
    modalView: false,
    item:{
      id:'',      
      nro: '',
      proveedorId:0,
      proveedors:'',
      estado:false,
      formaPago:'contado',
      fechaEmision: '',
      fechaVencimiento:'',
      glosa:'',
      proveedor:{
        id:'',
        razonSocial:''
      }
    }    
  };
  
export function compras(state = initialState, action) {
    switch (action.type) {
       case "COMPRAS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
      case "COMPRAS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "COMPRAS_ADD":
        return {
          ...state,
          item: action.response.item,
          items: action.response.items,
          cantidadTotal: action.response.item.nroItems,
          sumaTotal: action.response.item.total          
        };
      case "COMPRAS_ITEM":
          return {
            ...state,
            item: action.response.item,
            items: action.response.items,
            cantidadTotal: action.response.item.nroItems,
            sumaTotal: action.response.item.total
          };
      case "COMPRAS_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "COMPRAS_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "COMPRAS_LISTA":
            return {
              ...state,
              data: action.response
            }; 
            

      case "COMPRAS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };            
      case "COMPRAS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item
        };
      case "COMPRAS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };
      case "COMPRAS_SET_ITEMS":
          return {
            ...state,
            items: action.values,
            cantidadTotal: action.cantidad,
            sumaTotal: action.suma
      };
      case "COMPRAS_RESET_ITEMS":
        return {
          ...state,
          items: [],
          cantidadTotal: 0,
          sumaTotal: 0
      };        
      
      default:
        return state;
    }
  }
  