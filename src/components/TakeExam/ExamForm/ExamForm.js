import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import LoadingButton from '../../common/LoadingButton/LoadingButton';
import Question from '../Question/Question';
import './ExamForm.css';

const ExamForm = (props) => {
  let submitButton =
    props.areQuestionsChecked && props.selectedStudent.name ? (
      <LoadingButton
        type="submit"
        variant="info"
        size="md"
        loading={props.saveExamResultsLoading}
      >
        Submit
      </LoadingButton>
    ) : (
      <OverlayTrigger
        overlay={
          <Tooltip>
            {props.selectedStudent.name
              ? "You haven't answered all the exam questions."
              : 'You need to choose a name.'}
          </Tooltip>
        }
      >
        <span>
          <Button variant="info" disabled style={{ pointerEvents: 'none' }}>
            Submit
          </Button>
        </span>
      </OverlayTrigger>
    );

  return (
    <div className="ExamForm">
      <DropdownButton
        variant="info"
        title={props.selectedStudent.name || "What's Your Name?"}
      >
        {props.exam.students.map((student) => (
          <Dropdown.Item
            key={student._id}
            onClick={() => props.handleStudentChange(student)}
            disabled={student.takenTest}
          >
            {student.name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Form onChange={props.handleFormChange} onSubmit={props.completeExam}>
        {props.exam.questions.map((question, i) => (
          <Question index={i + 1} key={question._id} question={question} />
        ))}
        {submitButton}
      </Form>
    </div>
  );
};

export default ExamForm;
