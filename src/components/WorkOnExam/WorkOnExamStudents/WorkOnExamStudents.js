import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateStudent from './CreateStudent/CreateStudent';
import EditStudent from './EditStudent/EditStudent';
import StudentsSoFar from './StudentsSoFar/StudentsSoFar';
import './WorkOnExamStudents.css';

class WorkOnExamStudents extends React.Component {
  state = {
    students: this.props.examStudents,
    studentToBeEdited: {},
    isWindowMobileSize: false,
    currentActiveTab: 'workOnStudent',
    hasStudentsChanged: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateIsWindowMobileSize.bind(this));
    this.updateIsWindowMobileSize();
  }

  componentWillUnmount() {
    this.props.completeExamStudents(
      this.state.students,
      this.state.hasStudentsChanged,
    );
    window.removeEventListener('resize', this.updateIsWindowMobileSize);
  }

  updateIsWindowMobileSize = () => {
    let isCurrentWindowMobileSize = window.innerWidth <= 500;
    if (isCurrentWindowMobileSize !== this.state.isWindowMobileSize) {
      this.setState({ isWindowMobileSize: window.innerWidth <= 500 });
    }
  };

  changeTab = (tab) => {
    this.setState({ currentActiveTab: tab });
  };

  editStudent = (student) => {
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
      hasStudentsChanged: true,
      studentToBeEdited: {},
    });
  };

  addStudent = (student) => {
    const students = clonedeep(this.state.students);
    students.push(student);
    this.setState({ students, hasStudentsChanged: true });
  };

  deleteStudent = (studentId) => {
    const students = clonedeep(this.state.students);
    const editedStudents = students.filter(
      (student) => student.id !== studentId,
    );
    if (this.state.studentToBeEdited.id === studentId) {
      this.setState({
        questions: editedStudents,
        studentToBeEdited: {},
        hasStudentsChanged: true,
      });
    } else {
      this.setState({
        students: editedStudents,
        hasStudentsChanged: true,
      });
    }
  };

  startEditingStudent = (studentToBeEdited) => {
    this.setState({
      studentToBeEdited,
    });
  };

  render() {
    let workOnExamStudentsMain = (
      <div className="WorkOnExamStudentsMain">
        <StudentsSoFar
          editStudentStart={this.startEditingStudent}
          students={this.state.students}
          deleteStudent={this.deleteStudent}
        />
        {this.state.studentToBeEdited.id ? (
          <EditStudent
            student={this.state.studentToBeEdited}
            editStudent={this.editStudent}
            key={this.state.studentToBeEdited.id}
          />
        ) : (
          <CreateStudent onCreateStudent={this.addStudent} />
        )}
      </div>
    );
    if (window.innerWidth <= 500) {
      workOnExamStudentsMain = (
        <div className="MobileWorkOnExamStudentsMain">
          <Tabs
            activeKey={this.state.currentActiveTab}
            onSelect={this.changeTab}
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
                  editStudent={this.editStudent}
                  key={this.state.studentToBeEdited.id}
                />
              ) : (
                <CreateStudent onCreateStudent={this.addStudent} />
              )}
            </Tab>
            <Tab eventKey="students" title="Students So Far">
              <StudentsSoFar
                editStudentStart={this.startEditingStudent}
                students={this.state.students}
                deleteStudent={this.deleteStudent}
                changeTab={this.changeTab}
              />
            </Tab>
          </Tabs>
        </div>
      );
    }
    return (
      <div className="WorkOnExamStudents">
        <h1>{this.props.heading}</h1>
        <p>
          Each person that is given the link to your exam will need to choose
          his or her name from your student list.
        </p>
        {workOnExamStudentsMain}
      </div>
    );
  }
}

export default WorkOnExamStudents;
