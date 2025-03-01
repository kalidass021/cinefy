import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from '../../redux/api/movieApiSlice';
import { useFetchGenresQuery } from '../../redux/api/genreApiSlice';
import { toast } from 'react-hot-toast';

const CreateMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: '',
    year: 0,
    detail: '',
    cast: [],
    rating: 0,
    image: null,
    genre: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie, error: createMovieError }] =
    useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageError },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?.id || '',
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // for genre selector
    if (name === 'genre') {
      const selectedGenre = genres.find((genre) => genre.name === value);
      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : '',
      }));
    }

    // else
    // others
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    try {
      const { name, year, detail, cast } = movieData;
      if (!name || !year || !detail || !cast.length || !selectedImage) {
        return toast.error('Please fill all required fields');
      }

      let uploadedImagePath = null;
      // upload the image if selected
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
      // create a new movie with uploadedImagePath
      await createMovie({
        ...movieData,
        image: uploadedImagePath,
      });

      toast.success('Movie added to database');

      // navigate to the movies list page
      navigate('/admin/movies/list');

      // reset the formData
      setMovieData({
        name: '',
        year: 0,
        detail: '',
        cast: [],
        rating: 0,
        image: null,
        genre: '',
      });
      
    } catch (err) {
      console.error(`Failed to create movie ${err}`);
      toast.error(
        `Failed to create movie ${createMovieError?.message || err?.message}`
      );
    }
  };

  return (
    <div className='container flex justify-center items-center mt-4'>
      <form>
        <p className='text-green-200 w-[50rem] text-2xl mb-4'>Create Movie</p>
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
          <label className='block'>Detail</label>
          <textarea
            name='detail'
            value={movieData.detail}
            className='border px-2 py-1 w-full'
            onChange={handleChange}
          />
        </div>
        {/* cast */}
        <div className='mb-4'>
          <label className='block'>Cast (comma-separated)</label>
          <input
            type='text'
            name='cast'
            value={movieData.cast.join(', ')}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(', ') })
            }
            className='border px-2 py-1 w-full'
          />
        </div>
        {/* genre */}
        <div className='mb-4'>
          <label className='block'>Select Genre</label>
          <select
            name='genre'
            value={movieData.genre}
            className='border px-2 py-1 w-full'
            onChange={handleChange}
          >
            {isLoadingGenres ? (
              <option>Loading genres...</option>
            ) : (
              genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
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
          onClick={handleCreateMovie}
          className='bg-teal-500 text-white px-4 py-2 rounded'
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? 'Creating' : 'Create Movie'}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
