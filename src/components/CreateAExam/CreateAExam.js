import React from 'react';
import { connect } from 'react-redux';
import clonedeep from 'lodash.clonedeep';
import CreateAExamStart from './CreateAExamStart/CreateAExamStart';
import WorkOnExamTitle from '../WorkOnExam/WorkOnExamTitle/WorkOnExamTitle';
import WorkOnExamStudents from '../WorkOnExam/WorkOnExamStudents/WorkOnExamStudents';
import WorkOnExamQuestions from '../WorkOnExam/WorkOnExamQuestions/WorkOnExamQuestions';
import CreateAExamControls from './CreateAExamControls/CreateAExamControls';
import WorkOnExamFinish from '../WorkOnExam/WorkOnExamFinish/WorkOnExamFinish';
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

  setDisableNextButton = (disableNextBtn) => {
    this.setState({ disableNextBtn });
  };

  goToNextExamPart = () => {
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

  goBackOneExamPart = () => {
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

  createExam = () => {
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
        nextExamPart={this.goToNextExamPart}
      />
    );
    switch (this.props.examPart) {
      case 'title':
        examPartComponent = (
          <WorkOnExamTitle
            examTitle={title}
            completeExamTitle={(title) => this.props.createExamTitle(title)}
            changeNextBtn={this.setDisableNextButton}
            heading="What is your exam's title?"
          />
        );
        break;
      case 'questions':
        examPartComponent = (
          <WorkOnExamQuestions
            examQuestions={questions}
            completeExamQuestions={(questions) =>
              this.props.createExamQuestions(questions)
            }
            heading="Create Questions For Your Exam"
          />
        );
        break;
      case 'students':
        examPartComponent = (
          <WorkOnExamStudents
            examStudents={students}
            completeExamStudents={(students) =>
              this.props.createExamStudents(students)
            }
            heading="Add Students To Your Exam"
          />
        );
        break;
      case 'finish':
        examPartComponent = (
          <WorkOnExamFinish
            exam={this.props.exam}
            text="Here is your exam so far:"
          />
        );
        break;
      default:
        examPartComponent = (
          <CreateAExamStart
            isUserLoggedIn={this.props.isUserLoggedIn}
            nextExamPart={this.goToNextExamPart}
          />
        );
    }
    return (
      <div className="CreateAExam">
        {examPartComponent}
        {this.props.examPart !== 'start' ? (
          <CreateAExamControls
            examPart={this.props.examPart}
            forwardFunction={this.goToNextExamPart}
            backwardFunction={this.goBackOneExamPart}
            resetFunction={() => this.props.createExamReset()}
            disableNextBtn={this.state.disableNextBtn}
            finishFunction={this.createExam}
            isUserLoggedIn={this.props.isUserLoggedIn}
            loading={this.props.loading}
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
    exam: { examBeingCreated, currentExamBeingCreatedPart, createExamLoading },
  } = state;
  return {
    isUserLoggedIn,
    examPart: currentExamBeingCreatedPart,
    exam: examBeingCreated,
    loading: createExamLoading,
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
