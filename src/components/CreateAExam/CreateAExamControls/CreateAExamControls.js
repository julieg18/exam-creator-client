import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faUndo,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import './CreateAExamControls.css';

const CreateAExamControls = (props) => {
  let createAExamControlsClass = 'CreateExamGeneralControls';
  let leftButton = (
    <Button
      className="nextBtn"
      size="lg"
      variant="info"
      onClick={props.forwardFunction}
      disabled={props.disableNextBtn}
    >
      Next <FontAwesomeIcon icon={faArrowRight} />
    </Button>
  );
  switch (props.examPart) {
    case 'title':
      createAExamControlsClass = 'CreateExamTitleControls';
      break;
    case 'finish':
      createAExamControlsClass = 'CreateExamFinishControls';
      leftButton = (
        <Button
          className="finishBtn"
          size="lg"
          variant="info"
          onClick={props.finishFunction}
        >
          Save <FontAwesomeIcon icon={faSave} />
        </Button>
      );
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
      {leftButton}
    </div>
  );
};

export default CreateAExamControls;
