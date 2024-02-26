"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VentaEsquema = new mongoose_1.Schema({
    codVendedor: { type: mongoose_1.Types.ObjectId, ref: "Usuario", required: true },
    codComprador: { type: mongoose_1.Types.ObjectId, ref: "Usuario", required: true },
    fechaVenta: { type: Date, default: Date.now() },
    estadoVenta: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    codProducto: { type: mongoose_1.Types.ObjectId, ref: "Producto", required: true },
    cantidad: { type: Number, default: 1 }
}, { versionKey: false });
exports.default = (0, mongoose_1.model)("Venta", VentaEsquema, "Venta");
