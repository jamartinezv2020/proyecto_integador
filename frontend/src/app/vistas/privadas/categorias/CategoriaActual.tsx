import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import Categoria from "../../../modelos/Categoria";
import ApiBack from "../../../utilidades/dominios/ApiBack";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import { useFormulario } from "../../../utilidades/misHooks/useFormulario";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";

export const CategoriaActual = () => {

  // Variables
  let { codigo } = useParams();
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [todoListo, setTodoListo] = useState<boolean>(false);
  let cargaFinalizada = todoListo !== undefined;
  let { nombreCategoria, estadoCategoria, dobleEnlace, objeto } = useFormulario<Categoria>(new Categoria("", "", 0));
  // *******************************************************************

  // Consultar datos del Categoria a modificar
  // *******************************************************************
  const obtenerUnCategoria = async () => {
    const urlCargarUnCategoria = ApiBack.CATEGORIAS_OBTENER_UNO + "/" + codigo;
    const CategoriaRecibido = await ServicioPrivado.peticionGET(urlCargarUnCategoria);
    objeto._id = CategoriaRecibido._id;
    objeto.nombreCategoria = CategoriaRecibido.nombreCategoria;
    objeto.estadoCategoria = CategoriaRecibido.estadoCategoria;
    if (CategoriaRecibido) {
      setTodoListo(true);
    }
  };
  // *******************************************************************

  const enviarFormulario = async (fh: formaHtml) => {
    fh.preventDefault();
    setEnProceso(true);
    const fromulario = fh.currentTarget;

    fromulario.classList.add("was-validated");
    if (fromulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const urlActualizar = ApiBack.CATEGORIAS_ACTUALIZAR + "/" + objeto._id;
      const resultado = await ServicioPrivado.peticionPUT( urlActualizar, objeto );

      if (resultado.nuevo) {
        setEnProceso(false);
        MensajeToastify("success", "Categoria actualizado correctamente", 6000);
      } else {
        MensajeToastify( "error", "No se puede actualizar el Categoria. Es posible que el nombre ya exista en la base de datos", 6000 );
      }
    }
  };


  useEffect(()=>{
    obtenerUnCategoria();
  }, []);

    return (
      <main id="main" className="main">
        {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Categorias</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Inicio</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/dashboard/admprofile">Administración de Categorias</Link>
            </li>
            <li className="breadcrumb-item active">Actualizar</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de formulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de edición</h5>
            {cargaFinalizada ? (
              <Form
                noValidate
                validated={enProceso}
                onSubmit={enviarFormulario}
              >
                <Form.Group as={Row} className="mb-3" controlId="nombreCategoria">
                  <Form.Label column sm={2}>
                    Nombre Categoria
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      required
                      type="text"
                      name="nombreCategoria"
                      className="form-control"
                      value={nombreCategoria}
                      onChange={dobleEnlace}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nombre del Categoria es obligatorio
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="estadoCategoria">
                  <Form.Label column sm={2}>
                    Estado Categoria
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select
                      required
                      name="estadoCategoria"
                      value={estadoCategoria}
                      onChange={dobleEnlace}
                    >
                      <option value={1}>Activo</option>
                      <option value={2}>Inactivo</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Seleccione el estado del Categoria
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" className="btn btn-sm">
                      Actualizar Categoria
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Cargando información para la edición</div>
            )}
          </div>
        </div>
      </div>
      {/* Ejemplo de formulario: Fin */}

      <ToastContainer/>
      </main>
    );
  };
  