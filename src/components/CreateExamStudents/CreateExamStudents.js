import React from 'react';
import Button from 'react-bootstrap/Button';

class CreateExamStudents extends React.Component {
  render() {
    return (
      <div className="CreateExamStudents">
        <h1>Add Students To Your Exam</h1>
        <Button onClick={this.props.createExamStudents} />
      </div>
    );
  }
}

export default CreateExamStudents;
