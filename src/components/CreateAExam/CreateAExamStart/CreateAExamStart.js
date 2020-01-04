import React from 'react';
import Button from 'react-bootstrap/Button';
import './CreateAExamStart.css';

class CreateAExamStart extends React.Component {
  render() {
    return (
      <div className="CreateAExamStart">
        <div
          className={`${
            this.props.isUserLoggedIn ? 'title' : 'titleAndIntroduction'
          }`}
        >
          <h1>Create A Exam</h1>
          {!this.props.isUserLoggedIn ? (
            <p>
              You cannot save your exam until you login or create a account.
            </p>
          ) : (
            ''
          )}
        </div>
        <Button size="lg" variant="info" onClick={this.props.nextExamPart}>
          Start
        </Button>
      </div>
    );
  }
}

export default CreateAExamStart;
