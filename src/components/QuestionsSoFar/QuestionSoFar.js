import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class QuestionsSoFar extends React.Component {
  state = {
    questions: [
      {
        name: 'Question One',
        type: 'radio',
        options: [
          { id: 'DIpAA47C', name: 'Option 1', answer: true },
          { id: 'oXG2wRQFQ', name: 'Option 2', answer: false },
        ],
        answer: [{ id: 'DIpAA47C', name: 'Option 1', answer: true }],
      },
      {
        name: 'Question Two',
        type: 'checkbox',
        options: [
          { id: 'puMS9wB-', name: 'Option 1', answer: true },
          { id: 'soggPxXpp', name: 'Option 2', answer: true },
          { id: 'E1GDsfBh', name: 'Option 3', answer: false },
        ],
        answer: [
          { id: 'puMS9wB-', name: 'Option 1', answer: true },
          { id: 'soggPxXpp', name: 'Option 2', answer: true },
        ],
      },
      { name: 'Question 3', type: 'trueOrFalse', options: [], answer: true },
    ],
  };

  createCheckboxCard = (question, eventKey) => (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={eventKey}>
          question.name
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body></Card.Body>
      </Accordion.Collapse>
    </Card>
  );

  createRadioCard = (question) => {};

  createTrueOrFalseCard = (question) => {};

  render() {
    return (
      <div className="QuestionsSoFar">
        <h2>Questions So Far</h2>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Question 1
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default QuestionsSoFar;
