import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

class CreateQuestionCheckboxForm extends React.Component {
  state = {
    questionOptions: [
      {
        id: '0',
        name: '',
        answer: false,
      },
      {
        id: '1',
        name: '',
        answer: false,
      },
    ],
  };

  handleOptionChange = (e) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    newQuestionOptions.filter((option) => {
      console.log(option.id, e.target.getAttribute('data-id'));
      return option.id != e.target.getAttribute('data-id');
    });
    console.log(newQuestionOptions);
  };

  createQuestionInfoHandler = (e) => {
    e.preventDefault();
    console.log(e.target.elements.answer[0].checked);
    console.log(e.target.elements.answer[1].checked);
    console.log(e.target.elements.option[0].value);
    console.log(e.target.elements.option[1].value);
  };

  render() {
    return (
      <div className="CreateQuestionCheckboxForm">
        <Form onSubmit={this.createQuestionInfoHandler}>
          {this.state.questionOptions.map((opt, i) => (
            <InputGroup key={`option-${i}`}>
              <InputGroup.Prepend>
                <InputGroup.Radio name="answer" />
              </InputGroup.Prepend>
              <FormControl
                data-id="0"
                onChange={this.handleOptionChange}
                value={opt.name}
                name="option"
              />
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
