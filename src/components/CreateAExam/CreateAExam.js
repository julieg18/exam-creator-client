import React from 'react';
import { connect } from 'react-redux';
import CreateAExamTitle from './CreateAExamTitle/CreateAExamTitle';
import CreateAExamStart from './CreateAExamStart/CreateAExamStart';
import CreateExamStudents from './CreateExamStudents/CreateExamStudents';
import CreateExamQuestions from './CreateExamQuestions/CreateExamQuestions';
import {
  createExamReset,
  createExamTitle,
  createExamQuestions,
  createExamStudents,
} from '../../store/actions/index';
import './CreateAExam.css';
import CreateExamControls from './CreateExamControls/CreateExamControls';

class CreateAExam extends React.Component {
  state = {
    examPart: 'start',
  };

  nextExamPartHandler = () => {
    switch (this.state.examPart) {
      case 'start':
        this.setState({
          examPart: 'title',
        });
        break;
      case 'title':
        this.setState({
          examPart: 'questions',
        });
        break;
      case 'questions':
        this.setState({
          examPart: 'students',
        });
        break;
      case 'students':
        this.setState({
          examPart: 'finish',
        });
        break;
      default:
        return;
    }
  };

  backExamPartHandler = () => {
    switch (this.state.examPart) {
      case 'questions':
        this.setState({
          examPart: 'title',
        });
        break;
      case 'students':
        this.setState({
          examPart: 'questions',
        });
        break;
      case 'finish':
        this.setState({
          examPart: 'students',
        });
        break;
      default:
    }
  };

  resetCreateExamHandler = () => {
    this.setState({
      examPart: 'start',
    });
    this.props.createExamReset();
  };

  render() {
    const { title, questions, students } = this.props.exam;
    let examPartComponent = (
      <CreateAExamStart nextExamPart={this.nextExamPartHandler} />
    );
    switch (this.state.examPart) {
      case 'title':
        examPartComponent = (
          <CreateAExamTitle
            examTitle={title}
            createExamTitle={(title) => this.props.createExamTitle(title)}
            nextExamPart={this.nextExamPartHandler}
            resetCreateExam={this.resetCreateExamHandler}
          />
        );
        break;
      case 'questions':
        examPartComponent = (
          <CreateExamQuestions
            examQuestions={questions}
            createExamQuestions={(questions) =>
              this.props.createExamQuestions(questions)
            }
            nextExamPart={this.nextExamPartHandler}
            backExamPart={this.backExamPartHandler}
            resetCreateExam={this.resetCreateExamHandler}
          />
        );
        break;
      case 'students':
        examPartComponent = (
          <CreateExamStudents
            examStudents={students}
            createExamStudents={(students) =>
              this.props.createExamStudents(students)
            }
            nextExamPart={this.nextExamPartHandler}
            backExamPart={this.backExamPartHandler}
            resetCreateExam={this.resetCreateExamHandler}
          />
        );
        break;
      case 'finish':
        examPartComponent = <h1>FINISH</h1>;
        break;
      default:
        examPartComponent = (
          <CreateAExamStart nextExamPart={this.nextExamPartHandler} />
        );
    }
    return (
      <div className="CreateAExam">
        {examPartComponent}
        {this.state.examPart !== 'start' ? (
          <CreateExamControls
            examPart={this.state.examPart}
            forwardFunction={this.nextExamPartHandler}
            backwardFunction={this.backExamPartHandler}
            resetFunction={this.resetCreateExamHandler}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    createExam: { exam },
  } = state;
  return {
    exam,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createExamReset: () => dispatch(createExamReset()),
    createExamTitle: (title) => dispatch(createExamTitle(title)),
    createExamQuestions: (questions) =>
      dispatch(createExamQuestions(questions)),
    createExamStudents: (students) => dispatch(createExamStudents(students)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAExam);
