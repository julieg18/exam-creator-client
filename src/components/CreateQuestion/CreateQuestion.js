import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import CreateQuestionRadioForm from '../CreateQuestionRadioForm/CreateQuestionRadioForm';
import CreateQuestionCheckboxForm from '../CreateQuestionCheckboxForm/CreateQuestionCheckboxForm';
import CreateQuestionTrueOrFalseForm from '../CreateQuestionTrueOrFalseForm/CreateQuestionTrueOrFalseForm';

class CreateQuestion extends React.Component {
  state = {
    questionType: 'radio',
    questionName: '',
    error: '',
  };

  handleQuestionTypeChange = (e) => {
    this.setState({ questionType: e.target.value });
  };

  handleQuestionNameChange = (e) => {
    this.setState({ questionName: e.target.value });
  };

  onCreateQuestionHandler = (options, answer) => {
    const question = {
      name: this.state.questionName,
      type: this.state.questionType,
      options,
      answer,
    };
    //this.props.addQuestionHandler(question);
  };

  renderFormType = () => {
    const radioForm = (
      <CreateQuestionRadioForm
        onCreateQuestion={this.onCreateQuestionHandler}
      />
    );
    const checkboxForm = (
      <CreateQuestionCheckboxForm
        onCreateQuestion={this.onCreateQuestionHandler}
      />
    );
    const trueOrFalseForm = (
      <CreateQuestionTrueOrFalseForm
        onCreateQuestion={this.onCreateQuestionHandler}
      />
    );
    switch (this.state.questionType) {
      case 'radio':
        return radioForm;
      case 'checkbox':
        return checkboxForm;
      default:
        return trueOrFalseForm;
    }
  };

  render() {
    return (
      <div className="CreateQuestion">
        {this.props.error ? (
          <Alert variant="info">
            <span>&#9888; </span>
            {this.props.error}
          </Alert>
        ) : (
          ''
        )}
        <h2>Add Question:</h2>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            onChange={this.handleQuestionNameChange}
            placeholder="Name"
            type="text"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>What kind of question is it?</Form.Label>
          <Form.Control
            value={this.state.questionType}
            onChange={this.handleQuestionTypeChange}
            as="select"
          >
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="trueOrFalse">True Or False</option>
          </Form.Control>
        </Form.Group>
        {this.renderFormType()}
      </div>
    );
  }
}

export default CreateQuestion;
