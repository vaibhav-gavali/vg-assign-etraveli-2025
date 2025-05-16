import React from 'react';
import MovieDetailsComponent from '../components/movie/MovieDetailsComponent';
import MoviesListComponent from '../components/movie/MoviesListComponent';
import { Row, Col } from '../components/common';
import Loader from '../components/common/Loader';

interface Props {
    listLoading: boolean;
}

const MovieComponent: React.FC<Props> = (props) => {
    const { listLoading } = props;

    if (listLoading) {
        return (
            <Row
                justifyContent="center"
                alignItems="center"
                styles={{ margin: '20px 0px' }}
                data-testid={'movie-loading'}
            >
                <Loader />
            </Row>
        );
    }

    return (
        <Row
            justifyContent="space-between"
            styles={{ height: '100%' }}
            data-testid={'movie-loaded'}
        >
            <Col flexBasis={'50%'} maxWidth={'50%'}>
                <MoviesListComponent />
            </Col>
            <Col flexBasis={'50%'} maxWidth={'50%'}>
                <MovieDetailsComponent />
            </Col>
        </Row>
    );
};

export default (MovieComponent);