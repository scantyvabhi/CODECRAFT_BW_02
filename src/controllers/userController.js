// const users = require('../models/userModel')
// const { v4: uuidv4 } = require('uuid')
const { isValidEmail } = require('../utils/validate')
const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.create({ name, email, age });

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// fetching all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a single user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};