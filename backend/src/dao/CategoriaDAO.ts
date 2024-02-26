import { Response } from 'express';
import CategoriaEsquema from "../esquema/CategoriaEsquema";
import ProductoEsquema from '../esquema/ProductoEsquema';

class CategoriaDAO {

    // Consultar los datos de un perfil por un código específico
    // ************************************************************************************
    protected static async obtenerUnCategoria(identificador: any, res: Response): Promise<any> {
        const jsonCategoria = { _id: identificador };
        const existeCategoria = await CategoriaEsquema.findOne(jsonCategoria).exec();
        if (existeCategoria) {
            res.status(200).json(existeCategoria);
        } else {
            res.status(400).json({ respuesta: "La categoria NO existe con ese identificador" });
        }
    }
    // ************************************************************************************


    // Obtener categorias con orden y contando la cantidas de Producto que tiene el perfil
    // ************************************************************************************
    protected static async obtenerCategorias(res: Response): Promise<any> {
        const datos = await CategoriaEsquema.aggregate([
            { $lookup: { from: "Producto", localField: "_id", foreignField: "codCategoria", as: "cantProductos" } },
            { $addFields: { cantProductos: { $size: "$cantProductos" } } }
        ]).sort({ _id: 1 });
        res.status(200).json(datos);
    }
    // ************************************************************************************


    // Crear perfil verificando su existencia
    // ************************************************************************************
    protected static async crearCategoria(parametros: any, res: Response): Promise<any> {
        delete parametros._id;
        delete parametros.datosProducto;
        console.log(parametros);
        const existe = await CategoriaEsquema.findOne(parametros);
        // const existe = await PerfilEsquema.findOne({ nombrePerfil: 
        // { $regex: parametros.nombrePerfil, $options: 'i' } });

        if (existe) {
            res.status(400).json({ respuesta: "El la categoria ya existe" });
        } else {
            const objPerfil = new CategoriaEsquema(parametros);
            objPerfil.save((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: 'Error al crear la Categoria' });
                } else {
                    res.status(200).json({ id: objeto._id });
                }
            });
        }
    }
    // ************************************************************************************


    // Eliminar perfil por código, verificando antes que no tenga Productos asociados
    // ************************************************************************************
    protected static async eliminarCategoria(parametro: any, res: Response): Promise<any> {
        const llave = { _id: parametro };
        const cantidad = await ProductoEsquema.countDocuments({ codCategoria: llave });
        if (cantidad > 0) {
            res.status(400).json({ respuesta: 'Error, la categoria tiene productos relacionados' });
        } else {
            const existe = await CategoriaEsquema.findById(parametro).exec();
            if (existe) {
                CategoriaEsquema.deleteOne({ _id: parametro }, (miError: any, objeto: any) => {
                    //PerfilEsquema.findByIdAndDelete(parametro, (miError: any, objeto: any) => {
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al eliminar la Categoría' });
                    } else {
                        res.status(200).json({ eliminado: objeto });
                    }
                });
            } else {
                res.status(400).json({ respuesta: "La Categoría NO existe" });
            }
        }
    }
    // ************************************************************************************


    // Actualizar perfil por código y con body JSON
    // ************************************************************************************
    protected static async actualizarCategoria(codigo: string, parametros: any, res: Response): Promise<any> {
        delete parametros._id;
        delete parametros.datosProducto;

        const existe = await CategoriaEsquema.findById(codigo).exec();
        if (existe) {
            CategoriaEsquema.findByIdAndUpdate(
                { _id: codigo },
                { $set: parametros },
                (miError: any, objeto: any) => {
                    console.log(miError);
                    console.log(objeto);
                    if (miError) {
                        res.status(400).json({ respuesta: 'Error al actualizar la categoria' });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: parametros });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "La categoria NO existe" });
        }
    }
    // ************************************************************************************

};

export default CategoriaDAO;