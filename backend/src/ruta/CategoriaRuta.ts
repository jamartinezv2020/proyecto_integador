import { Router } from "express";
import categoriaControlador from "../controlador/CategoriaControlador";

class CategoriaRuta {

    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.post('/crear', categoriaControlador.crear);
        this.rutaAPI.get('/todos', categoriaControlador.consulta);
        this.rutaAPI.get('/uno/:codigo', categoriaControlador.consultaUno);
        this.rutaAPI.delete('/eliminar/:codigo', categoriaControlador.eliminar);
        this.rutaAPI.put('/actualizar/:codigo', categoriaControlador.actualizar);
    }

};

const categoriaRuta = new CategoriaRuta();
export default categoriaRuta.rutaAPI;
