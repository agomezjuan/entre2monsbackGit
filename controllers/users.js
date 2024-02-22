const {Users} = require('../database/models')

// TODO CRUD 
module.exports = {
  /* GET users listing. */
  getAllUsers: function (req, res, next) {
    res.send('respond with a resource');
  }
}