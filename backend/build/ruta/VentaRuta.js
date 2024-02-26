"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaRuta = void 0;
const express_1 = require("express");
const VentaControlador_1 = __importDefault(require("../controlador/VentaControlador"));
class VentaRuta {
    constructor() {
        this.rutaAPI = (0, express_1.Router)();
        this.configuracion();
    }
    configuracion() {
        this.rutaAPI.post("/crear", VentaControlador_1.default.crear);
        this.rutaAPI.get("/todos", VentaControlador_1.default.consultarVentas);
        this.rutaAPI.get("/una/:codigo", VentaControlador_1.default.consultaUna);
        this.rutaAPI.get("/cantVentaproducto/:codigo", VentaControlador_1.default.cantidadVentasProducto);
        this.rutaAPI.get("/ventasproducto/:codigo", VentaControlador_1.default.consultarVentasProducto);
        this.rutaAPI.delete("/eliminar/:codigo", VentaControlador_1.default.eliminar);
        this.rutaAPI.put("/actualizar/:codigo", VentaControlador_1.default.actualizar);
    }
}
exports.VentaRuta = VentaRuta;
const ventaRuta = new VentaRuta();
exports.default = ventaRuta.rutaAPI;
