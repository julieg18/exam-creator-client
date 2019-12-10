import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Button from 'react-bootstrap/Button';
import CreateQuestion from './CreateQuestion/CreateQuestion';
import QuestionsSoFar from './QuestionsSoFar/QuestionsSoFar';
import CompleteQuestion from './CompleteQuestion/CompleteQuestion';
import './CreateExamQuestions.css';

class CreateExamQuestions extends React.Component {
  state = {
    questions: [],
    questionToBeEdited: {},
  };

  completeQuestionHandler = (question) => {
    if (!this.state.questionToBeEdited.id) {
      const questions = clonedeep(this.state.questions);
      questions.push(question);
      this.setState({
        questions,
      });
    } else {
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
    }
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
            editQuestionStartHandler={this.editQuestionStartHandler}
            questions={this.state.questions}
          />
          <CompleteQuestion
            questionToBeEdited={this.state.questionToBeEdited}
            completeQuestion={this.completeQuestionHandler}
          />
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
