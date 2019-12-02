import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Button from 'react-bootstrap/Button';
import CreateQuestion from '../CreateQuestion/CreateQuestion';
import './CreateExamQuestions.css';

class CreateExamQuestions extends React.Component {
  state = {
    questions: [],
  };

  addQuestionHandler = (question) => {
    const questions = clonedeep(this.state.questions);
    questions.push(question);
    this.setState({
      questions,
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
          <div className="QuestionsList">
            <h2>Questions So Far:</h2>
          </div>
          <CreateQuestion addQuestionHandler={this.addQuestionHandler} />
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
