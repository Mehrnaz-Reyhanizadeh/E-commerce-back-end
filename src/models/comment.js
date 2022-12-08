const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const commentSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema" },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "productSchema" },
  content: { type: String, required: true },
});
commentSchema.plugin(timestamp);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
