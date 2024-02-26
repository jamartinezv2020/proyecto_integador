import { Types } from "mongoose";
import { Response } from 'express';

import cifrar from "bcryptjs";
import VentaEsquema from "../esquema/VentaEsquema";
import UsuarioEsquema from "../esquema/UsuarioEsquema";
import ProductoEsquema from "../esquema/ProductoEsquema";

class VentaDAO {

    // Crear Venta
    // ************************************************************************************
    protected static async crearVenta(parametros: any, res: Response): Promise<any> {
        delete parametros._id;
        delete parametros.datosUsuario;
        console.log(parametros);
        const objVenta = new VentaEsquema(parametros);
        objVenta.save((miError, objeto) => {
            if (miError) {
                res.status(400).json({ respuesta: "Error al crear la Venta" });
            } else {
                res.status(200).json({ id: objeto._id });
            }
        });
    }
    // ************************************************************************************


    // Obtener todas las Ventas con alguna información del vendedor y el comprador
    // ************************************************************************************
    protected static async obtenerVentas(res: Response): Promise<any> {
        VentaEsquema.find().sort({ fechaVenta: 1 })
            .populate({ path: "codVendedor", select: "nombreUsuario correoUsuario" })
            .populate({ path: "codComprador", select: "nombreUsuario correoUsuario" })
            .populate({ path: "codProducto", select: "nombreProducto precio" })
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Obtener una Venta con toda la información del médico y el Comprador
    // ************************************************************************************
    protected static async obtenerUnaVenta(identificador: any, res: Response): Promise<any> {
        const jsonVentaID = { _id: identificador };
        VentaEsquema.findOne(jsonVentaID)
            .populate({ path: "codVendedor", select: "nombreUsuario, correoUsuario" })
            .populate({ path: "codComprador", select: "nombreUsuario, correoUsuario" })
            .populate({ path: "codProducto", select: "nombreProducto precio" })
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************


    // Cantidad de Ventas x el id de un médico
    // ************************************************************************************
    protected static async cantidadVentasVendedor(idVendedor: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(idVendedor)) {
            const llave = { _id: idVendedor };
            const cantidad = await VentaEsquema.countDocuments({ codVendedor: llave });
            res.status(200).json({ respuesta: cantidad });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************


    // Obtener todas las Ventas con información del Comprador para un médico específico
    // ************************************************************************************
    protected static async obtenerVentasVendedor(idVendedor: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(idVendedor)) {
            const llave = { _id: idVendedor };
            VentaEsquema.find({ codVendedor: llave }).sort({ _id: -1 })
                .populate({ path: "codComprador", select: "nombreUsuario, correoUsuario" })
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


    // Eliminar usuario por identificador
    // ************************************************************************************
    protected static async eliminarVenta(identificador: any, res: Response): Promise<any> {
        const existe = await VentaEsquema.findById(identificador).exec();
        if (existe) {
            VentaEsquema.findByIdAndDelete(identificador, (miError: any, objeto: any) => {
                // UsuarioEsquema.deleteOne({ _id: identificador }, (miError: any, objeto: any) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al eliminar la Venta" });
                } else {
                    res.status(200).json({ eliminado: objeto });
                }
            });
        } else {
            res.status(400).json({ respuesta: "La Venta NO existe" });
        }
    }
    // ************************************************************************************


    // actualizar usuario por _id
    // ************************************************************************************
    protected static async actualizarVenta(identificador: string, jsonExterno: any, res: Response): Promise<any> {
        delete jsonExterno._id;
        delete jsonExterno.datosVenta;

        const existe = await VentaEsquema.findById(identificador).exec();
        if (existe) {
            VentaEsquema.findByIdAndUpdate(
                { _id: identificador },
                { $set: jsonExterno },
                (miError: any, objeto: any) => {
                    if (miError) {
                        console.log(miError);
                        res.status(400).json({ respuesta: "Error al actualizar la Venta, verificar la información" });
                    } else {
                        res.status(200).json({ antiguo: objeto, nuevo: jsonExterno });
                    }
                });
        } else {
            res.status(400).json({ respuesta: "La Venta NO existe" });
        }
    }
    // ************************************************************************************

}

export default VentaDAO;