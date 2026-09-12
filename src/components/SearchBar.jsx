import { useState } from "react";

import { useDispatch } from "react-redux";

import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {
  const [text, setText] = useState();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(setQuery);

    setText("");
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
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
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
