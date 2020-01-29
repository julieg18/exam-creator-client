import React from 'react';
import Form from 'react-bootstrap/Form';
import './WorkOnExamTitle.css';

class WorkOnExamTitle extends React.Component {
  state = {
    title: this.props.examTitle,
    hasTitleChanged: false,
  };

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
      hasTitleChanged: true,
    });
    this.props.changeNextBtn(/^\s*$/.test(e.target.value));
  };

  componentWillUnmount() {
    this.props.completeExamTitle(this.state.title, this.state.hasTitleChanged);
  }

  render() {
    return (
      <div className="WorkOnExamTitle">
        <h1>{this.props.heading}</h1>
        <Form.Group controlId="title">
          <Form.Control
            value={this.state.title}
            onChange={this.handleTitleChange}
            type="text"
            placeholder="Title"
          />
        </Form.Group>
      </div>
    );
  }
}

export default WorkOnExamTitle;
