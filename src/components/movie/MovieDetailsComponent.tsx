import React, { useState } from 'react';
import { Row, Modal } from '../common';
import { currentMovieDetailsSelector } from '../../selectors';
import { connect } from 'react-redux';
import './MovieDetailsComponent.scss';
import SingleMovieDetails from './SingleMovieDetails';

type Movie = {
  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
};

interface Props {
  currentMovie: Movie;
}

const stylesForEmptyCondition = {
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};

const MovieDetailsComponent: React.FC<Props> = (props) => {
  const { currentMovie } = props;
  const { title, opening_crawl, director, producer } = currentMovie;
  const [showModal, setShowModal] = useState(false);

  const movieSelected = Object.keys(currentMovie).length > 0;

  return (
    <Row
      flexDirection="column"
      rowClassName="details-wrapper"
      styles={!movieSelected ? stylesForEmptyCondition : {}}
    >
      {movieSelected ? (
        <Row data-testid="movie-details" flexDirection="column">
          <Row flexDirection="column">
            <h2>{title}</h2>
            <p className="details">{opening_crawl}</p>
            <div className="director">Directed by: {director}</div>
            <div className="director">Produced by: {producer}</div>
          </Row>
          <Row rowClassName="modal-wrapper">
            <button
              className="more-details"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              Show Characters Details
            </button>
            <Modal
              shouldShow={showModal}
              onRequestClose={() => setShowModal(false)}
              headerLabel="Characters Details"
            >
              <SingleMovieDetails />
            </Modal>
          </Row>
        </Row>
      ) : (
        <h3>No Movie Selected</h3>
      )}
    </Row>
  );
};

const mapStateToProps = (state: any) => ({
  currentMovie: currentMovieDetailsSelector(state),
});

export default connect(mapStateToProps, null)(MovieDetailsComponent);
