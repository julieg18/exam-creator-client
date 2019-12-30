import React from 'react';
import shortid from 'shortid';
import Accordion from 'react-bootstrap/Accordion';
import MultiChoiceCard from '../MultiChoiceCard/MultiChoiceCard';
import TrueOrFalseCard from '../TrueOrFalseCard/TrueOrFalseCard';
import './QuestionsSoFar.css';

class QuestionsSoFar extends React.Component {
  changeTabHandler = () => {
    console.log('changeTabHandler');
    if (window.innerWidth <= 500) {
      this.props.changeTab('workOnQuestion');
    }
  };

  render() {
    return (
      <div className="QuestionsSoFar">
        <div className="scrollOnOverflow">
          <h2>Questions So Far</h2>
          <Accordion>
            {this.props.questions.map((question, index) => {
              if (question.type === 'trueOrFalse') {
                return (
                  <TrueOrFalseCard
                    key={shortid.generate()}
                    eventKey={index}
                    question={question}
                    editQuestion={() => {
                      this.changeTabHandler();
                      this.props.editQuestionStart(question);
                    }}
                    deleteQuestion={() => {
                      this.props.deleteQuestion(question.id);
                    }}
                  />
                );
              } else {
                return (
                  <MultiChoiceCard
                    key={shortid.generate()}
                    eventKey={index}
                    question={question}
                    type={question.type}
                    editQuestion={() => {
                      this.changeTabHandler();
                      this.props.editQuestionStart(question);
                    }}
                    deleteQuestion={() => {
                      this.props.deleteQuestion(question.id);
                    }}
                  />
                );
              }
            })}
          </Accordion>
        </div>
      </div>
    );
  }
}

export default QuestionsSoFar;
