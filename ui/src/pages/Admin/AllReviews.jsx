import {
  useGetAllMoviesQuery,
  useDeleteReviewMutation,
} from '../../redux/api/movieApiSlice';
import { toast } from 'react-toastify';

const AllReviews = () => {
  const {
    data: allMovies,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetAllMoviesQuery();
  const [deleteReview] = useDeleteReviewMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // filter the movies that has reviews
  const reviewedMovies = allMovies.filter((movie) => movie?.reviews.length);

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteReview({ movieId, reviewId });
      toast.success('Review deleted');
      refetch();
    } catch (err) {
      console.error(`Error while deleting review ${err}`);
      toast.error('Error while deleting comment');
    }
  };

  return (
    <div>
      {reviewedMovies.map((movie) => (
        <section
          key={movie._Id}
          className='flex flex-col justify-center items-center'
        >
          <h2 className='text-2xl font-bold m-4'>{movie.name}</h2>
          {movie?.reviews.map((review) => (
            <div
              key={review._id}
              className='bg-[#1a1a1a] p-4 rounded-lg w-[50%] mt-[2rem]'
            >
              <div className='flex justify-between'>
                <strong className='text-[#b0b0b0] '>{review.name}</strong>
                <p className='text-[#b0b0b0]'>
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>
              <p className='my-4'>{review.comment}</p>
              <button
                className='text-red-500'
                onClick={() => handleDeleteComment(movie._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default AllReviews;
