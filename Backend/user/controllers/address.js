const User = require('../models/User');



exports.addAddress = async (req, res) => {
  const { userId } = req.params; // This should get the userId from the route parameter
  const { street, city, state, country, postalCode, name, phone, addressType, location } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add new address to user
    const newAddress = { street, city, state, country, postalCode, name, phone, addressType, location };
    user.addresses.push(newAddress);
    await user.save();

    res.status(201).json({ message: 'Address added successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error adding address', error });
  }
};


// Update an existing address of user
exports.updateAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  const { street, city, state, country, postalCode } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the address within user's addresses array by addressId
    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Update address fields
    address.street = street;
    address.city = city;
    address.state = state;
    address.country = country;
    address.postalCode = postalCode;

    await user.save();

    res.status(200).json({ message: 'Address updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error });
  }
};

// Delete an address of user
exports.deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find and remove the address within user's addresses array by addressId
    user.addresses.id(addressId).remove();
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address', error });
  }
};
