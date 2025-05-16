import React from 'react';

interface Props {
  children?: any;
  flexDirection?:
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse'
    | 'initial'
    | 'inherit';
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit';
  rowClassName?: string | undefined;
  fullWidth?: boolean;
  styles?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Row: React.FC<Props> = (props) => {
  const {
    alignItems,
    justifyContent,
    flexDirection,
    rowClassName = '',
    children,
    fullWidth,
    styles,
    onClick,
    ...restProps
  } = props;

  const customStyles = {
    alignItems,
    justifyContent,
    flexDirection,
    rowClassName,
    width: fullWidth ? '100%' : 'auto',
  };

  return (
    <div
      className={`row ${rowClassName}`}
      style={{ display: 'flex', ...customStyles, ...styles }}
      onClick={onClick}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default Row;
