import React from 'react';

interface Props {
  name: string;
}

const withUpperCaseName = <P extends object>(Component: React.ComponentType<P & Props>) =>
  class WithUpperCaseName extends React.Component<P & Props> {
    render() {
      const { name, ...props } = this.props;
      const upperCaseName = name.toUpperCase();
      return <Component {...props as P} name={upperCaseName} />;
    }
  };

export default withUpperCaseName;
