import { getMoviesList } from '../utils/testing/test-resource.rsc';
import { currentMovieDetailsSelector, filteredMoviesSelector } from './';

describe('Selectors Unit Tests', () => {
    test('currentMovieDetailsSelector working correctly', () => {
        expect(currentMovieDetailsSelector.resultFunc(getMoviesList(), 1)).toEqual(
            getMoviesList().find((movie) => movie.episode_id === 1)
        );
    });

    test('filteredMoviesSelector working correctly', () => {
        const output1 = filteredMoviesSelector.resultFunc(getMoviesList(), '', '');
        const output2 = filteredMoviesSelector.resultFunc(
            getMoviesList(),
            'episode_id',
            '',
            'title'
        );
        const output3 = filteredMoviesSelector.resultFunc(
            getMoviesList(),
            'episode_id',
            're',
            'title'
        );

        const output4 = filteredMoviesSelector.resultFunc(
            getMoviesList(),
            'episode_id',
            'George',
            'director'
        );

        const output5 = filteredMoviesSelector.resultFunc(
            getMoviesList(),
            'episode_id',
            'Gary Kurtz',
            'producer'
        );

        expect(output1.length).toBe(7);
        expect(output2.length).toBe(7);
        expect(output3.length).toBe(3);
        expect(output4.length).toBe(4);
        expect(output5.length).toBe(2);
    });
});