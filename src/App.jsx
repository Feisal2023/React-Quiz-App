import { useEffect, useState } from "react";
import axios from "axios";
import Quiz from "./Components/Quiz/Quiz";

function App() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions();
  }, []);
  const getQuestions = async () => {
    try {
      const { data } = await axios.get(
        "https://644982a3e7eb3378ca4ba471.mockapi.io/questions"
      );
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };
  return questions.length && <Quiz questions={questions} />;
}

export default App;
