import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from '../../redux/api/genreApiSlice';
import GenreForm from '../../components/GenreForm';
import Modal from '../../components/Modal';

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      return toast.error('Genre name is required');
    }

    try {
      const result = await createGenre({ name }).unwrap();
      if (result.error) {
        return toast.error(result.error);
      }

      // else
      setName('');
      toast.success(`${result.name} is created`);
      refetch();
    } catch (err) {
      console.error(`Error while creating the genre ${err}`);
      return toast.error('Creating genre failed, try again');
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      return toast.error('Genre name is required');
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updatedGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        return toast.error(result.error);
      }

      // else
      toast.success(`${selectedGenre.name} updated to ${result.name}`);
      refetch();
      // make all of our state to default after update
      setSelectedGenre(null);
      setUpdatingName('');
      setModalVisible(false);
    } catch (err) {
      console.error(`Error while update genre ${err}`);
      return toast.error('Updating genre failed, try again');
    }
  };

  const handleDeleteGenre = async (e) => {
    e.preventDefault();

    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        return toast.error(result.error);
      }

      // else
      toast.success(`${selectedGenre.name} is deleted`);
      // instead of selectedGenre.name, we can display result.name also
      refetch();

      // make all of our state to default after deletion
      setSelectedGenre(null);
      setModalVisible(false);
    } catch (err) {
      console.error(`Error while genre deletion ${err}`);
      return toast.error('Genre deletion failed, Try again');
    }
  };

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      <div className='md:w-3/4 p-3'>
        <h1 className='h-12'>Manage Genres</h1>
        {/* <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} /> */}
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        <div className='flex flex-wrap'>
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className='bg-white border border-teal-500 text-teal-500 py-2 px-4
              rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2
              focus:ring-teal-500 focus:ring-opacity-50'
                onClick={() => {
                  setModalVisible(true);
                  setSelectedGenre(genre);
                  setUpdatingName(genre.name);
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText='Update'
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
