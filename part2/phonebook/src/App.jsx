import { useState, useEffect } from "react";
import personService from "./service/personService";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]); // List of users
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

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

  // Add new person or Update existing one
  const addPerson = (e) => {
    e.preventDefault();

    if (!newName.trim()) {
      return;
    }

    // Checks for an existing person
    const existingPerson = persons.find((p) => p.name === newName);
    // If the person exists, ask a confirmation before updating
    if (existingPerson) {
      const ok = window.confirm(
        `${newName} already exists in the PhoneBook, replace the old number with a new one?`,
      );
      if (!ok) return;
      // Creates a new object with the updated number if the person exists
      const updatedPerson = { ...existingPerson, number: newNumber };

      // Updates phone number in the server after checking if the person exists and asking for confirmation
      personService
        .updatePerson(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((p) =>
              p.id === existingPerson.id ? returnedPerson : p,
            ),
          );
          setNewName("");
          setNewNumber("");

          showNotification(
            `Updated ${returnedPerson.name}'s number`,
            "success",
          );
        })
        .catch(() => {
          showNotification(
            `Information of ${existingPerson.name} has already been removed from server`,
            "error",
          );
          setPersons(persons.filter((p) => p.id !== existingPerson.id));
        });
      return;
    }

    // Creates new person object for non existing person
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Creates new person in the server
    personService.createPerson(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
      showNotification(`Added ${returnedPerson.name}`, "success");
    });
  };

  // Delete a person
  const deletePerson = (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name} ?`)) return;
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        showNotification(`Deleted ${name}`, "success");
      })
      .catch(() => {
        showNotification(
          `Information of ${name} has already been removed from server`,
          "error",
        );

        setPersons(persons.filter((p) => p.id !== id));
      });
  };

  // Filter a person
  const filteredPersons =
    search.trim() === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase()),
        );

  // Show notification
  const showNotification = (text, type = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
