import CategoriaEntidad from "./CategoriaEntidad";

class ProductoEntidad {

    public nombreProducto: string;
    public frasePromocional: string;
    public unidad: string;
    public precio: number;
    public descripcion: string;
    public promocion: number;
    public fechaRegistroProducto: Date;
    public estadoProducto: number;
    public nombreImagenProducto: string;
    public avatarProducto: string;
    public codCategoria: CategoriaEntidad

    constructor(nom: string, fra: string, uni: string, pre: number, des: string, pro: number, fec: Date, est: number, nomava: string, ava: string, cod: CategoriaEntidad) {
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

};

export default ProductoEntidad;