const express = require('express')
const router = express.Router()

const deviceRoutes = require('./device.route')
const projectController = require('../controllers/project.controller')
const projectMiddleware = require('../middlewares/project.middleware')


router.route('/')
    .get(projectMiddleware.validateGetProjects, projectController.getProjects)
    .post(projectMiddleware.validatePostProject, projectController.postProject)

router.route('/:projectId')
    .get(projectMiddleware.validateGetProject, projectController.getProject)
    .patch(projectMiddleware.validatePatchProject, projectController.patchProject)
    .delete(projectMiddleware.validateDeleteProject, projectController.deleteProject)
    
router.use('/', deviceRoutes)


module.exports = router