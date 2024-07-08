const AddToCart = require('../models/AddToCart'); // Adjust the path accordingly
const User = require('../models/User');

// Add a new item to the cart
exports.addItemToCart = async (req, res) => {
    const { userId,cartItems,promotionCode,totalPrice} = req.body;

    try {
        const newCart = new AddToCart({
            userId,
            cartItems,
            promotionCode,
            totalPrice
        });

        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
};

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
    const { userId } = req.params; // Correct parameter name
  
    try {
        // Find the user and populate the cart with product details
        const user = await User.findById(userId).populate('cart.productId');
        console.log(user);
  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
  
        if (!user.cart || user.cart.length === 0) {
            return res.status(404).json({ message: 'Cart is empty' });
        }
  
        res.status(200).json(user.cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// Update an existing cart
exports.updateCart = async (req, res) => {
    const { userId, sessionId, cartItems, source, promotionCode, totalPrice } = req.body;

    try {
        const updatedCart = await AddToCart.findOneAndUpdate(
            { userId },
            { sessionId, cartItems, source, promotionCode, totalPrice },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
};

// Delete a cart by user ID
exports.deleteCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedCart = await AddToCart.findOneAndDelete({ userId });

        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart', error });
    }
};
