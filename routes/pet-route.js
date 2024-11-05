const express = require('express');
const { aPets, pet, createPets, allPets, updatePets,deletePets ,createAdoptRequest} = require('../controllers/pet-controller');
const { adoptValidationSchema } = require('../middlewares/validator');
const router = express.Router()
const uploadMulter = require('../middlewares/upload-multer');
const { authenticate } = require('../middlewares/authenticate');

router.get("/get-apets",aPets)
router.get("/:id",pet)
router.get("/", authenticate, allPets)
router.post("/", authenticate ,uploadMulter.single('image'), createPets )
router.patch("/:id", authenticate ,uploadMulter.single('image'), updatePets )
router.delete("/:id", authenticate ,uploadMulter.single('image'), deletePets )
router.post("/create-adopt",authenticate,uploadMulter.array('files',5),adoptValidationSchema,createAdoptRequest)


module.exports = router;