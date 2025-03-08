import React, { useEffect, useState } from "react";
import questionsData from "../questions.json";
import "../styles/quizz.css";
import Question from "../components/Question";
import Alert from "../components/Alert";

const QuizesPage = () => {
  //Vai armazenar as questões para serem resolvidas. Elas serão excluídas à medida que se resolvem
  const [questions, setQuestions] = useState(questionsData);
  const [filter1, setFilter1] = useState("Nenhuma");
  const [filter2, setFilter2] = useState("Todas");
  const [filter2Questions, setFilter2Questions] = useState([]);
  const [questionsResult, setQuestionsResult] = useState({
    acertos: 0,
    erros: 0,
  });
  const [showQuestions, setShowQuestions] = useState(false);
  const [conclude, setConclude] = useState(false);
  const [resetQuizz, setResetQuizz] = useState(false);
  const [alertShowQuestions, setAlertShowQuestions] = useState(false);

  //Vai servir para contar o número total de questões que o usuário estara resolvendo
  const [totalQuestionsFiltered, setTotalQuestionsFiltered] = useState([]);

  useEffect(() => {
    let questionsFiltered = questionsData.filter((question, i) => {
      return question.discipline == filter1;
    });

    console.log("CHAMOU");

    setQuestions(questionsFiltered);

    setTotalQuestionsFiltered(questionsFiltered);

    handleFilter2Questions(questionsFiltered);
  }, [filter1]);

  function handleFilter1(e) {
    setFilter1(e.target.value);

    //setQuestions(questionsData) // Restaurando todas as questões novamente para ter o que filtrar depois
  }

  function handleFilter2Questions(questionsFiltered) {
    let subjectFiltered = [];

    //removendo valores repitidos
    questionsFiltered.filter((item, i) => {
      if (subjectFiltered.find((value) => value == item.subject)) {
        return;
      } else {
        subjectFiltered.push(item.subject);
        return;
      }
    });

    setFilter2Questions(subjectFiltered);
    // ELIMINE OS VALORES REPITIDOS DOS ASSUNTOS DAS QUESTÕES E ADICIONE SOMENTE UM DE CADA
  }

  function handleFilter2(e) {
    if (e.target.value !== "Todas") {
      let questionsFilter2 = questionsData.filter((item, i) => {
        return item.subject == e.target.value;
      });

      setFilter2(e.target.value);
      setTotalQuestionsFiltered(questionsFilter2);

      setQuestions(questionsFilter2);
    } else if (e.target.value == "Todas") {
      let questionsFilter2 = questionsData.filter((item, i) => {
        return item.discipline == filter1;
      });

      setFilter2(e.target.value);

      setQuestions(questionsFilter2);

      setTotalQuestionsFiltered(questionsFilter2);
    }

    return;
  }

  function nextQuestion() {
    let newQuestions = [...questions];

    newQuestions.shift();
    console.log(newQuestions.length);
    setQuestions(newQuestions);
  }

  function actualProgress(answer) {
    if (answer == "correct") {
      setQuestionsResult((prevState) => ({
        ...prevState,
        acertos: prevState.acertos++,
      }));
    } else {
      setQuestionsResult((prevState) => ({
        ...prevState,
        erros: prevState.erros++,
      }));
    }
  }

  function startQuizz() {
    if (filter1 === "Nenhuma") {
      setAlertShowQuestions(true);
      setTimeout(() => {
        setAlertShowQuestions(false);
      }, 5000);

      return;
    } else {
      setShowQuestions(true);
    }
  }

  // FINALIZAR O QUIZZ E RESETAR TODOS OS VALORES
  function endQuizz() {
    //setQuestions(questionsData)
    setFilter1("Nenhuma");
    setFilter2("Todas");
    setFilter2Questions([]);
    setQuestionsResult({
      acertos: 0,
      erros: 0,
    });
    setShowQuestions(false);
    setConclude(false);
  }

  // EXIBIR OS RESULTADOS
  function concludeQuizz() {
    setConclude(true);
  }

  return (
    <>
      {!showQuestions && (
        <div className="filters">
          <div className="filter1">
            Disciplina:{" "}
            <select
              name="disciplina"
              id="disciplina"
              value={filter1}
              onChange={(e) => handleFilter1(e)}
            >
              <option value="Nenhuma">Nenhuma</option>
              <option value="Física">Física</option>
              <option value="Biologia">Biologia</option>
              <option value="Filosofia">Filosofia</option>
              <option value="História">História</option>
              <option value="Programação">Programação</option>
            </select>
          </div>

          <div className="filter2">
            Assunto:{" "}
            <select
              name="assunto"
              id="assunto"
              value={filter2}
              onChange={(e) => handleFilter2(e)}
            >
              <option>Todas</option>
              {filter2Questions.map((item, i) => (
                <option key={i}>{item}</option>
              ))}
            </select>
          </div>

          <button onClick={() => startQuizz()}>Filtrar</button>
        </div>
      )}

      {alertShowQuestions && (
        <Alert
          message={"Selecione alguma disciplina antes de iniciar o simulado!"}
        />
      )}

      {questions &&
        !conclude &&
        showQuestions &&
        questions.map((question, i) => {
          if (i == 0) {
            return (
              <>
                <div className="actualQ_totalQ">
                  { totalQuestionsFiltered.length - questions.length + 1}/
                  {totalQuestionsFiltered.length}
                </div>
                <Question
                  key={i}
                  questionData={question}
                  nextQuestion={nextQuestion}
                  actualProgress={actualProgress}
                  concludeQuizz={concludeQuizz}
                />
              </>
            );
          } else {
            return;
          }
        })}

      {((questions.length == 0 && filter1 !== "Nenhuma") || conclude) && (
        <div className="resultDiv">
          <div className="erros_e_acertos">
            <div className="acertos">
              Acertos: <span>{questionsResult.acertos}</span>{" "}
            </div>
            <div className="erros">
              Erros: <span>{questionsResult.erros}</span>
            </div>
          </div>

          <div className="taxa_percentual">
            Você acertou{" "}
            <span>
              {((questionsResult.acertos / totalQuestionsFiltered.length) * 100).toFixed(0)}%
            </span>{" "}
            das questões!
          </div>

          <div className="endQuizz" onClick={() => endQuizz()}>
            Finalizar
          </div>
        </div>
      )}
    </>
  );
};

export default QuizesPage;
