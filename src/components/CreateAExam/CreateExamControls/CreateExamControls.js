import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import './CreateExamControls.css';

const CreateExamControls = (props) => {
  let forwardButton = (
    <Button
      //className="forwardBtn"
      size="lg"
      variant="info"
      onClick={props.forwardFunction}
    >
      Next <FontAwesomeIcon icon={faArrowRight} />
    </Button>
  );
  let backwardButton = (
    <Button
      className="backwardBtn"
      size="lg"
      onClick={props.backwardFunction}
      variant="info"
    >
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Button>
  );
  let createExamControlsClass = 'CreateExamGeneralControls';
  switch (props.examPart) {
    case 'title':
      backwardButton = '';
      createExamControlsClass = 'CreateExamTitleControls';
      break;
    case 'finish':
      forwardButton = '';
      createExamControlsClass = 'CreateExamFinishControls';
      break;
    default:
  }
  return (
    <div className={`CreateExamControls ${createExamControlsClass}`}>
      <div className="backwardBtn">{backwardButton}</div>
      <div className="resetBtn">
        <Button size="lg" onClick={props.resetFunction} variant="info">
          <FontAwesomeIcon icon={faUndo} />
        </Button>
      </div>
      <div className="forwardBtn">{forwardButton}</div>
    </div>
  );
};

export default CreateExamControls;
