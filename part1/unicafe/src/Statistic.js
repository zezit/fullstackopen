const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <th align="left" style={{ "padding-right": "40px" }}>
        {text}
      </th>
      <th align="right"> {value}</th>
    </tr>
  );
};

const Statistic = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad;
  const getAverege = () => parseFloat(getAll() / 3).toPrecision(2);
  const getPositive = () =>
    `${parseFloat((good / getAll()) * 100).toPrecision(3)} %`;

  return (
    <div>
      <h1>statistic</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={getAll()} />
        <StatisticLine text="averege" value={getAverege()} />
        <StatisticLine text="positive" value={getAll() && getPositive()} />
      </table>
    </div>
  );
};

export default Statistic;
