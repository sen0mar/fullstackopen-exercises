import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleAddName = (e) => {
    setNewName(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName); // Checks if new name already exists in PhoneBook

    if (nameExists) {
      alert(`${newName} is already added to PhoneBook`);
      return;
    }

    const newPerson = {
      name: newName,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleAddName} />
        </div>
        <div>
          <button type="submit" onClick={addName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
