import {
  createResource,
  getAllResources,
  getResourceById,
} from "#resource";

export const addResource = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;
        
    if (!file) {
      return res.status(400).json({ message: "Archivo es requerido" });
    }

    const resourceData = {
      title,
      description,
      filePath: file.path,
    };

    const newResource = await createResource(resourceData);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el recurso", error });
  }
};

export const listAllResources = async (req, res) => {
  try {
    const resources = await getAllResources();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los recursos", error });
  }
};

export const getResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await getResourceById(id);

    if (!resource) {
      return res.status(404).json({ message: "Recurso no encontrado" });
    }

    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el recurso", error });
  }
};
