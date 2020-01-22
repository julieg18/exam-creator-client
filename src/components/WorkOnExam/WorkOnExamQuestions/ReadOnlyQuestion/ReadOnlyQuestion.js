import React from 'react';
import Form from 'react-bootstrap/Form';
import './ReadOnlyQuestion.css';

const ReadOnlyQuestion = (props) => {
  const { type, name, answer, options } = props.question;
  let question =
    type === 'trueOrFalse' ? (
      <>
        <Form.Label>
          {props.index ? `${props.index}. ` : ''}
          {name}
        </Form.Label>
        <div className="trueOrFalseOptions">
          <Form.Check
            readOnly
            checked={answer[0] === 'true'}
            inline
            type="radio"
            label="true"
          />
          <Form.Check
            readOnly
            inline
            checked={answer[0] === 'false'}
            type="radio"
            label="false"
          />
        </div>
      </>
    ) : (
      <>
        <Form.Label>
          {props.index ? `${props.index}. ` : ''}
          {name}
        </Form.Label>
        <div className="questionOptions">
          {options.map((opt) => (
            <Form.Check
              readOnly
              checked={opt.answer === true}
              key={opt.optionId}
              type={type}
              label={opt.name}
            />
          ))}
        </div>
      </>
    );
  return (
    <div
      className={`ReadOnlyQuestion ${
        props.question.type === 'trueOrFalse' ? 'trueOrFalse' : 'multiChoice'
      }Question`}
    >
      {question}
    </div>
  );
};

export default ReadOnlyQuestion;
