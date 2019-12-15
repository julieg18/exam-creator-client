import React from 'react';
import Button from 'react-bootstrap/Button';
import './CreateAExamStart.css';

class CreateAExamStart extends React.Component {
  render() {
    return (
      <div className="CreateAExamStart">
        <h1>Create A Exam</h1>
        <Button size="lg" variant="info" onClick={this.props.nextExamPart}>
          Start
        </Button>
      </div>
    );
  }
}

export default CreateAExamStart;
