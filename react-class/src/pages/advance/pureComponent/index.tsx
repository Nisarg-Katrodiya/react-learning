import React from 'react';

interface Props {
  name: string;
  age: number;
}

const Person: React.FC<Props> = React.memo((props) => {
  console.log('Person component rendered');
  return (
    <div>
      <h2>My name is {props.name}.</h2>
      <h3>I am {props.age} years old.</h3>
    </div>
  );
});

export default Person;
