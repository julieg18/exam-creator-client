import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import './TrueOrFalseCard.css';

class TrueOrFalseCard extends React.Component {
  render() {
    const {
      eventKey,
      question: { name, answer },
    } = this.props;
    return (
      <div className="TrueOrFalseCard">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
            {eventKey + 1}. {name}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
              <div className="question">
                <Form.Label>{name}</Form.Label>
                <div className="radio">
                  <Form.Check
                    readOnly
                    checked={answer === true}
                    inline
                    type="radio"
                    label="true"
                  />
                  <Form.Check
                    readOnly
                    inline
                    checked={answer === false}
                    type="radio"
                    label="false"
                  />
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

export default TrueOrFalseCard;
