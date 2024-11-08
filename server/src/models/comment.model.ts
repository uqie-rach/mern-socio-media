import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
  },
  post: {
    type: String,
    ref: "Post",
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
});


export default mongoose.model("Comment", CommentSchema);