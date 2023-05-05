import React from 'react';
import Person from './pureComponent'; // pure component
import withUpperCaseName from './hocComponent'; // takes Components as arguments

const PersonWithUpperCaseName = withUpperCaseName(Person);

const DemoComponent: React.FC = () => {
  const [age, setAge] = React.useState(25);

  const handleAgeChange = () => {
    setAge((prevAge) => prevAge + 1);
  };

  return (
    <div>
      <h1>Demo Component</h1>
      <PersonWithUpperCaseName name="Alice" age={age} />
      <button onClick={handleAgeChange}>Increase Age</button>
    </div>
  );
};

export default DemoComponent;
