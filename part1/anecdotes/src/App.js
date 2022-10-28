import { useState } from "react";

import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [votes, setVotes] = useState({
    mostVotes: {
      votes: 0,
      index: 0,
    },
    votes: [0, 0, 0, 0, 0, 0, 0],
  });
  const [selected, setSelected] = useState(0);

  const randomAnecdote = () => {
    let newValue = Math.floor(Math.random() * 7);
    setSelected(newValue);
  };

  const voteAnecdote = () => {
    const auxVotes = { ...votes };
    auxVotes.votes[selected] += 1;

    for (let i = 0; i < auxVotes.votes.length; i++) {
      if (votes.votes[i] > auxVotes.mostVotes.votes) {
        auxVotes.mostVotes.index = i;
        auxVotes.mostVotes.votes = votes.votes[i];
        break;
      }
    }

    console.log(auxVotes);
    setVotes(auxVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes.votes[selected]} votes</p>
      <Button text="vote" clickHandler={voteAnecdote}></Button>
      <Button
        text="next anecdote"
        clickHandler={randomAnecdote}
        qntAnecdotes={anecdotes.length}
      ></Button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.mostVotes.index]}</p>
      <p>has {votes.mostVotes.votes} votes</p>
    </div>
  );
};

export default App;
