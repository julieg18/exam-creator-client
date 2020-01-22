import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { getUserExams } from '../../../store/actions/index';
import './EditAExamStart.css';

class EditAExamStart extends React.Component {
  state = {
    selectedExam: {},
  };

  componentDidMount() {
    this.props.getUserExams();
  }

  handleExamChange = (e) => {
    const selectedExam = this.props.userExams.find(
      (exam) => exam._id === e.target.value,
    );
    this.setState({ selectedExam });
  };

  handleSelectExam = () => {
    const selectedExam = this.state.selectedExam._id
      ? this.state.selectedExam
      : clonedeep(this.props.userExams).sort((examA, examB) =>
          examA.title > examB.title ? 1 : -1,
        )[0];
    this.props.selectExam(selectedExam);
    this.props.nextExamPart('title');
  };

  render() {
    const sortedUserExams = clonedeep(
      this.props.userExams,
    ).sort((examA, examB) => (examA.title > examB.title ? 1 : -1));

    return (
      <div className="EditAExamStart">
        <div className="h1">Edit A Exam</div>
        {this.props.loading ? (
          <div className="spinner">
            <Spinner animation="border" variant="info">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : this.props.userExams.length > 0 ? (
          <>
            <Form.Group>
              <Form.Label>Choose A Exam To Edit:</Form.Label>
              <Form.Control onChange={this.handleExamChange} as="select">
                {sortedUserExams.map((exam) => (
                  <option value={exam._id} key={exam._id}>
                    {exam.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button onClick={this.handleSelectExam} size="lg" variant="info">
              Start
            </Button>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAExamStart);
