import { useState } from "react";
import HeadContent from "./HeadContent";
import Statistic from "./Statistic";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodPlus = () => {
    setGood(good + 1);
  };

  const setNeutralPlus = () => {
    setNeutral(neutral + 1);
  };

  const setBadPlus = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <HeadContent
        setGoodPlus={setGoodPlus}
        setNeutralPlus={setNeutralPlus}
        setBadPlus={setBadPlus}
      />
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
