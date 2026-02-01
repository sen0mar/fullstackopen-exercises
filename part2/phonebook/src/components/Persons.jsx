const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
          </p>
          <button
            type="button"
            onClick={() => {
              deletePerson(person.id, person.name);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
