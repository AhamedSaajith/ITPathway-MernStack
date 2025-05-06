import Project from "../model/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

export const getProjectsById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
}

export const createProject = async (req, res) => {
  const { title, description, link } = req.body;
  const project = new Project({ title, description, link });
  await project.save();
  res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
