import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { ToastContainer } from "react-toastify";

import Categoria from "../../../modelos/Categoria";
import ApiBack from "../../../utilidades/dominios/ApiBack";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";


export const CategoriaAdmin = () => {
  // Variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [arregloCategorias, setArregloCategorias] = useState<Categoria[]>([]);
  const [objPer, setObjPer] = useState<Categoria>(new Categoria("", "", 0));
  // ************************************************************************


  // Función para listar Categorias
  const obtenerCategorias = async () => {
    const resultado = await ServicioPrivado.peticionGET( ApiBack.CATEGORIAS_OBTENER );
    setArregloCategorias(resultado);
    return resultado;
  };
  // ************************************************************************


  // Eliminar Categoria
  // **************************************************************************
  const borrarCategoria = async (codigoCategoria: string) => {
    const urlBorrar = ApiBack.CATEGORIAS_ELIMINAR + "/" + codigoCategoria;
    const resultado = await ServicioPrivado.peticionDELETE(urlBorrar);
    console.log(resultado);
    if (typeof resultado.eliminado === "undefined") {
      MensajeToastify(
        "error",
        "No se puede crear eliminar el Categoria. Es posible que esté relacionado con Productos",
        6000
      );
    } else {
      MensajeToastify("success", "Categoria eliminado de la base de datos", 6000);
    }
    obtenerCategorias();
  };
  // **************************************************************************


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
            <li className="breadcrumb-item active">
              Administración de Categorias
            </li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejempplo de una tabla para presentación de datos: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "25%" }}>Orden</th>
                  <th style={{ width: "40%" }}>Nombre Categoria</th>
                  <th style={{ width: "15%" }}>Estado</th>
                  <th className="text-center" style={{ width: "10%" }}>
                    Productos
                  </th>
                  <th style={{ width: "10%" }}> </th>
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
                    <td className="text-center">
                      {miCategoria.cantProductos === 0 ? (
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShow(true);
                            setObjPer(miCategoria);
                          }}
                        >
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ color: "#990000" }}
                          ></i>
                        </a>
                      ) : (
                        <i
                          className="fa-solid fa-trash-can"
                          style={{ color: "#908989" }}
                        ></i>
                      )}{" "}
                      <Link to={"/dashboard/updateprofile/" + miCategoria._id}>
                        <i
                          className="fa-regular fa-pen-to-square"
                          style={{ color: "#006600" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal para eliminar */}
            {/* *********************************************************************************/}
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Eliminar Categoria</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea eleminar el Categoria?
                <br />
                <strong>{objPer.nombreCategoria}</strong>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setShow(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    borrarCategoria(objPer._id);
                    setShow(false);
                  }}
                >
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
            {/* *********************************************************************************/}
          </div>
        </div>
      </div>
      {/* Ejempplo de una tabla para presentación de datos: Fin */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
  );
};
