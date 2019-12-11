import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Button from 'react-bootstrap/Button';
import CreateQuestion from './CreateQuestion/CreateQuestion';
import EditQuestion from './EditQuestion/EditQuestion';
import QuestionsSoFar from './QuestionsSoFar/QuestionsSoFar';
import './CreateExamQuestions.css';

class CreateExamQuestions extends React.Component {
  state = {
    questions: [],
    questionToBeEdited: {},
  };

  editQuestionHandler = (question) => {
    const questions = clonedeep(this.state.questions);
    const editedQuestion = clonedeep(question);
    const editedQuestions = questions.map((question) => {
      if (question.id === editedQuestion.id) {
        return editedQuestion;
      } else {
        return question;
      }
    });
    this.setState({
      questions: editedQuestions,
      questionToBeEdited: {},
    });
  };

  addQuestionHandler = (question) => {
    const questions = clonedeep(this.state.questions);
    questions.push(question);
    this.setState({
      questions,
    });
  };

  editQuestionStartHandler = (questionToBeEdited) => {
    this.setState({
      questionToBeEdited,
    });
  };

  onNextHandler = () => {
    this.props.createExamQuestions(this.state.questions);
  };

  render() {
    return (
      <div className="CreateExamQuestions">
        <h1>Create Questions For Your Exam</h1>
        <div className="CreateExamQuestionsMain">
          <QuestionsSoFar
            editQuestionStart={this.editQuestionStartHandler}
            questions={this.state.questions}
          />
          {this.state.questionToBeEdited.id ? (
            <EditQuestion
              question={this.state.questionToBeEdited}
              editQuestion={this.editQuestionHandler}
            />
          ) : (
            <CreateQuestion onCreateQuestion={this.addQuestionHandler} />
          )}
        </div>
        <div className="Next">
          <Button
            variant="info"
            size="lg"
            onClick={this.props.createExamQuestions}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateExamQuestions;
