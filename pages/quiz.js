import React from 'react';
import db from '../db.json';
import Head from 'next/head';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import AlternativesForm from '../src/components/AlternativeForm';
//import data from '../db';
//import Tomoyo from '../src/assets/Tomoyo';

function ResultWidget({ results }) {
  return (

    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/*{results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}*/}

          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}

        </ul>
      </Widget.Content>
    </Widget>

  );
}

function LoadingWidget() {
  return (
    <QuizContainer>
      <Widget>
        <Widget.Header>
          Carregando...
      </Widget.Header>

        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src="https://thumbs.gfycat.com/DependableTerribleCornsnake-size_restricted.gif"
        />

      </Widget>

      <Widget>

        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src="https://3.bp.blogspot.com/-LumSz4RviXU/WMcwMTtBdxI/AAAAAAAABJc/J2RpLiunTAEB5X5b6UbRpzKF_XgN-j5lQCLcB/s640/cardcaptor-sakura-transform-16060371b9.gif"
        />
      </Widget>

      <Widget>
        <Widget.Content>
          ~ Aguardando a transformação das garotas mágicas ~
      </Widget.Content>
      </Widget>

    </QuizContainer>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {

  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  const [input, setInput] = React.useState(false);

  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>

        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(E) => {
            E.preventDefault();
            setIsQuestionSubmited(true);
            setInput(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
              setInput(false);
            }, 1 * 3000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {

            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                  className="quiz"
                  disabled={input}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/*<pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}


          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
        </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>

      </Widget.Content>
    </Widget>

  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      {screenState === screenStates.LOADING && (
        <QuizBackground backgroundImage={db.bgL}>
          <QuizContainer>
            <LoadingWidget />
          </QuizContainer>
        </QuizBackground>

      )}


      {screenState === screenStates.QUIZ && (
        <QuizBackground backgroundImage={db.bgQ}>
          <Head>
            <title>AluraQuiz - Modelo Base </title>
          </Head>
          <QuizContainer>

            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
        )

        </QuizContainer>
        </QuizBackground>
      )}

      {screenState === screenStates.RESULT && (
        <QuizBackground backgroundImage={db.bgR}>
          <QuizContainer>
            <ResultWidget results={results} />
          </QuizContainer>
        </QuizBackground>
      )}

    </>
  );
}