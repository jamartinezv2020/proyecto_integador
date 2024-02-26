import { Schema, model, Types } from "mongoose";
import VentaEntidad from "../entidades/VentaEntidad";

const VentaEsquema = new Schema<VentaEntidad>({
    codVendedor: { type: Types.ObjectId, ref: "Usuario", required: true },
    codComprador: { type: Types.ObjectId, ref: "Usuario", required: true },
    fechaVenta: { type: Date, default: Date.now() },
    estadoVenta: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    codProducto: { type: Types.ObjectId, ref: "Producto", required: true },
    cantidad: { type: Number, default: 1 }
}, { versionKey: false });

export default model("Venta", VentaEsquema, "Venta");