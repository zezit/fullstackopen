const Statistic = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad;
  const getAverege = () => getAll() / 3;
  const getPositive = () => (good / getAll()) * 100;

  return (
    <div>
      <h1>statistic</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {getAll()}</p>
      <p>averege {getAverege()}</p>
      <p>positive {getPositive()}%</p>
    </div>
  );
};

export default Statistic;
