import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { getExam } from '../../store/actions/index';
import ExamForm from './ExamForm/ExamForm';
import './TakeExam.css';

const TakeExam = (props) => {
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState({});
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState({});
  const [areQuestionsChecked, setAreQuestionsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saveExamResultsError, setSaveExamResultsError] = useState('');
  const [saveExamResultsLoading, setSaveExamResultsLoading] = useState(false);

  const {
    match: {
      params: { examId },
    },
  } = props;

  useEffect(() => {
    async function getExam(examId) {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/exams/${examId}`);
        const parsedRes = await res.json();
        if (!res.ok) {
          throw Error(parsedRes.error);
        }
        setExam(parsedRes.exam);
        setLoading(false);
      } catch (err) {
        setError('Something went wrong. :(');
        setLoading(false);
      }
    }
    getExam(examId);
  }, [examId]);

  function handleStudentChange(student) {
    setSelectedStudent(student);
  }

  function handleFormChange(e) {
    const areQuestionsChecked = exam.questions.every((question) => {
      const options = document.getElementsByName(question._id);
      let isAtleastOneOptChecked = false;
      for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
          isAtleastOneOptChecked = true;
          break;
        }
      }
      return isAtleastOneOptChecked;
    });
    setAreQuestionsChecked(areQuestionsChecked);
  }

  async function saveExamResults(questionsCorrect, questionsIncorrect) {
    try {
      setSaveExamResultsLoading(true);
      const res = await fetch(
        `/api/v1/exams/students/save-exam-results/${exam._id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            studentId: selectedStudent._id,
            questionsCorrect,
            questionsIncorrect,
          }),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const parsedRes = await res.json();
      if (!res.ok) {
        throw Error(parsedRes.error);
      }
      setSaveExamResultsLoading(false);
      setShowModal(true);
    } catch (err) {
      setSaveExamResultsLoading(false);
      setSaveExamResultsError('Something went wrong. :(');
    }
  }

  function completeExam(e) {
    e.preventDefault();
    let questionsCorrect = [];
    let questionsIncorrect = [];
    exam.questions.map((question) => {
      let optionsChecked = [];
      const options = document.getElementsByName(question._id);

      for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
          optionsChecked.push(options[i].value);
        }
      }

      const isQuestionCorrect =
        question.answer.every((optId, i) => optId === optionsChecked[i]) &&
        optionsChecked.every((optId, i) => optId === question.answer[i]);

      if (isQuestionCorrect) {
        questionsCorrect.push(question._id);
      } else {
        questionsIncorrect.push(question._id);
      }
      return question;
    });
    saveExamResults(questionsCorrect, questionsIncorrect);
  }

  let content = loading ? (
    <div className="takeExamSpinner">
      <Spinner variant="info" animation="border">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : error ? (
    <Alert variant="info">{error}</Alert>
  ) : (
    <>
      <Modal show={showModal} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Exam Results Saved!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You can now exit this tab.</Modal.Body>
      </Modal>
      <h1 className="h1">{exam.title}</h1>
      {saveExamResultsError ? (
        <Alert variant="info">{saveExamResultsError}</Alert>
      ) : (
        ''
      )}
      <ExamForm
        areQuestionsChecked={areQuestionsChecked}
        selectedStudent={selectedStudent}
        exam={exam}
        handleStudentChange={handleStudentChange}
        completeExam={completeExam}
        handleFormChange={handleFormChange}
        saveExamResultsLoading={saveExamResultsLoading}
      />
    </>
  );
  return <div className="TakeExam">{content}</div>;
};

function mapDispatchToProps(dispatch) {
  return {
    getExam: (examId) => dispatch(getExam(examId)),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(TakeExam));
