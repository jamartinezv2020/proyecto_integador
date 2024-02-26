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
const ProductoEsquema_1 = __importDefault(require("../esquema/ProductoEsquema"));
class ProductoDAO {
    // Crear un Producto
    // ************************************************************************************
    static crearProducto(nombreProducto, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nom = parametros.nombreImagenProducto;
            delete parametros._id;
            delete parametros.datosProducto;
            console.log(parametros);
            parametros.nombreImagenProducto = nom.substring(nom.lastIndexOf("\\") + 1);
            const existe = yield ProductoEsquema_1.default.findOne(nombreProducto).exec();
            if (existe) {
                res.status(400).json({ respuesta: "El producto ya existe" });
            }
            else {
                parametros.nombreProducto = parametros.nombreProducto;
                const objProducto = new ProductoEsquema_1.default(parametros);
                objProducto.save((miError, objeto) => {
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al crear el producto' });
                    }
                    else {
                        res.status(200).json({ id: objeto._id });
                    }
                });
            }
        });
    }
    // ************************************************************************************
    // ************************************************************************************
    // Obtener todos los Productos con toda la información del categoria incluída
    // ************************************************************************************
    static obtenerProductos(res) {
        return __awaiter(this, void 0, void 0, function* () {
            ProductoEsquema_1.default.find().sort({ _id: -1 }).populate("codCategoria")
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
    // Obtener un solo Producto con toda la información del categoria incluída
    // ************************************************************************************
    static obtenerUnProducto(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonProductoID = { _id: identificador };
            ProductoEsquema_1.default.findOne(jsonProductoID).populate("codCategoria")
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
    // Cantidad de Productos x categoria dado
    // ************************************************************************************
    static cantidadProductosEnCategoria(identificadorCategoria, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificadorCategoria)) {
                const llave = { _id: identificadorCategoria };
                const cantidad = yield ProductoEsquema_1.default.countDocuments({ codCategoria: llave });
                res.status(200).json({ respuesta: cantidad });
            }
            else {
                res.status(400).json({ respuesta: "Identificador incorrecto" });
            }
        });
    }
    // ************************************************************************************
    // Obtener todos los Productos con un categoria entregado
    // ************************************************************************************
    static obtenerProductosCategoria(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificador)) {
                const llave = { _id: identificador };
                ProductoEsquema_1.default.find({ codCategoria: llave }).sort({ _id: -1 })
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
    // Eliminar Producto por identificador
    // ************************************************************************************
    static eliminarProducto(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const existe = yield ProductoEsquema_1.default.findById(identificador).exec();
            if (existe) {
                ProductoEsquema_1.default.findByIdAndDelete(identificador, (miError, objeto) => {
                    // ProductoEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: "Error al eliminar el Producto" });
                    }
                    else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "El Producto NO existe" });
            }
        });
    }
    // ************************************************************************************
    // actualizar Producto por _id
    // ************************************************************************************
    static actualizarProducto(identificador, jsonExterno, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete jsonExterno._id;
            delete jsonExterno.datosProducto;
            delete jsonExterno.claveProducto;
            delete jsonExterno.fechaRegistroProducto;
            const nom = jsonExterno.nombreImagenProducto;
            jsonExterno.nombreImagenProducto = nom.substring(nom.lastIndexOf("\\") + 1);
            const existe = yield ProductoEsquema_1.default.findById(identificador).exec();
            if (existe) {
                ProductoEsquema_1.default.findByIdAndUpdate({ _id: identificador }, { $set: jsonExterno }, (miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al actualizar el Producto, puede que el codigo esté repetido' });
                    }
                    else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "El Producto NO existe" });
            }
        });
    }
}
exports.default = ProductoDAO;
