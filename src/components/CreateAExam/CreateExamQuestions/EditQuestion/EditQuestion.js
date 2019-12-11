import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import shortid from 'shortid';
import clonedeep from 'lodash.clonedeep';
import MultipleQuestionOptionsForm from '../MultipleQuestionOptionsForm/MultipleQuestionOptionsForm';
import TrueOrFalseQuestionForm from '../TrueOrFalseQuestionForm/TrueOrFalseQuestionForm';
import './EditQuestion.css';

class CompleteQuestion extends React.Component {
  state = {
    questionType: this.props.questionToBeEdited.type || 'radio',
    questionName: this.props.questionToBeEdited.name || '',
    error: '',
    questionOptions: this.props.questionToBeEdited.options || [
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

  handleQuestionTypeChange = (e) => {
    this.setState({ questionType: e.target.value });
  };

  handleQuestionNameChange = (e) => {
    this.setState({ questionName: e.target.value });
  };

  handleQuestionOptionNameChange = (optionId, newName) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.map((option) => {
      if (option.id === optionId) {
        option.name = newName;
      }
      return option;
    });
    this.setState({
      questionOptions: editedOptions,
    });
  };

  handleQuestionOptionAdd = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const newQuestionOption = {
      id: shortid.generate(),
      name: '',
      answer: false,
    };
    const optionIndex = newQuestionOptions.findIndex(
      (option) => option.id === optionId,
    );
    newQuestionOptions.splice(optionIndex + 1, 0, newQuestionOption);
    this.setState({
      questionOptions: newQuestionOptions,
    });
  };

  handleQuestionOptionDelete = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.filter(
      (option) => option.id !== optionId,
    );
    if (this.state.questionOptions.length > 2) {
      this.setState({
        questionOptions: editedOptions,
      });
    }
  };

  onCompleteMultiOptionQuestionHandler = (type, options, answer) => {
    const question = {
      id: this.props.questionToBeEdited.id || shortid.generate(),
      name: this.state.questionName,
      type: this.state.questionType,
      options,
      answer,
    };

    const isNameEmpty = /^\s*$/.test(question.name);
    const isAOptionEmpty = question.options.some((opt) => {
      return /^\s*$/.test(opt.name);
    });
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
      this.props.completeQuestion(question);
      this.setState({
        questionType: 'radio',
        questionName: '',
        error: '',
      });
    }
  };

  onCompleteTrueOrFalseQuestionHandler = (answer) => {
    const question = {
      id: this.props.questionToBeEdited.id || shortid.generate(),
      name: this.state.questionName,
      type: this.state.questionType,
      options: [],
      answer,
    };

    const isNameEmpty = /^\s*$/.test(question.name);
    const isAnswerBoolean = typeof question.answer === 'boolean';

    if (isNameEmpty) {
      this.setState({
        error: 'Your exam question must have a name.',
      });
    } else if (!isAnswerBoolean) {
      this.setState({
        error: 'You must select true or false for your question.',
      });
    } else {
      this.props.completeQuestion(question);
      this.setState({
        questionType: 'radio',
        questionName: '',
        error: '',
      });
    }
  };

  renderFormType = () => {
    // const radioForm = (
    //   // <QuestionRadioForm
    //   //   questionToBeEdited={this.props.questionToBeEdited}
    //   //   onCompleteQuestion={this.onCompleteMultiOptionQuestionHandler}
    //   // />
    // );
    // const checkboxForm = (
    //   // <QuestionCheckboxForm
    //   //   error={this.state.error}
    //   //   questionToBeEdited={this.props.questionToBeEdited}
    //   //   onCompleteQuestion={this.onCompleteMultiOptionQuestionHandler}
    //   // />
    // );
    // const trueOrFalseForm = (
    //   // <CompleteQuestionTrueOrFalseForm
    //   //   questionToBeEdited={this.props.questionToBeEdited}
    //   //   onCompleteQuestion={this.onCompleteTrueOrFalseQuestionHandler}
    //   // />
    // );
    // switch (this.state.questionType) {
    //   case 'radio':
    //     return radioForm;
    //   case 'checkbox':
    //     return checkboxForm;
    //   default:
    //     return trueOrFalseForm;
    // }
  };

  render() {
    return (
      <div className="CompleteQuestion">
        <h2>Add Question:</h2>
        {this.state.error ? (
          <Alert variant="info">
            <span>&#9888; </span>
            {this.state.error}
          </Alert>
        ) : (
          ''
        )}
        <Form
          onSubmit={
            this.state.questionType === 'trueOrFalse'
              ? this.onCompleteTrueOrFalseQuestionHandler
              : this.onCompleteMultiOptionQuestionHandler
          }
        >
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              onChange={this.handleQuestionNameChange}
              placeholder="Name"
              type="text"
              value={this.state.questionName}
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
          <Button variant="info" type="submit">
            {this.props.questionToBeEdited.id
              ? 'Edit Question'
              : 'Add Question'}
          </Button>
        </Form>
      </div>
    );
  }
}

export default CompleteQuestion;
