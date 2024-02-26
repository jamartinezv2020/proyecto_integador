class Categoria {
    public _id: string;
    public nombreCategoria: string;
    public estadoCategoria: number;
    public cantProductos?: number;
  
    constructor(id: string, nom: string, est: number) {
      this._id = id;
      this.nombreCategoria = nom;
      this.estadoCategoria = est;
    }
  }
  
  export default Categoria;