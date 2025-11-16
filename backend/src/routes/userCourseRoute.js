const express = require('express');
const router = express.Router();
const userCourseController = require('../controllers/userCourseController');

router.get('/', userCourseController.getList);
router.get('/:id_user', userCourseController.getByUser);
router.post('/', userCourseController.create);
router.put('/:id', userCourseController.updateProgress);
router.delete('/:id', userCourseController.remove);

module.exports = router;
