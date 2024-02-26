// Ejemplo de modelo para el backend (Mongoose para MongoDB)
const mongoose = require('mongoose');

const historiaClinicaSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  citasMedicas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CitaMedica' }],
  diagnosticos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Diagnostico' }],
  tratamientos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tratamiento' }],
  // Otros campos relevantes
});

const HistoriaClinica = mongoose.model('HistoriaClinica', historiaClinicaSchema);

module.exports = HistoriaClinica;
