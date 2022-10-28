const HeadContent = ({ setGoodPlus, setNeutralPlus, setBadPlus }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={setGoodPlus}>good</button>
      <button onClick={setNeutralPlus}>neutral</button>
      <button onClick={setBadPlus}>bad</button>
    </div>
  );
};

export default HeadContent;