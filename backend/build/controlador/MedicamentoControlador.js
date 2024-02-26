"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MedicamentoDAO_1 = __importDefault(require("../dao/MedicamentoDAO"));
class MedicamentoControlador extends MedicamentoDAO_1.default {
    crear(req, res) {
        const nombre = { nombreMedicamento: req.body.nombreMedicamento };
        MedicamentoControlador.crearMedicamento(nombre, req.body, res);
    }
    consulta(req, res) {
        MedicamentoControlador.obtenerMedicamentos(res);
    }
    consultaUno(req, res) {
        MedicamentoControlador.obtenerUnMedicamento(req.params.codigo, res);
    }
    eliminar(req, res) {
        MedicamentoControlador.eliminarMedicamento(req.params.codigoMedicamento, res);
    }
    actualizar(req, res) {
        MedicamentoControlador.actualizarMedicamento(req.params.codigoMedicamento, req.body, res);
    }
    cantidadEnCategoria(req, res) {
        MedicamentoControlador.cantidadMedicamentosEnCategoria(req.params.codCategoria, res);
    }
    consultaXCategoria(req, res) {
        MedicamentoControlador.obtenerMedicamentosCategoria(req.params.codCategoria, res);
    }
}
const medicamentoControlador = new MedicamentoControlador();
exports.default = medicamentoControlador;
