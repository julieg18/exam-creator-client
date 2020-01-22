import React from 'react';
import shortid from 'shortid';
import Accordion from 'react-bootstrap/Accordion';
import QuestionCard from '../QuestionCard/QuestionCard';
import './QuestionsSoFar.css';

const QuestionsSoFar = (props) => {
  function changeTabHandler() {
    if (window.innerWidth <= 500) {
      props.changeTab('workOnQuestion');
    }
  }

  return (
    <div className="QuestionsSoFar">
      <div className="scrollOnOverflow">
        <h2>Questions So Far</h2>
        <Accordion>
          {props.questions.map((question, index) => {
            return (
              <QuestionCard
                key={shortid.generate()}
                eventKey={index}
                question={question}
                editQuestion={() => {
                  changeTabHandler();
                  props.editQuestionStart(question);
                }}
                deleteQuestion={() => {
                  props.deleteQuestion(question.id);
                }}
              />
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default QuestionsSoFar;
