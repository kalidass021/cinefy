import { useGetNewMoviesQuery } from '../../redux/api/movieApiSlice';
import { Link } from 'react-router-dom';
import { SliderUtil } from '../../components';

const Header = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  return (
    <div
      className='flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between
    items-center md:items-start'
    >
      <nav className='w-full md:w-[10rem] ml-0 md:ml-2 md:mb-0'>
        {/* Home */}
        <Link
          to='/'
          className='transition duration-300 ease-in-out hover:bg-teal-200
            block p-2 rounded mb-1 md:mb-2 text-lg'
        >
          Home
        </Link>
        {/* Browse Movies */}
        <Link
          to='/movies'
          className='transition duration-300 ease-in-out hover:bg-teal-200
            block p-2 rounded mb-1 md:mb-2 text-lg'
        >
          Browse Movies
        </Link>
      </nav>

      <div className='w-full md:w-[80%] mr-0 md:mr-2'>
        <SliderUtil movies={newMovies} />
      </div>
    </div>
  );
};

export default Header;
