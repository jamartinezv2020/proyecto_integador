"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MedicamentoEsquema_1 = __importDefault(require("../esquema/MedicamentoEsquema"));
class MedicamentoDAO {
    // Crear un Medicamento
    // ************************************************************************************
    static crearMedicamento(nombreMedicamento, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nom = parametros.nombreImagenMedicamento;
            delete parametros._id;
            delete parametros.datosMedicamento;
            try {
                const existe = yield MedicamentoEsquema_1.default.findOne({ nombreMedicamento }).exec();
                if (existe) {
                    return res.status(400).json({ respuesta: "El medicamento ya existe" });
                }
                const objMedicamento = new MedicamentoEsquema_1.default(parametros);
                const savedMedicamento = yield objMedicamento.save();
                return res.status(200).json({ id: savedMedicamento._id });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ respuesta: 'Error al crear el medicamento' });
            }
        });
    }
    // ************************************************************************************
    // Obtener todos los Medicamentos con toda la información de la categoría incluida
    // ************************************************************************************
    static obtenerMedicamentos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            MedicamentoEsquema_1.default.find().sort({ _id: -1 }).populate("codCategoria")
                .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                }
                else {
                    res.status(200).json(objeto);
                }
            });
        });
    }
    // ************************************************************************************
    // Obtener un solo Medicamento con toda la información de la categoría incluida
    // ************************************************************************************
    static obtenerUnMedicamento(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonMedicamentoID = { _id: identificador };
            MedicamentoEsquema_1.default.findOne(jsonMedicamentoID).populate("codCategoria")
                .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                }
                else {
                    res.status(200).json(objeto);
                }
            });
        });
    }
    // ************************************************************************************
    // Cantidad de Medicamentos x categoría dado
    // ************************************************************************************
    static cantidadMedicamentosEnCategoria(identificadorCategoria, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificadorCategoria)) {
                const llave = { _id: identificadorCategoria };
                const cantidad = yield MedicamentoEsquema_1.default.countDocuments({ codCategoria: llave });
                res.status(200).json({ respuesta: cantidad });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Obtener todos los Medicamentos con una categoría entregada
    // ************************************************************************************
    static obtenerMedicamentosCategoria(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificador)) {
                const llave = { _id: identificador };
                MedicamentoEsquema_1.default.find({ codCategoria: llave }).sort({ _id: -1 })
                    .populate({ path: "codCategoria", select: "nombreCategoria" })
                    .exec((miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error en la consulta" });
                    }
                    else {
                        res.status(200).json(objeto);
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Eliminar Medicamento por identificador
    // ************************************************************************************
    static eliminarMedicamento(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield MedicamentoEsquema_1.default.findById(identificador).exec();
            if (existe) {
                MedicamentoEsquema_1.default.findByIdAndDelete(identificador, (miError, objeto) => {
                    if (miError) {
                        res.status(400).json({ respuesta: "Error al eliminar el Medicamento" });
                    }
                    else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "El Medicamento NO existe" });
            }
        });
    }
    // ************************************************************************************
    // Actualizar Medicamento por _id
    // ************************************************************************************
    static actualizarMedicamento(identificador, jsonExterno, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                delete jsonExterno._id;
                delete jsonExterno.datosMedicamento;
                delete jsonExterno.claveMedicamento;
                delete jsonExterno.fechaRegistroMedicamento;
                const nom = jsonExterno.nombreImagenMedicamento;
                jsonExterno.nombreImagenMedicamento = nom.substring(nom.lastIndexOf("\\") + 1);
                const existe = yield MedicamentoEsquema_1.default.findById(identificador).exec();
                if (!existe) {
                    return res.status(400).json({ respuesta: "El Medicamento NO existe" });
                }
                const updatedMedicamento = yield MedicamentoEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: jsonExterno }, { new: true });
                return res.status(200).json({ antiguo: existe, nuevo: updatedMedicamento });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ respuesta: 'Error al actualizar el Medicamento' });
            }
        });
    }
}
exports.default = MedicamentoDAO;
