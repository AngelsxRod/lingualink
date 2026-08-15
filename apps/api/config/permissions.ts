interface PermissionSeed {
  name: string;
  description: string;
}

const permissions: PermissionSeed[] = [
  { name: "LISTAR_USUARIOS", description: "Permite obtener la lista de usuarios" },
  { name: "CREAR_USUARIOS", description: "Permite crear nuevos usuarios" },
  { name: "EDITAR_USUARIOS", description: "Permite editar usuarios" },
  { name: "ELIMINAR_USUARIOS", description: "Permite eliminar usuarios" },
  { name: "EDITAR_PROPIA_INFO", description: "Permite editar su propia información" },
  { name: "CREAR_PREGUNTAS", description: "Permite crear preguntas" },
];

export default permissions;
