import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      <Part partNumber={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part partNumber={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part partNumber={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  );
};

export default Content;
