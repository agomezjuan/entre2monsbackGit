const {Users} = require('../database/models')

// TODO CRUD 
module.exports = {
  
  // getAllUsers: function (req, res, next) {
  //   res.send('respond with a resource');
  // }
  // GET
  getAllUsers: async (req, res, next) => {
    try {
      const users = await Users.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem trying to get the users' });
    }
  },

  // POST
  createUser: async (req, res, next) => {
    try {
      const newUser = await Users.create(req.body);
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'There was a problem trying to create the user' });
    }
  },
}