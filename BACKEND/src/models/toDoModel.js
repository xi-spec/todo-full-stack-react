const { model, Schema } = require('mongoose');

const toDoSchema = new Schema({
  task: String,
  created: { type: Date, default: Date.now },
  done: Boolean,
});

module.exports = model('ToDoList', toDoSchema);
