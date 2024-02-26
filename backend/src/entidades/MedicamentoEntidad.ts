import CategoriaEntidad from "./CategoriaEntidad";

class MedicamentoEntidad {
  public idMedicamento: string;
  public nombreMedicamento: string;
  public codigoMedicamento: string;
  public categoriaMedicamento: string;
  public frasePromocional: string;
  public unidad: string;
  public precio: number;
  public descripcion: string;
  public promocion: number;
  public fechaRegistroMedicamento: Date;
  public estadoMedicamento: number;
  public nombreImagenMedicamento: string;
  public avatarMedicamento: string;
  public codCategoria: CategoriaEntidad;

  // Nuevos campos para el medicamento
  public dosisSugeridaPorKg: number;
  public modoSuministro: string;
  public contraindicaciones: string;
  public composicion: string;

  constructor(
    id: string,
    nom: string,
    cod: string,
    cat: string,
    frap: string,
    uni: string,
    prec: number,
    descri: string,
    prom: number,
    fec: Date,
    est: number,
    nomi: string,
    ava: string,
    codp: CategoriaEntidad,
    // Nuevos campos en el constructor
    dosisSugeridaPorKg: number,
    modoSuministro: string,
    contraindicaciones: string,
    composicion: string
  ) {
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

  private generarIdMedicamento(): string {
    const year = new Date().getFullYear();
    const baseYear = 2024;
    const increment = 1;

    if (year === baseYear) {
      return `${year}${increment.toString().padStart(4, '0')}`;
    } else {
      return `${year}${'0001'}`;
    }
  }
}

export default MedicamentoEntidad;
