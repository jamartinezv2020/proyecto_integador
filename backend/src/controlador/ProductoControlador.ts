import { Request, Response } from 'express';
import ProductoDAO from '../dao/ProductoDAO';

class ProductoControlador extends ProductoDAO {

    public crear(req: Request, res: Response): void {
        const nombre = { nombreProducto: req.body.nombreProducto };
        ProductoControlador.crearProducto(nombre, req.body, res);
    }

    public consulta(req: Request, res: Response): void {
        ProductoControlador.obtenerProductos(res);
    }

    public consultaUno(req: Request, res: Response): void {
        ProductoControlador.obtenerUnProducto(req.params.codigo, res);
    }

    public eliminar(req: Request, res: Response): void {
        ProductoControlador.eliminarProducto(req.params.codigoProducto, res);
    }

    public actualizar(req: Request, res: Response): void {
        ProductoControlador.actualizarProducto(req.params.codigoProducto, req.body, res);
    }

    public cantidadEnCategoria(req: Request, res: Response): void {
        ProductoControlador.cantidadProductosEnCategoria(req.params.codCategoria, res);
    }

    public consultaXCategoria(req: Request, res: Response): void {
        ProductoControlador.obtenerProductosCategoria(req.params.codCategoria, res);
    }
}
const productoControlador = new ProductoControlador();
export default productoControlador;