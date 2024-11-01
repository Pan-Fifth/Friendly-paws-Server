const express = require('express');
const { aPets, pet ,createAdoptRequest} = require('../controllers/pet-controller');
const { adoptValidationSchema } = require('../middlewares/validator');
const upload  = require('../middlewares/upload');
const router = express.Router()

router.get("/get-apets",aPets)
router.get("/:id",pet)
router.post("/create-adopt",upload.single('image'),adoptValidationSchema,createAdoptRequest)

module.exports = router;