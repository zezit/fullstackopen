const Part = ({ nome, exercise }) => {
  return (
    <p>
      {nome} {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      {parts.map((part) => (
        <Part nome={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
