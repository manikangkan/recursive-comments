import Comments from "./components/Comments";
import Post from "./components/Post";

const App = () => {
  return (
    <main className="flex h-screen">
      <Post />
      <Comments currentUserId={1} />
    </main>
  );
};

export default App;
