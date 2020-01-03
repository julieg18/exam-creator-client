import React from 'react';
import { connect } from 'react-redux';
import CreateAExamTitle from './CreateAExamTitle/CreateAExamTitle';
import CreateAExamStart from './CreateAExamStart/CreateAExamStart';
import CreateAExamStudents from './CreateAExamStudents/CreateAExamStudents';
import CreateAExamQuestions from './CreateAExamQuestions/CreateAExamQuestions';
import CreateAExamControls from './CreateAExamControls/CreateAExamControls';
import CreateAExamFinish from './CreateAExamFinish/CreateAExamFinish';
import {
  createExamReset,
  createExamTitle,
  createExamQuestions,
  createExamStudents,
} from '../../store/actions/index';
import './CreateAExam.css';

class CreateAExam extends React.Component {
  state = {
    examPart: 'start',
    disableNextBtn: true,
  };

  nextBtnHandler = (disableNextBtn) => {
    this.setState({ disableNextBtn });
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
            changeNextBtn={this.nextBtnHandler}
          />
        );
        break;
      case 'questions':
        examPartComponent = (
          <CreateAExamQuestions
            examQuestions={questions}
            createExamQuestions={(questions) =>
              this.props.createExamQuestions(questions)
            }
          />
        );
        break;
      case 'students':
        examPartComponent = (
          <CreateAExamStudents
            examStudents={students}
            createExamStudents={(students) =>
              this.props.createExamStudents(students)
            }
          />
        );
        break;
      case 'finish':
        examPartComponent = <CreateAExamFinish exam={this.props.exam} />;
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
          <CreateAExamControls
            examPart={this.state.examPart}
            forwardFunction={this.nextExamPartHandler}
            backwardFunction={this.backExamPartHandler}
            resetFunction={this.resetCreateExamHandler}
            disableNextBtn={this.state.disableNextBtn}
            finishFuntion={() => console.log('save exam')}
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
