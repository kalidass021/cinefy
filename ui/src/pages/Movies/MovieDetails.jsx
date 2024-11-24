import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from '../../redux/api/movieApiSlice';
import MovieTabs from './MovieTabs';
import { IMAGE_BASE_URL } from '../../config/constants';

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();

      toast.success('Review added successfully');
    } catch (err) {
      console.error(`Error while adding review: ${err?.data?.message || err}`);
      toast.error(err?.data?.message || err);
    }
  }

  return (
    <>
      <div>
        <Link
          to='/'
          className='text-white font-semibold hover:underline ml-[20rem]'
        >
          Go Back
        </Link>
      </div>

      <div className='mt-[2rem]'>
        <div className='flex justify-center items-center'>
          <img
          src={`${IMAGE_BASE_URL}${movie?.image}`}
            alt={movie?.name}
            className='w-[70%] rounded '
          />
        </div>

        {/* container 1 */}
        <div className='container flex justify-between ml-[13rem] mt-[3rem]'>
          <section>
            <h2 className='text-5xl my-4 font-extrabold'>{movie?.name}</h2>
            <p className='my-4 xl:w-[35rem] md:w-[30rem] text-[#b0b0b0]'>
              {movie?.detail}
            </p>
          </section>
          <div className='mr-[21rem]'>
            <p className='text-2xl font-semibold'>
              Release Date: {movie?.year}
            </p>

            <div>
              {movie?.cast.map((c) => (
                <ul key={c._id}>
                  <li className='mt-[1rem]'>{c}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
        <div className='container ml-[13rem]'>
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
