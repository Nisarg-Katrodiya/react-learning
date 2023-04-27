import React, {FC} from 'react';
import Search from './Search';

interface IData {
  id: number;
  name: string;
}

interface State {
  data: IData[];
}

class App extends React.Component<FC, State> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      data: [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' },
        { id: 4, name: 'Durian' },
        { id: 5, name: 'Elderberry' },
      ],
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <h1>Search Example</h1>
        <Search data={data} />
      </div>
    );
  }
}

export default App;