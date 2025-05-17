import type { ComponentType } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './App.scss';
import HeaderComponent from './containers/HeaderComponent';
import MovieComponent from './containers/MovieComponent';
// import type { CommonActionsType } from './model';
import { setMovieListFailure, setMovieListSuccess, setMoviePosterListSuccess } from './redux/slices/movieSlice';
import { useApiInstance } from './hooks/useAPI';
import httpClient from './helpers/httpClient';
import type { AxiosResponse } from 'axios';

interface Props {
  setMovieListSuccess: (data: any) => void;
  setMovieListFailure: () => void;
  setMoviePosterListSuccess: (dpayload: any) => void
}

const App: React.FC<Props> = (props) => {
  const { setMovieListSuccess, setMovieListFailure, setMoviePosterListSuccess } = props;

  const [, loading] = useApiInstance({
    url: 'https://swapi.py4e.com/api/films/?format=json',
    autoTrigger: true,
    onSuccess: (data) => {
      setMovieListSuccess(data?.results ?? []);
      getMoviePosters(data?.results)
    },
    onError: (_error) => { setMovieListFailure() }
  })

  const getMoviePosters = async (movieList: any[]) => {
    const urlMap: Record<number, string> = {};
    movieList?.forEach((movie: any) => {
      urlMap[movie.episode_id] = movie.title
    });

    const movieKeys = Object.keys(urlMap);
    const requests: Promise<AxiosResponse<any>>[] = movieKeys.map((key: any) => {
      const URL = `https://www.omdbapi.com/?apikey=b9a5e69d&t=${urlMap[key]}`
      return httpClient.get(URL)
    })

    try {
      const posters = await httpClient.all(...requests);
      const postersData = posters.map((obj) => {
        return {
          ...obj.data,
        };
      });

      setMoviePosterListSuccess(postersData);

    } catch (e) {
      console.log('Something went wrong!')
    } finally {

    }
  }

  return (
    <div className="App">
      <HeaderComponent />
      <MovieComponent listLoading={loading} />
    </div>
  );
};

const mapDispatchToProps = {
  setMovieListSuccess,
  setMovieListFailure,
  setMoviePosterListSuccess,
};

export default compose<ComponentType>(
  connect(null, mapDispatchToProps),
)(App);