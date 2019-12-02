import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CreateQuestion extends React.Component {
  onSubmitHandler = (e) => {
    this.props.addQuestionHandler();
  };

  render() {
    return (
      <div className="CreateQuestion">
        <h2>Add Question:</h2>
        <Form className="AddQuestionForm">
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control placeholder="Name" type="text"></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>What kind of question is it?</Form.Label>
            <Form.Control as="select">
              <option>Radio</option>
              <option>Checkbox</option>
              <option>True Or False</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button variant="info" onSubmit={this.onSubmitHandler}>
          Add Question
        </Button>
      </div>
    );
  }
}

export default CreateQuestion;
