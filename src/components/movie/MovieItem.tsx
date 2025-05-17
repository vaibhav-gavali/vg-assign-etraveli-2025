import React from 'react';
import type { CommonActionsType } from '../../model';
import { Col, Row } from '../common';
import './MovieItem.scss';
import Rating from '../common/Rating';
import type { Movie } from './MoviesListComponent';

interface Props {
  movie: Movie;
  selectSingleMovie: CommonActionsType['actionsWithPayload'];
  selected: boolean
}

const MovieItem: React.FC<Props> = (props) => {
  const { movie, selectSingleMovie, selected = false } = props;
  const { title, episode_id, release_date, posterInfo: { imdbRating = 0 } = {} } = movie;

  return (
    <Row
      fullWidth
      rowClassName={`item-wrapper ${selected ? 'selected' : ''}`}
      onClick={() => selectSingleMovie(episode_id)}
      alignItems="center"
      justifyContent="center"
      data-testid="movie-item"
      styles={{ gap: '10px' }}
    >
      <Col
        colClassName="episode"
        data-testid="movie-episodeId"
      >{`EPISODE ${episode_id}`}</Col>
      <Col flexGrow={1} colClassName="title">
        {title}
      </Col>
      <Col colClassName="date" data-testid="movie-ratings">
        <Rating value={parseInt(imdbRating)} total={10} />
      </Col>
      <Col colClassName="date" data-testid="movie-releaseDate">
        {release_date}
      </Col>
    </Row>
  );
};

export default MovieItem;
