import React from 'react';
import clonedeep from 'lodash.clonedeep';
import Button from 'react-bootstrap/Button';
import ReadOnlyQuestion from '../../WorkOnExam/WorkOnExamQuestions/ReadOnlyQuestion/ReadOnlyQuestion';
import ExamsStudents from '../ExamsStudents/ExamsStudents';
import './ExamExample.css';

const ExamExample = (props) => {
  const doesExamHaveNoQuestions = props.exam.questions.length === 0;
  let examQuestions = clonedeep(props.exam.questions);

  function addAnswerToQuestionOptions(question) {
    question.answer.map((optId) => {
      question.options = question.options.map((opt) => {
        if (optId === opt.optionId) {
          opt.answer = true;
        }
        return opt;
      });
      return optId;
    });
    return question;
  }

  examQuestions = examQuestions.map((question) => {
    return addAnswerToQuestionOptions(question);
  });
  examQuestions = examQuestions.map((question) => {
    if (question.type === 'true_false') {
      question.type = 'trueOrFalse';
      return question;
    } else {
      return question;
    }
  });

  return (
    <div className="ExamExample">
      <div className="container">
        <strong>{props.exam.title}</strong>
        <Button
          onClick={() => props.editExamFunc(props.exam._id)}
          size="sm"
          variant="info"
          className="editExamBtn"
        >
          Edit Exam
        </Button>
        <Button
          onClick={props.deleteExamFunc}
          size="sm"
          variant="danger"
          className="deleteExamBtn"
        >
          Delete Exam
        </Button>
      </div>
      {doesExamHaveNoQuestions ? <p>This exam contains no questions.</p> : ''}
      <div className="examQuestions">
        {examQuestions.map((question, index) => {
          return (
            <ReadOnlyQuestion
              key={question._id}
              index={index + 1}
              question={question}
            />
          );
        })}
      </div>
      <hr />
      <ExamsStudents
        questions={props.exam.questions}
        students={props.exam.students}
      />
    </div>
  );
};

export default ExamExample;
