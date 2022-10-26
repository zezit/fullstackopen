import Part from "./Part";

const Content = (props) => {
  return (
    <div>
      <Part partNumber={props.part1} exercise={props.exercises1} />
      <Part partNumber={props.part2} exercise={props.exercises2} />
      <Part partNumber={props.part3} exercise={props.exercises3} />
    </div>
  );
};

export default Content;
