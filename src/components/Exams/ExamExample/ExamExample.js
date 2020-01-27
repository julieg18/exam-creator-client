import React, { useState } from 'react';
import clonedeep from 'lodash.clonedeep';
import Button from 'react-bootstrap/Button';
import ReadOnlyQuestion from '../../WorkOnExam/WorkOnExamQuestions/ReadOnlyQuestion/ReadOnlyQuestion';
import ExamsStudents from '../ExamsStudents/ExamsStudents';
import './ExamExample.css';

const ExamExample = (props) => {
  const [isExamLinkCopied, setIsExamLinkCopied] = useState(false);
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

  function copyExamLinkToClipboard(examId) {
    const examLink = `http://localhost:3000/take-exam/${examId}`;
    const el = document.createElement('textarea');
    el.value = examLink;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setIsExamLinkCopied(true);
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
          onClick={() => copyExamLinkToClipboard(props.exam._id)}
          size="sm"
          variant="info"
          className="copyExamLinkBtn"
          disabled={
            props.exam.students.length === 0 ||
            props.exam.questions.length === 0
          }
        >
          {isExamLinkCopied ? 'Copied!' : 'Copy Link To Exam'}
        </Button>
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
