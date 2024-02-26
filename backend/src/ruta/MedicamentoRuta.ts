import { Router } from "express";
import medicamentoControlador from "../controlador/MedicamentoControlador";

class MedicamentoRuta {
  public rutaAPI: Router;

  constructor() {
    this.rutaAPI = Router();
    this.configuracion();
  }

  public configuracion(): void {
    this.rutaAPI.post("/crear", medicamentoControlador.crear);
    this.rutaAPI.post("/iniciar", medicamentoControlador.actualizar);

    this.rutaAPI.get("/todos", medicamentoControlador.consulta);
    this.rutaAPI.get("/uno/:codigo", medicamentoControlador.consultaUno);

    this.rutaAPI.get(
      "/todos/:codCategoria",
      medicamentoControlador.consultaXCategoria
    );
    this.rutaAPI.get(
      "/cantxperfil/:codCategoria",
      medicamentoControlador.cantidadEnCategoria
    );

    this.rutaAPI.delete(
      "/eliminar/:codMedicamento",
      medicamentoControlador.eliminar
    );
    this.rutaAPI.put(
      "/actualizar/:codMedicamento",
      medicamentoControlador.actualizar
    );
  }
}

const medicamentoRuta = new MedicamentoRuta();
export default medicamentoRuta.rutaAPI;
