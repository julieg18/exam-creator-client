import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CreateQuestion from './CreateQuestion/CreateQuestion';
import EditQuestion from './EditQuestion/EditQuestion';
import QuestionsSoFar from './QuestionsSoFar/QuestionsSoFar';
import './CreateAExamQuestions.css';

class CreateAExamQuestions extends React.Component {
  state = {
    questions: this.props.examQuestions,
    questionToBeEdited: {},
    isWindowMobileSize: false,
    currentActiveTab: 'workOnQuestion',
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateIsWindowMobileSize.bind(this));
    this.updateIsWindowMobileSize();
  }

  componentWillUnmount() {
    this.props.createExamQuestions(this.state.questions);
    window.removeEventListener('resize', this.updateIsWindowMobileSize);
  }

  updateIsWindowMobileSize = () => {
    let isCurrentWindowMobileSize = window.innerWidth <= 500;
    if (isCurrentWindowMobileSize !== this.state.isWindowMobileSize) {
      this.setState({ isWindowMobileSize: window.innerWidth <= 500 });
    }
  };

  changeTabHandler = (tab) => {
    this.setState({ currentActiveTab: tab });
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

  deleteQuestionHandler = (questionId) => {
    const questions = clonedeep(this.state.questions);
    const editedQuestions = questions.filter(
      (question) => question.id !== questionId,
    );
    if (this.state.questionToBeEdited.id === questionId) {
      this.setState({
        questions: editedQuestions,
        questionToBeEdited: {},
      });
    } else {
      this.setState({
        questions: editedQuestions,
      });
    }
  };

  editQuestionStartHandler = (questionToBeEdited) => {
    this.setState({
      questionToBeEdited,
    });
  };

  render() {
    let createExamQuestionsMain = (
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
    );
    if (this.state.isWindowMobileSize) {
      createExamQuestionsMain = (
        <div className="MobileCreateExamQuestionsMain">
          <Tabs
            activeKey={this.state.currentActiveTab}
            onSelect={this.changeTabHandler}
          >
            <Tab
              eventKey="workOnQuestion"
              title={
                this.state.questionToBeEdited.id
                  ? 'Edit Question'
                  : 'Create Question'
              }
            >
              {this.state.questionToBeEdited.id ? (
                <EditQuestion
                  question={this.state.questionToBeEdited}
                  editQuestion={this.editQuestionHandler}
                />
              ) : (
                <CreateQuestion onCreateQuestion={this.addQuestionHandler} />
              )}
            </Tab>
            <Tab eventKey="questions" title="Questions So Far">
              <QuestionsSoFar
                editQuestionStart={this.editQuestionStartHandler}
                questions={this.state.questions}
                deleteQuestion={this.deleteQuestionHandler}
                changeTab={this.changeTabHandler}
              />
            </Tab>
          </Tabs>
        </div>
      );
    }
    return (
      <div className="CreateAExamQuestions">
        <h1>Create Questions For Your Exam</h1>
        {createExamQuestionsMain}
      </div>
    );
  }
}

export default CreateAExamQuestions;
