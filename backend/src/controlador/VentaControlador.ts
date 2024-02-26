import VentaDAO from "../dao/VentaDAO";
import { Request, Response } from "express";

export class VentaControlador extends VentaDAO {

    public crear(req: Request, res: Response): void {
        VentaControlador.crearVenta(req.body, res);
    }

    public consultarVentas(req: Request, res: Response): void {
        VentaControlador.obtenerVentas(res);
    }

    public consultaUna(req: Request, res: Response): void {
        VentaControlador.obtenerUnaVenta(req.params.codigo, res);
    }

    public cantidadVentasProducto(req: Request, res: Response): void {
        VentaControlador.cantidadVentasProducto(req.params.codigo, res);
    }
    static cantidadVentasProducto(codigo: string, res: Response<any, Record<string, any>>) {
        throw new Error("Method not implemented.");
    }

    public consultarVentasProducto(req: Request, res: Response): void {
        VentaControlador.obtenerVentasProducto(req.params.codigo, res);
    }
    static obtenerVentasProducto(codigo: string, res: Response<any, Record<string, any>>) {
        throw new Error("Method not implemented.");
    }

    public eliminar(req: Request, res: Response): void {
        VentaControlador.eliminarVenta(req.params.codigo, res);
    }

    public actualizar(req: Request, res: Response): void {
        VentaControlador.actualizarVenta(req.params.codigo, req.body, res);
    }
}
const ventaControlador = new VentaControlador();
export default ventaControlador;
