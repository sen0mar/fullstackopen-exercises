import { useState, useEffect } from "react";
import personService from "./service/personService";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]); // List of users
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  // Retrieve list of persons from server and display them
  useEffect(() => {
    personService.getAll().then((personsList) => {
      setPersons(personsList);
    });
  }, []);

  // Handlers
  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Add a new person
  const addPerson = (e) => {
    e.preventDefault();

    const nameExists = persons.some((person) => person.name === newName); // Checks if new name already exists in PhoneBook

    if (!newName.trim()) {
      return;
    }

    if (nameExists) {
      alert(`${newName} is already added to PhoneBook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.createPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  // Delete a person
  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  // Filter a person
  const filteredPersons =
    search.trim() === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase()),
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
