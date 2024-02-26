import { Types } from "mongoose";
import { Response } from 'express';
import MedicamentoEsquema from "../esquema/MedicamentoEsquema";

class MedicamentoDAO {

    // Crear un Medicamento
    // ************************************************************************************
    protected static async crearMedicamento(nombreMedicamento: any, parametros: any, res: Response): Promise<any> {
        const nom = parametros.nombreImagenMedicamento;
        delete parametros._id;
        delete parametros.datosMedicamento;

        try {
            const existe = await MedicamentoEsquema.findOne({ nombreMedicamento }).exec();

            if (existe) {
                return res.status(400).json({ respuesta: "El medicamento ya existe" });
            }

            const objMedicamento = new MedicamentoEsquema(parametros);
            const savedMedicamento = await objMedicamento.save();

            return res.status(200).json({ id: savedMedicamento._id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ respuesta: 'Error al crear el medicamento' });
        }
    }
    // ************************************************************************************


    // Obtener todos los Medicamentos con toda la información de la categoría incluida
    // ************************************************************************************
    protected static async obtenerMedicamentos(res: Response): Promise<any> {
        MedicamentoEsquema.find().sort({ _id: -1 }).populate("codCategoria")
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************

    // Obtener un solo Medicamento con toda la información de la categoría incluida
    // ************************************************************************************
    protected static async obtenerUnMedicamento(identificador: any, res: Response): Promise<any> {
        const jsonMedicamentoID = { _id: identificador };
        MedicamentoEsquema.findOne(jsonMedicamentoID).populate("codCategoria")
            .exec((miError, objeto) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error en la consulta" });
                } else {
                    res.status(200).json(objeto);
                }
            });
    }
    // ************************************************************************************

    // Cantidad de Medicamentos x categoría dado
    // ************************************************************************************
    protected static async cantidadMedicamentosEnCategoria(identificadorCategoria: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificadorCategoria)) {
            const llave = { _id: identificadorCategoria };
            const cantidad = await MedicamentoEsquema.countDocuments({ codCategoria: llave });
            res.status(200).json({ respuesta: cantidad });
        } else {
            res.status(400).json({ respuesta: "Identificador incorrecto" });
        }
    }
    // ************************************************************************************

    // Obtener todos los Medicamentos con una categoría entregada
    // ************************************************************************************
    protected static async obtenerMedicamentosCategoria(identificador: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificador)) {
            const llave = { _id: identificador };
            MedicamentoEsquema.find({ codCategoria: llave }).sort({ _id: -1 })
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

    // Eliminar Medicamento por identificador
    // ************************************************************************************
    protected static async eliminarMedicamento(identificador: any, res: Response): Promise<any> {
        const existe = await MedicamentoEsquema.findById(identificador).exec();
        if (existe) {
            MedicamentoEsquema.findByIdAndDelete(identificador, (miError: any, objeto: any) => {
                if (miError) {
                    res.status(400).json({ respuesta: "Error al eliminar el Medicamento" });
                } else {
                    res.status(200).json({ eliminado: objeto });
                }
            });
        } else {
            res.status(400).json({ respuesta: "El Medicamento NO existe" });
        }
    }
    // ************************************************************************************

   // Actualizar Medicamento por _id
    // ************************************************************************************
    protected static async actualizarMedicamento(identificador: string, jsonExterno: any, res: Response): Promise<any> {
        try {
            delete jsonExterno._id;
            delete jsonExterno.datosMedicamento;
            delete jsonExterno.claveMedicamento;
            delete jsonExterno.fechaRegistroMedicamento;

            const nom = jsonExterno.nombreImagenMedicamento;
            jsonExterno.nombreImagenMedicamento = nom.substring(nom.lastIndexOf("\\") + 1);

            const existe = await MedicamentoEsquema.findById(identificador).exec();
            if (!existe) {
                return res.status(400).json({ respuesta: "El Medicamento NO existe" });
            }

            const updatedMedicamento = await MedicamentoEsquema.findByIdAndUpdate(
                { _id: identificador },
                { $set: jsonExterno },
                { new: true }
            );

            return res.status(200).json({ antiguo: existe, nuevo: updatedMedicamento });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ respuesta: 'Error al actualizar el Medicamento' });
        }
    }
    // ************************************************************************************
}

export default MedicamentoDAO;
