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
const CategoriaEsquema_1 = __importDefault(require("../esquema/CategoriaEsquema"));
const ProductoEsquema_1 = __importDefault(require("../esquema/ProductoEsquema"));
class CategoriaDAO {
    // Consultar los datos de un perfil por un código específico
    // ************************************************************************************
    static obtenerUnCategoria(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonCategoria = { _id: identificador };
            const existeCategoria = yield CategoriaEsquema_1.default.findOne(jsonCategoria).exec();
            if (existeCategoria) {
                res.status(200).json(existeCategoria);
            }
            else {
                res.status(400).json({ respuesta: "La categoria NO existe con ese identificador" });
            }
        });
    }
    // ************************************************************************************
    // Obtener categorias con orden y contando la cantidas de Producto que tiene el perfil
    // ************************************************************************************
    static obtenerCategorias(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = yield CategoriaEsquema_1.default.aggregate([
                { $lookup: { from: "Producto", localField: "_id", foreignField: "codCategoria", as: "cantProductos" } },
                { $addFields: { cantProductos: { $size: "$cantProductos" } } }
            ]).sort({ _id: 1 });
            res.status(200).json(datos);
        });
    }
    // ************************************************************************************
    // Crear perfil verificando su existencia
    // ************************************************************************************
    static crearCategoria(parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosProducto;
            console.log(parametros);
            const existe = yield CategoriaEsquema_1.default.findOne(parametros);
            // const existe = await PerfilEsquema.findOne({ nombrePerfil: 
            // { $regex: parametros.nombrePerfil, $options: 'i' } });
            if (existe) {
                res.status(400).json({ respuesta: "El la categoria ya existe" });
            }
            else {
                const objPerfil = new CategoriaEsquema_1.default(parametros);
                objPerfil.save((miError, objeto) => {
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al crear la Categoria' });
                    }
                    else {
                        res.status(200).json({ id: objeto._id });
                    }
                });
            }
        });
    }
    // ************************************************************************************
    // Eliminar perfil por código, verificando antes que no tenga Productos asociados
    // ************************************************************************************
    static eliminarCategoria(parametro, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const llave = { _id: parametro };
            const cantidad = yield ProductoEsquema_1.default.countDocuments({ codCategoria: llave });
            if (cantidad > 0) {
                res.status(400).json({ respuesta: 'Error, la categoria tiene productos relacionados' });
            }
            else {
                const existe = yield CategoriaEsquema_1.default.findById(parametro).exec();
                if (existe) {
                    CategoriaEsquema_1.default.deleteOne({ _id: parametro }, (miError, objeto) => {
                        //PerfilEsquema.findByIdAndDelete(parametro, (miError: any, objeto: any) => {
                        if (miError) {
                            res.status(400).json({ respuesta: 'Error al eliminar la Categoría' });
                        }
                        else {
                            res.status(200).json({ eliminado: objeto });
                        }
                    });
                }
                else {
                    res.status(400).json({ respuesta: "La Categoría NO existe" });
                }
            }
        });
    }
    // ************************************************************************************
    // Actualizar perfil por código y con body JSON
    // ************************************************************************************
    static actualizarCategoria(codigo, parametros, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete parametros._id;
            delete parametros.datosProducto;
            const existe = yield CategoriaEsquema_1.default.findById(codigo).exec();
            if (existe) {
                CategoriaEsquema_1.default.findByIdAndUpdate({ _id: codigo }, { $set: parametros }, (miError, objeto) => {
                    console.log(miError);
                    console.log(objeto);
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al actualizar la categoria' });
                    }
                    else {
                        res.status(200).json({ antiguo: objeto, nuevo: parametros });
                    }
                });
            }
            else {
                res.status(400).json({ respuesta: "La categoria NO existe" });
            }
        });
    }
}
;
exports.default = CategoriaDAO;
