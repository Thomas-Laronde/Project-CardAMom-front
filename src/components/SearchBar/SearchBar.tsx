import React, { useState, ChangeEvent } from 'react';
import './SearchBar.scss';

type SearchBarProps = {
  onSearchSubmit: (query: string) => void;
};

function SearchBar({ onSearchSubmit }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onSearchSubmit(newValue);
  };

  return (
    <div className="search-bar">
      <form className="search-bar">
        <input
          className="search-input"
          placeholder="Rechercher un deck"
          value={inputValue}
          onChange={handleChangeInput}
        />
      </form>
    </div>
  );
}

export default SearchBar;
