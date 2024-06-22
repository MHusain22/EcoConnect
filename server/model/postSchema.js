import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  description: String,

  cover: String,

  like: {
    type: Number,
    default: 1,
  },
});

const PostModel =
  mongoose.models.PostModel || mongoose.model("PostModel", postSchema);

export default PostModel;
