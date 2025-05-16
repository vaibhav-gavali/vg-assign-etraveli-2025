import React, { useEffect, useState } from 'react';
import { Col, Row } from '../common';
import {
  charactersListSelector,
  currentMovieDetailsSelector,
} from '../../selectors';
import { setMovieCharactersSuccess, setMovieCharactersFailure } from '../../redux/slices/movieSlice';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import { compose } from 'redux';
import httpClient from '../../helpers/httpClient';
import type { ComponentType } from 'react';

type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
};

interface Props {
  charactersList: Character[];
  currentMovie: any;
  setMovieCharactersSuccess: (payload: any) => void;
  setMovieCharactersFailure: () => void;
}

const getAllCharactersUrl = (characters = []) => {
  return characters.map((characterURL) => httpClient.get(characterURL));
};

const SingleMovieDetails: React.FC<Props> = (props) => {
  const { charactersList, currentMovie, setMovieCharactersSuccess, setMovieCharactersFailure } = props;
  const [charactersLoading, setCharactersLoading] = useState(false);


  useEffect(() => {
    const getAllCharacters = async () => {
      setCharactersLoading(true);
      const getAllUrls = getAllCharactersUrl(currentMovie?.characters);
      try {
        const characters = await httpClient.all(...getAllUrls);
        const filteredData = characters.map((obj) => {
          return {
            ...obj.data,
          };
        });

        setMovieCharactersSuccess(filteredData);

      } catch (e) {
        setMovieCharactersFailure()
      } finally {
        setCharactersLoading(false);
      }
    }


    if (currentMovie?.characters?.length > 0) {
      getAllCharacters()
    }
  }, [])

  if (charactersLoading) {
    return (
      <Row
        justifyContent="center"
        alignItems="center"
        styles={{ margin: '20px 0px' }}
        data-testid={'characters-loading'}
        fullWidth
      >
        <Loader />
      </Row>
    );
  }

  const stylesForEmptyCondition = {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const noCharacters = charactersList.length === 0;

  if (noCharacters) {
    return (
      <Row
        styles={stylesForEmptyCondition}
        data-testid={'characters-loaded-empty'}
      >
        <h3>No Character(s) Found</h3>
      </Row>
    );
  }

  return (
    <Row
      styles={{
        flexWrap: 'wrap',
        maxHeight: '500px',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
      justifyContent="space-around"
      data-testid={'characters-loaded'}
    >
      {charactersList.map((character, index) => {
        return (
          <Col
            flexBasis="32%"
            maxWidth="32%"
            styles={{
              background: 'lightgray',
              marginBottom: 10,
              borderRadius: 3,
              padding: 10,
            }}
            key={`${character.name}-${index}`}
          >
            <Row flexDirection="column">
              <div>
                <span>Name: </span> <span>{character.name}</span>
              </div>
              <div>
                <span>Height: </span> <span>{character.height}</span>
              </div>
              <div>
                <span>Mass: </span> <span>{character.mass}</span>
              </div>
              <div>
                <span>Hair Color: </span> <span>{character.hair_color}</span>
              </div>
              <div>
                <span>Skin Color: </span> <span>{character.skin_color}</span>
              </div>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};

const mapStateToProps = (state: any) => ({
  charactersList: charactersListSelector(state),
  currentMovie: currentMovieDetailsSelector(state)
});

const mapDispatchToProps = {
  setMovieCharactersSuccess,
  setMovieCharactersFailure,
};

export default compose<ComponentType>(
  connect(mapStateToProps, mapDispatchToProps)
)(SingleMovieDetails);
