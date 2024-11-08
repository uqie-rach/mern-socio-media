import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";
import { devNull } from "os";
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  attachement: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    occupation: string;
    picturePath: string;
  };
  likes: string[];
  comments: string[];
}

interface ElementAttributesProperty {
  post: Post;
}
const Post = ({ post }: ElementAttributesProperty) => {
  const [postData, setPostData] = useState<null | {
    content?: string;
    attachement?: File | null;
  }>({
    content: post?.content,
    attachement: null,
  });
  const [formActive, setFormActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("ud"));
  const [friends, setFriends] = useState(null);


  /** Functions */
  const openForm = () => setFormActive(!formActive);

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file change", e.target.files?.[0]);
    if (e.target.files && e.target.files.length > 0) {
      setPostData({
        ...postData,
        attachement: e.target.files[0],
      });
    }
  };

  const editPost = async () => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:3001/api/post/${post?._id}`,
        {
          content: postData?.content,
          attachement: postData?.attachement || null,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);
    } catch (error) {
      console.log("Error while Edit Post", error);
    } finally {
      setTimeout(async () => {
        post = await axios.get(`http://localhost:3001/api/post/${post?._id}`);
        console.log(post);
        setLoading(false);
        setPostData(null);
        setFormActive(false);
        window.location.reload();
      }, 1500);
    }
  };

  const deletePost = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `http://localhost:3001/api/post/${post?._id}`,
        { withCredentials: true }
      );

      console.log(res.data);
    } catch (error) {
      console.log("Error while deleting post", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 1000);
    }
  };

  const addOrRemoveFriend = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/user/${user?._id}/${post?.user?._id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log("Error while Add or Remove Friend", error);
    } finally {
      setTimeout(() => {
        // window.location.reload();
      }, 400);
    }
  };

  const getUserFriends = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/user/${post?.user?._id}/friends`,
        { withCredentials: true }
      );
      setFriends(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("Error while fetching user friends", error);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/user/${post?.user?._id}`,
        { withCredentials: true }
      );

      setUser(res.data);

      console.log(res.data)
      console.log(res.data);
    } catch (error) {
      console.log("Error while fetching user data", error);
    }
  };

  /** LIfecyle hooks */
  useEffect(() => {
    console.log("single post rendered");
    getUserFriends();
    getUserData();
  }, [post]);

  return (
    <div className="mb-5">
      {/* POST */}
      <div className="relative w-full min-h-20 border border-gray-300 rounded-2xl bg-white py-4 px-5">
        {/* HEADER */}
        <header className="flex items-center justify-between  gap-4">
          <div className="flex items-center gap-4">
            {/* PROFILE IMAGE */}
            {(post?.user?.picturePath && (
              <div className="overflow-hidden w-10 h-10 border border-white rounded-full shadow-lg">
                <img
                  className="object-cover w-full h-full"
                  src={`https://drive.google.com/thumbnail?id=${post?.user?.picturePath}&sz=w300`}
                  alt={`${post?.user?.firstName} ${post?.user?.lastName}`}
                />
              </div>
            )) || (
              <div className="w-10 h-10 rounded-full shadow-blue-200 shadow-md border bg-gradient-to-r from-blue-400 to-blue-800"></div>
            )}
            {/* PROFILE IMAGE ENDS */}

            {/* USERNAME */}
            <div>
              <h4 className="font-semibold text-base md:text-lg xl:text-xl">
                {post?.user?.firstName} {post?.user?.lastName}
              </h4>
              <p className="text-gray-400 text-xs md:text-sm capitalize">
                {post?.user?.occupation} • {post?.user?.location}
              </p>
            </div>
            {/* USERNAME ENDS */}
          </div>

          {/* DELETE POST BUTTON */}
          {user?._id === post?.user?._id && (
            <Button
              loading={loading}
              onClick={deletePost}
              color="red"
              size="sm"
              variant="text"
              children={
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          )}
          {/* DELETE POST BUTTON ENDS */}
        </header>
        {/* HEADER ENDS */}

        <div className="my-6 h-[2px] rounded-full w-full bg-gray-200"></div>

        <form>
          {/* POST CONTENT */}
          <article>
            <figure className="mb-4">
              <div className="w-full h-[250px] overflow-hidden rounded-lg mb-4">
                <img
                  src={`https://drive.google.com/thumbnail?id=${post?.attachement}&sz=w1000`}
                  alt={post?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {formActive && (
                <Textarea
                  onChange={handleContentChange}
                  name="content"
                  className="w-full"
                  variant="outlined"
                  label="What's on your mind?"
                  size="lg"
                  required
                  value={postData?.content}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                ></Textarea>
              )}
            </figure>
            {formActive ? (
              <>
                <Input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  name="attachement"
                  onChange={handleFileChange}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <Typography
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  variant="small"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </Typography>
              </>
            ) : (
              <p>{post?.content}</p>
            )}
          </article>
          {/* POST CONTENT ENDS */}

          <footer className="flex justify-between flex-wrap mt-4">
            <div className="flex">
              <Button
                size="sm"
                variant="text"
                color="light-blue"
                className="flex items-center gap-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  className="w-6 h-6 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-gray-500 text-base font-semibold">
                  {post?.likes?.length}
                </p>
              </Button>
              <Button
                variant="text"
                color="light-blue"
                className="flex items-center gap-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
                    clipRule="evenodd"
                  />
                </svg>

                <p className="text-gray-500 text-base font-semibold">
                  {post?.comments?.length}
                </p>
              </Button>
            </div>

            <div className="flex">
              {user?._id !== post?.user?._id ? (
                <Button
                  disabled={loading}
                  variant="text"
                  className="flex items-center gap-3"
                  onClick={addOrRemoveFriend}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {!user?.friends?.includes(friends) ? (
                    <svg
                      className="w-6 h-6 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-red-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-2 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1Zm13-6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Button>
              ) : (
                <>
                  <Button
                    disabled={loading}
                    variant="text"
                    className="flex items-center gap-3"
                    onClick={openForm}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {formActive ? (
                      "Cancel"
                    ) : (
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </Button>
                  {formActive && (
                    <Button
                      variant="text"
                      color="light-blue"
                      className="flex items-center gap-3"
                      onClick={editPost}
                      children="Edit"
                      loading={loading}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  )}
                </>
              )}
            </div>
          </footer>
        </form>
      </div>
      {/* POST ENDS */}
    </div>
  );
};

export default Post;
