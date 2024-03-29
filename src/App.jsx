import "./App.css";
import Die from "./components/Die.jsx";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

// TODO: Add New Features
// -CSS: put real dots on the dice.
// -Track the number of rolls
// -Tack the time it took to win
// -Save the best time to local Storage or lowest number of rolls

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const diceFirstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === diceFirstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    let randomDice = Math.floor(Math.random() * 6 + 1);
    return { id: nanoid(), value: randomDice, isHeld: false };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const dieComponent = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        onClick={() => holdDice(die.id)}
      />
    );
  });

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  function handleRollBtn() {
    if (!tenzies) {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });
    } else {
      setTenzies(false);
      setDice(allNewDice);
    }
  }

  return (
    <main className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">
        {tenzies && <Confetti />}
        {dieComponent}
      </div>
      <button className="roll-btn" onClick={handleRollBtn}>
        {!tenzies ? "Roll" : "New Game"}
      </button>
    </main>
  );
}

export default App;
