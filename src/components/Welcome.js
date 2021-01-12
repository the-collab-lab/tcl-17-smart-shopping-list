import React from 'react';

const Welcome = (props) => {
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={props.onClick}>Create a New List</button>
    </div>
  );
};

export default Welcome;
