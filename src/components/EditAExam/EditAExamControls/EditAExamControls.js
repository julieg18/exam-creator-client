import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faUndo,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import LoadingButton from '../../common/LoadingButton/LoadingButton';
import './EditAExamControls.css';

const EditAExamControls = (props) => {
  let editAExamControlsClass = 'EditAExamGeneralControls';
  let centerButtons = (
    <>
      <Button
        className="resetBtn"
        size="lg"
        onClick={props.resetFunction}
        variant="info"
      >
        <span>Cancel Exam Changes </span>
        <FontAwesomeIcon icon={faUndo} />
      </Button>
      <LoadingButton
        classes="finishBtn"
        size="lg"
        variant="info"
        type="button"
        onClickFunc={props.goToFinishExamPart}
        loading={props.loading}
      >
        <span>Save Exam Changes </span>
        <FontAwesomeIcon icon={faSave} />
      </LoadingButton>
    </>
  );
  let rightButton = (
    <Button
      className="nextBtn"
      size="lg"
      variant="info"
      onClick={props.forwardFunction}
      disabled={props.disableNextBtn}
    >
      <span>Next </span>
      <FontAwesomeIcon icon={faArrowRight} />
    </Button>
  );

  switch (props.examPart) {
    case 'title':
      editAExamControlsClass = 'EditAExamTitleControls';
      break;
    case 'finish':
      editAExamControlsClass = 'EditAExamFinishControls';
      centerButtons = (
        <Button
          className="resetBtn"
          size="lg"
          onClick={props.resetFunction}
          variant="info"
        >
          <span>Cancel Exam Changes </span>
          <FontAwesomeIcon icon={faUndo} />
        </Button>
      );
      rightButton = (
        <LoadingButton
          classes="finishBtn"
          size="lg"
          variant="info"
          type="button"
          onClickFunc={props.finishFunction}
          loading={props.loading}
        >
          <span>Save Exam Changes </span>
          <FontAwesomeIcon icon={faSave} />
        </LoadingButton>
      );
      break;
    default:
  }
  return (
    <div className={`EditAExamControls ${editAExamControlsClass}`}>
      <Button
        className="backBtn"
        size="lg"
        onClick={props.backwardFunction}
        variant="info"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span> Back</span>
      </Button>
      {centerButtons}
      {rightButton}
    </div>
  );
};

export default EditAExamControls;
