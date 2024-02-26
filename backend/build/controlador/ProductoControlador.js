"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductoDAO_1 = __importDefault(require("../dao/ProductoDAO"));
class ProductoControlador extends ProductoDAO_1.default {
    crear(req, res) {
        const nombre = { nombreProducto: req.body.nombreProducto };
        ProductoControlador.crearProducto(nombre, req.body, res);
    }
    consulta(req, res) {
        ProductoControlador.obtenerProductos(res);
    }
    consultaUno(req, res) {
        ProductoControlador.obtenerUnProducto(req.params.codigo, res);
    }
    eliminar(req, res) {
        ProductoControlador.eliminarProducto(req.params.codigoProducto, res);
    }
    actualizar(req, res) {
        ProductoControlador.actualizarProducto(req.params.codigoProducto, req.body, res);
    }
    cantidadEnCategoria(req, res) {
        ProductoControlador.cantidadProductosEnCategoria(req.params.codCategoria, res);
    }
    consultaXCategoria(req, res) {
        ProductoControlador.obtenerProductosCategoria(req.params.codCategoria, res);
    }
}
const productoControlador = new ProductoControlador();
exports.default = productoControlador;
