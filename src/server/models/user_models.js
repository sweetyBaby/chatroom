const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  access: { type: String },
}, { collection: 'users' });
// 通过username
mongoose.model('User', UserSchema);
