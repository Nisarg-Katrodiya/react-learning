import React, { useState } from 'react';

interface IData {
  id: number;
  name: string;
}

interface Props {
  data: IData[];
}

const Search: React.FC<Props> = ({ data }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const filteredData = data.filter((item: IData) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <form>
        <label htmlFor="search-input">
          <span>Search</span> {" "}
        </label>
        <input
          type="text"
          id="search-input"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
      </form>
      {filteredData.map((item: IData) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default Search;