import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectsById
} from "../controller/ProjectController.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectsById);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
