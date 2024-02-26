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
const VentaEsquema_1 = __importDefault(require("../esquema/VentaEsquema"));
class VentaDAO {
    // Crear Venta
    // ************************************************************************************
    static crearVenta(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosUsuario;
            console.log(parametros);
            const objVenta = new VentaEsquema_1.default(parametros);
            objVenta.save((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al crear la Venta" });
                }
                else {
                    res.status(200).json({ id: objeto._id });
                }
            });
        });
    }
    // ************************************************************************************
    // Obtener todas las Ventas con alguna información del vendedor y el comprador
    // ************************************************************************************
    static obtenerVentas(res) {
        return __awaiter(this, void 0, void 0, function* () {
            VentaEsquema_1.default.find().sort({ fechaVenta: 1 })
                .populate({ path: "codVendedor", select: "nombreUsuario correoUsuario" })
                .populate({ path: "codComprador", select: "nombreUsuario correoUsuario" })
                .populate({ path: "codProducto", select: "nombreProducto precio" })
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
    // Obtener una Venta con toda la información del médico y el Comprador
    // ************************************************************************************
    static obtenerUnaVenta(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonVentaID = { _id: identificador };
            VentaEsquema_1.default.findOne(jsonVentaID)
                .populate({ path: "codVendedor", select: "nombreUsuario, correoUsuario" })
                .populate({ path: "codComprador", select: "nombreUsuario, correoUsuario" })
                .populate({ path: "codProducto", select: "nombreProducto precio" })
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
    // Cantidad de Ventas x el id de un médico
    // ************************************************************************************
    static cantidadVentasVendedor(idVendedor, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(idVendedor)) {
                const llave = { _id: idVendedor };
                const cantidad = yield VentaEsquema_1.default.countDocuments({ codVendedor: llave });
                res.status(200).json({ respuesta: cantidad });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Obtener todas las Ventas con información del Comprador para un médico específico
    // ************************************************************************************
    static obtenerVentasVendedor(idVendedor, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(idVendedor)) {
                const llave = { _id: idVendedor };
                VentaEsquema_1.default.find({ codVendedor: llave }).sort({ _id: -1 })
                    .populate({ path: "codComprador", select: "nombreUsuario, correoUsuario" })
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
    // Eliminar usuario por identificador
    // ************************************************************************************
    static eliminarVenta(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield VentaEsquema_1.default.findById(identificador).exec();
            if (existe) {
                VentaEsquema_1.default.findByIdAndDelete(identificador, (miError, objeto) => {
                    // UsuarioEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: "Error al eliminar la Venta" });
                    }
                    else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "La Venta NO existe" });
            }
        });
    }
    // ************************************************************************************
    // actualizar usuario por _id
    // ************************************************************************************
    static actualizarVenta(identificador, jsonExterno, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete jsonExterno._id;
            delete jsonExterno.datosVenta;
            const existe = yield VentaEsquema_1.default.findById(identificador).exec();
            if (existe) {
                VentaEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: jsonExterno }, (miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error al actualizar la Venta, verificar la información" });
                    }
                    else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "La Venta NO existe" });
            }
        });
    }
}
exports.default = VentaDAO;
