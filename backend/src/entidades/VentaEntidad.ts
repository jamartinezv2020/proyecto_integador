import UsuarioEntidad from "./UsuarioEntidad";
import ProductoEntidad from "./ProductoEntidad";

class VentaEntidad {

    public codVendedor: UsuarioEntidad;
    public codComprador: UsuarioEntidad;
    public fechaVenta: Date;
    public estadoVenta: number;
    public codProducto: ProductoEntidad;
    public cantidad: number;


    constructor(codv: UsuarioEntidad, codc: UsuarioEntidad, lafe: Date, esta: number, codp: ProductoEntidad, cant: number) {
        this.codVendedor = codv;
        this.codComprador = codc;
        this.fechaVenta = lafe;
        this.estadoVenta = esta;
        this.codProducto = codp;
        this.cantidad = cant;
    }

};

export default VentaEntidad;
