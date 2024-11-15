const express = require('express');
const router = express.Router();

const { checkProjectID } = require('../middlewares/req.middleware');
const { validatePostProject, validatePatchProject } = require('../middlewares/project.middleware');

const { getProject, getProjects, postProject, patchProject, deleteProject } = require('../controllers/project.controller');


router.route('/')
    .get(getProjects)
    .post(validatePostProject, postProject);

router.route('/:projectId')
    .get(checkProjectID, getProject)
    .patch(checkProjectID, validatePatchProject, patchProject)
    .delete(checkProjectID, deleteProject);


module.exports = router;
