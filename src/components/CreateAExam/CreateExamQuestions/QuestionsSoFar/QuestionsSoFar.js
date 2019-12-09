import React from 'react';
import shortid from 'shortid';
import Accordion from 'react-bootstrap/Accordion';
import MultiChoiceCard from '../MultiChoiceCard/MultiChoiceCard';
import TrueOrFalseCard from '../TrueOrFalseCard/TrueOrFalseCard';
import './QuestionsSoFar.css';

class QuestionsSoFar extends React.Component {
  render() {
    return (
      <div className="QuestionsSoFar">
        <h2>Questions So Far</h2>
        <Accordion>
          {this.props.questions.map((question, index) => {
            if (question.type === 'trueOrFalse') {
              return (
                <TrueOrFalseCard
                  key={shortid.generate()}
                  eventKey={index}
                  question={question}
                />
              );
            } else {
              return (
                <MultiChoiceCard
                  key={shortid.generate()}
                  eventKey={index}
                  question={question}
                  type={question.type}
                />
              );
            }
          })}
        </Accordion>
      </div>
    );
  }
}

export default QuestionsSoFar;
