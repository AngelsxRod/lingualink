import {
  getPermissions,
  createPermission,
  deletePermission,
  updatePermission,
} from "#permission";

export const getPermissionsController = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const permissions = await getPermissions(page, pageSize);
    return res.json(permissions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPermissionController = async (req, res) => {
  try {
    const permission = await createPermission(req.body);
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePermissionController = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await updatePermission(id, req.body);
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePermissionController = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await deletePermission(id);
    return res.json(permission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
