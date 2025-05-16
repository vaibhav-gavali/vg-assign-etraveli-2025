import React from 'react';
import { Row, Col, Select } from '../common';
import { MdSearch } from 'react-icons/md';
import {
  getSearchValueSelector,
  getFilterValueSelector,
} from '../../selectors';
import { setSearchBy, setFilterBy } from '../../redux/slices/headerSlice';
import { connect } from 'react-redux';
import type { CommonActionsType } from '../../model';
import './SearchComponent.scss';

interface Props {
  searchValue: string;
  setSearchBy: CommonActionsType['actionsWithPayload'];
  setFilterBy: CommonActionsType['actionsWithPayload'];
  filterValue: string;
}

export const FILTER_OPTIONS = [
  {
    label: 'Title',
    value: 'title',
  },
  {
    label: 'Director',
    value: 'director',
  },
  {
    label: 'Producer',
    value: 'producer',
  },
];

const SearchComponent: React.FC<Props> = (props) => {
  const { searchValue, setSearchBy, setFilterBy, filterValue } = props;
  return (
    <Row rowClassName="search-wrapper" justifyContent="space-between">
      <Col flexBasis={'20%'} maxWidth={'20%'}>
        <Select
          options={FILTER_OPTIONS}
          handleSelectClick={(value) => {
            setFilterBy(value);
            setSearchBy('');
          }}
          value={filterValue}
          headerTitle="Filter by"
        />
      </Col>

      <Col flexBasis={'79%'} maxWidth={'79%'}>
        <div className="input-wrapper">
          <MdSearch className="icon" />
          <input
            type="text"
            placeholder="Type to search..."
            value={searchValue}
            onChange={(e) => setSearchBy(e.target.value)}
          />
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: any) => ({
  searchValue: getSearchValueSelector(state),
  filterValue: getFilterValueSelector(state),
});

const mapDispatchToProps = {
  setSearchBy,
  setFilterBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
