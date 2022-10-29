import { useState, useEffect } from "react";
import axios from 'axios'

import Persons from "./Persons";

const Filter = ({ foundList, setSearchName }) => {
  return (
    <form onChange={({ target }) => setSearchName(target.value)}>
      <div>
        filter shown with <input />
      </div>
      <Persons persons={foundList} />
    </form>
  );
};

const PersonForm = ({ addNewPerson }) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input />
      </div>

      <div>
        number: <input />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [searchName, setSearchName] = useState("");
  const [foundList, setFoundList] = useState([]);

  useEffect(() => {
    let foundListAux = [];

    if (searchName) {
      persons.forEach((person) => {
        //* Verificação dentro de todo o nome
        // if (
        //   person.name
        //     .toLocaleLowerCase()
        //     .includes(searchName.toLocaleLowerCase())
        // ) {
        //   foundListAux.push(person);
        // }

        //* Verificação apenas no início do nome
        if (
          person.name
            .toLocaleLowerCase()
            .startsWith(searchName.toLocaleLowerCase())
        ) {
          foundListAux.push(person);
        }
      });

      console.log(foundListAux);
      setFoundList(foundListAux);
    } else {
      setFoundList([]);
    }
  }, [searchName]);

  // Adiciona pessoa na lista
  const addNewPerson = (event) => {
    event.preventDefault();
    let nameAux = event.target[0].value;
    let numberAux = event.target[1].value;
    let personsAux = [...persons];
    let exists = false;

    // Verifica se nome já existe
    persons.forEach((person) => {
      if (nameAux === person.name) {
        exists = true;
      }
    });

    // Caso não existir
    if (!exists) {
      personsAux.push({
        id: persons.length,
        name: nameAux,
        number: numberAux,
      });
      if (event.target[0].value && event.target[1].value) {
        setPersons(personsAux);
      } else {
        alert(`Fill in all fields!`);
      }
    } else {
      alert(`${nameAux} is already added to phonebook!`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter foundList={foundList} setSearchName={setSearchName} />

      <h2>add a new</h2>
      <PersonForm addNewPerson={addNewPerson} />

      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
