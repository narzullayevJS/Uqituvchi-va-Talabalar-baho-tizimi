const express = require("express");
const router = express.Router();
const { createSubject, getSubjects, createPostGrades, getStudents, getGradesById } = require("../controller/postController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/subjects", authMiddleware, createSubject);
router.get("/subjects", authMiddleware, getSubjects);
router.post("/grades", authMiddleware, createPostGrades);
router.get("/students", authMiddleware, getStudents);
router.get("/grades/:id", authMiddleware, getGradesById);

module.exports = router;
