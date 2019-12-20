import React from 'react';

class EditStudent extends React.Component {
  state = {
    questionName: '',
    error: '',
  };

  render() {
    return (
      <div className="EditStudent">
        <h2>Edit Student</h2>
      </div>
    );
  }
}

export default EditStudent;
