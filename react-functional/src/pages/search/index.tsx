import Search from './search';

const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
  { id: 4, name: 'Alice' }
];

function SearchFilter() {
  return (
    <div>
      <h1>Search Filter Example</h1>
      <Search data={data} />
    </div>
  );
}

export default SearchFilter;