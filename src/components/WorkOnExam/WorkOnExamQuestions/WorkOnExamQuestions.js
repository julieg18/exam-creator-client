import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CreateQuestion from './CreateQuestion/CreateQuestion';
import EditQuestion from './EditQuestion/EditQuestion';
import QuestionsSoFar from './QuestionsSoFar/QuestionsSoFar';
import './WorkOnExamQuestions.css';

class WorkOnExamQuestions extends React.Component {
  state = {
    questions: this.props.examQuestions,
    questionToBeEdited: {},
    isWindowMobileSize: false,
    currentActiveTab: 'workOnQuestion',
    hasQuestionsChanged: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateIsWindowMobileSize.bind(this));
    this.updateIsWindowMobileSize();
  }

  componentWillUnmount() {
    this.props.completeExamQuestions(
      this.state.questions,
      this.state.hasQuestionsChanged,
    );
    window.removeEventListener('resize', this.updateIsWindowMobileSize);
  }

  updateIsWindowMobileSize = () => {
    let isCurrentWindowMobileSize = window.innerWidth <= 500;
    if (isCurrentWindowMobileSize !== this.state.isWindowMobileSize) {
      this.setState({ isWindowMobileSize: window.innerWidth <= 500 });
    }
  };

  changeTab = (tab) => {
    this.setState({ currentActiveTab: tab });
  };

  startEditingQuestion = (questionToBeEdited) => {
    this.setState({
      questionToBeEdited,
    });
  };

  editQuestion = (question) => {
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
      hasQuestionsChanged: true,
    });
  };

  addQuestion = (question) => {
    const questions = clonedeep(this.state.questions);
    questions.push(question);
    this.setState({
      questions,
      hasQuestionsChanged: true,
    });
  };

  deleteQuestion = (questionId) => {
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
        hasQuestionsChanged: true,
      });
    }
  };

  render() {
    let workOnExamQuestionsMain = (
      <div className="WorkOnExamQuestionsMain">
        <QuestionsSoFar
          editQuestionStart={this.startEditingQuestion}
          questions={this.state.questions}
          deleteQuestion={this.deleteQuestion}
        />
        {this.state.questionToBeEdited.id ? (
          <EditQuestion
            question={this.state.questionToBeEdited}
            editQuestion={this.editQuestion}
            key={this.state.questionToBeEdited.id}
          />
        ) : (
          <CreateQuestion onCreateQuestion={this.addQuestion} />
        )}
      </div>
    );
    if (this.state.isWindowMobileSize) {
      workOnExamQuestionsMain = (
        <div className="MobileWorkOnExamQuestionsMain">
          <Tabs
            activeKey={this.state.currentActiveTab}
            onSelect={this.changeTab}
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
                  editQuestion={this.editQuestion}
                  key={this.state.questionToBeEdited.id}
                />
              ) : (
                <CreateQuestion onCreateQuestion={this.addQuestion} />
              )}
            </Tab>
            <Tab eventKey="questions" title="Questions So Far">
              <QuestionsSoFar
                editQuestionStart={this.startEditingQuestion}
                questions={this.state.questions}
                deleteQuestion={this.deleteQuestion}
                changeTab={this.changeTab}
              />
            </Tab>
          </Tabs>
        </div>
      );
    }
    return (
      <div className="WorkOnExamQuestions">
        <h1>{this.props.heading}</h1>
        {workOnExamQuestionsMain}
      </div>
    );
  }
}

export default WorkOnExamQuestions;
