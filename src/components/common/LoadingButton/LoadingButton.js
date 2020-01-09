import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingButton.css';

const LoadingButton = (props) => {
  return (
    <Button
      onClick={props.type === 'button' ? props.onClickFunc : () => {}}
      className="LoadingButton"
      variant={props.variant}
      type={props.type}
      size={props.size}
    >
      <div className={`spinner ${!props.loading ? 'invisible' : ''}`}>
        <Spinner as="span" animation="border" />
        <span className="sr-only">Loading...</span>
      </div>
      <div className={props.loading ? 'invisible' : ''}>{props.children}</div>
    </Button>
  );
};

export default LoadingButton;
