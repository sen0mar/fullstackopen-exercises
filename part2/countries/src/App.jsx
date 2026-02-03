import { useState, useEffect } from "react";
import countryService from "./services/countryService";
import Notification from "./components/Notification";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Retrieve countries from server and display them
  useEffect(() => {
    countryService.getAll().then((countriesList) => {
      setCountries(countriesList);
    });
  }, []);

  // Filter a country
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  // Set notifications
  useEffect(() => {
    if (search === "") setNotification("");
    else if (filteredCountries.length > 10)
      setNotification("Too many matches, specify a more precise filter");
    else setNotification("");
  }, [search, filteredCountries]);

  return (
    <>
      <label htmlFor="countries">Find countries</label>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />

      <Notification notification={notification} />

      {notification === "" &&
        filteredCountries.length >= 2 &&
        filteredCountries.length <= 10 && (
          <ul>
            {filteredCountries.map((country) => (
              <div key={country.cca3}>
                <li>{country.name.common}</li>
                <button
                  type="button"
                  onClick={() => setSelectedCountry(country)}
                >
                  Show
                </button>
              </div>
            ))}
          </ul>
        )}

      {notification === "" && filteredCountries.length === 1 && (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital?.[0]}</p>
          <p>Area: {filteredCountries[0].area}</p>

          <h3>Languages:</h3>
          <ul>
            {Object.values(filteredCountries[0].languages || {}).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img
            src={filteredCountries[0].flags.png}
            alt={`Flag of ${filteredCountries[0].name.common}`}
            width="130"
          />
        </div>
      )}
    </>
  );
}

export default App;
