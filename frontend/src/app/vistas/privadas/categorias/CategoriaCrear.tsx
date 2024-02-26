import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import { useState } from "react";
import Categoria from "../../../modelos/Categoria";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import ApiBack from "../../../utilidades/dominios/ApiBack";
import { useFormulario } from "../../../utilidades/misHooks/useFormulario";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";

export const CategoriaCrear = () => {
  // Variables
  type miFormularioHtml = React.FormEvent<HTMLFormElement>;
  const [enProceso, setEnProceso] = useState<boolean>(false);
  let { nombreCategoria, estadoCategoria, dobleEnlace, objeto } =
    useFormulario<Categoria>(new Categoria("", "", 0));
  // *******************************************************************

  // Función flecha para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    objeto._id = "";
    objeto.nombreCategoria = "";
    objeto.estadoCategoria = 0;

    formulario.nombreCategoria.value = "";
    formulario.estadoCategoria.value = "";

    formulario.classList.remove("was-validated");
  };

  const enviarFormulario = async (fh: miFormularioHtml) => {
    fh.preventDefault();
    setEnProceso(true);
    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");
    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();

    } else {
      const resultado = await ServicioPrivado.peticionPOST( ApiBack.CATEGORIAS_CREAR, objeto );

      if (resultado.id) {
        setEnProceso(false);
        MensajeToastify("success", "Categoria creado con éxito", 6000);
      } else {
        MensajeToastify(
          "error",
          "No se puede crear el Categoria. Es posible que el nombre utilizado exista en la BD",
          6000
        );
      }

      limpiarCajas(formulario);
    }
  };

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
            <li className="breadcrumb-item active">Crear Categoria</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de formulario: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de creación</h5>

            <Form noValidate validated={enProceso} onSubmit={enviarFormulario}>
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
                    <option value="">Seleccione el estado</option>
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
                  <Button type="submit">Crear Categoria</Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      {/* Ejemplo de formulario: Inicio */}

      {/* Requerido para presentar los mensajes Toast: Inicio */}
      <ToastContainer />
      {/* Requerido para presentar los mensajes Toast: Fin */}
    </main>
  );
};
