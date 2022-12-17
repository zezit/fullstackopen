import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [temp, setTemp] = useState(0);
  const [icon, setIcon] = useState("");
  const [windSpeed, setWindSpeed] = useState(0);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    searchCountry();
  }, [nameSearch]);

  const searchCountry = () => {
    let foundCountries = [];

    if (nameSearch) {
      countries.forEach((country) => {
        //* Verificação dentro de todo o nome
        if (
          country.name.official
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase()) ||
          country.name.common
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        ) {
          foundCountries.push(country);
        }
      });

      // console.log("found:", foundCountries);

      setFoundCountries(foundCountries);
    } else {
      setFoundCountries([]);
    }
  };

  const renderSpecific = (index) => {
    let auxFond = [];
    auxFond.push(foundCountries[index]);

    setFoundCountries(auxFond);
  };

  const renderName = () => {
    if (foundCountries.length == 1) {
      // console.log(foundCountries[0].capital[0]);
      axios
        .get(
          `${process.env.REACT_APP_API_WEATHER_LINK}?q=${foundCountries[0].capital}&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`
        )
        .then((response) => {
          // console.log("weather", response.data);
          setTemp(response.data.main.temp);
          setIcon(response.data.weather[0].icon);
          setWindSpeed(response.data.wind.speed);
        })
        .catch((err) => {
          console.log("ERRO:", err);
        });

      const languages = () => {
        let langs = [];

        Object.keys(foundCountries[0].languages).forEach((index) => {
          langs.push(foundCountries[0].languages[index]);
        });

        return (
          <ul>
            {langs.map((arg, index) => (
              <li key={index}>{arg}</li>
            ))}
          </ul>
        );
      };

      return (
        <div>
          <h1>
            {foundCountries[0].name.common} - {foundCountries[0].name.official}
          </h1>
          <p>Capital: {foundCountries[0].capital}</p>
          <p>Area: {foundCountries[0].area} km²</p>

          <h3>Languages:</h3>

          {languages()}
          <div>
            <img
              src={foundCountries[0].flags.png}
              alt={`${foundCountries[0].name.common}_flag`}
            />
          </div>

          <div>
            <h1>Weather in {foundCountries[0].name.common}</h1>
            <p>Temperature: {temp} °C</p>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <p>Wind Speed: {windSpeed} km/h</p>
          </div>
        </div>
      );
    } else if (foundCountries.length <= 10) {
      return foundCountries.map((nameCountry, i) => (
        <div key={i}>
          <p>
            <span>{nameCountry.name.official}</span>
            <button
              style={{ margin: "0 20px" }}
              onClick={() => renderSpecific(i)}
            >
              show
            </button>
          </p>
        </div>
      ));
    } else {
      return <p>Too many matches, specify another filter</p>;
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="input">find countries: </label>
        <input onChange={({ target }) => setNameSearch(target.value)} />
      </form>

      <div>{renderName()}</div>
    </div>
  );
};

export default App;
