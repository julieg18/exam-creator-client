import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './StudentsSoFar.css';

class StudentsSoFar extends React.Component {
  changeTabHandler = () => {
    if (window.innerWidth <= 500) {
      this.props.changeTab('workOnStudent');
    }
  };

  render() {
    return (
      <div className="StudentsSoFar">
        <div className="scrollOnOverflow">
          <h2>Students So Far</h2>
          <Accordion>
            {this.props.students.map((student, index) => {
              return (
                <Card key={student.id}>
                  <Accordion.Toggle as={Card.Header} eventKey={index}>
                    {index + 1}. {student.name}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body>
                      <Button
                        onClick={() => {
                          this.changeTabHandler();
                          this.props.editStudentStart(student);
                        }}
                        variant="info"
                        block
                      >
                        Edit Student
                      </Button>
                      <Button
                        onClick={() => this.props.deleteStudent(student.id)}
                        variant="danger"
                        block
                      >
                        Delete Student
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        </div>
      </div>
    );
  }
}

export default StudentsSoFar;
