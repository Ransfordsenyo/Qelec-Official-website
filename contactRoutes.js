const express = require('express');
const { submitContact, getContacts, updateContactStatus } = require('../controllers/contactController');
const router = express.Router();

router.post('/contact', submitContact);
router.get('/contacts', getContacts);
router.patch('/contacts/:id', updateContactStatus);

module.exports = router;