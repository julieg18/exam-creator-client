import React from 'react';
import { connect } from 'react-redux';
import clonedeep from 'lodash.clonedeep';
import CreateAExamTitle from './CreateAExamTitle/CreateAExamTitle';
import CreateAExamStart from './CreateAExamStart/CreateAExamStart';
import CreateAExamStudents from './CreateAExamStudents/CreateAExamStudents';
import CreateAExamQuestions from './CreateAExamQuestions/CreateAExamQuestions';
import CreateAExamControls from './CreateAExamControls/CreateAExamControls';
import CreateAExamFinish from './CreateAExamFinish/CreateAExamFinish';
import {
  createExamChangePart,
  createExamReset,
  createExamTitle,
  createExamQuestions,
  createExamStudents,
  createExam,
} from '../../store/actions/index';
import './CreateAExam.css';

class CreateAExam extends React.Component {
  state = {
    disableNextBtn: /^\s*$/.test(this.props.exam.title),
  };

  nextBtnHandler = (disableNextBtn) => {
    this.setState({ disableNextBtn });
  };

  nextExamPartHandler = () => {
    switch (this.props.examPart) {
      case 'start':
        this.props.createExamChangePart('title');
        break;
      case 'title':
        this.props.createExamChangePart('questions');
        break;
      case 'questions':
        this.props.createExamChangePart('students');
        break;
      case 'students':
        this.props.createExamChangePart('finish');
        break;
      default:
        return;
    }
  };

  backExamPartHandler = () => {
    switch (this.props.examPart) {
      case 'questions':
        this.props.createExamChangePart('title');
        break;
      case 'students':
        this.props.createExamChangePart('questions');
        break;
      case 'finish':
        this.props.createExamChangePart('students');
        break;
      default:
    }
  };

  resetCreateExamHandler = () => {
    this.props.createExamReset();
  };

  createExamHandler = () => {
    const createdExam = clonedeep(this.props.exam);
    createdExam.questions.map((question) => {
      if (question.type === 'trueOrFalse') {
        question.type = 'true_false';
      }
      return question;
    });
    this.props.createExam(createdExam);
  };

  render() {
    const { title, questions, students } = this.props.exam;
    let examPartComponent = (
      <CreateAExamStart
        isUserLoggedIn={this.props.isUserLoggedIn}
        nextExamPart={this.nextExamPartHandler}
      />
    );
    switch (this.props.examPart) {
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
          <CreateAExamStart
            isUserLoggedIn={this.props.isUserLoggedIn}
            nextExamPart={this.nextExamPartHandler}
          />
        );
    }
    return (
      <div className="CreateAExam">
        {examPartComponent}
        {this.props.examPart !== 'start' ? (
          <CreateAExamControls
            examPart={this.props.examPart}
            forwardFunction={this.nextExamPartHandler}
            backwardFunction={this.backExamPartHandler}
            resetFunction={this.resetCreateExamHandler}
            disableNextBtn={this.state.disableNextBtn}
            finishFunction={this.createExamHandler}
            isUserLoggedIn={this.props.isUserLoggedIn}
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
    auth: { isUserLoggedIn },
    createExam: { exam, currentExamPart },
  } = state;
  return {
    isUserLoggedIn,
    examPart: currentExamPart,
    exam,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createExamChangePart: (part) => dispatch(createExamChangePart(part)),
    createExamReset: () => dispatch(createExamReset()),
    createExamTitle: (title) => dispatch(createExamTitle(title)),
    createExamQuestions: (questions) =>
      dispatch(createExamQuestions(questions)),
    createExamStudents: (students) => dispatch(createExamStudents(students)),
    createExam: (exam) => dispatch(createExam(exam)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAExam);
