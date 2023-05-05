import React from 'react';

interface LinkDataTypes {
  title: string;
  path: string;
}

interface Props {
  navLinks: LinkDataTypes[];
}

const hocLink = <P extends object>(Component: React.ComponentType<P & Props>) => {
  const hocComponent: React.FC<P & Props> = (props) => {
    const { navLinks } = props;
    return (
      <>
      {
        navLinks.map((link: LinkDataTypes) => {
            <Component {...props as P} navLinks={navLinks} path={link.path} title={link.title} />;
          })
      }
      </>
    )
  };
  return hocComponent;
}

export default hocLink;