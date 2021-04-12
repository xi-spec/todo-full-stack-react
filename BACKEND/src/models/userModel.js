const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  displayName: String,
  email: String,
  photoURL: String,
  toDoLists: [{ type: Schema.Types.ObjectId, ref: 'ToDoList' }],
});

module.exports = model('users', userSchema);
