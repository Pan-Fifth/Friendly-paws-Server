const express = require("express");
const router = express.Router();
const {
    getDashboard,
    getDonation,
    updateDonation,
    getAllUsers,
    updateUserById,
    deleteUserById
} = require("../controllers/admin-controller");

// Dashboard routes
router.get('/dashboard', getDashboard);

// Donation management routes
router.get('/manage-donation', getDonation);
router.put('/manage-donation/:id', updateDonation);

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);

module.exports = router;
