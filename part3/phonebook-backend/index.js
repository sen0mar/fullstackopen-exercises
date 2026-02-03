const express = require("express");
const app = express();

// List of users
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Get requests
app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const numOfPeople = persons.length;
  const timeReceived = new Date();
  res.send(`
    <p>Phonebook has info for ${numOfPeople}</p>
    <p>${timeReceived}</p>
    `);
});

// Listen to server requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
