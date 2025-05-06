import express from "express";
import { adminLogin } from "../controller/AdminController.js";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../controller/CourseController.js";
import {getProjects, createProject, updateProject, deleteProject} from "../controller/ProjectController.js"
import { verifyAdmin } from "../model/Admin.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get("/projects", verifyAdmin, getProjects);
router.post("/projects", verifyAdmin, createProject);
router.put("/projects/:id", verifyAdmin, updateProject);
router.delete("/projects/:id", verifyAdmin, deleteProject);


export default router;
