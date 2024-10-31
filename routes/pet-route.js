const express = require('express');
const { aPets, pet } = require('../controllers/pet-controller');
const router = express.Router()

router.get("/get-apets",aPets)
router.get("/:id",pet)

module.exports = router;