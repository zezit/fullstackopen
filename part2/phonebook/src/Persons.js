const Persons = ({ persons }) => {
  return persons.map((person) => (
    <p key={person.id}>
      <span>{person.name}</span>
      <span style={{ margin: "0px 20px" }}>{person.number}</span>
    </p>
  ));
};

export default Persons;
