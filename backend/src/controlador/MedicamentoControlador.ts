import { Request, Response } from 'express';
import MedicamentoDAO from '../dao/MedicamentoDAO';

class MedicamentoControlador extends MedicamentoDAO {

    public crear(req: Request, res: Response): void {
        const nombre = { nombreMedicamento: req.body.nombreMedicamento };
        MedicamentoControlador.crearMedicamento(nombre, req.body, res);
    }

    public consulta(req: Request, res: Response): void {
        MedicamentoControlador.obtenerMedicamentos(res);
    }

    public consultaUno(req: Request, res: Response): void {
        MedicamentoControlador.obtenerUnMedicamento(req.params.codigo, res);
    }

    public eliminar(req: Request, res: Response): void {
        MedicamentoControlador.eliminarMedicamento(req.params.codigoMedicamento, res);
    }

    public actualizar(req: Request, res: Response): void {
        MedicamentoControlador.actualizarMedicamento(req.params.codigoMedicamento, req.body, res);
    }

    public cantidadEnCategoria(req: Request, res: Response): void {
        MedicamentoControlador.cantidadMedicamentosEnCategoria(req.params.codCategoria, res);
    }

    public consultaXCategoria(req: Request, res: Response): void {
        MedicamentoControlador.obtenerMedicamentosCategoria(req.params.codCategoria, res);
    }
}

const medicamentoControlador = new MedicamentoControlador();
export default medicamentoControlador;
