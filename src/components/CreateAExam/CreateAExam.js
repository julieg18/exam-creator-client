import React from 'react';
import { connect } from 'react-redux';
import CreateAExamTitle from '../CreateAExamTitle/CreateAExamTitle';
import CreateAExamStart from '../CreateAExamStart/CreateAExamStart';
import CreateExamStudents from '../CreateExamStudents/CreateExamStudents';
import CreateExamQuestions from '../CreateExamQuestions/CreateExamQuestions';
import './CreateAExam.css';

class CreateAExam extends React.Component {
  state = {
    hasExamCreationStarted: false,
    examTitle: '',
    examQuestions: [],
    examStudents: [],
  };

  createExamStartHandler = () => {
    this.setState({
      hasExamCreationStarted: true,
    });
  };

  createExamHandler = (examTitle) => {
    this.setState({
      examTitle,
    });
    console.log('exam is made with title');
  };

  createExamQuestionsHandler = (questions) => {
    this.setState({
      examQuestions: ['question 1'],
    });
    console.log('questions added');
  };

  createExamStudentsHandler = (students) => {
    this.setState({
      examStudents: ['student 1'],
    });
    console.log('students added');
  };

  render() {
    const {
      hasExamCreationStarted,
      examTitle,
      examQuestions,
      examStudents,
    } = this.state;
    const start = hasExamCreationStarted ? (
      ''
    ) : (
      <CreateAExamStart createExamStart={this.createExamStartHandler} />
    );
    const title = examTitle ? (
      ''
    ) : (
      <CreateAExamTitle createExamTitle={this.createExamHandler} />
    );
    const questions =
      examQuestions.length !== 0 ? (
        ''
      ) : (
        <CreateExamQuestions
          createExamQuestions={this.createExamQuestionsHandler}
        />
      );
    const students =
      examStudents.length !== 0 ? (
        ''
      ) : (
        <CreateExamStudents
          createExamStudents={this.createExamStudentsHandler}
        />
      );
    return (
      <div className="CreateAExam">
        {start || title || questions || students}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(null, mapDispatchToProps)(CreateAExam);
