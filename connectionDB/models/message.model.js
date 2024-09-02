const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  content: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    
  }
 
});

const messageModel = model("message", messageSchema);
module.exports = messageModel;
