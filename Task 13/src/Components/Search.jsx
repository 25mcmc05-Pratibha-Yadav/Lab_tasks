import React, { useState } from "react";

const Search = ({setCity}) => {
  const [input, setInput] = useState();
  
  const handleChange = (e) => {
    setInput(e.target.value);
  };

   return (
    <div className="flex justify-center items-center gap-3 mb-6">
      
      <input
        type="text"
        placeholder="Enter the city name"
        value={input}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={() => setCity(input)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>

    </div>
  );
};

export default Search;
