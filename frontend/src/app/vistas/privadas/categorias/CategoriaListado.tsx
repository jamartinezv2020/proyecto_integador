import { useState, useEffect } from "react";

import Categoria from "../../../modelos/Categoria";
import ApiBack from "../../../utilidades/dominios/ApiBack";
import ServicioPrivado from "../../../servicios/ServicioPrivado";


export const CategoriaListado = () => {
  // Variables
  const [arregloCategorias, setArregloCategorias] = useState<Categoria[]>([]);
  // ************************************************************************


  // Función para obtener Categorias
  const obtenerCategorias = async () => {
    const resultado = await ServicioPrivado.peticionGET( ApiBack.CATEGORIAS_OBTENER );
    setArregloCategorias(resultado);
    return resultado;
  };
  // ************************************************************************


  // Hook de react que se usa cuando se renderiza o pinta la página (vista)
  useEffect(() => {
    obtenerCategorias();
  }, []);
  // ************************************************************************


  return (
    <main id="main" className="main">

      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Categorias</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Listado de Categorias</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}


      {/* Ejemplo de una tabla para presentación de datos: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Orden</th>
                  <th style={{ width: "55%" }}>Nombre Categoria</th>
                  <th style={{ width: "15%" }}>Estado</th>
                  <th className="text-center" style={{ width: "10%" }}>Productos</th>
                </tr>
              </thead>
              <tbody>
                {arregloCategorias.map((miCategoria, indice) => (
                  <tr key={indice}>
                    <td>{indice + 1}</td>
                    <td>{miCategoria.nombreCategoria}</td>
                    <td>
                      {miCategoria.estadoCategoria === 1 ? "Activo" : "Inactivo"}
                    </td>
                    <td className="text-center">{miCategoria.cantProductos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Ejemplo de una tabla para presentación de datos: Fin */}

    </main>
  );
};
