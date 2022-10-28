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
      <p>
        <b>total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
      </p>
    </div>
  );
};

export default Content;
