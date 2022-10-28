const Button = ({ text, clickHandler, qntAnecdotes }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

export default Button;
