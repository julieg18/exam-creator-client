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

  onCreateMultiOptionQuestionHandler = (type, options, answer) => {
    const question = {
      name: this.state.questionName,
      type: this.state.questionType,
      options,
      answer,
    };

    const isNameEmpty = /^\s*$/.test(question.name);
    const isAOptionEmpty = question.options.every((opt) =>
      /^\s*$/.test(opt.name),
    );
    const doesQuestionHaveAnswer = answer.length !== 0;

    if (isNameEmpty) {
      this.setState({
        error: 'Your exam question must have a name.',
      });
    } else if (isAOptionEmpty) {
      this.setState({
        error: 'Your question options must not be empty.',
      });
    } else if (!doesQuestionHaveAnswer) {
      this.setState({
        error: `Your question must have ${
          type === 'checkbox' ? 'some options' : 'an option'
        } checked as correct.`,
      });
    } else {
      console.log('PERF');
    }
    //this.props.addQuestionHandler(question);
  };

  onCreateTrueOrFalseQuestionHandler = (answer) => {};

  renderFormType = () => {
    const radioForm = (
      <CreateQuestionRadioForm
        onCreateQuestion={this.onCreateMultiOptionQuestionHandler}
      />
    );
    const checkboxForm = (
      <CreateQuestionCheckboxForm
        onCreateQuestion={this.onCreateMultiOptionQuestionHandler}
      />
    );
    const trueOrFalseForm = (
      <CreateQuestionTrueOrFalseForm
        onCreateQuestion={this.onCreateTrueOrFalseQuestionHandler}
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
        <h2>Add Question:</h2>
        {this.state.error ? (
          <Alert variant="info">
            <span>&#9888; </span>
            {this.state.error}
          </Alert>
        ) : (
          ''
        )}
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
