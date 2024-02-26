"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoriaControlador_1 = __importDefault(require("../controlador/CategoriaControlador"));
class CategoriaRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post('/crear', CategoriaControlador_1.default.crear);
        this.rutaAPI.get('/todos', CategoriaControlador_1.default.consulta);
        this.rutaAPI.get('/uno/:codigo', CategoriaControlador_1.default.consultaUno);
        this.rutaAPI.delete('/eliminar/:codigo', CategoriaControlador_1.default.eliminar);
        this.rutaAPI.put('/actualizar/:codigo', CategoriaControlador_1.default.actualizar);
    }
}
;
const categoriaRuta = new CategoriaRuta();
exports.default = categoriaRuta.rutaAPI;
