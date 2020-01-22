import { put } from 'redux-saga/effects';
import clonedeep from 'lodash.clonedeep';
import {
  createExamStart,
  createExamFail,
  createExamSuccess,
  getExamStart,
  getExamFail,
  getExamSuccess,
  getUserExamsStart,
  getUserExamsFail,
  getUserExamsSuccess,
  deleteExamStart,
  deleteExamSuccess,
  deleteExamFail,
  editExamStart,
  editExamFail,
  editExamSuccess,
} from '../actions/index';
import {
  howHaveQuestionsBeenEdited,
  howHaveStudentsBeenEdited,
} from './helper';

function* createExamSaga(action) {
  try {
    yield put(createExamStart());
    const createdExam = clonedeep(action.exam);

    const userRes = yield fetch('/api/v1/users');
    const parsedUserRes = yield userRes.json();
    if (!userRes.ok) {
      throw Error(parsedUserRes.error);
    }
    createdExam.creator = parsedUserRes.user._id;

    const res = yield fetch('/api/v1/exams', {
      method: 'POST',
      body: JSON.stringify(createdExam),
      headers: { 'Content-Type': 'application/json' },
    });
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(createExamSuccess());
  } catch (err) {
    yield put(createExamFail('Something went wrong. :('));
  }
}

function* getExamSaga(action) {
  try {
    yield put(getExamStart());
    const res = yield fetch(`/api/v1/exams/${action.examId}`);
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(getExamSuccess(parsedRes.exam));
  } catch (err) {
    yield put(getExamFail('Something went wrong. :('));
  }
}

function* getUserExamsSaga() {
  try {
    yield put(getUserExamsStart());
    const res = yield fetch('/api/v1/users/exams');
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(getUserExamsSuccess(parsedRes.exams));
  } catch (err) {
    yield put(getUserExamsFail('Something went wrong. :('));
  }
}

function* deleteExamSaga(action) {
  try {
    yield put(deleteExamStart());
    const res = yield fetch(`/api/v1/exams/${action.examId}`, {
      method: 'DELETE',
    });
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(deleteExamSuccess(action.examId));
  } catch (err) {
    yield put(deleteExamFail('Something went wrong. :('));
  }
}

function* editExamSaga(action) {
  try {
    yield put(editExamStart());
    const { exam, examPartsBeingEdited } = action;
    if (examPartsBeingEdited.title) {
      const res = yield fetch(`/api/v1/exams/${exam._id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: examPartsBeingEdited.title }),
        headers: { 'Content-Type': 'application/json' },
      });
      const parsedRes = yield res.json();
      if (!res.ok) {
        throw Error(parsedRes.error);
      }
    }

    if (examPartsBeingEdited.questions.length !== 0) {
      const {
        deletedQuestions,
        addedQuestions,
        editedQuestions,
      } = howHaveQuestionsBeenEdited(
        exam.questions,
        examPartsBeingEdited.questions,
      );

      for (let i = 0; i < deletedQuestions.length; i++) {
        const res = yield fetch(`api/v1/exams/questions/${exam._id}`, {
          method: 'DELETE',
          body: JSON.stringify({ questionId: deletedQuestions[i] }),
          headers: { 'Content-Type': 'application/json' },
        });
        const parsedRes = yield res.json();
        if (!res.ok) {
          throw Error(parsedRes.error);
        }
      }

      for (let i = 0; i < addedQuestions.length; i++) {
        let body = examPartsBeingEdited.questions.find(
          (question) => question.id === addedQuestions[i],
        );
        body.type = body.type === 'trueOrFalse' ? 'true_false' : body.type;
        const res = yield fetch(`api/v1/exams/questions/${exam._id}`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        const parsedRes = yield res.json();
        if (!res.ok) {
          throw Error(parsedRes.error);
        }
      }

      for (let i = 0; i < editedQuestions.length; i++) {
        let body = examPartsBeingEdited.questions.find(
          (question) => question.id === editedQuestions[i],
        );
        body.questionId = body.id;
        body.type = body.type === 'trueOrFalse' ? 'true_false' : body.type;

        const res = yield fetch(`api/v1/exams/questions/${exam._id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
        const parsedRes = yield res.json();
        if (!res.ok) {
          throw Error(parsedRes.error);
        }
      }
    }

    if (examPartsBeingEdited.students.length !== 0) {
      const {
        deletedStudents,
        addedStudents,
        editedStudents,
      } = howHaveStudentsBeenEdited(
        exam.students,
        examPartsBeingEdited.students,
      );

      for (let i = 0; i < deletedStudents.length; i++) {
        const res = yield fetch(`api/v1/exams/students/${exam._id}`, {
          method: 'DELETE',
          body: JSON.stringify({ studentId: deletedStudents[i] }),
          headers: { 'Content-Type': 'application/json' },
        });
        const parsedRes = yield res.json();
        if (!res.ok) {
          throw Error(parsedRes.error);
        }
      }

      for (let i = 0; i < addedStudents.length; i++) {
        const newStudent = examPartsBeingEdited.students.find(
          (student) => student.id === addedStudents[i],
        );
        const res = yield fetch(`api/v1/exams/students/${exam._id}`, {
          method: 'POST',
          body: JSON.stringify({ name: newStudent.name }),
          headers: { 'Content-Type': 'application/json' },
        });
        const parsedRes = yield res.json();
        if (!res.ok) {
          throw Error(parsedRes.error);
        }
      }

      for (let i = 0; i < editedStudents.length; i++) {
        const editedStudent = examPartsBeingEdited.students.find(
          (student) => student.id === editedStudents[i],
        );
        const res = yield fetch(`api/v1/exams/students/${exam._id}`, {
          method: 'PUT',
          body: JSON.stringify({
            studentId: editedStudent.id,
            name: editedStudent.name,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const parsedRes = yield res.json();
        if (!res.ok) {
          throw Error(parsedRes.error);
        }
      }
    }

    yield put(editExamSuccess());
  } catch (err) {
    yield put(editExamFail('Something went wrong. :('));
  }
}

export {
  createExamSaga,
  getExamSaga,
  getUserExamsSaga,
  deleteExamSaga,
  editExamSaga,
};
