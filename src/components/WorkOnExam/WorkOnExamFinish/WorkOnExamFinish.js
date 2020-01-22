import React from 'react';
import Alert from 'react-bootstrap/Alert';
import ReadOnlyQuestion from '../WorkOnExamQuestions/ReadOnlyQuestion/ReadOnlyQuestion';
import './WorkOnExamFinish.css';

const CreateAExamFinish = (props) => {
  const doesExamHaveNoQuestions = props.exam.questions.length === 0;
  const doesExamHaveNoStudents = props.exam.students.length === 0;
  let errorMessages = {
    noStudents:
      "Your exam doesn't contain any students. You can save your exam but nobody will be able to take the exam until you add at least one student.",
    noQuestions:
      "Your exam doesn't contain any questions. You can save your exam but nobody will be able to take the exam until you add at least one question",
    noStudentsOrQuestions:
      "Your exam doesn't contain any students or questions. You can save your exam but nobody will be able to take the exam until you add at least one student and question.",
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
    <div className="WorkOnExamFinish">
      <h1>Save Your Exam</h1>
      {errorMessageKey ? (
        <Alert variant="info">{errorMessages[errorMessageKey]}</Alert>
      ) : (
        ''
      )}
      <p>{props.text}</p>
      <div className="examExample">
        <div className="scrollOnOverflow">
          <h1>{props.exam.title}</h1>
          {doesExamHaveNoQuestions ? (
            <p>This exam contains no questions.</p>
          ) : (
            ''
          )}
          {props.exam.questions.map((question, index) => {
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
            {props.exam.students.map((student) => {
              return <li key={student.id}>{student.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateAExamFinish;
