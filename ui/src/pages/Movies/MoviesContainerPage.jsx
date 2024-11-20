import { useState } from 'react';
import {
  useGetNewMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetRandomMoviesQuery,
} from '../../redux/api/movieApiSlice';
import { useFetchGenresQuery } from '../../redux/api/genreApiSlice';
import SliderUtil from '../../components/SliderUtil';

const MoviesContainerPage = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topRatedMovies } = useGetTopRatedMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: genres } = useFetchGenresQuery();

  console.log('top rated movies', topRatedMovies);

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = newMovies?.filter(
    (movie) => movie.genre === selectedGenre || selectedGenre === null
  );

  return (
    <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
      <nav className='ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row'>
        {genres?.map((genre) => (
          <button
            key={genre._id}
            className={`transition duration-300 ease-in-out
            hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg
            ${selectedGenre === genre._id ? 'bg-gray-200' : ''}`}
            onClick={() => handleGenreClick(genre._id)}
          >
            {genre.name}
          </button>
        ))}
      </nav>

      <section className='flex flex-col justify-center items-center w-full lg:w-auto'>
        <div className='w-full lg:w-[100rem] mb-8'>
          <h1 className='mb-5 '>Choose For You</h1>
          <SliderUtil movies={randomMovies} />
        </div>

        <div className='w-full lg:w-[100rem] mb-8'>
          <h1 className='mb-5'>Top Rated Movies</h1>
          <SliderUtil movies={topRatedMovies} />
        </div>

        <div className='w-full lg:w-[100rem] mb-8'>
          <h1 className='mb-5'>Choose Movie</h1>
          <SliderUtil movies={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
