"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductoControlador_1 = __importDefault(require("../controlador/ProductoControlador"));
class ProductoRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post('/crear', ProductoControlador_1.default.crear);
        this.rutaAPI.post('/iniciar', ProductoControlador_1.default.actualizar);
        this.rutaAPI.get('/todos', ProductoControlador_1.default.consulta);
        this.rutaAPI.get('/uno/:codigo', ProductoControlador_1.default.consultaUno);
        this.rutaAPI.get('/todos/:codCategoria', ProductoControlador_1.default.consultaXCategoria);
        this.rutaAPI.get('/cantxperfil/:codCategoria', ProductoControlador_1.default.cantidadEnCategoria);
        this.rutaAPI.delete('/eliminar/:codProducto', ProductoControlador_1.default.eliminar);
        this.rutaAPI.put('/actualizar/:codProducto', ProductoControlador_1.default.actualizar);
    }
}
;
const productoRuta = new ProductoRuta();
exports.default = productoRuta.rutaAPI;
