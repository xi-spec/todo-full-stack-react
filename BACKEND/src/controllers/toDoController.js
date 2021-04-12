const List = require('../models/toDoModel');
require('../models/userModel');

function TodoController() {
  async function getAllLists(req, res) {
    const query = {};
    List.find(query, (findeListError, listArray) => {
      if (findeListError) {
        res.status(5000);
        return res.send('There was an error,finding list');
      }
      return res.json(listArray);
    });
  }

  const getOneListWithParams = (req, res) => {
    const { listId } = req.params;
    List.findById(listId, (error, listFound) => {
      if (error) {
        res.status(404);
        res.send(`There are no list with this ${listId}`);
      } else {
        res.status(303);
        res.json(listFound);
      }
    });
  };

  const createList = (req, res) => {
    const newList = new List(req.body);
    newList.save();

    res.json(newList);
  };

  async function updateList(req, res) {
    const id = req.params.lisId || req.body._id;
    try {
      const updatedList = await List
        .findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedList);
    } catch (error) {
      res.status(500);
      res.send('There was an error updating');
    }
  }
  const deleteList = (req, res) => {
    const id = req.params.listId || req.body._id;
    List.findByIdAndDelete(id, (error, listDeleted) => {
      if (error) {
        res.status(404);
        res.send(`There are no list with this is ${id}`);
      } else {
        res.status(303);
        res.json(listDeleted);
      }
    });
  };

  return {
    getAllLists,
    getOneListWithParams,
    createList,
    updateList,
    deleteList,
  };
}

module.exports = TodoController();
