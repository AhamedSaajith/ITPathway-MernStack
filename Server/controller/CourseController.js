import Course from "../model/Course.js";
import mongoose from "mongoose";

export const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving course", error: err.message });
  }
};

export const createCourse = async (req, res) => {
  const { title, description, link } = req.body;
  const course = new Course({ title, description, link });
  await course.save();
  res.status(201).json(course);
};

export const updateCourse = async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
};
