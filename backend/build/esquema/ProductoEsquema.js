"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductoEsquema = new mongoose_1.Schema({
    nombreProducto: { type: String, unique: true, required: true },
    descripcion: { type: String, required: false, default: "Nos compretimos con la calidad" },
    unidad: { type: String, required: false, default: "Unidad" },
    frasePromocional: { type: String, required: false, default: "Nos compretimos con la calidad" },
    promocion: { type: Number, enum: [1, 2], default: 1 },
    fechaRegistroProducto: { type: Date, default: Date.now() },
    precio: { type: Number, required: true },
    estadoProducto: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    nombreImagenProducto: { type: String, default: "noAvatar.png" },
    avatarProducto: { type: String, default: "noAvatar" },
    codCategoria: { type: mongoose_1.Types.ObjectId, ref: "Categoria", required: true },
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Producto", ProductoEsquema, "Producto");
