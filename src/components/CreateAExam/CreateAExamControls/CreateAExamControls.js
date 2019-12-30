import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import './CreateAExamControls.css';

const CreateAExamControls = (props) => {
  let createAExamControlsClass = 'CreateExamGeneralControls';
  switch (props.examPart) {
    case 'title':
      createAExamControlsClass = 'CreateExamTitleControls';
      break;
    case 'finish':
      createAExamControlsClass = 'CreateExamFinishControls';
      break;
    default:
  }
  return (
    <div className={`CreateAExamControls ${createAExamControlsClass}`}>
      <Button
        className="backBtn"
        size="lg"
        onClick={props.backwardFunction}
        variant="info"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Button>
      <Button
        className="resetBtn"
        size="lg"
        onClick={props.resetFunction}
        variant="info"
      >
        <FontAwesomeIcon icon={faUndo} />
      </Button>
      <Button
        className="nextBtn"
        size="lg"
        variant="info"
        onClick={props.forwardFunction}
      >
        Next <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
};

export default CreateAExamControls;
