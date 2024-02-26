"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductoEntidad {
    constructor(nom, fra, uni, pre, des, pro, fec, est, nomava, ava, cod) {
        this.nombreProducto = nom;
        this.frasePromocional = fra;
        this.unidad = uni;
        this.precio = pre;
        this.descripcion = des;
        this.promocion = pro;
        this.fechaRegistroProducto = fec;
        this.estadoProducto = est;
        this.nombreImagenProducto = nomava;
        this.avatarProducto = ava;
        this.codCategoria = cod;
    }
}
;
exports.default = ProductoEntidad;
