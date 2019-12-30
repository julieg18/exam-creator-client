import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import './MultiChoiceCard.css';

class MultiChoiceCard extends React.Component {
  render() {
    const {
      type,
      eventKey,
      question: { name, options },
    } = this.props;
    return (
      <div className="MultiChoiceCard">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
            {eventKey + 1}. {name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
              <div className="question">
                <Form.Label>{name}</Form.Label>
                <div className="questionOptions">
                  {options.map((opt) => (
                    <Form.Check
                      readOnly
                      checked={opt.answer === true}
                      key={opt.id}
                      type={type}
                      label={opt.name}
                    />
                  ))}
                </div>
              </div>
              <Button onClick={this.props.editQuestion} variant="info" block>
                Edit Question
              </Button>
              <Button
                onClick={this.props.deleteQuestion}
                variant="danger"
                block
              >
                Delete Question
              </Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </div>
    );
  }
}

export default MultiChoiceCard;
