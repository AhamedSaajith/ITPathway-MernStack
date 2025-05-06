import express from "express";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById
} from "../controller/CourseController.js"; 

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
