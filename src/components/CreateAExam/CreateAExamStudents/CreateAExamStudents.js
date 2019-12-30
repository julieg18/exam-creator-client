import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateStudent from './CreateStudent/CreateStudent';
import EditStudent from './EditStudent/EditStudent';
import StudentsSoFar from './StudentsSoFar/StudentsSoFar';
import './CreateAExamStudents.css';

class CreateAExamStudents extends React.Component {
  state = {
    students: this.props.examStudents,
    studentToBeEdited: {},
    isWindowMobileSize: false,
    currentActiveTab: 'workOnStudent',
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateIsWindowMobileSize.bind(this));
    this.updateIsWindowMobileSize();
  }

  componentWillUnmount() {
    this.props.createExamStudents(this.state.students);
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

  editStudentHandler = (student) => {
    const students = clonedeep(this.state.students);
    const editedStudent = clonedeep(student);
    const editedStudents = students.map((student) => {
      if (student.id === editedStudent.id) {
        return editedStudent;
      } else {
        return student;
      }
    });
    this.setState({
      students: editedStudents,
      studentToBeEdited: {},
    });
  };

  addStudentHandler = (student) => {
    const students = clonedeep(this.state.students);
    students.push(student);
    this.setState({ students });
  };

  deleteStudentHandler = (studentId) => {
    const students = clonedeep(this.state.students);
    const editedStudents = students.filter(
      (student) => student.id !== studentId,
    );
    if (this.state.studentToBeEdited.id === studentId) {
      this.setState({
        questions: editedStudents,
        studentToBeEdited: {},
      });
    } else {
      this.setState({
        students: editedStudents,
      });
    }
  };

  editStudentStartHandler = (studentToBeEdited) => {
    this.setState({
      studentToBeEdited,
    });
  };

  render() {
    let createExamStudentsMain = (
      <div className="CreateExamStudentsMain">
        <StudentsSoFar
          editStudentStart={this.editStudentStartHandler}
          students={this.state.students}
          deleteStudent={this.deleteStudentHandler}
        />
        {this.state.studentToBeEdited.id ? (
          <EditStudent
            student={this.state.studentToBeEdited}
            editStudent={this.editStudentHandler}
          />
        ) : (
          <CreateStudent onCreateStudent={this.addStudentHandler} />
        )}
      </div>
    );
    if (window.innerWidth <= 500) {
      createExamStudentsMain = (
        <div className="MobileCreateExamStudentsMain">
          <Tabs
            activeKey={this.state.currentActiveTab}
            onSelect={this.changeTabHandler}
          >
            <Tab
              eventKey="workOnStudent"
              title={
                this.state.studentToBeEdited.id
                  ? 'Edit Student'
                  : 'Create Student'
              }
            >
              {this.state.studentToBeEdited.id ? (
                <EditStudent
                  student={this.state.studentToBeEdited}
                  editStudent={this.editStudentHandler}
                />
              ) : (
                <CreateStudent onCreateStudent={this.addStudentHandler} />
              )}
            </Tab>
            <Tab eventKey="students" title="Students So Far">
              <StudentsSoFar
                editStudentStart={this.editStudentStartHandler}
                students={this.state.students}
                deleteStudent={this.deleteStudentHandler}
                changeTab={this.changeTabHandler}
              />
            </Tab>
          </Tabs>
        </div>
      );
    }
    return (
      <div className="CreateAExamStudents">
        <h1>Add Students To Your Exam</h1>
        <p>
          Each person that is given the link to your exam will need to choose
          his or her name from your student list.
        </p>
        {createExamStudentsMain}
      </div>
    );
  }
}

export default CreateAExamStudents;
