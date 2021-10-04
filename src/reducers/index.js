import { combineReducers } from "redux";
import { reducer as toastrReducer } from 'react-redux-toastr';
import { usuarios } from "./usuarios.reducers";
import { articulos } from "./articulos.reducers";
import { categorias } from "./categorias.reducers";
import { marcas } from "./marcas.reducers";
import { proveedores } from "./proveedores.reducers";
import { compras } from "./compras.reducers";
import { clientes } from "./clientes.reducers";
import { ventas } from "./ventas.reducers";
import { empresas } from "./empresas.reducers";
import { informes } from "./informes.reducers";
import { cajasitems } from "./cajasitems.reducers";
import { cajas } from "./cajas.reducers";
import { almacenes } from "./almacenes.reducers";
import { personas } from "./personas.reducers";
import { servicios } from "./servicios.reducers";

const rootReducer = combineReducers({
    usuarios,
    servicios,
    personas,
    informes,
    articulos,
    almacenes,
    cajas,
    cajasitems,
    categorias,
    clientes,
    empresas,
    marcas,
    proveedores,
    ventas,
    compras,
    toastr: toastrReducer
});

export default rootReducer;