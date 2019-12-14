import React from 'react';
import { connect } from 'react-redux';
import CreateAExamTitle from './CreateAExamTitle/CreateAExamTitle';
import CreateAExamStart from './CreateAExamStart/CreateAExamStart';
import CreateExamStudents from './CreateExamStudents/CreateExamStudents';
import CreateExamQuestions from './CreateExamQuestions/CreateExamQuestions';
import {
  createExamTitle,
  createExamQuestions,
  createExamStudents,
} from '../../store/actions/index';
import './CreateAExam.css';

class CreateAExam extends React.Component {
  state = {
    examPart: 'start',
  };

  changeComponentHandler = () => {
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
        console.log('questions');
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

  render() {
    const { title, questions, students } = this.props.exam;
    let examPartComponent = (
      <CreateAExamStart changeComponent={this.changeComponentHandler} />
    );
    switch (this.state.examPart) {
      case 'title':
        examPartComponent = (
          <CreateAExamTitle
            examTitle={title}
            createExamTitle={(title) => this.props.createExamTitle(title)}
            changeComponent={this.changeComponentHandler}
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
            changeComponent={this.changeComponentHandler}
          />
        );
        break;
      case 'students':
        examPartComponent = (
          <CreateExamStudents
            students={students}
            createExamStudents={(students) =>
              this.props.createExamStudents(students)
            }
            changeComponent={this.changeComponentHandler}
          />
        );
        break;
      case 'finish':
        examPartComponent = <h1>FINISH</h1>;
        break;
      default:
        examPartComponent = (
          <CreateAExamStart changeComponent={this.changeComponentHandler} />
        );
    }
    return <div className="CreateAExam">{examPartComponent}</div>;
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
    createExamTitle: (title) => dispatch(createExamTitle(title)),
    createExamQuestions: (questions) =>
      dispatch(createExamQuestions(questions)),
    createExamStudents: (students) => dispatch(createExamStudents(students)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAExam);
