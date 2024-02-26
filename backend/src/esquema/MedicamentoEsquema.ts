import { Schema, model, Types } from "mongoose";
import MedicamentoEntidad from './../entidades/MedicamentoEntidad';

const MedicamentoEsquema = new Schema({
  idMedicamento: { type: String, unique: true, required: true, default: "" },
  nombreMedicamento: { type: String, unique: true, required: true },
  descripcion: { type: String, required: false, default: "Nos comprometemos con la calidad" },
  unidad: { type: String, required: false, default: "Unidad" },
  frasePromocional: { type: String, required: false, default: "Nos comprometemos con la calidad" },
  promocion: { type: Number, enum: [1, 2], default: 1 },
  fechaRegistroMedicamento: { type: Date, default: Date.now() },
  precio: { type: Number, required: true },
  estadoMedicamento: { type: Number, enum: [1, 2, 3, 4], default: 1 },
  nombreImagenMedicamento: { type: String, default: "noAvatar.png" },
  avatarMedicamento: { type: String, default: "noAvatar" },
  codCategoria: { type: Types.ObjectId, ref: "CategoriaEntidad", required: true },

  // Nuevos campos para el medicamento
  dosisSugeridaPorKg: { type: Number, required: false, default: 0 },
  modoSuministro: { type: String, required: false, default: "" },
  contraindicaciones: { type: String, required: false, default: "" },
  composicion: { type: String, required: false, default: "" },
}, { versionKey: false });

export default model("Medicamento", MedicamentoEsquema, "Medicamento");
