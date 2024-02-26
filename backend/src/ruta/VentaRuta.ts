import { Router } from "express";
import ventaControlador from "../controlador/VentaControlador";
export class VentaRuta {
    public rutaAPI: Router;

    constructor() {
        this.rutaAPI = Router();
        this.configuracion();
    }

    public configuracion(): void {
        this.rutaAPI.post("/crear", ventaControlador.crear);
        this.rutaAPI.get("/todos", ventaControlador.consultarVentas);
        this.rutaAPI.get("/una/:codigo", ventaControlador.consultaUna);
        this.rutaAPI.get("/cantVentaproducto/:codigo", ventaControlador.cantidadVentasProducto);
        this.rutaAPI.get("/ventasproducto/:codigo", ventaControlador.consultarVentasProducto);

        this.rutaAPI.delete("/eliminar/:codigo", ventaControlador.eliminar);
        this.rutaAPI.put("/actualizar/:codigo", ventaControlador.actualizar);
    }
}
const ventaRuta = new VentaRuta();
export default ventaRuta.rutaAPI;