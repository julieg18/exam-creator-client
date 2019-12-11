import React from 'react';
import Form from 'react-bootstrap/Form';

class CompleteQuestionTrueOrFalseForm extends React.Component {
  changeAnswerHandler = (e) => {
    const value = e.target.value;
    let answer = value === 'true' ? true : false;
    this.props.onChangeAnswer(answer);
  };

  render() {
    return (
      <div className="CompleteQuestionTrueOrFalseForm">
        <Form.Group>
          <Form.Label>What's the correct answer?</Form.Label>
          <div className="radio">
            <Form.Check
              value="true"
              name="trueOrFalse"
              type="radio"
              inline
              label="true"
              checked={this.props.questionAnswer === true}
              onClick={this.changeAnswerHandler}
            />
            <Form.Check
              value="false"
              name="trueOrFalse"
              type="radio"
              inline
              label="false"
              checked={this.props.questionAnswer === false}
              onClick={this.changeAnswerHandler}
            />
          </div>
        </Form.Group>
      </div>
    );
  }
}

export default CompleteQuestionTrueOrFalseForm;
