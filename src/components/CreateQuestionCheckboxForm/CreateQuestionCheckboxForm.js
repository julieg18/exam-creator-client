import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import shortid from 'shortid';
import './CreateQuestionCheckboxForm.css';

class CreateQuestionCheckboxForm extends React.Component {
  state = {
    questionOptions: [
      {
        id: shortid.generate(),
        name: '',
        answer: false,
      },
      {
        id: shortid.generate(),
        name: '',
        answer: false,
      },
    ],
  };

  handleOptionAnswerChange = (e) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const option = this.state.questionOptions.find(
      (opt) => opt.id === e.target.getAttribute('data-id'),
    );
    const editedOptions = newQuestionOptions.map((opt) => {
      if (opt.id === option.id) {
        opt.answer = !option.answer;
      }
      return opt;
    });
    this.setState({
      questionOptions: editedOptions,
    });
  };

  handleOptionNameChange = (e) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.map((option) => {
      if (option.id === e.target.getAttribute('data-id')) {
        option.name = e.target.value;
      }
      return option;
    });
    this.setState({
      questionOptions: editedOptions,
    });
  };

  handleOptionDelete = (e) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
  };

  handleOptionAdd = (e) => {};

  createQuestionInfoHandler = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="CreateQuestionCheckboxForm">
        <Form onSubmit={this.createQuestionInfoHandler}>
          <Form.Label>Create Your Options:</Form.Label>
          <p>
            Add or delete as many question options as you would like. Check the
            correct options.
          </p>
          {this.state.questionOptions.map((opt) => (
            <InputGroup key={`option-${opt.id}`}>
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  data-id={opt.id}
                  onClick={this.handleOptionAnswerChange}
                  name="answer"
                />
              </InputGroup.Prepend>
              <FormControl
                data-id={opt.id}
                onChange={this.handleOptionNameChange}
                value={opt.name}
                name="option"
              />
              <InputGroup.Append>
                <Button
                  variant="success"
                  data-id={opt.id}
                  onClick={this.handleOptionAdd}
                >
                  +
                </Button>
                <Button
                  variant="danger"
                  data-id={opt.id}
                  onClick={this.handleOptionDelete}
                >
                  &times;
                </Button>
              </InputGroup.Append>
            </InputGroup>
          ))}
          <Button variant="info" type="submit">
            Add Question
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateQuestionCheckboxForm;
