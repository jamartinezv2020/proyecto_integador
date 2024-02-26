import { Schema, model, Types } from "mongoose";
import ProductoEntidad from "../entidades/ProductoEntidad";

const ProductoEsquema = new Schema<ProductoEntidad>({
    nombreProducto: { type: String, unique: true, required: true},
    descripcion: { type: String, required: false, default: "Nos compretimos con la calidad"},
    unidad: { type: String, required: false, default: "Unidad" },
    frasePromocional: { type: String, required: false, default: "Nos compretimos con la calidad"},
    promocion: { type: Number, enum: [1, 2], default: 1  },
    fechaRegistroProducto: { type: Date, default: Date.now() },
    precio: { type: Number, required: true },
    estadoProducto: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    nombreImagenProducto: { type: String, default: "noAvatar.png" },
    avatarProducto: { type: String, default: "noAvatar" },
    codCategoria: { type: Types.ObjectId, ref: "Categoria", required: true },

}, { versionKey: false });

export default model("Producto", ProductoEsquema, "Producto");