import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import './MultipleQuestionOptionsForm.css';

const MultipleQuestionOptionsForm = (props) => {
  function handleOptionAnswerChange(e) {
    const inputId = e.target.getAttribute('data-id');
    const childInput = e.target.querySelector('input');
    if (inputId) {
      props.onChangeOptionAnswer(inputId);
    } else {
      props.onChangeOptionAnswer(childInput.getAttribute('data-id'));
    }
  }

  function handleOptionNameChange(e) {
    props.onChangeOptionName(e.target.getAttribute('data-id'), e.target.value);
  }

  function handleOptionDelete(e) {
    props.onDeleteOption(e.target.getAttribute('data-id'));
  }

  function handleOptionAdd(e) {
    props.onAddOption(e.target.getAttribute('data-id'));
  }

  return (
    <div className="MultipleQuestionOptionsForm">
      <Form.Label>
        {props.areOptionsBeingEdited ? 'Edit' : 'Create'} Your Options:
      </Form.Label>
      <p>
        Add or delete as many question options as you would like. Check the
        correct options.
      </p>
      {props.questionOptions.map((opt) => (
        <InputGroup key={`option-${opt.optionId}`}>
          <InputGroup.Prepend onClick={handleOptionAnswerChange}>
            {props.questionType === 'checkbox' ? (
              <InputGroup.Checkbox
                checked={opt.answer === true}
                name="answer"
                data-id={opt.optionId}
                onChange={handleOptionAnswerChange}
              />
            ) : (
              <InputGroup.Radio
                data-id={opt.optionId}
                checked={opt.answer === true}
                name="answer"
                onChange={handleOptionAnswerChange}
              />
            )}
          </InputGroup.Prepend>
          <FormControl
            data-id={opt.optionId}
            onChange={handleOptionNameChange}
            value={opt.name}
            name="option"
          />
          <InputGroup.Append>
            <Button
              variant="success"
              data-id={opt.optionId}
              onClick={handleOptionAdd}
            >
              +
            </Button>
            <Button
              variant="danger"
              data-id={opt.optionId}
              onClick={handleOptionDelete}
            >
              &times;
            </Button>
          </InputGroup.Append>
        </InputGroup>
      ))}
    </div>
  );
};

export default MultipleQuestionOptionsForm;
