import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './CreateAExamTitle.css';

class CreateAExamTitle extends React.Component {
  state = {
    title: this.props.examTitle,
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.nextExamPart();
  };

  changeTitleHandler = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  componentWillUnmount() {
    this.props.createExamTitle(this.state.title);
  }

  render() {
    return (
      <div className="CreateAExamTitle">
        <h1>What is your exam's title?</h1>
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="title">
            <Form.Control
              value={this.state.title}
              onChange={this.changeTitleHandler}
              type="text"
              placeholder="Title"
            />
          </Form.Group>
          <Button variant="info" type="submit">
            {/* <FontAwesomeIcon icon={faRefresh} /> */}
          </Button>
          <Button variant="info" type="submit">
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateAExamTitle;
