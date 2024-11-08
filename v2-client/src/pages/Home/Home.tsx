import { ProfileBar, PostForm, Posts } from "@/components";

const Home = () => {
  

  return (
    <main className="mt-10">
      <div className="container flex flex-col lg:flex-row-reverse gap-4">
        <ProfileBar />

        <div className="w-full lg:w-2/3">
          <PostForm />
          <Posts />
        </div>
      </div>
    </main>
  );
};

export default Home;
