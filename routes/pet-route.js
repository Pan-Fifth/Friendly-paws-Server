const express = require('express');
const { aPets, pet, createPets, allPets, updatePets,deletePets ,createAdoptRequest, getRandomPets, } = require('../controllers/pet-controller');
const { adoptValidationSchema } = require('../middlewares/validator');
const router = express.Router()
const uploadMulter = require('../middlewares/upload-multer');
const { authenticate } = require('../middlewares/authenticate');

router.get("/get-apets/:count/:page",aPets)
router.get("/random",getRandomPets)
router.get("/:id",pet)
router.get("/page/:page", authenticate, allPets)
router.post("/", authenticate, uploadMulter.array('image', 3), createPets)
router.patch("/:id", authenticate, uploadMulter.array('image', 3), updatePets)
router.delete("/:id", authenticate, uploadMulter.single('image'), deletePets)
router.post("/create-adopt",authenticate, uploadMulter.array('files', 5),adoptValidationSchema, createAdoptRequest)



module.exports = router;