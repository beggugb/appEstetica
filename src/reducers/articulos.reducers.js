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
      codigo: '',
      codigoBarras: '',      
      estado: true,      
      nombre:'',
      nombreCorto:'',
      categoriaId:1,
      marcaId:1,
      tipo:'artículo',
      descripcion:'',
      inCatalogo: false,
      inOferta: false,
      precioCosto:0.00,
      precioVenta:0.00,
      pGanancia:0,
      impuestoIva:0,
      impuestoIt:0,
      pServicio:0,
      stockMinimo:0,
      stockTiempo:0,
      origen:'compra',
      comision:0,
      isService:false,
      categoria:{
          id:'',
          nombre:''
        },
      marca:{
          id:'',
          nombre:''
      }  
    }    
  };
  
export function articulos(state = initialState, action) {
    switch (action.type) {      
      case "ARTICULOS_CODIGO_BARRAS":
        return {
          ...state,
          item: action.response
      };
      case "ARTICULOS_VERIFICAR":
        return {
          ...state,
          estado: action.response
        };
       case "ARTICULOS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
      case "ARTICULOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "ARTICULOS_ADD":
        return {
          ...state,
          item: action.response
        };
      case "ARTICULOS_ITEM":
          return {
            ...state,
            item: action.response
          };
      case "ARTICULOS_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "ARTICULOS_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "ARTICULOS_LISTA":
            return {
              ...state,
              items: action.response
            }; 
            

      case "ARTICULOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          }; 
               
      case "ARTICULOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item
        };
      case "ARTICULOS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  
        case "ARTICULOS_RESET_ITEMS":
          return {
            ...state,            
            items: []
          }; 
        
      default:
        return state;
    }
  }
  