import React from 'react';

interface Props {
  children?: any;
  flexBasis?: number | 'auto' | 'initial' | 'inherit' | string;
  maxWidth?: number | string;
  fullWidth?: boolean;
  colClassName?: string | undefined;
  flexGrow?: number;
  styles?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Col: React.FC<Props> = (props) => {
  const {
    flexBasis = 'auto',
    maxWidth = 'auto',
    fullWidth = false,
    colClassName = '',
    flexGrow = 0,
    children,
    styles,
    onClick,
    ...restProps
  } = props;

  const customStyles = {
    flexBasis,
    maxWidth,
    width: fullWidth ? '100%' : 'auto',
    colClassName,
    flexGrow,
  };

  return (
    <div
      className={`col ${colClassName}`}
      style={{ ...customStyles, ...styles }}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Col;
