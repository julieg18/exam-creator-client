import React from 'react';
import Form from 'react-bootstrap/Form';
import './CreateAExamTitle.css';

class CreateAExamTitle extends React.Component {
  state = {
    title: this.props.examTitle,
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
        <Form.Group controlId="title">
          <Form.Control
            value={this.state.title}
            onChange={this.changeTitleHandler}
            type="text"
            placeholder="Title"
          />
        </Form.Group>
      </div>
    );
  }
}

export default CreateAExamTitle;
