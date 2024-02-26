class CategoriaEntidad {

    public nombreCategoria: string;
    public estadoCategoria: number;

    constructor(nom: string, est: number) {
        this.nombreCategoria = nom;
        this.estadoCategoria = est;
    }

};

export default CategoriaEntidad;