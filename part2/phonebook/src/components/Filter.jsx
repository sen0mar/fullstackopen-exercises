const Filter = ({ search, handleSearch }) => {
  return (
    <p>
      Filter: <input value={search} onChange={handleSearch} />
    </p>
  );
};

export default Filter;
