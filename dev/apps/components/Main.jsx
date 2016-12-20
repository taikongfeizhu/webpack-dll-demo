import React, { PropTypes } from 'react';

export default function Main(props) {
  const { children } = props;
  return (
    <div className="ant-layout-aside">
      {children}
    </div>
  );
}

Main.PropTypes = {
  children: PropTypes.object
};
