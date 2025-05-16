import React from 'react';
import './Loader.scss';

interface Props {
  size?: 'small' | 'medium' | 'large';
}

const Loader: React.FC<Props> = (props) => {
  const { size = 'medium', ...restProps } = props;

  return <div className={`loader ${size}`} {...restProps}></div>;
};

export default Loader;
