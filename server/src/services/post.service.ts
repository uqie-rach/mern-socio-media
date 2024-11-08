import ResponseError from "@lib/responseError.ts";
import storageHelper from "@lib/storageHelper.ts";
import { Post, User } from "@models/*";
import getFileIdFromDrive from "@lib/getFileIdFromDrive.ts";

interface IReqBody {
  content: string;
  attachement: string;
}

export default {
  createPost: async (body: IReqBody, payloadId: string) => {
    const { content, attachement } = body;
    

    if (!content || !body)
      throw new ResponseError(400, "Missing required fields");

    const user = await User.findById(payloadId);
    if (!user) throw new ResponseError(404, "User not found");

    const newPost = await Post.create({
      user: payloadId,
      content,
      attachement: attachement || "",
      likes: [],
      comments: [],
    });

    if (!newPost) throw new ResponseError(500, "Error while creating post");
    return newPost;
  },
  updatePost: async (body: IReqBody, payloadId: string, postId: string) => {
    const post = await Post.findById(postId);
    let newAttacehement: string | undefined = "";
    let oldAttacehement: string | null = getFileIdFromDrive(post?.attachement!);
    console.log('body', body)
    if (!post) throw new ResponseError(404, "Post not found");
    if (post.user !== payloadId) throw new ResponseError(403, "Forbidden");

    const { content, attachement } = body;
    if (!content || !body)
      throw new ResponseError(400, "Missing required fields");

    if (attachement) {
      const updateResult = await storageHelper.updateFile(
        attachement,
        payloadId,
        "post",
        oldAttacehement!
      );
      newAttacehement = updateResult?.id;
      console.log("newAttacehement, ", newAttacehement);
    }

    const updatedPost = await post.updateOne({
      content: content || post.content,
      attachement: newAttacehement ? newAttacehement : post.attachement,
    });

    if (!updatedPost.acknowledged)
      throw new ResponseError(500, "Error while updating post");

    return { message: "Post updated successfully" };
  },
  getPostById: async (postId: string) => {
    const post = await Post.findById(postId).populate([
      {
        path: "user",
        select: "firstName lastName email picturePath location occupation",
      },
      {
        path: "comments",
        select: "content likes user",
        populate: {
          path: "user",
          select: "firstName lastName email picturePath location",
        },
      },
    ]);
    if (!post) throw new ResponseError(404, "Post not found");

    return post;
  },
  getPosts: async () => {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "user",
          select: "firstName lastName email picturePath location occupation",
        },
        {
          path: "comments",
          select: "content likes user",
          populate: {
            path: "user",
            select: "firstName lastName email picturePath location",
          },
        },
      ]);
    if (!posts) throw new ResponseError(404, "Posts not found");

    return posts;
  },
  deletePost: async (postId: string) => {
    const posts = await Post.findByIdAndDelete(postId);
    if (!posts) throw new ResponseError(404, "Posts not found");

    return {
      message: "Post deleted successfully",
    };
  },
  addOrRemoveLike: async (postId: string, payloadId: string) => {
    const post = await Post.findById(postId);

    if (!post) throw new ResponseError(404, "Post not found");

    const isLiked = post.likes.includes(payloadId);

    isLiked
      ? await post.updateOne({ $pull: { likes: payloadId } })
      : await post.updateOne({ $push: { likes: payloadId } });

    return { message: isLiked ? "Unliked" : "Liked" };
  },
};
