import React, { Component } from 'react';

type Props = Record<string, never>

interface State {
  color: string;
}

enum Colors {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

class ColorBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      color: Colors.RED,
    };
  }

  handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ color: event.target.value });
  };

  render() {
    const { color } = this.state;

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
                onChange={this.handleRadioChange}
              />
              Red
            </label>
            <label>
              <input
                type="radio"
                value={Colors.GREEN}
                checked={color === Colors.GREEN}
                onChange={this.handleRadioChange}
              />
              Green
            </label>
            <label>
              <input
                type="radio"
                value={Colors.BLUE}
                checked={color === Colors.BLUE}
                onChange={this.handleRadioChange}
              />
              Blue
            </label>
          </div>
        </div>
    );
  }
}

export default ColorBox;