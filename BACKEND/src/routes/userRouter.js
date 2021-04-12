const { Router } = require('express');
const UserController = require('../controllers/userController');

function UserRouter() {
  const router = Router();

  router
    .route('/')
    .get(UserController.getAllUsers)
    .post(UserController.createUser)
    .put(UserController.updateUser);

  router
    .route('/:userId')
    .get(UserController.getOneUserWithParams)
    .put(UserController.updateUser);

  return router;
}

module.exports = UserRouter();
