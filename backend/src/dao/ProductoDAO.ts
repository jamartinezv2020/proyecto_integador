import { Types } from "mongoose";
import { Response } from 'express';
import ProductoEsquema from "../esquema/ProductoEsquema";

class ProductoDAO {

    // Crear un Producto
    // ************************************************************************************
    protected static async crearProducto(nombreProducto: any, parametros: any, res: Response): Promise<any> {
        const nom = parametros.nombreImagenProducto;
        delete parametros._id;
        delete parametros.datosProducto;
        console.log(parametros);
        parametros.nombreImagenProducto = nom.substring(nom.lastIndexOf("\\") + 1);
        const existe = await ProductoEsquema.findOne(nombreProducto).exec();
        if (existe) {
            res.status(400).json({ respuesta: "El producto ya existe" });
        } else {
            parametros.nombreProducto = parametros.nombreProducto;
            const objProducto = new ProductoEsquema(parametros);
            objProducto.save((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: 'Error al crear el producto' });
                } else {
                    res.status(200).json({ id: objeto._id });
                }
            });
        }
    }
       
    // ************************************************************************************

    // ************************************************************************************


    // Obtener todos los Productos con toda la información del categoria incluída
    // ************************************************************************************
    protected static async obtenerProductos(res: Response): Promise<any> {
        ProductoEsquema.find().sort({ _id: -1 }).populate("codCategoria")
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Obtener un solo Producto con toda la información del categoria incluída
    // ************************************************************************************
    protected static async obtenerUnProducto(identificador: any, res: Response): Promise<any> {
        const jsonProductoID = { _id: identificador };
        ProductoEsquema.findOne(jsonProductoID) .populate("codCategoria")
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Cantidad de Productos x categoria dado
    // ************************************************************************************
    protected static async cantidadProductosEnCategoria(identificadorCategoria: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificadorCategoria)) {
            const llave = { _id: identificadorCategoria };
            const cantidad = await ProductoEsquema.countDocuments({ codCategoria: llave });
            res.status(200).json({ respuesta: cantidad });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Obtener todos los Productos con un categoria entregado
    // ************************************************************************************
    protected static async obtenerProductosCategoria(identificador: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificador)) {
            const llave = { _id: identificador };
            ProductoEsquema.find({ codCategoria: llave }).sort({ _id: -1 })
                .populate({ path: "codCategoria", select: "nombreCategoria" })
                .exec((miError, objeto) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error en la consulta" });
                    } else {
                        res.status(200).json(objeto);
                    }
                });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Eliminar Producto por identificador
    // ************************************************************************************
    protected static async eliminarProducto(identificador: any, res: Response): Promise<any> {
        const existe = await ProductoEsquema.findById(identificador).exec();
        if (existe) {
            ProductoEsquema.findByIdAndDelete(identificador, (miError: any, objeto: any) => {
                // ProductoEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al eliminar el Producto" });
                } else {
                    res.status(200).json({ eliminado: objeto });
                }
            });
        } else {
            res.status(400).json({ respuesta: "El Producto NO existe" });
        }
    }
    // ************************************************************************************


    // actualizar Producto por _id
    // ************************************************************************************
    protected static async actualizarProducto(identificador: string, jsonExterno: any, res: Response): Promise<any> {
        delete jsonExterno._id;
        delete jsonExterno.datosProducto;
        delete jsonExterno.claveProducto;
        delete jsonExterno.fechaRegistroProducto;

        const nom = jsonExterno.nombreImagenProducto;
        jsonExterno.nombreImagenProducto = nom.substring(nom.lastIndexOf("\\") + 1);
        
        const existe = await ProductoEsquema.findById(identificador).exec();
        if (existe) {
            ProductoEsquema.findByIdAndUpdate(
                { _id: identificador },
                { $set: jsonExterno },
                (miError: any, objeto: any) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: 'Error al actualizar el Producto, puede que el codigo esté repetido' });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "El Producto NO existe" });
        }
    }
    // ************************************************************************************

}

export default ProductoDAO;