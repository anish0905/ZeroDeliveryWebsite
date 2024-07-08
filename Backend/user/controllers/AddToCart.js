const User = require('../models/User');

// Add a new item to the cart
exports.addItemToCart = async (req, res) => {
    const { userId, productId, productName, quantity, price, attributes,promotionCode } = req.body;

    try {
        // Find the user by userId
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product already exists in the cart
        const existingItemIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex !== -1) {
            // If product exists, update quantity and price
            user.cart[existingItemIndex].quantity += quantity;
            user.cart[existingItemIndex].price += price;
        } else {
            // If product does not exist, add new item to cart
            user.cart.push({ productId, productName, quantity, price, attributes,promotionCode });
        }

        // Calculate total price
        user.totalPrice = user.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Save the updated user document
        user = await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

// Remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
    const { userId, productId } = req.params;

    try {
        // Find the user by userId and update cart by removing the item
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { cart: { productId } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Recalculate total price after removing item
        user.totalPrice = user.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Save the updated user document
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

// Update product quantity in cart
exports.updateProductQuantity = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find the user by userId and update the quantity of the specified product
        const user = await User.findOneAndUpdate(
            { _id: userId, 'cart.productId': productId },
            { $set: { 'cart.$.quantity': quantity } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User or product not found in cart' });
        }

        // Recalculate total price after updating quantity
        user.totalPrice = user.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Save the updated user document
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product quantity', error });
    }
};

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
    const { userId } = req.params; // Correct parameter name
  
    try {
        // Find the user by userId and populate the cart items with product details
        const user = await User.findById(userId).populate('cart.productId');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// Update an existing cart
exports.updateCart = async (req, res) => {
    const { userId, cartItems, promotionCode, totalPrice } = req.body;

    try {
        // Find the user by userId and update cart details
        const user = await User.findByIdAndUpdate(
            userId,
            { cart: cartItems, promotionCode, totalPrice },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Recalculate total price after updating cart items
        user.totalPrice = user.cart.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Save the updated user document
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
};

// Delete a cart by user ID
exports.deleteCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by userId and delete the cart
        const user = await User.findByIdAndUpdate(userId, { cart: [], totalPrice: 0 });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart', error });
    }
};
