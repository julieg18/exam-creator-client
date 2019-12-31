import React from 'react';
import Alert from 'react-bootstrap/Alert';
import ReadOnlyQuestion from '../CreateAExamQuestions/ReadOnlyQuestion/ReadOnlyQuestion';
import './CreateAExamFinish.css';

class CreateAExamFinish extends React.Component {
  render() {
    const doesExamHaveNoQuestions = this.props.exam.questions.length === 0;
    const doesExamHaveNoStudents = this.props.exam.students.length === 0;
    let errorMessages = {
      noStudents:
        "You haven't given your exam any any students. You can save your exam but nobody will be able to take the exam until you add at least one student.",
      noQuestions:
        "You haven't given your exam any any questions. You can save your exam but nobody will be able to take the exam until you add at least one question",
      noStudentsOrQuestions:
        "You haven't given your exam any students or questions. You can save your exam but nobody will be able to take the exam until you add at least one student and question.",
    };
    let errorMessageKey = '';
    if (doesExamHaveNoQuestions && doesExamHaveNoStudents) {
      errorMessageKey = 'noStudentsOrQuestions';
    } else if (doesExamHaveNoQuestions) {
      errorMessageKey = 'noQuestions';
    } else if (doesExamHaveNoStudents) {
      errorMessageKey = 'noStudents';
    }
    return (
      <div className="CreateAExamFinish">
        <h1>Save Your Exam</h1>
        {errorMessageKey ? (
          <Alert variant="info">{errorMessages[errorMessageKey]}</Alert>
        ) : (
          ''
        )}
        <p>Here is your exam so far:</p>
        <div className="examExample">
          <div className="scrollOnOverflow">
            <h1>{this.props.exam.title}</h1>
            {doesExamHaveNoQuestions ? (
              <p>This exam contains no questions.</p>
            ) : (
              ''
            )}
            {this.props.exam.questions.map((question, index) => {
              return (
                <ReadOnlyQuestion
                  key={question.id}
                  index={index + 1}
                  question={question}
                />
              );
            })}
            <hr />
            <p className="studentListTitle">Student List</p>
            <ul
              className={`studentsList ${
                doesExamHaveNoStudents ? 'noStudentsList' : ''
              }`}
            >
              {doesExamHaveNoStudents ? (
                <p>This exam contains no students.</p>
              ) : (
                ''
              )}
              {this.props.exam.students.map((student) => {
                return <li key={student.id}>{student.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAExamFinish;
