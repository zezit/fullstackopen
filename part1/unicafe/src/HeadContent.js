const Button = ({ clickHandler, text }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const HeadContent = ({ setGoodPlus, setNeutralPlus, setBadPlus }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={setGoodPlus} text="good" />
      <Button clickHandler={setNeutralPlus} text="neutral" />
      <Button clickHandler={setBadPlus} text="bad" />
    </div>
  );
};

export default HeadContent;
