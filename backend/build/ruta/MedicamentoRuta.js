"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MedicamentoControlador_1 = __importDefault(require("../controlador/MedicamentoControlador"));
class MedicamentoRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post("/crear", MedicamentoControlador_1.default.crear);
        this.rutaAPI.post("/iniciar", MedicamentoControlador_1.default.actualizar);
        this.rutaAPI.get("/todos", MedicamentoControlador_1.default.consulta);
        this.rutaAPI.get("/uno/:codigo", MedicamentoControlador_1.default.consultaUno);
        this.rutaAPI.get("/todos/:codCategoria", MedicamentoControlador_1.default.consultaXCategoria);
        this.rutaAPI.get("/cantxperfil/:codCategoria", MedicamentoControlador_1.default.cantidadEnCategoria);
        this.rutaAPI.delete("/eliminar/:codMedicamento", MedicamentoControlador_1.default.eliminar);
        this.rutaAPI.put("/actualizar/:codMedicamento", MedicamentoControlador_1.default.actualizar);
    }
}
const medicamentoRuta = new MedicamentoRuta();
exports.default = medicamentoRuta.rutaAPI;
