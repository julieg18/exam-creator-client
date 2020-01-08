import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import shortid from 'shortid';
import clonedeep from 'lodash.clonedeep';
import MultipleQuestionOptionsForm from '../MultipleQuestionOptionsForm/MultipleQuestionOptionsForm';
import TrueOrFalseQuestionForm from '../TrueOrFalseQuestionForm/TrueOrFalseQuestionForm';
import Button from 'react-bootstrap/Button';
import './CreateQuestion.css';

class CreateQuestion extends React.Component {
  state = {
    questionType: 'radio',
    questionName: '',
    error: '',
    questionOptions: [
      {
        optionId: shortid.generate(),
        name: '',
        answer: false,
      },
      {
        optionId: shortid.generate(),
        name: '',
        answer: false,
      },
    ],
    questionAnswer: [],
  };

  handleQuestionTypeChange = (e) => {
    const questionType = e.target.value;
    const questionOptions =
      questionType === 'trueOrFalse'
        ? []
        : [
            {
              optionId: shortid.generate(),
              name: '',
              answer: false,
            },
            {
              optionId: shortid.generate(),
              name: '',
              answer: false,
            },
          ];
    const questionAnswer = questionType === 'trueOrFalse' ? true : [];
    this.setState({ questionType, questionOptions, questionAnswer });
  };

  handleQuestionNameChange = (e) => {
    this.setState({ questionName: e.target.value });
  };

  handleQuestionOptionNameChange = (optionId, newName) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.map((opt) => {
      if (opt.optionId === optionId) {
        opt.name = newName;
      }
      return opt;
    });
    const editedAnswer = editedOptions.filter((opt) => opt.answer === true);
    this.setState({
      questionOptions: editedOptions,
      questionAnswer: editedAnswer,
    });
  };

  handleTrueOrFalseAnswerChange = () => {
    this.setState({ questionAnswer: !this.state.questionAnswer });
  };

  handleCheckboxAnswerChange = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.map((opt) => {
      if (optionId === opt.optionId) {
        opt.answer = !opt.answer;
      }
      return opt;
    });
    const editedAnswer = editedOptions.filter((opt) => opt.answer === true);
    this.setState({
      questionOptions: editedOptions,
      questionAnswer: editedAnswer,
    });
  };

  handleRadioAnswerChange = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.map((opt) => {
      if (opt.optionId === optionId) {
        opt.answer = true;
      } else {
        opt.answer = false;
      }
      return opt;
    });
    const editedAnswer = editedOptions.filter((opt) => opt.answer === true);
    this.setState({
      questionOptions: editedOptions,
      questionAnswer: editedAnswer,
    });
  };

  handleQuestionOptionAdd = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const newQuestionOption = {
      optionId: shortid.generate(),
      name: '',
      answer: false,
    };
    const optionIndex = newQuestionOptions.findIndex(
      (option) => option.optionId === optionId,
    );
    newQuestionOptions.splice(optionIndex + 1, 0, newQuestionOption);
    this.setState({
      questionOptions: newQuestionOptions,
    });
  };

  handleQuestionOptionDelete = (optionId) => {
    const newQuestionOptions = clonedeep(this.state.questionOptions);
    const editedOptions = newQuestionOptions.filter(
      (opt) => opt.optionId !== optionId,
    );
    if (this.state.questionOptions.length > 2) {
      const editedAnswer = editedOptions.filter((opt) => opt.answer === true);
      this.setState({
        questionOptions: editedOptions,
        questionAnswer: editedAnswer,
      });
    }
  };

  onCreateMultiOptionQuestionHandler = (e) => {
    e.preventDefault();
    const question = {
      name: this.state.questionName,
      type: this.state.questionType,
      options: this.state.questionOptions,
      answer: this.state.questionAnswer,
      id: shortid.generate(),
    };

    const isNameEmpty = /^\s*$/.test(question.name);
    const isAOptionEmpty = question.options.every((opt) =>
      /^\s*$/.test(opt.name),
    );
    const doesQuestionHaveAnswer = this.state.questionAnswer.length !== 0;

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
          this.state.questionType === 'checkbox' ? 'some options' : 'an option'
        } checked as correct.`,
      });
    } else {
      this.props.onCreateQuestion(question);
      this.setState({
        questionName: '',
        questionType: question.type,
        questionOptions: [
          {
            optionId: shortid.generate(),
            name: '',
            answer: false,
          },
          {
            optionId: shortid.generate(),
            name: '',
            answer: false,
          },
        ],
        questionAnswer: [],
        error: '',
      });
    }
  };

  onCreateTrueOrFalseQuestionHandler = (e) => {
    e.preventDefault();
    const question = {
      name: this.state.questionName,
      type: this.state.questionType,
      options: this.state.questionOptions,
      answer: this.state.questionAnswer,
      optionId: shortid.generate(),
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
      this.props.onCreateQuestion(question);
      this.setState({
        questionName: '',
        questionType: 'trueOrFalse',
        questionOptions: [],
        questionAnswer: true,
        error: '',
      });
    }
  };

  renderFormType = () => {
    const radioForm = (
      <MultipleQuestionOptionsForm
        onChangeOptionAnswer={this.handleRadioAnswerChange}
        onAddOption={this.handleQuestionOptionAdd}
        onDeleteOption={this.handleQuestionOptionDelete}
        questionType={this.state.questionType}
        questionOptions={this.state.questionOptions}
        onChangeOptionName={this.handleQuestionOptionNameChange}
        areOptionsBeingEdited={false}
      />
    );
    const checkboxForm = (
      <MultipleQuestionOptionsForm
        onChangeOptionAnswer={this.handleCheckboxAnswerChange}
        onAddOption={this.handleQuestionOptionAdd}
        onDeleteOption={this.handleQuestionOptionDelete}
        onChangeOptionName={this.handleQuestionOptionNameChange}
        questionOptions={this.state.questionOptions}
        questionType={this.state.questionType}
        areOptionsBeingEdited={false}
      />
    );
    const trueOrFalseForm = (
      <TrueOrFalseQuestionForm
        questionAnswer={this.state.questionAnswer}
        onChangeAnswer={this.handleTrueOrFalseAnswerChange}
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
        <div className="scrollOnOverflow">
          <h2>Create Question:</h2>
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
                ? this.onCreateTrueOrFalseQuestionHandler
                : this.onCreateMultiOptionQuestionHandler
            }
          >
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                onChange={this.handleQuestionNameChange}
                placeholder="Name"
                value={this.state.questionName}
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
            <Button variant="info" type="submit">
              Create Question
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default CreateQuestion;
