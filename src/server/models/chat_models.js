
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ChatSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: String, required: true },
  sendTime: { type: Date, required: true },
  dataType: { type: String, required: true },
}, { collection: 'chats' });

mongoose.model('Chat', ChatSchema);
