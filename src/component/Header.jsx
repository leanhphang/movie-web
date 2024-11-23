import React, { useState } from "react";
import PropType from "prop-types";

const Header = ({ onSearch }) => {
  const [textSearch, setSearch] = useState("");
  return (
    <div className="p-4 flex justify-between  fixed top-0 left-0 w-full z-[9999]  bg-black">
      <div className="flex items-center gap-8">
        <h1 className="text-[30px] uppercase text-red-700 font-bold">Movie</h1>
        <nav className="hidden md:flex items-center space-x-5">
          <a href="#" className="hover:text-red-700  text-white">
            Home
          </a>
          <a href="#" className="hover:text-red-700 text-white">
            About
          </a>
          <a href="#" className="hover:text-red-700 text-white">
            Contact
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-5">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 p-2 text-black"
          onChange={(e) => setSearch(e.target.value)}
          value={textSearch}
        />
        <button
          className="bg-red-700 text-white px-3 py-1 rounded-lg"
          onClick={() => onSearch(textSearch)}
        >
          Search
        </button>
      </div>
    </div>
  );
};
Header.propTypes = {
  onSearch: PropType.func,
};

export default Header;
