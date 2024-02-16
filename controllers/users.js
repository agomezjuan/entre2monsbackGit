const {Users} = require('../database/models')

module.exports = {
  /* GET users listing. */
  getAllUsers: function (req, res, next) {
    res.send('respond with a resource');
  }
}