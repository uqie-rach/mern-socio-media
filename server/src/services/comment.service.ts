import ResponseError from "@lib/responseError.ts";
import { Comment, Post } from "@models/*";

export default {
  create: async (body: any, userId: string, postId: string) => {
    const { content } = body;
    if (!content) throw new ResponseError(400, "Content is required");

    const post = await Post.findById(postId);
    if (!post) throw new ResponseError(404, "Post not found");

    const comment = await Comment.create({
      user: userId,
      post: postId,
      content,
      likes: [],
    });

    if (!comment)
      throw new ResponseError(
        500,
        "Something went wrong while creating comment..."
      );

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    return comment;
  },
  update: async (body: any, userId: string, commentId: string) => {
    const { content } = body;
    if (!content) throw new ResponseError(400, "Content is required");

    const comment = await Comment.findById(commentId);
    if (!comment) throw new ResponseError(404, "Comment not found");

    if (comment?.user?.toString() !== userId)
      throw new ResponseError(403, "Forbidden");

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content,
      },
      { new: true }
    );

    if (!updatedComment)
      throw new ResponseError(
        500,
        "Something went wrong while updating comment..."
      );

    return updatedComment;
  },
  getByPost: async (postId: string) => {
    const comments = await Comment.find({ post: postId }).populate(
      "user",
      "firstName lastName email picturePath location"
    );
    return comments;
  },
  remove: async (userId: string, commentId: string, postId: string) => {
    const comment = await Comment.findById(commentId);

    if (!comment) throw new ResponseError(404, "Comment not found");

    if (comment.user?.toString() !== userId)
      throw new ResponseError(403, "Forbidden");

    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: comment._id },
    });

    await Comment.findByIdAndDelete(commentId);

    return { message: "Comment deleted successfully" };
  },
  likeOrUnlike: async (userId: string, commentId: string) => {
    const comment = await Comment.findById(commentId);  
    if (!comment) throw new ResponseError(404, "Comment not found");

    const isLiked = comment.likes.includes(userId);

    isLiked
      ? await comment.updateOne({ $pull: { likes: userId } })
      : await comment.updateOne({ $push: { likes: userId } });

    return { message: isLiked ? "Unliked" : "Liked" };
  },
};
