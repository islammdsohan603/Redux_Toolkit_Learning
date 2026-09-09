import { fetchPhotos } from "./api/mediaApp";

function App() {
  return (
    <div className="min-h-screen bg-gray-900  ">
      <h1 className="text-4xl font-bold text-white text-center">Counter</h1>

      <button
        onClick={() => fetchPhotos("cat")}
        className=" bg-amber-500 p-4 rounded-2xl cursor-pointer mx-0"
      >
        {" "}
        Get Photos{" "}
      </button>
    </div>
  );
}

export default App;
