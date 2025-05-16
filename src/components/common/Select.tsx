import React from 'react';
import { useState } from 'react';
import { Row } from '../common';
import { MdClose, MdCheck } from 'react-icons/md';

import './Select.scss';

interface Props {
  options: any[];
  valueKey?: string;
  labelKey?: string;
  value?: string;
  handleSelectClick: (value: string) => void;
  headerTitle?: string;
}

const Select: React.FC<Props> = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    options = [],
    valueKey = 'value',
    labelKey = 'label',
    value = '',
    handleSelectClick,
    headerTitle = '',
  } = props;

  const selectedLabel = options.find((item) => item[valueKey] === value)?.[
    labelKey
  ];

  return (
    <div className="dropdown">
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
        className="dropbtn"
        data-testid="drop-btn"
      >
        {headerTitle}:{' '}
        <span style={{ fontWeight: 'bold' }}>{selectedLabel}</span>
      </button>
      <Row
        flexDirection="column"
        rowClassName={`dropdown-content ${showDropdown ? 'show' : ''}`}
        data-testid="drop-list-wrapper"
      >
        {headerTitle && (
          <Row fullWidth rowClassName={`content-header`}>
            <div style={{ flexGrow: 1 }}>{headerTitle}</div>
            <MdClose
              className="icon"
              onClick={() => {
                setShowDropdown(false);
              }}
            />
          </Row>
        )}
        <Row flexDirection="column" fullWidth>
          {options.map((option) => (
            <div
              className="optionItem"
              key={option[valueKey]}
              onClick={() => {
                setShowDropdown(false);
                handleSelectClick(option.value);
              }}
            >
              {value === option.value && (
                <MdCheck data-testid="checked" className="checked" />
              )}
              {option[labelKey]}
            </div>
          ))}
        </Row>
      </Row>
    </div>
  );
};

export default Select;
