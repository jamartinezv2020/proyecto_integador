"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VentaEntidad {
    constructor(codv, codc, lafe, esta, codp, cant) {
        this.codVendedor = codv;
        this.codComprador = codc;
        this.fechaVenta = lafe;
        this.estadoVenta = esta;
        this.codProducto = codp;
        this.cantidad = cant;
    }
}
;
exports.default = VentaEntidad;
