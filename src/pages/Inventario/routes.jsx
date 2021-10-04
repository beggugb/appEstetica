import Inventario2 from "./Inventario2";
import Inventario3 from "./Inventario3";



var routes = [
  {
    path: "/inventario2",
    name: "INventario2",        
    component: Inventario2,
    layout: "/admin"
  },
  {
    path: "/inventario3",
    name: "INventario3",        
    component: Inventario3,
    layout: "/admin"
  }
];
export default routes;