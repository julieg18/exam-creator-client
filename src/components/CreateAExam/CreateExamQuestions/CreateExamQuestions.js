import React from 'react';
import clonedeep from 'lodash.clonedeep';
import CreateQuestion from './CreateQuestion/CreateQuestion';
import EditQuestion from './EditQuestion/EditQuestion';
import QuestionsSoFar from './QuestionsSoFar/QuestionsSoFar';
import './CreateExamQuestions.css';

class CreateExamQuestions extends React.Component {
  state = {
    questions: this.props.examQuestions,
    questionToBeEdited: {},
  };

  componentWillUnmount() {
    this.props.createExamQuestions(this.state.questions);
  }

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

  deleteQuestionHandler = (questionId) => {
    const questions = clonedeep(this.state.questions);
    const editedQuestions = questions.filter(
      (question) => question.id !== questionId,
    );
    this.setState({
      questions: editedQuestions,
    });
  };

  editQuestionStartHandler = (questionToBeEdited) => {
    this.setState({
      questionToBeEdited,
    });
  };

  render() {
    return (
      <div className="CreateExamQuestions">
        <h1>Create Questions For Your Exam</h1>
        <div className="CreateExamQuestionsMain">
          <QuestionsSoFar
            editQuestionStart={this.editQuestionStartHandler}
            questions={this.state.questions}
            deleteQuestion={this.deleteQuestionHandler}
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
      </div>
    );
  }
}

export default CreateExamQuestions;
