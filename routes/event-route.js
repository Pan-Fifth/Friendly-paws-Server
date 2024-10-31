const express = require("express");
const router = express.Router();
const { eventShowPages, regisEvent } = require('../controllers/event-controller');
const { authenticate } = require("../middlewares/authenticate");

router.get('/showpages', eventShowPages)
router.post('/regisevent', authenticate, regisEvent)

module.exports = router;