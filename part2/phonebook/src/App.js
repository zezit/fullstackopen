import { useState } from "react";
import Persons from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: "Arto Hellas",
    },
  ]);

  const [newName, setNewName] = useState("");

  const addNewName = (event) => {
    event.preventDefault();
    let nameAux = event.target[0].value;
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
      });
      setPersons(personsAux);
    } else {
      alert(`${nameAux} is already added to phonebook!`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form
        onSubmit={addNewName}
        onChange={({target}) => setNewName(target.value)}
      >
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
