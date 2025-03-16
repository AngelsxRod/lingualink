import { getRoles, createRole, updateRole, deleteRole } from "#role";

export const getRolesController = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const roles = await getRoles(page, pageSize);
    return res.json(roles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRoleController = async (req, res) => {
  try {
    const role = await createRole(req.body);
    return res.json(role);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await updateRole(id, req.body);
    return res.json(role);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await deleteRole(id);
    return res.json(role);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
