import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './ExamsStudents.css';

const ExamsStudents = (props) => {
  const [isWindowMobileSize, setIsWindowMobileSize] = useState(true);

  useEffect(() => {
    function updateIsWindowMobileSize() {
      let isCurrentWindowMobileSize = window.innerWidth <= 500;
      if (isCurrentWindowMobileSize !== isWindowMobileSize) {
        setIsWindowMobileSize(window.innerWidth <= 500);
      }
    }

    window.addEventListener('resize', updateIsWindowMobileSize);
    updateIsWindowMobileSize();

    return () => {
      window.removeEventListener('resize', updateIsWindowMobileSize);
    };
  }, [isWindowMobileSize]);

  function getExamResults(questionsCorrect, questionsIncorrect) {
    const correctQuestionNumbers = questionsCorrect.map((questionId) => {
      const number = props.questions.findIndex(
        (question) => question._id === questionId,
      );
      return number + 1;
    });

    const incorrectQuestionNumbers = questionsIncorrect.map((questionId) => {
      const number = props.questions.findIndex(
        (question) => question._id === questionId,
      );
      return number + 1;
    });
    return { correctQuestionNumbers, incorrectQuestionNumbers };
  }

  const doesExamHaveNoStudents = props.students.length === 0;

  return (
    <div className="ExamStudents">
      <p className="title">Student List</p>
      <div className="studentsList">
        {doesExamHaveNoStudents ? (
          <p>This exam contains no students.</p>
        ) : (
          <ListGroup variant="flush">
            {props.students.map((student) => {
              const examResults = getExamResults(
                student.questionsCorrect,
                student.questionsIncorrect,
              );
              return (
                <ListGroup.Item key={student._id}>
                  <p className="studentName">{student.name}</p>
                  <DropdownButton
                    drop={isWindowMobileSize ? 'down' : 'right'}
                    variant="info"
                    title="See Exam Results"
                    disabled={!student.takenTest}
                  >
                    <strong>Exam Results:</strong>
                    <div className="examResults">
                      <div className="incorrectQuestions">
                        <p>Incorrect Questions</p>
                        <ul>
                          {examResults.incorrectQuestionNumbers.map((num) => (
                            <li key={num}>{num}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="correctQuestions">
                        <p>Correct Questions</p>
                        <ul>
                          {examResults.correctQuestionNumbers.map((num) => (
                            <li key={num}>{num}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </DropdownButton>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </div>
    </div>
  );
};

export default ExamsStudents;
