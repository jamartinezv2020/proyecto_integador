import fotoTripulante from "../../../assets/image/acercade.png";

export const AcercaDe = () => {
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Acerca de ...</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Listado de desarrolladores</li>
          </ol>
        </nav>
      </div>

      <div className="mt-4">
        <div className="card-group">
          <div className="card">
            <img src={fotoTripulante} className="" alt="..." />
            <div className="card-body">
              <h5 className="card-title">José Alfredo Martínez Valdés</h5>
              <p className="card-text">Developer</p>
              <p className="card-text">
                <small className="text-muted">...</small>
              </p>
            </div>
          </div>

          <div className="card">
            <img src={fotoTripulante} className="" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Desarrollador No. 2</h5>
              <p className="card-text">Developer</p>
              <p className="card-text">
                <small className="text-muted">...</small>
              </p>
            </div>
          </div>

          <div className="card">
            <img src={fotoTripulante} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Desarrollador No. 3</h5>
              <p className="card-text">Developer</p>
              <p className="card-text">
                <small className="text-muted">...</small>
              </p>
            </div>
          </div>

          <div className="card">
            <img src={fotoTripulante} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Desarrollador No. 4</h5>
              <p className="card-text">Developer</p>
              <p className="card-text">
                <small className="text-muted">...</small>
              </p>
            </div>
          </div>

          <div className="card">
            <img src={fotoTripulante} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Developer Fullstack</h5>
              <p className="card-text">Developer</p>
              <p className="card-text">
                <small className="text-muted">...</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
