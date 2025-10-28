const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || "1234";

async function register(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) 
            return res.status(400).json({ message: "email or password cannot be empty" });
        
        const created = await User.addUser({ email, password });
        
        if (!created) 
            return res.status(409).json({ message: "User already exists" });
    
        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ message: "Cannot connect to database.", error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) 
            return res.status(400).json({ message: "email or password cannot be empty" });
    
        const user = await User.findByUsername(email); 
        
        if (!user) 
            return res.status(401).json({ message: "Invalid credentials" });
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) 
            return res.status(401).json({ message: "Invalid credentials" });
    
        const token = jwt.sign({ id: user.userID, email: email }, JWT_SECRET, { expiresIn: '1m' });
        
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: "Cannot connect to database.", error: error.message });
    }
}

module.exports = { register, login };