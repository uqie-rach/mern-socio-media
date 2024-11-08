import { Post } from "@/components";
import axios from "axios";
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

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    setInterval(() => {
    }, 15000);
      fetchPost();
  }, []);

  async function fetchPost() {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3001/api/post", {
        headers: {
          Accept: "application/json",
        },
      });

      setPosts(res.data);
    } catch (error) {
      console.log("Error while fetching post", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      {posts && posts?.map((item, idx) => <Post key={idx} post={item} />)}
    </section>
  );
};

export default Posts;
