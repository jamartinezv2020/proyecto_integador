import { Schema, model } from "mongoose";
import CategoriaEntidad from './../entidades/CategoriaEntidad';

const CategoriaEsquema = new Schema<CategoriaEntidad>({
    nombreCategoria: { type: String, required: true, unique: true, trim: true },
    estadoCategoria: { type: Number, enum: [1, 2], default: 1 }

}, { versionKey: false });

export default model("Categoria", CategoriaEsquema, "Categoria");