const express = require('express');
const router = express.Router();
const addToCartController = require('../controllers/AddToCart'); // Adjust the path accordingly

// Add an item to the cart
router.post('/', addToCartController.addItemToCart);

// Get cart by user ID
router.get('/:userId', addToCartController.getCartByUserId);

// Update an existing cart
router.put('/', addToCartController.updateCart);

// Delete a cart by user ID
router.delete('/:userId', addToCartController.deleteCartByUserId);

module.exports = router;
