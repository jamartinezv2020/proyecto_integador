"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategoriaEsquema = new mongoose_1.Schema({
    nombreCategoria: { type: String, required: true, unique: true, trim: true },
    estadoCategoria: { type: Number, enum: [1, 2], default: 1 }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Categoria", CategoriaEsquema, "Categoria");
