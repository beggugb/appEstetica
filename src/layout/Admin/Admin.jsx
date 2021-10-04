import React,{ useEffect, useCallback, useState } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Nav, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { usuarioActions} from "../../actions"
import logo from "../../assets/img/logo.png"
import Inventario from "../../pages/Inventario/Inventario.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import Dashboard from "../../pages/Dashboard/Dashboard.jsx";
import Articulos from "../../pages/Articulos/ArticulosView.jsx";
import Categorias from "../../pages/Categorias/CategoriasView.jsx";
import Marcas from "../../pages/Marcas/MarcasView.jsx";
import Compras from "../../pages/Compras/Compras.jsx";
import Ventas from "../../pages/Ventas/Ventas.jsx";
import Proveedores from "../../pages/Proveedores/ProveedoresView.jsx";
import Clientes from "../../pages/Clientes/ClientesView.jsx";
import Personal from "../../pages/Personal/PersonalView.jsx";
import Servicios from "../../pages/Servicios/ServicioView.jsx";

import Tpv from "../../pages/Tpv/Tpv.jsx"
import Cajas from "../../pages/Cajas/CajasView.jsx"
import Informes from "../../pages/Informes/InformesView.jsx"
import IMovimientos from "../../pages/Informes/MovimientosView.jsx"
import IExistencias from "../../pages/Informes/ExistenciasView.jsx"
import IComisiones from "../../pages/Informes/ComisionesView.jsx"
import IComisionesd from "../../pages/Informes/ComisionesDetalleView.jsx"
import IBalance from "../../pages/Informes/BalanceView.jsx"

import CajasItems from "../../pages/CajasItems/CajasItemsView";

function Admin(){
    const dispatch = useDispatch()
    const [itemr,setItemr] = useState([])    
    const modulos = JSON.parse(localStorage.getItem('@userItems'))
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))    
    const changeModule = useCallback((name, tab, pky) =>{
        let items = [...itemr];
        modulos.map((prop, key)=>{
            let dato = {
                path: prop.path,
                name: prop.name,
                icon: prop.icon,
                component: verificar(prop.component),
                layout: prop.layout
            };
            items.push(dato);
            return null;
        })
        setItemr(items)
    })
    
    const verificar = (component) => {
        switch (component) {
          case "Dashboard":
            return Dashboard;                
          case "Inventario":
            return Inventario;
          case "Compras":
            return Compras;
          case "Clientes":
            return Clientes;
          case "Personal":
            return Personal;  
          case "Tpv":
            return Tpv;
          case "Informes":
            return Informes;
          case "Ventas":
            return Ventas;                      
          default:
            return null;
        }
      };
    
    const getRoutes = (routes) =>{
        return routes.map((prop, key) =>{
            if(prop.layout === '/admin'){
                return(
                    <Route
                       path={prop.layout + prop.path}
                       component={prop.component}
                       key={key} 
                    />
                );
            }else{
                return null;
            }
        })
    };
    
    const logoutt = () => {    
        dispatch(usuarioActions.logout())  
      };
    
    useEffect(() => {        
        changeModule();
        return () => {
         
        };
    }, []);

return(
    <div className="wrapper"> 
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <div className="logo mb-2">
                    <div className="logo-img text-center">
                        <img src={logo} /> 
                    </div>
                </div>
                <div className="username text-white">
                    <p>Usuario: { usuario.nombres } </p>
                    <Button className="btn btn-danger btn-xp" onClick={() => {logoutt()}} >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </Button> 
                </div>
                <div className="content">
                <Nav>
                    <li>
                        <NavLink
                            to="/admin/dashboard"
                            className="nav-link"
                            activeClassName="active"
                        >                        
                            Dashboard                        
                        </NavLink>
                    </li> 
                    {itemr.map((prop, key) => {
                        if (prop.redirect) return null;
                        return (
                            <li key={key}>
                            <NavLink
                                to={prop.layout + prop.path}
                                className="nav-link"
                                activeClassName="active"                                                  
                            > 
                            {prop.name}                    
                            </NavLink>
                            </li>
                        );
                    })} 
                </Nav>  
                </div>       
            </div>
        </div>
        <div className="main-panel" > 
            <div className="nav-unity">                                                                                                     
            <Switch>   
                {getRoutes(itemr)}
                <Route path="/admin/dashboard" component={Dashboard} />
                <Route path="/admin/articulos" component={Articulos} />
                <Route path="/admin/categorias" component={Categorias} />
                <Route path="/admin/marcas" component={Marcas} />
                <Route path="/admin/servicios" component={Servicios} />
                <Route path="/admin/proveedores" component={Proveedores} />
                <Route path="/admin/lcaja" component={Cajas} />
                <Route path="/admin/imovimientos" component={IMovimientos} />
                <Route path="/admin/iexistencias" component={IExistencias} />
                <Route path="/admin/icomisiones" component={IComisiones} />
                <Route path="/admin/dcomisiones" component={IComisionesd} />
                <Route path="/admin/dbalance" component={IBalance} />
                <Route path="/admin/cajasitems/:cajaId" component={CajasItems} />            
            </Switch>        
            </div>
        </div>        
    </div>    
)    

}
export default Admin;
