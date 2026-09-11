import { useState } from "react";

const SearchBar = () => {
  const [text, setText] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submit");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex gap-2 p-10"
      >
        <input
          type="text"
          placeholder="Search anything..."
          className="border-2 px-4 rounded-3xl outline-none"
        />
        <button className=" bg-red-400 p-4 rounded-2xl cursor-pointer">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
