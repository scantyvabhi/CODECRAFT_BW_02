const users = require('../models/userModel')
const { v4: uuidv4 } = require('uuid')
const { isValidEmail } = require('../utils/validate')

//users naam ka databse hai
//uuid unique ids generate karega
// email wala email validation karega

// Creating new user
// exports.createUser = (req, res) => {
//     const { name, email, age } = req.body;
//     if ((!name || !email || !age) || (!isValidEmail(email))) {
//         console.log("Wrong data eneterd for new user");
//         return res.send(400).json({ message: "Please fill the data correctly" })
//     }
//     const id = uuidv4();
//     users[id] = { id, name, email, age };
//     res.status(201).json({ message: "New user registered", info: { id, name, email, age } })
// }

// CREATE USER
exports.createUser = (req, res) => {
const { name, email, age } = req.body;
if (!name || !email || !age) {
    return res.status(400).json({ message: 'All fields are required' });
}
if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
}
    const id = uuidv4();
    users[id] = { id, name, email, age };
    res.status(201).json(users[id]);
};

// GET ALL USERS
// exports.getAllUsers = (req, res) => {
//     res.status(200).json(Object.values(users));
// };


// fetching all users
exports.getAllUsers = (req, res) => {
    res.status(200).json(users)
}

// GET SINGLE USER
exports.getUserById = (req, res) => {
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
};

// UPDATE USER
exports.updateUser = (req, res) => {
    const { name, email, age } = req.body;
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (email && !isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    users[req.params.id] = {
        ...user,
        name: name || user.name,
        email: email || user.email,
        age: age || user.age,
    };

    res.status(200).json(users[req.params.id]);
};

// DELETE USER
exports.deleteUser = (req, res) => {
    const user = users[req.params.id];

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    delete users[req.params.id];

    res.status(200).json({ message: 'User deleted successfully' });
};