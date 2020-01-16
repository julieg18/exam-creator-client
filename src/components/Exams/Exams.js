import React from 'react';
import { connect } from 'react-redux';
import clonedeep from 'lodash.clonedeep';
import Spinner from 'react-bootstrap/Spinner';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ExamExample from './ExamExample/ExamExample';
import { getUserExams, deleteExam } from '../../store/actions/index';
import './Exams.css';

class Exams extends React.Component {
  state = {
    examSelected: {},
    showModal: false,
  };

  componentDidMount() {
    this.props.getUserExams();
  }

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  showModal = () => {
    this.setState({
      showModal: true,
    });
  };

  deleteExam = () => {
    this.hideModal();
    const examSelectedId = this.state.examSelected._id
      ? this.state.examSelected._id
      : clonedeep(this.props.userExams).sort((examA, examB) =>
          examA.title > examB.title ? 1 : -1,
        )[0]._id;
    this.props.deleteExam(examSelectedId);

    const sortedUserExams = clonedeep(
      this.props.userExams,
    ).sort((examA, examB) => (examA.title > examB.title ? 1 : -1));
    const examSelected = sortedUserExams.filter(
      (exam) => exam._id !== examSelectedId,
    )[0];
    this.setState({ examSelected });
  };

  changeExamSelected = (examId) => {
    const examSelected = this.props.userExams.find(
      (exam) => exam._id === examId,
    );
    this.setState({ examSelected });
  };

  render() {
    const sortedUserExams = clonedeep(
      this.props.userExams,
    ).sort((examA, examB) => (examA.title > examB.title ? 1 : -1));

    return (
      <div className="Exams">
        <Modal onHide={this.hideModal} show={this.state.showModal}>
          <Modal.Body>
            Are you sure you want to delete this exam?
            <div className="modalBtns">
              <Button variant="info" onClick={this.hideModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={this.deleteExam}>
                Delete Exam
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <h1>Your Exams</h1>
        {this.props.loading ? (
          <div className="spinner">
            <Spinner animation="border" variant="info">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : this.props.userExams.length > 0 ? (
          <>
            <DropdownButton variant="info" title="Select A Exam">
              {sortedUserExams.map((exam) => (
                <Dropdown.Item
                  key={exam._id}
                  onClick={() => this.changeExamSelected(exam._id)}
                >
                  {exam.title}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <ExamExample
              exam={
                this.state.examSelected._id
                  ? this.state.examSelected
                  : sortedUserExams[0]
              }
              deleteExamFunc={this.showModal}
            />
          </>
        ) : (
          <p>
            You haven't created any exams.{' '}
            <a href="/create-exam">Create a exam.</a>
          </p>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    exam: { userExams, loading },
  } = state;
  return {
    userExams,
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserExams: () => dispatch(getUserExams()),
    deleteExam: (examId) => dispatch(deleteExam(examId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exams);
