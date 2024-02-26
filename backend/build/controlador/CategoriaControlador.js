"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaControlador = void 0;
const CategoriaDAO_1 = __importDefault(require("../dao/CategoriaDAO"));
class CategoriaControlador extends CategoriaDAO_1.default {
    consulta(req, res) {
        CategoriaControlador.obtenerCategorias(res);
    }
    crear(req, res) {
        CategoriaControlador.crearCategoria(req.body, res);
    }
    eliminar(req, res) {
        CategoriaControlador.eliminarCategoria(req.params.codigo, res);
    }
    actualizar(req, res) {
        CategoriaControlador.actualizarCategoria(req.params.codigo, req.body, res);
    }
    consultaUno(req, res) {
        CategoriaControlador.obtenerUnCategoria(req.params.codigo, res);
    }
}
exports.CategoriaControlador = CategoriaControlador;
const categoriaControlador = new CategoriaControlador();
exports.default = categoriaControlador;
