"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MedicamentoEntidad {
    constructor(id, nom, cod, cat, frap, uni, prec, descri, prom, fec, est, nomi, ava, codp, 
    // Nuevos campos en el constructor
    dosisSugeridaPorKg, modoSuministro, contraindicaciones, composicion) {
        this.idMedicamento = id || this.generarIdMedicamento();
        this.nombreMedicamento = nom;
        this.codigoMedicamento = cod;
        this.categoriaMedicamento = cat;
        this.frasePromocional = frap;
        this.unidad = uni;
        this.precio = prec;
        this.descripcion = descri;
        this.promocion = prom;
        this.fechaRegistroMedicamento = fec;
        this.estadoMedicamento = est;
        this.nombreImagenMedicamento = nomi;
        this.avatarMedicamento = ava;
        this.codCategoria = codp;
        // Asignar los nuevos campos
        this.dosisSugeridaPorKg = dosisSugeridaPorKg;
        this.modoSuministro = modoSuministro;
        this.contraindicaciones = contraindicaciones;
        this.composicion = composicion;
    }
    generarIdMedicamento() {
        const year = new Date().getFullYear();
        const baseYear = 2024;
        const increment = 1;
        if (year === baseYear) {
            return `${year}${increment.toString().padStart(4, '0')}`;
        }
        else {
            return `${year}${'0001'}`;
        }
    }
}
exports.default = MedicamentoEntidad;
