const express = require('express');
const { aPets, pet, createPets, allPets, updatePets,deletePets } = require('../controllers/pet-controller');
const router = express.Router()
const uploadMulter = require('../middlewares/upload-multer');
const { authenticate } = require('../middlewares/authenticate');

router.get("/get-apets/:count/:page",aPets)
router.get("/:id",pet)
router.get("/", authenticate, allPets)
router.post("/", authenticate ,uploadMulter.single('image'), createPets )
router.patch("/:id", authenticate ,uploadMulter.single('image'), updatePets )
router.delete("/:id", authenticate ,uploadMulter.single('image'), deletePets )

module.exports = router;