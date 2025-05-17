import React, { useEffect, useState } from 'react';
import { Row, Modal, Col } from '../common';
import { currentMovieDetailsSelector } from '../../selectors';
import { connect } from 'react-redux';
import './MovieDetailsComponent.scss';
import SingleMovieDetails from './SingleMovieDetails';
import styled from 'styled-components';
import type { Movie } from './MoviesListComponent';
import ImageNotFound from '../../assets/image-not-found.png'
import Rating from '../common/Rating';

const StyledImgCol = styled(Col)`
  min-width: 30%;
  max-width: 30%;
 

  img{
    width: 100%;
    height: 200px;
    Display: block;
    border: 1px solid #000;
    border-radius: 4px;
    overflow: none;
  }
`

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
  const { title, opening_crawl, director, producer, posterInfo = {} } = currentMovie;
  const [showModal, setShowModal] = useState(false);
  const [imgHasError, setImgHasError] = useState(false);

  const movieSelected = Object.keys(currentMovie).length > 0;

  // Logic for handling the images with error
  useEffect(() => {
    setImgHasError(false);
  }, [posterInfo?.Poster]);

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
            <Row styles={{ gap: '10px', marginTop: '10px' }}>
              <StyledImgCol>
                {(imgHasError) ?
                  <img src={ImageNotFound} alt="Fallback" /> :
                  <img src={posterInfo?.Poster} alt="Movie Poster" onError={() => { setImgHasError(true) }} />}
              </StyledImgCol>
              <Col styles={{ flex: 1 }}><p className="details">{opening_crawl}</p></Col>

            </Row>

            <Col fullWidth colClassName="director" styles={{ marginTop: '10px' }}>Directed by: {director}</Col>
            <Col fullWidth colClassName="director">Produced by: {producer}</Col>
            <Col fullWidth styles={{ marginTop: '5px' }}><Rating value={parseInt(posterInfo?.imdbRating)} total={10} /></Col>
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
