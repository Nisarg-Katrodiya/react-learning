import React, { useState } from 'react';

enum Colors {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

const ColorBox: React.FC = () => {
  const [color, setColor] = useState<string>(Colors.RED);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <div>
      <h1>Color Box Example</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150px' }}>
        <div
          style={{
            backgroundColor: color,
            height: '100px',
            width: '100px',
          }}
        />
      </div>
      <div>
        <label>
          <input
            type="radio"
            value={Colors.RED}
            checked={color === Colors.RED}
            onChange={handleRadioChange}
          />
          Red
        </label>
        <label>
          <input
            type="radio"
            value={Colors.GREEN}
            checked={color === Colors.GREEN}
            onChange={handleRadioChange}
          />
          Green
        </label>
        <label>
          <input
            type="radio"
            value={Colors.BLUE}
            checked={color === Colors.BLUE}
            onChange={handleRadioChange}
          />
          Blue
        </label>
      </div>
    </div>
  );
};

export default ColorBox;