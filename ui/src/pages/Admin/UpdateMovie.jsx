import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from '../../redux/api/movieApiSlice';
import { toast } from 'react-toastify';

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: '',
    year: 0,
    detail: '',
    cast: [],
    rating: 0,
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie, error: updateMovieError }] =
    useUpdateMovieMutation();
  const [
    uploadImage,
    { isLoadiing: isUploadingImage, error: uploadImageError },
  ] = useUploadImageMutation();
  const [deleteMovie, { isLoading: isDeletingMovie, error: deleteMovieError }] =
    useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async (e) => {
    e.preventDefault();

    try {
      const { name, year, detail, cast } = movieData;
      if ((!name, !year, !detail, !cast)) {
        return toast.error('Please fill all required fields');
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (!uploadImageResponse.data) {
          console.error(
            `Failed to upload image ${
              uploadImageError || uploadImageResponse?.error
            }`
          );
          return toast.error('Failed to upload image');
        }
        // else
        uploadedImagePath = uploadImageResponse?.data?.image;
      }

      // update a movie
      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      });

      toast.success('Movie data updated');
      // navigate to the movies list page
      navigate('/admin/movies/list');
    } catch (err) {
      console.err(`Failed to update movie ${err}`);
      toast.error(
        `Failed to update movie ${updateMovieError?.message || err.message}`
      );
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id);
      toast.success('Movie deleted');
      navigate('/admin/movies/list');
    } catch (err) {
      console.error(`Failed to delete movie ${err}`);
      toast.error(
        `Failed to delete movie ${deleteMovieError?.message || err.message}`
      );
    }
  };

  return (
    <div className='container flex justify-center items-center mt-4'>
      <form>
        <p className='text-green-200 w-[50rem] text-2xl mb-4'>Update Movie</p>
        {/* name */}
        <div className='mb-4'>
          <label className='block'>Name</label>
          <input
            type='text'
            name='name'
            value={movieData.name}
            onChange={handleChange}
            className='border px-2 py-1 w-full'
          />
        </div>
        {/* year */}
        <div className='mb-4'>
          <label className='block'>Year</label>
          <input
            type='number'
            name='year'
            value={movieData.year}
            onChange={handleChange}
            className='border px-2 py-1 w-full'
          />
        </div>
        {/* detail */}
        <div className='mb-4'>
          <label className='block'>Name</label>
          <textarea
            name='detail'
            value={movieData.detail}
            onChange={handleChange}
            className='border px-2 py-1 w-full'
          />
        </div>
        {/* cast */}
        <div className='mb-4'>
          <label className='block'>Cast (comma-separated)</label>
          <input
            type='text'
            name='cast'
            value={movieData.cast.join(', ')}
            onChange={(e) => {
              setMovieData({ ...movieData, cast: e.target.value.split(', ') });
            }}
            className='border px-2 py-1 w-full'
          />
        </div>
        {/* image */}
        <div className='mb-4'>
          <label
            style={
              !selectedImage
                ? {
                    border: '1px solid #888',
                    borderRadius: '5px',
                    padding: '8px',
                  }
                : { border: '0', borderRadius: '0', padding: '0' }
            }
          >
            {!selectedImage && 'Upload Image'}
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              style={{ display: !selectedImage ? 'none' : 'block' }}
            />
          </label>
        </div>
        <button
          type='button'
          onClick={handleUpdateMovie}
          className='bg-teal-500 text-white px-4 py-2 rounded'
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage ? 'Updating...' : 'Update Movie'}
        </button>

        <button
          type='button'
          onClick={handleDeleteMovie}
          className='bg-red-500 text-white px-4 py-2 rounded ml-2'
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isDeletingMovie ? 'Deleting...' : 'Delete Movie'}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
