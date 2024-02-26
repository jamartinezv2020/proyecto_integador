const ApiBack = {
  URL: "http://localhost:3123",
  CREAR_USUARIO: "/api/publica/usuario/crear",
  INICIAR_SESION: "/api/publica/usuario/iniciar",

  PERFILES_CREAR: "/api/privada/perfil/crear",
  PERFILES_OBTENER: "/api/privada/perfil/todos",
  PERFILES_ELIMINAR: "/api/privada/perfil/eliminar",
  PERFILES_OBTENER_UNO: "/api/privada/perfil/uno",
  PERFILES_ACTUALIZAR: "/api/privada/perfil/actualizar",

  CATEGORIAS_CREAR: "/api/privada/categoria/crear",
  CATEGORIAS_OBTENER: "/api/privada/categoria/todos",
  CATEGORIAS_ELIMINAR: "/api/privada/categoria/eliminar",
  CATEGORIAS_OBTENER_UNO: "/api/privada/categoria/uno",
  CATEGORIAS_ACTUALIZAR: "/api/privada/categoria/actualizar",

  USUARIOS_CREAR: "/api/privada/usuario/crear",
  USUARIOS_OBTENER: "/api/privada/usuario/todos",
  USUARIOS_OBTENER_UNO: "/api/privada/usuario/uno",
  USUARIOS_ELIMINAR: "/api/privada/usuario/eliminar",
  USUARIOS_ACTUALIZAR: "/api/privada/usuario/actualizar",

 
};

export default ApiBack;