import { Router } from "express";
import productoControlador from "../controlador/ProductoControlador";

class ProductoRuta {

    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.post('/crear', productoControlador.crear);
        this.rutaAPI.post('/iniciar', productoControlador.actualizar);


        this.rutaAPI.get('/todos', productoControlador.consulta);
        this.rutaAPI.get('/uno/:codigo', productoControlador.consultaUno);

        this.rutaAPI.get('/todos/:codCategoria', productoControlador.consultaXCategoria);
        this.rutaAPI.get('/cantxperfil/:codCategoria', productoControlador.cantidadEnCategoria);

        this.rutaAPI.delete('/eliminar/:codProducto', productoControlador.eliminar);
        this.rutaAPI.put('/actualizar/:codProducto', productoControlador.actualizar);
    }

};

const productoRuta = new ProductoRuta();
export default productoRuta.rutaAPI;

