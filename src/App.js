import React from "react";
import "./App.css";
import Card from "./components/Card";
import characters from "./characters.json";
import shuffleArray from "./shuffleArray";

function App() {
  const [cards, setCards] = React.useState([]);
  const [score, setScore] = React.useState({
    highScore: 0,
    currentScore: 0,
  });
  React.useEffect(() => {
    if (cards.length === 0) {
      setCards(shuffleArray(characters));
    } else {
      setCards((prevCards) => shuffleArray(prevCards));
    }
  }, [score]);
  function toggleClick(id, isClicked) {
    if (isClicked) {
      if (score.currentScore > score.highScore) {
        setScore({
          highScore: score.currentScore,
          currentScore: 0,
        });
      } else {
        setScore((prevScore) => ({
          ...prevScore,
          currentScore: 0,
        }));
      }
      setCards(shuffleArray(characters));
      return;
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        currentScore: score.currentScore + 1,
      }));
    }

    setCards((prevCards) => {
      return prevCards.map((char) => {
        if (char.id === id) {
          return {
            ...char,
            clicked: !isClicked,
          };
        } else {
          return char;
        }
      });
    });
  }

  const cardsList = cards.map((card) => (
    <Card
      image={card.image}
      name={card.name}
      handleClick={() => toggleClick(card.id, card.clicked)}
    />
  ));
  return (
    <main>
      <section className="score">
        <p>Current Score: {score.currentScore}</p>
        <p>High Score: {score.highScore}</p>
      </section>
      <section className="card-container">{cardsList}</section>
    </main>
  );
}

export default App;
