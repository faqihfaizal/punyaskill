const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const upload = require('../middleware/upload'); // optional

// CRUD routes
router.get('/', courseController.getAllCourses);
router.get('/:slug', courseController.getCourseBySlug);
router.post('/', upload.single('thumbnail'), courseController.createCourse);
router.put('/:slug', upload.single('thumbnail'), courseController.updateCourse);
router.delete('/:slug', courseController.deleteCourse);

module.exports = router;
