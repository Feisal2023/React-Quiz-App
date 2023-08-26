import React, { useEffect, useState } from "react";
import "./Result.scss";
const Result = ({ totalQuestions, result, tryAgain }) => {
  const [name, setName] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [showScores, setShowScores] = useState(false);
  useEffect(() => {
    setHighScores(JSON.parse(localStorage.getItem(`highScores`)) || []);
  }, []);

  const onSave = () => {
    const score = {
      name,
      score: result.score,
    };
    const newHighScores = [...highScores, score].sort(
      (a, b) => b.score - a.score
    );
    setHighScores(newHighScores);
    setShowScores(true);
    localStorage.setItem("highScores", JSON.stringify(newHighScores));
  };
  const handleTryAgain = () => {
    setShowScores(false);
    setHighScores([]);
    tryAgain();
  };
  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Questions: <span>{totalQuestions}</span>
      </p>
      <p>
        Total Scores: <span>{result.score} %</span>
      </p>
      <p>
        Correct Answers: <span>{result.correctAnswers}</span>
      </p>
      <p>
        Wrong Answers: <span>{result.wrongAnswers}</span>
      </p>
      <button onClick={handleTryAgain}>Try again</button>
      {!showScores ? (
        <>
          <h3>
            Enter your name below <br /> to save your scores{" "}
          </h3>
          <input
            type="text"
            placeholder="your name"
            onChange={(event) => setName(event.target.value)}
          />
          <button onClick={onSave}>Save</button>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((highScore, index) => (
                <tr key={`${highScore.score} ${highScore.name} ${index}`}>
                  <td>{index + 1}</td>
                  <td>{highScore.name}</td>
                  <td>{highScore.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Result;
