import React from 'react';
import Form from 'react-bootstrap/Form';

const Question = (props) => {
  const {
    index,
    question: { _id, name, type, options },
  } = props;

  let questionTypeForm = (
    <>
      {options.map((opt) => (
        <Form.Check
          key={opt.optionId}
          label={opt.name}
          name={_id}
          type={type}
          value={opt.optionId}
        />
      ))}
    </>
  );

  if (type === 'true_false') {
    questionTypeForm = (
      <>
        <Form.Check value="true" label="True" name={_id} type="radio" />
        <Form.Check value="false" label="False" name={_id} type="radio" />
      </>
    );
  }

  return (
    <Form.Group>
      <Form.Label>
        {index}. {name}
      </Form.Label>
      <div className="questionOptions">{questionTypeForm}</div>
    </Form.Group>
  );
};

export default Question;
