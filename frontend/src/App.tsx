import "./App.css";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { RuteoCompleto } from "./app/utilidades/rutas/RuteoCompleto";

const tocaEsperar = (
  <div className="d-flex align-items-center">
    <strong>Loading...</strong>
    <div
      className="spinner-border ms-auto"
      role="status"
      aria-hidden="true"
    ></div>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={tocaEsperar}>
          <RuteoCompleto />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
