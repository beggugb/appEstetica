const initialState = {
    data: [],
    items: [],    
    artId: -1,
    pagina: 0,
    paginas: 0,
    total: 0,
    cantidadTotal:0,
    sumaTotal:0,
    modalView: false,
    item:{
      id:'',      
      nro: '',
      fechaVenta:'',
      tipo:'contado',
      nroItems:'',
      total:0,
      observaciones:'',
      estado:false,
      usuarioId:0,
      clienteId:0,
      clients:'',
      personalId:0,
      personals:'',
      nit:'',
      cliente:{
        id:'',
        nombres:''
      },
      personal:{
        id:'',
        nombres:''
      }
    }    
  };
  
export function ventas(state = initialState, action) {
    switch (action.type) {
       case "VENTAS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
       case "VENTAS_SET_ART":
        return {
          ...state,
          artId: action.id
        };  
     
      case "VENTAS_ADD":
        return {
          ...state,
          item: action.response.item,
          items: action.response.items,
          cantidadTotal: action.response.item.nroItems,
          sumaTotal: action.response.item.total          
        };
      case "VENTAS_ITEM":
          return {
            ...state,
            item: action.response.item,
            items: action.response.items,
            cantidadTotal: action.response.item.nroItems,
            sumaTotal: action.response.item.total
          };
      case "VENTAS_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "VENTAS_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "VENTAS_LISTA":
            return {
              ...state,
              data: action.response
            }; 
            

      case "VENTAS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };            
      case "VENTAS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item
        };
      case "VENTAS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };
      case "VENTAS_SET_ITEMS":
          return {
            ...state,
            items: action.values,
            cantidadTotal: action.cantidad,
            sumaTotal: action.suma
      };
      case "VENTAS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };

      case "VENTAS_CODIGO_BARRAS":                                 
          let newItem = action.response.articulo
          newItem.cantidad = 1
          let iok = state.items.filter(item => item.articuloId === action.response.articulo.articuloId)                                                                       
          return {
            ...state,                                                        
            items: iok.length > 0 ? [...state.items]: [...state.items, newItem],
            cantidadTotal: iok.length > 0 ? state.cantidadTotal : state.cantidadTotal + 1,
            sumaTotal: iok.length > 0 ? state.sumaTotal : parseInt(state.sumaTotal) + parseInt(action.response.articulo.valor)
      };
      case "VENTAS_RESET_ITEMS":
        return {
          ...state,
          items: [],
          cantidadTotal: 0,
          sumaTotal: 0,
          artId: -1
      }; 
      case "VENTAS_DIRECTAS":
          return {
            ...state,
            modalView: false,
            items:[],
            item: initialState.item,
            cantidadTotal:0,
            sumaTotal:0
      };       
      
      default:
        return state;
    }
  }
  
