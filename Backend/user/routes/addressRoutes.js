const express = require('express');
const router = express.Router();
const userController = require('../controllers/address');

// Add a new address to user
router.post('/:userId/address', userController.addAddress);

// Update an existing address of user
router.put('/:userId/address/:addressId', userController.updateAddress);

// Delete an address of user
router.delete('/:userId/address/:addressId', userController.deleteAddress);

module.exports = router;
