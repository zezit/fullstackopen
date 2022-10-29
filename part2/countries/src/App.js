import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([])
  const [foundCountries, setFoundCountries] = useState([])
  const [nameSearch, setNameSearch] = useState("")
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data)
      })
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

      console.log("found:", foundCountries);

      setFoundCountries(foundCountries);
    } else {
      setFoundCountries([]);
    }
  }

  const renderSpecific = (index) => {
    let auxFond = []
    auxFond.push(foundCountries[index])

    setFoundCountries(auxFond)
  }

  const renderName = () => {
    if (foundCountries.length === 1) {
      let showCountry = foundCountries[0]

      axios.get(`${process.env.REACT_APP_API_LINK}&q=${showCountry.capital}&aqi=yes&key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => {
        console.log("weather", response.data.current)
        setWeather(response.data)
      })

      const languages = () => {
        let langs = []

        Object.keys(showCountry.languages).forEach((index) => {
          langs.push(showCountry.languages[index])
        })

        return (
          <ul>
            {langs.map((arg, index) => <li key={index}>{arg}</li>)}
          </ul>
        )
      }

      console.log("W:", weather)
      console.log("Temp:", weather.temp_c)
      console.log("Icon:", weather.condition.icon)
      console.log("Wind:", weather.wind_kph)

      return (
        <div>
          <h1>{showCountry.name.common} - {showCountry.name.official}</h1>
          <p>Capital: {showCountry.capital}</p>
          <p>Area: {showCountry.area} km²</p>

          <h3>Languages:</h3>

          {languages()}
          <div><img src={showCountry.flags.png} alt={`${showCountry.name.common}_flag`} /></div>

          <div>
            <h1>Weather in {showCountry.name.common}</h1>
            {/* <p>Temperature: {weatherAux[0].temp_c} °C</p> */}
            {/* <img src={weatherAux[0].condition.icon} /> */}
            {/* <p>Wind: {weatherAux[0].wind_kph} km/h</p> */}
          </div>
        </div>
      )
    }

    else if (foundCountries.length <= 10) {
      return (foundCountries.map((nameCountry, i) =>
        <div key={i}>
          <p>
            <span>{nameCountry.name.official}</span>
            <button
              style={{ margin: "0 20px" }}
              onClick={() => renderSpecific(i)}
            >show</button>
          </p>
        </div>
      ))
    }

    else {
      return (<p>Too many matches, specify another filter</p>)
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="input">find countries: </label>
        <input onChange={({ target }) => setNameSearch(target.value)} />
      </form>

      <div>
        {renderName()}
      </div>
    </div>
  );
}

export default App;
