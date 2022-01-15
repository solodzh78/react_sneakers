import React from "react";

export const Search = ({ searchTitle, searchValue, setSearchValue }) => {

  const onChangeSearch = e => {
    setSearchValue(e.target.value);
  };

  return(
    <div className="d-flex align-center justify-between mb-40">
      <h3>{searchValue ? `Поиск по запросу: "${searchValue}"` : `Все ${searchTitle}`}</h3>
      <div className="search-block d-flex">
        <img 
          src="/img/search.svg" 
          alt="Search"
        />
        <input 
          onChange={onChangeSearch} 
          placeholder="Поиск..." 
          value={searchValue}
        />
        {searchValue && <span onClick={() => setSearchValue('')} className="cu-p clear">+</span>}

      </div>
    </div>
  );
} ;
