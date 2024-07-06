const express = require('express');
const router = express.Router();
const userController = require('../controllers/address');

// Add a new address to user
router.post('/address/:userId/', userController.addAddress);

// Update an existing address of user
router.put('/address/:userId/:addressId', userController.updateAddress);

// Delete an address of user
router.delete('/address/:userId/:addressId', userController.deleteAddress);

module.exports = router;
