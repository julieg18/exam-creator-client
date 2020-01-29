import React from 'react';
import clonedeep from 'lodash.clonedeep';
import { connect } from 'react-redux';
import EditAExamStart from './EditAExamStart/EditAExamStart';
import WorkOnExamTitle from '../WorkOnExam/WorkOnExamTitle/WorkOnExamTitle';
import WorkOnExamStudents from '../WorkOnExam/WorkOnExamStudents/WorkOnExamStudents';
import WorkOnExamQuestions from '../WorkOnExam/WorkOnExamQuestions/WorkOnExamQuestions';
import WorkOnExamFinish from '../WorkOnExam/WorkOnExamFinish/WorkOnExamFinish';
import EditAExamControls from './EditAExamControls/EditAExamControls';
import {
  editExamSelectExam,
  editExamReset,
  editExamChangePart,
  editExamTitle,
  editExamQuestions,
  editExamStudents,
  editExam,
} from '../../store/actions/index';
import './EditAExam.css';

class EditAExam extends React.Component {
  state = {
    disableNextBtn: /^\s*$/.test(this.props.exam.title),
  };

  setDisableNextButton = (disableNextBtn) => {
    this.setState({ disableNextBtn });
  };

  goToNextExamPart = () => {
    switch (this.props.examPart) {
      case 'start':
        this.props.editExamChangePart('title');
        break;
      case 'title':
        this.props.editExamChangePart('questions');
        break;
      case 'questions':
        this.props.editExamChangePart('students');
        break;
      case 'students':
        this.props.editExamChangePart('finish');
        break;
      default:
        return;
    }
  };

  goBackOneExamPart = () => {
    switch (this.props.examPart) {
      case 'questions':
        this.props.editExamChangePart('title');
        break;
      case 'students':
        this.props.editExamChangePart('questions');
        break;
      case 'finish':
        this.props.editExamChangePart('students');
        break;
      default:
    }
  };

  selectExam = (exam) => {
    let selectedExam = clonedeep(exam);
    selectedExam.questions = selectedExam.questions.map((question) => {
      question.id = question._id;

      if (question.type === 'true_false') {
        question.type = 'trueOrFalse';
      }

      question.options = question.options.map((opt) => {
        opt.answer = question.answer.some((optId) => optId === opt.optionId);
        return opt;
      });

      return question;
    });

    selectedExam.students = selectedExam.students.map((student) => {
      student.id = student._id;
      return student;
    });

    this.props.editExamSelectExam(selectedExam);
  };

  updateTitle = (title, hasTitleChanged) => {
    if (hasTitleChanged) {
      this.props.editExamTitle(title);
    }
  };

  updateQuestions = (questions, hasQuestionsChanged) => {
    if (hasQuestionsChanged) {
      this.props.editExamQuestions(questions);
    }
  };

  updateStudents = (students, hasStudentsChanged) => {
    if (hasStudentsChanged) {
      this.props.editExamStudents(students);
    }
  };

  saveExam = () => {
    this.props.editExam(this.props.exam, this.props.examPartsBeingEdited);
  };

  render() {
    const { examPartsBeingEdited, exam } = this.props;
    const title =
      examPartsBeingEdited.title.length === 0
        ? exam.title
        : examPartsBeingEdited.title;
    const questions =
      examPartsBeingEdited.questions.length === 0
        ? exam.questions
        : examPartsBeingEdited.questions;
    const students =
      examPartsBeingEdited.students.length === 0
        ? exam.students
        : examPartsBeingEdited.students;
    let examExample = clonedeep(this.props.exam);
    examExample.title = title;
    examExample.questions = questions;
    examExample.students = students;

    let examPartComponent = (
      <EditAExamStart
        isUserLoggedIn={this.props.isUserLoggedIn}
        nextExamPart={this.goToNextExamPart}
        selectExam={this.selectExam}
      />
    );

    switch (this.props.examPart) {
      case 'title':
        examPartComponent = (
          <WorkOnExamTitle
            examTitle={title}
            completeExamTitle={this.updateTitle}
            changeNextBtn={this.setDisableNextButton}
            heading="Edit Your Exam Title"
          />
        );
        break;
      case 'questions':
        examPartComponent = (
          <WorkOnExamQuestions
            examQuestions={questions}
            completeExamQuestions={this.updateQuestions}
            heading="Edit Your Exam Questions"
          />
        );
        break;
      case 'students':
        examPartComponent = (
          <WorkOnExamStudents
            examStudents={students}
            completeExamStudents={this.updateStudents}
            heading="Edit Your Exam Students"
          />
        );
        break;
      case 'finish':
        examPartComponent = (
          <WorkOnExamFinish
            text="Here is your exam with its new changes:"
            exam={examExample}
          />
        );
        break;
      default:
        examPartComponent = (
          <EditAExamStart
            isUserLoggedIn={this.props.isUserLoggedIn}
            selectExam={this.selectExam}
            nextExamPart={this.goToNextExamPart}
          />
        );
    }
    return (
      <div className="EditAExam">
        {examPartComponent}
        {this.props.examPart !== 'start' ? (
          <EditAExamControls
            examPart={this.props.examPart}
            forwardFunction={this.goToNextExamPart}
            backwardFunction={this.goBackOneExamPart}
            disableNextBtn={this.state.disableNextBtn}
            finishFunction={this.saveExam}
            goToFinishExamPart={() => this.props.editExamChangePart('finish')}
            resetFunction={() => this.props.editExamReset()}
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
    exam: {
      examToBeEdited,
      examPartsBeingEdited,
      currentExamBeingEditedPart,
      editExamLoading,
    },
    auth: { isUserLoggedIn },
  } = state;
  return {
    isUserLoggedIn,
    exam: examToBeEdited,
    examPart: currentExamBeingEditedPart,
    examPartsBeingEdited,
    loading: editExamLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editExamSelectExam: (exam) => dispatch(editExamSelectExam(exam)),
    editExamReset: () => dispatch(editExamReset()),
    editExamChangePart: (part) => dispatch(editExamChangePart(part)),
    editExamTitle: (title) => dispatch(editExamTitle(title)),
    editExamQuestions: (questions) => dispatch(editExamQuestions(questions)),
    editExamStudents: (students) => dispatch(editExamStudents(students)),
    editExam: (exam, examPartsBeingEdited) =>
      dispatch(editExam(exam, examPartsBeingEdited)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAExam);
