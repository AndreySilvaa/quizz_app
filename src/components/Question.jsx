import React, { useRef } from "react";
import "../styles/question.css";
import { useState } from "react";

const Question = (props) => {
  const question = props.questionData;
  const optionsRef = useRef(null)
  const [selectedOption, setSelectedOption] = useState("");
  const [optionMarked, setOptionMarked] = useState([0, 0, 0, 0]);
  const [optionCorrect, setOptionCorrect] = useState([
    0,
    0,
    0,
    0,
  ]);
  const [optionFalse, setOptionFalse] = useState([
    0,
    0,
    0,
    0,
  ])
  const [questionFinished, setQuestionFinished] = useState(false)

  function selected(e) {

    if(!questionFinished){

      let allOptions = Array.from(e.currentTarget.querySelectorAll(".option"));
      let optionText =
        e.target.parentNode.getElementsByTagName("div")[0].innerText;
      let newOptionMarked = [0, 0, 0, 0];
  
      allOptions.map((option, i) => {
        if (option.innerText.split("\n")[1] == optionText) {
          newOptionMarked[i] = 1;
        }
      });
  
      
  
      setOptionMarked(newOptionMarked);
  
      setSelectedOption(optionText);
    }else{
      return
    }
  }

  function correct() {
    if(!questionFinished){

      let correctOptionText = question.answer;
      let optionsDiv = Array.from(
        optionsRef.current.getElementsByClassName("option")
      );
  
      
      let optionsText = optionsDiv.map((option, i) => {
        return optionsDiv[i].innerText.split('\n')[1]
      })
  
     
  
      let newCorrectOptions = [0, 0, 0, 0]
      let newFalseOptions = [0, 0, 0, 0]
  
      optionsDiv.map((option, i) => {

        // DESTACANDO QUAL ERA A ALTERNATIVA CORRETA
        if (option.getElementsByTagName("div")[0].innerText == correctOptionText) {
          newCorrectOptions[i] = 1
  
        }

        if(selectedOption !== correctOptionText){
            
          newFalseOptions[optionsText.indexOf(selectedOption)] = 1

          props.actualProgress('errou')
        }
        
        if(selectedOption == correctOptionText){
          props.actualProgress('correct')
        }
      });
  
      console.log(newFalseOptions)
  
      setOptionFalse(newFalseOptions)
      setOptionCorrect(newCorrectOptions)

      setQuestionFinished(true)

    }else{
      return
    }
  }

  function handleNextQuestion(){

    if(questionFinished){
      // Resetando valores
      let newQuestionMarked = [0, 0, 0, 0]
      let newQuestionCorrect = [0, 0, 0, 0]
      let newQuestionFalse = [0, 0, 0, 0]
      let newQuestionFinished = false
  
      setOptionCorrect(newQuestionCorrect)
      setOptionMarked(newQuestionMarked)
      setOptionFalse(newQuestionFalse)
      setQuestionFinished(newQuestionFinished)
  
      props.nextQuestion()

    }else{
      return
    }
  }

  return (
    <div className="questionContainer">
      <p>{question.query}</p>

      <div ref={optionsRef} className={`options`} onClick={(e) => selected(e)}>
        <div
          className={`option ${optionMarked[0] ? "marked" : ""} ${
            optionCorrect[0] ? "correctOption" : ""
          } ${optionFalse[0] ? "falseOption" : ""}`}
        >
          <span>a)</span>
          <div>{question.options[0]}</div>
        </div>

        <div className={`option ${optionMarked[1] ? "marked" : ""} ${
            optionCorrect[1] ? "correctOption" : ""
          } ${optionFalse[1] ? "falseOption" : ""}`}>
          <span>b)</span>
          <div>{question.options[1]}</div>
        </div>

        <div className={`option ${optionMarked[2] ? "marked" : ""} ${
            optionCorrect[2] ? "correctOption" : ""
          } ${optionFalse[2] ? "falseOption" : ""}`}>
          <span>c)</span>
          <div>{question.options[2]}</div>
        </div>

        <div className={`option ${optionMarked[3] ? "marked" : ""} ${
            optionCorrect[3] ? "correctOption" : ""
          } ${optionFalse[3] ? "falseOption" : ""}`}>
          <span>d)</span>
          <div>{question.options[3]}</div>
        </div>
      </div>

      <div className="correct_or_next">
        <div className="correct" onClick={() => correct()}>
          Corrigir
        </div>
        <div className={`next ${!questionFinished ? "disabled" : ""}`} onClick={(e) => handleNextQuestion()}>
          Próxima
        </div>
      </div>

      <div className="conclude" onClick={() => props.concludeQuizz()}>
          Concluir
      </div>
    </div>
  );
};

export default Question;
