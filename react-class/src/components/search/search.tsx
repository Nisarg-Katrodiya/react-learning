import React from 'react';

interface IData {
  id: number;
  name: string;
}

interface Props {
  data: IData[];
}

interface State {
  query: string;
}

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ query: value });
  };

  render() {
    const { data } = this.props;
    const { query } = this.state;

    const filteredData = data.filter((item: IData) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div>
        <form>
          <label htmlFor="search-input">
            <span className="visually-hidden">Search</span>{" "}
          </label>
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
            value={query}
            onChange={this.handleInputChange}
          />
        </form>
        {filteredData.map((item: IData) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    );
  }
}

export default Search;