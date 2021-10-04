const initialState = {
    ventas: [],        
    compras: [],        
    consolidado: [], 
    movimientos:[],   
    existencias:[],  
    comisiones:[],
    desde:'2021-01-01',
          hasta:'2021-12-01',
    tventas: {},        
    tcompras: {},        
    tconsolidado: {
      articulos:{
        isService: false,
        ventas: 0,
        cantidad: 0
      },
      servicios:{
        isService: true,
        ventas: 0,
        cantidad: 0
      }
    }, 
    tmovimientos:{
      ingresos:0,
      egresos:0
    },       
    tcomisiones:{
      articulos:{
        isService: false,
        valores: 0,
        cantidad: 0
      },
      servicios:{
        isService: true,
        valores: 0,
        cantidad: 0
      }
    },
    tventas:{
      total:0
    },
    tcompras:{
      total:0
    },
    data: [],    
    pagina: 0,
    paginas: 0,
    total: 0,    
    detalle:0,
    articuloId:0,
    almacenId:0

  };
  
export function informes(state = initialState, action) {
    switch (action.type) {     
      case "INFORME_SET_ARTICULO_ID":
        return {
          ...state,
          articuloId: action.articuloId
        };
      case "INFORME_SET_FECHA":
          return {
            ...state,
            desde: action.d,
            hasta: action.h
          };  
      case "INFORME_SET_ALMACEN_ID":
          return {
            ...state,
            almacenId: action.almacenId
          };   
      case "INFORMES_MOVIMIENTOS":
            return {          
              ...state,
              detalle: action.response.detalle,
              movimientos: action.response.data,
              total: action.response.data.total
            }; 
        case "INFORMES_EXISTENCIAS":
              return {          
                ...state,                
                existencias: action.response.data,
                total: action.response.data.total
              }; 
        case "INFORMES_COMISIONES":
            return {          
              ...state,                
              comisiones: action.response.data,
              total: action.response.detalle
              };            
      case "INFORMES_VENTAS":
        return {          
          ...state,
          detalle: action.response.detalle,
          libros: action.response.data,
          total: action.response.data.total
        };               
      case "INFORMES_CONSOLIDADO":
        return {          
          ...state,
          detalle: action.response.detalle,
          consolidado: action.response.data,
          total: action.response.data.total
        }; 
      
        case "INFORMES_BALANCE":
          return {          
            ...state,
            tventas: action.response.ventas,
            tcompras: action.response.compras,
            tmovimientos: action.response.movimientos,
            tcomisiones: action.response.comisiones,
            tconsolidado: action.response.consolidado
          };       

     case "INFORMES_RESET":
        return {
          ...state,
          libros: [],                    
          consolidado:[],
          movimientos:[],
          pagina: 0,
          paginas: 0,
          total: 0,
          desde:'2021-01-01',
          hasta:'2021-12-01',
          detalle:0,
          tventas: state.initialState,
          tcompras: state.initialState,
          tconsolidado: state.initialState,
          tmovimientos:state.initialState, 
          tcomisiones:state.initialState
        };          
        
      default:
        return state;
    }
  }
  