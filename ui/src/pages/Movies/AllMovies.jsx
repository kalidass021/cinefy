import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopRatedMoviesQuery,
} from '../../redux/api/movieApiSlice';
import { useFetchGenresQuery } from '../../redux/api/genreApiSlice';
import MovieCard from './MovieCard';
import banner from '../../../public/assets/images/banner.jpg';
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from '../../redux/slices/movies/moviesSlice';

const AllMovies = () => {
  const dispatch = useDispatch();

  const { data: allMovies } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topRatedMovies } = useGetTopRatedMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = allMovies?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears)).sort((a, b) => b - a);

  useEffect(() => {
    dispatch(setFilteredMovies(allMovies || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [allMovies, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = allMovies.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = allMovies.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = allMovies.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    const sortOptions = {
      'new': newMovies,
      'top-rated': topRatedMovies,
      'random': randomMovies,
    };

    const sortedMovies = sortOptions[sortOption] || [];
    dispatch(setFilteredMovies(sortedMovies));

    // switch (sortOption) {
    //   case 'new':
    //     dispatch(setFilteredMovies(newMovies));
    //     break;

    //   case 'top-rated':
    //     dispatch(setFilteredMovies(topRatedMovies));
    //     break;

    //   case 'random':
    //     dispatch(setFilteredMovies(randomMovies));
    //     break;

    //   default:
    //     dispatch(setFilteredMovies([]));
    //     break;
    // }
  };

  return (
    <div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
  gap-4 -translate-y-[4rem]'
    >
      <>
        <section>
          <div
            className='relative h-[50rem] w-screen mb-10 flex items-center
                justify-center bg-cover'
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className='absolute inset-0 bg-gradient-to-b from-gray-800 to-black-opacity-60'></div>
            <div className='relative z-10 text-center text-white mt-[10rem]'>
              <h1 className='text-8xl font-bold mb-4'>The Movies Hub</h1>
              <p className='text-2xl '>
                Cinematic Odyssey: Unveiling the Magic of Movies
              </p>
            </div>

            <section className='absolute -bottom-[5rem]'>
              <input
                type='text'
                className='w-[100%] h-[5rem] border px-10 outline-none rounded'
                placeholder='Search Movie'
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
              <section className='sorts-container mt-[2rem] ml-[10rem] w-[30rem]'>
                {/* Select Genres */}
                <select
                  className='border p-2 rounded text-black'
                  value={moviesFilter.selectedGenre}
                  onChange={(e) => handleGenreClick(e.target.value)}
                >
                  <option value=''>Genres</option>
                  {genres?.map((genre) => (
                    <option key={genre._Id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                {/* Select Year */}
                <select
                  className='border p-2 ml-4 rounded text-black'
                  value={moviesFilter.selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                >
                  <option value=''>Year</option>
                  {uniqueYears?.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  className='border p-2 ml-4 rounded text-black'
                  value={moviesFilter.selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value=''>Sort By</option>
                  <option value='new'>New Movies</option>
                  <option value='top-rated'>Top Rated Movies</option>
                  <option value='random'>Random Movies</option>
                </select>
              </section>
            </section>
          </div>
          <section className='mt-[10rem] w-screen flex justify-center items-center flex-wrap'>
            {filteredMovies?.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </section>
        </section>
      </>
    </div>
  );
};

export default AllMovies;
