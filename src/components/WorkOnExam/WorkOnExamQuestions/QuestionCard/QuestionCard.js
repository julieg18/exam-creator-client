import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import ReadOnlyQuestion from '../ReadOnlyQuestion/ReadOnlyQuestion';
import './QuestionCard.css';

const QuestionCard = (props) => {
  const {
    eventKey,
    question: { name },
  } = props;
  return (
    <div className="QuestionCard">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
          {eventKey + 1}. {name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body>
            <ReadOnlyQuestion question={props.question} />
            <Button onClick={props.editQuestion} variant="info" block>
              Edit Question
            </Button>
            <Button onClick={props.deleteQuestion} variant="danger" block>
              Delete Question
            </Button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </div>
  );
};

export default QuestionCard;
