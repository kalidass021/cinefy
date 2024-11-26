import SecondaryCard from './SecondaryCard';
import VideoCard from './VideoCard';
import RealTimeCard from './RealTimeCard';
import { useGetAllUsersQuery } from '../../../../redux/api/usersApiSlice';
import {
  useGetAllMoviesQuery,
  useGetTopRatedMoviesQuery,
} from '../../../../redux/api/movieApiSlice';
import { BASE_URL } from '../../../../config/constants';

const Main = () => {
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
    isError: isUsersError,
  } = useGetAllUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();
  const { data: topRatedMovies } = useGetTopRatedMoviesQuery();

  // totalReviewsLength (arr) contains number of reviews on each movie
  const totalReviewsLength = allMovies?.map((movie) => movie.numOfReviews);
  const sumOfReviewsLength = totalReviewsLength?.reduce(
    (acc, curr) => acc + curr,
    0
  );

  if (usersLoading) {
    return <div>Loading Users...</div>;
  }
  if (isUsersError) {
    return <div>{usersError.message}</div>;
  }
  return (
    <div>
      <section className='flex justify-around '>
        <div className='ml-[18rem] mt-10'>
          <div className='-translate-x-4 flex'>
            <SecondaryCard
              pill='Users'
              content={users?.length}
              info='20.2k more than usual'
              gradient='from-teal-500 to-lime-400'
            />

            <SecondaryCard
              pill='Reviews'
              content={sumOfReviewsLength}
              info='742.8 more than usual'
              gradient='from-[#ccc514] to-[#cdcb8e]'
            />

            <SecondaryCard
              pill='Movies'
              content={allMovies?.length}
              info='372+ more than usual'
              gradient='from-green-500 to-lime-400'
            />
          </div>
          <div className='flex justify-between w-[90%] text-white mt-10 font-bold'>
            <p>Top Content</p>
            <p>Reviews</p>
          </div>

          {topRatedMovies?.map((movie) => (
            <VideoCard
              key={movie._id}
              image={`${BASE_URL}${movie?.image}`}
              title={movie.name}
              date={movie.year}
              reviews={movie.numOfReviews}
            />
          ))}
        </div>
        <div>
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;
