const express = require('express');
const { submitApplication, getApplications, updateApplicationStatus } = require('../controllers/formController');
const router = express.Router();

router.post('/applications', submitApplication);
router.get('/applications', getApplications);
router.patch('/applications/:id', updateApplicationStatus);

module.exports = router;