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

  changeTabHandler = (tab) => {
    this.setState({ currentActiveTab: tab });
  };

  editQuestionStartHandler = (questionToBeEdited) => {
    this.setState({
      questionToBeEdited,
    });
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
      hasQuestionsChanged: true,
    });
  };

  addQuestionHandler = (question) => {
    const questions = clonedeep(this.state.questions);
    questions.push(question);
    this.setState({
      questions,
      hasQuestionsChanged: true,
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
        hasQuestionsChanged: true,
      });
    }
  };

  render() {
    let workOnExamQuestionsMain = (
      <div className="WorkOnExamQuestionsMain">
        <QuestionsSoFar
          editQuestionStart={this.editQuestionStartHandler}
          questions={this.state.questions}
          deleteQuestion={this.deleteQuestionHandler}
        />
        {this.state.questionToBeEdited.id ? (
          <EditQuestion
            question={this.state.questionToBeEdited}
            editQuestion={this.editQuestionHandler}
            key={this.state.questionToBeEdited.id}
          />
        ) : (
          <CreateQuestion onCreateQuestion={this.addQuestionHandler} />
        )}
      </div>
    );
    if (this.state.isWindowMobileSize) {
      workOnExamQuestionsMain = (
        <div className="MobileWorkOnExamQuestionsMain">
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
                  key={this.state.questionToBeEdited.id}
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
      <div className="WorkOnExamQuestions">
        <h1>{this.props.heading}</h1>
        {workOnExamQuestionsMain}
      </div>
    );
  }
}

export default WorkOnExamQuestions;
