import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CreateQuestionTrueOrFalseForm extends React.Component {
  createQuestionInfo = (e) => {
    e.preventDefault();
    const answer = e.target.elements.trueOrFalse.value;
    const options = [];
    this.props.onCreateQuestion(options, answer);
  };

  render() {
    return (
      <div className="CreateQuestionTrueOrFalseForm">
        <Form onSubmit={this.createQuestionInfo}>
          <Form.Group>
            <Form.Label>What's the correct answer?</Form.Label>
            <div className="radio">
              <Form.Check
                value="true"
                name="trueOrFalse"
                type="radio"
                inline
                label="true"
              />
              <Form.Check
                value="false"
                name="trueOrFalse"
                type="radio"
                inline
                label="false"
              />
            </div>
          </Form.Group>
          <Button variant="info" type="submit">
            Add Question
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateQuestionTrueOrFalseForm;
