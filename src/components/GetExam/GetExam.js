import React from 'react';
import './App.css';

class GetExam extends React.Component {
  state = {
    exam: 'I will be an exam, believe it!',
  };

  onClickHandler = async () => {
    const res = await fetch('/api/v1/exams/5dd3f0daa41448281cf77910');
    const exam = await res.json();
    this.setState({
      exam: JSON.stringify(exam, null, 2),
    });
  };

  render() {
    return (
      <div className="App" onClick={this.onClickHandler}>
        <p>I'm An Exam Creator</p>
        {this.state.exam}
      </div>
    );
  }
}

export default GetExam;
