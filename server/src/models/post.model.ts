
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    attachement: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
