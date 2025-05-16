import { Select } from '../common';
import { connect } from 'react-redux';
import { getSortValueSelector } from '../../selectors';
import { setSortBy } from '../../redux/slices/headerSlice';
import type { CommonActionsType } from '../../model';

export const SORT_OPTIONS = [
  {
    label: 'Episode',
    value: 'episode_id',
  },
  {
    label: 'Year',
    value: 'release_date',
  },
];

interface Props {
  sortValue: string;
  setSortBy: CommonActionsType['actionsWithPayload'];
}

const SortComponent: React.FC<Props> = (props) => {
  const { sortValue, setSortBy } = props;
  return (
    <Select
      options={SORT_OPTIONS}
      handleSelectClick={(value) => {
        setSortBy(value);
      }}
      value={sortValue}
      headerTitle="Sort by"
    />
  );
};

const mapStateToProps = (state: any) => ({
  sortValue: getSortValueSelector(state),
});

const mapDispatchToProps = {
  setSortBy,
};

export default connect(mapStateToProps, mapDispatchToProps)(SortComponent);
