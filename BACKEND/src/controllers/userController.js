const User = require('../models/userModel');
require('../models/toDoModel');

function userController() {
  async function getAllUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }

  const getOneUserWithParams = async (req, res) => {
    const { userId } = req.params;

    try {
      const userFound = await User.findById(userId).populate('toDoLists');
      res.json(userFound);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  };

  async function updateUser(req, res) {
    const id = req.params.userId || req.body._id;

    try {
      const updatedUser = await User
        .findByIdAndUpdate(id, req.body, { new: true }).populate('toDoLists');
      res.json(updatedUser);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }

  const createUser = async (req, res) => {
    const query = { email: req.body.email };
    const newData = { ...req.body };
    try {
      const newUser = await User.findOneAndUpdate(query, newData, { new: true, upsert: true })
        .populate('toDoLists');
      res.json(newUser);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  };

  return {
    getAllUsers,
    getOneUserWithParams,
    createUser,
    updateUser,

  };
}

module.exports = userController();
