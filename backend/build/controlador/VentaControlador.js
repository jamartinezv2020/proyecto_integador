"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaControlador = void 0;
const VentaDAO_1 = __importDefault(require("../dao/VentaDAO"));
class VentaControlador extends VentaDAO_1.default {
    crear(req, res) {
        VentaControlador.crearVenta(req.body, res);
    }
    consultarVentas(req, res) {
        VentaControlador.obtenerVentas(res);
    }
    consultaUna(req, res) {
        VentaControlador.obtenerUnaVenta(req.params.codigo, res);
    }
    cantidadVentasProducto(req, res) {
        VentaControlador.cantidadVentasProducto(req.params.codigo, res);
    }
    static cantidadVentasProducto(codigo, res) {
        throw new Error("Method not implemented.");
    }
    consultarVentasProducto(req, res) {
        VentaControlador.obtenerVentasProducto(req.params.codigo, res);
    }
    static obtenerVentasProducto(codigo, res) {
        throw new Error("Method not implemented.");
    }
    eliminar(req, res) {
        VentaControlador.eliminarVenta(req.params.codigo, res);
    }
    actualizar(req, res) {
        VentaControlador.actualizarVenta(req.params.codigo, req.body, res);
    }
}
exports.VentaControlador = VentaControlador;
const ventaControlador = new VentaControlador();
exports.default = ventaControlador;
