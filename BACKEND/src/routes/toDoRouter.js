const { Router } = require('express');
const TodoController = require('../controllers/toDoController');

function TodoRouter() {
  const router = Router();

  router
    .route('/')
    .get(TodoController.getAllLists)
    .post(TodoController.createList)
    .put(TodoController.updateList)
    .delete(TodoController.deleteList);

  router
    .route('/:listId')
    .get(TodoController.getOneListWithParams)
    .put(TodoController.updateList)
    .delete(TodoController.deleteList);

  return router;
}

module.exports = TodoRouter();
