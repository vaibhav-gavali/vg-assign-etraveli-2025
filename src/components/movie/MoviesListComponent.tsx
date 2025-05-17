import React from 'react';
import { Row } from '../common';
import { currentMovieIndexSelector, filteredMoviesSelector } from '../../selectors';
import { selectSingleMovie } from '../../redux/slices/movieSlice';
import { connect } from 'react-redux';
import type { CommonActionsType } from '../../model';
import MovieItem from './MovieItem';

export type Movie = {
  title: string;
  episode_id: number;
  release_date: string;
  posterInfo: any;
  opening_crawl: string;
  director: string;
  producer: string;
};

interface Props {
  list: Movie[];
  selectSingleMovie: CommonActionsType['actionsWithPayload'];
  currentMovieIndex: number
}

const MoviesListComponent: React.FC<Props> = (props) => {
  const { list, selectSingleMovie, currentMovieIndex } = props;

  const stylesForEmptyCondition = {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const noMovies = list.length === 0;

  return (
    <Row
      flexDirection="column"
      styles={noMovies ? stylesForEmptyCondition : {}}
    >
      {!noMovies ? (
        list.map((movie) => {
          return (
            <MovieItem
              key={movie.episode_id}
              movie={movie}
              selectSingleMovie={selectSingleMovie}
              selected={currentMovieIndex === movie?.episode_id}
            />
          );
        })
      ) : (
        <h3>No Movie(s) Found</h3>
      )}
    </Row>
  );
};

const mapStateToProps = (state: any) => ({
  list: filteredMoviesSelector(state),
  currentMovieIndex: currentMovieIndexSelector(state)
});

const mapDispatchToProps = {
  selectSingleMovie,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesListComponent);
