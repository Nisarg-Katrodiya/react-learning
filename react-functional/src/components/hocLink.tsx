import React from 'react';

interface Props {
  path: string;
}

const hocLink = <P extends object>(Component: React.ComponentType<P & Props>) => {
  const hocComponent: React.FC<P & Props> = (props) => {
    const { path } = props;
    const lowercase = path.toLowerCase();
    return <Component {...props as P} path={lowercase} />;
  };
  return hocComponent;
}

export default hocLink;