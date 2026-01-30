const PersonForm = ({
  newName,
  newNumber,
  handleName,
  handleNumber,
  addPerson,
}) => {
  return (
    <>
      <form>
        <div>
          Name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
