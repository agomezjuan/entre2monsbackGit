const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const bcrypt = require('bcrypt');

const authController = {
  register: async (req, res) => {
    try {
      const { username, userSurname, email, password, role } = req.body;
      const hash = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        username,
        userSurname,
        email,
        password: hash,
      });
      return res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, email: newUser.email }});
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if(!user) {
        console.log('User not found');
         return res.status(401).json({ message: "Invalid credentials" });
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
          console.log('Logged in');
        } else {
          console.log('Incorrect password');
          return res.status(401).json({ message: "Invalid credentials" });
        }
      });
      const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '24h' }); 
      return res.status(200).json({ message: "Login successful", user: { id: user.id, email: user.email, role: user.role }, token: token});
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = authController;
