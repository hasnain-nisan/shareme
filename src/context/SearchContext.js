import React, { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
    
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchTerm: searchTerm,
        setSearchTerm
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
