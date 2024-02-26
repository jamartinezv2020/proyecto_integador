import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Bienvenida } from "../../contenedores/Bienvenida";
import { AcercaDe } from "../../vistas/compartidas/AcercaDe";
import { NoEncontrado } from "../../vistas/compartidas/NoEncontrado";

import { PerfilCrear } from "../../vistas/privadas/perfiles/PerfilCrear";
import { PerfilAdmin } from "../../vistas/privadas/perfiles/PerfilAdmin";
import { PerfilListado } from "../../vistas/privadas/perfiles/PerfilListado";
import { PerfilActual } from "../../vistas/privadas/perfiles/PerfilActual";

import { CategoriaCrear } from "../../vistas/privadas/categorias/CategoriaCrear";
import { CategoriaAdmin } from "../../vistas/privadas/categorias/CategoriaAdmin";
import { CategoriaListado } from "../../vistas/privadas/categorias/CategoriaListado";
import { CategoriaActual } from "../../vistas/privadas/categorias/CategoriaActual";

import { UsuarioCrear } from "../../vistas/privadas/usuarios/UsuarioCrear";
import { UsuarioListado } from "../../vistas/privadas/usuarios/UsuarioListado";
import { UsuarioDetalle } from "../../vistas/privadas/usuarios/UsuarioDetalle";
import { UsuarioAdmin } from "../../vistas/privadas/usuarios/UsuarioAdmin";
import { UsuarioActual } from "../../vistas/privadas/usuarios/UsuarioActual";






// RuteoTablero.tsx



// Carga Lazy - Supenso
// ***********************************************************************************************
const cargando = (
  <div className="d-flex justify-content-center">
    <div className="mt-3">
      <button className="btn btn-primary" type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" ></span>
        Cargando información...
      </button>
    </div>
  </div>
);
// ***********************************************************************************************

const RecursoNoEncontrado = lazy(() => import("../../vistas/compartidas/NoEncontrado").then(() => ({ default: NoEncontrado, })) );

const LazyBienvenida = lazy(() => import("../../contenedores/Bienvenida").then(() => ({ default: Bienvenida })) );
const LazyAcercaDe = lazy(() => import("../../vistas/compartidas/AcercaDe").then(() => ({ default: AcercaDe, })) );

const LazyPerfilListado = lazy(() => import("../../vistas/privadas/perfiles/PerfilListado").then(() => ({ default: PerfilListado })) );
const LazyPerfilCrear = lazy(() => import("../../vistas/privadas/perfiles/PerfilCrear").then(() => ({ default: PerfilCrear })) );
const LazyPerfilAdmin = lazy(() => import("../../vistas/privadas/perfiles/PerfilAdmin").then(() => ({ default: PerfilAdmin })) );
const LazyPerfilActual = lazy(() => import("../../vistas/privadas/perfiles/PerfilActual").then(() => ({ default: PerfilActual })) );

const LazyCategoriaListado = lazy(() => import("../../vistas/privadas/categorias/CategoriaListado").then(() => ({ default: CategoriaListado })) );
const LazyCategoriaCrear = lazy(() => import("../../vistas/privadas/categorias/CategoriaCrear").then(() => ({ default: CategoriaCrear })) );
const LazyCategoriaAdmin = lazy(() => import("../../vistas/privadas/categorias/CategoriaAdmin").then(() => ({ default: CategoriaAdmin })) );
const LazyCategoriaActual = lazy(() => import("../../vistas/privadas/categorias/CategoriaActual").then(() => ({ default: CategoriaActual })) );

const LazyUsuarioListado = lazy(() => import("../../vistas/privadas/usuarios/UsuarioListado").then(() => ({ default: UsuarioListado })) );
const LazyUsuarioCrear = lazy(() => import("../../vistas/privadas/usuarios/UsuarioCrear").then(() => ({ default: UsuarioCrear })) );
const LazyUsuarioDetalle = lazy(() => import("../../vistas/privadas/usuarios/UsuarioDetalle").then(() => ({ default: UsuarioDetalle })) );
const LazyUsuarioAdmin = lazy(() => import("../../vistas/privadas/usuarios/UsuarioAdmin").then(() => ({ default: UsuarioAdmin })) );
const LazyUsuarioActual = lazy(() => import("../../vistas/privadas/usuarios/UsuarioActual").then(() => ({ default: UsuarioActual })) );



export const RuteoTablero = () => {
  function obtenerCodigoDeAlgunaManera() {
    // Implementa la lógica para obtener el código de alguna manera
    return "código"; // Puedes devolver un valor o implementar la lógica adecuada
  }
  let codigo;
  try {
    codigo = obtenerCodigoDeAlgunaManera();
  } catch (error) {
    console.error("Error al obtener el código:", error);
    // Proporciona un valor predeterminado o maneja el error según sea necesario
    codigo = "valor_predeterminado";
  }
  return (
    <Suspense fallback={cargando}>
      <Routes>
        <Route path="/" element={<LazyBienvenida />} />
        <Route path="/about" element={<LazyAcercaDe />} />

        <Route path="/listprofiles" element={<LazyPerfilListado />} />
        <Route path="/addprofile" element={<LazyPerfilCrear />} />
        <Route path="/admprofile" element={<LazyPerfilAdmin />} />
        <Route path="/updateprofile/:codigo" element={<LazyPerfilActual />} />

        <Route path="/listcategorias" element={<LazyCategoriaListado />} />
        <Route path="/addcategoria" element={<LazyCategoriaCrear />} />
        <Route path="/admcategoria" element={<LazyCategoriaAdmin />} />
        <Route path="/updatecategoria/:codigo" element={<LazyCategoriaActual />} />


        <Route path="/listusers" element={<LazyUsuarioListado />} />
        <Route path="/adduser" element={<LazyUsuarioCrear />} />
        <Route path="/detailuser/:codigo" element={<LazyUsuarioDetalle />} />
        <Route path="/admuser" element={<LazyUsuarioAdmin />} />
        <Route path="/updateuser/:codigo" element={<LazyUsuarioActual />} />

   
        

        
        <Route path="*" element={<RecursoNoEncontrado />} />
      </Routes>
    </Suspense>
  );
};

function obtenerCodigoDeAlgunaManera() {
  throw new Error("Function not implemented.");
}
