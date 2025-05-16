import type { ComponentType } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './App.scss';
import HeaderComponent from './containers/HeaderComponent';
import MovieComponent from './containers/MovieComponent';
// import type { CommonActionsType } from './model';
import { setMovieListFailure, setMovieListSuccess } from './redux/slices/movieSlice';
import { useApiInstance } from './hooks/useAPI';

interface Props {
  setMovieListSuccess: (data: any) => void;
  setMovieListFailure: () => void;
}

const App: React.FC<Props> = (props) => {
  const { setMovieListSuccess, setMovieListFailure } = props;

  const [, loading] = useApiInstance({
    url: 'https://swapi.py4e.com/api/films/?format=json',
    autoTrigger: true,
    onSuccess: (data) => {
      setMovieListSuccess(data?.results ?? []);
    },
    onError: (error) => { setMovieListFailure() }
  })

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
};

export default compose<ComponentType>(
  connect(null, mapDispatchToProps),
)(App);