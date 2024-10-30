const express = require('express');
const { aPets } = require('../controllers/pet-controller');
const router = express.Router()

router.get("/get-apets",aPets)

module.exports = router;