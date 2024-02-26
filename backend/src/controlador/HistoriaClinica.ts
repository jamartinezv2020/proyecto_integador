import CitaDAO from "../dao/CitaDAO";
import UsuarioDao from "../dao/UsuarioDao";
import { Request, Response } from "express";

// Ejemplo de ruta y controlador para obtener la historia clínica de un paciente
const express = require('express');
const router = express.Router();
const historiaClinicaController = require('../controllers/historiaClinicaController');

router.get('/:pacienteId', historiaClinicaController.obtenerHistoriaClinica);

module.exports = router;