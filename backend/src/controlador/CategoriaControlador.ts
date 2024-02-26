import CategoriaDAO from '../dao/CategoriaDAO';
import { Request, Response } from 'express';



export class CategoriaControlador extends CategoriaDAO {

    public consulta(req: Request, res: Response): void {
        CategoriaControlador.obtenerCategorias(res);
    }

    public crear(req: Request, res: Response): void {
        CategoriaControlador.crearCategoria(req.body, res);
    }

    public eliminar(req: Request, res: Response): void {
        CategoriaControlador.eliminarCategoria(req.params.codigo, res);
    }

    public actualizar(req: Request, res: Response): void {
        CategoriaControlador.actualizarCategoria(req.params.codigo, req.body, res);
    }

    public consultaUno(req: Request, res: Response): void {
        CategoriaControlador.obtenerUnCategoria(req.params.codigo, res);
    }
}
const categoriaControlador = new CategoriaControlador();
export default categoriaControlador;