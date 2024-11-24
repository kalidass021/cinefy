import { useGetAllUsersQuery } from '../../../../redux/api/usersApiSlice';
import PrimaryCard from './PrimaryCard';

const RealtimeCard = () => {
  const { data: users } = useGetAllUsersQuery();
  return (
    <div className='w-[15rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4'>
      <h2 className='text-2xl font-bold mb-2'>
        Realtime
      </h2>
      <p className='text-gray-500 mb-4'>Live Update</p>
      <div className='border-t border-[#666] my-7' />
      <h2 className='text-2xl font-bold mb-2'>{users?.length}</h2>
      <p className='text-gray-500 mb-2'>Subscribe</p>
      <hr />
      <PrimaryCard />
    </div>
  );
};

export default RealtimeCard;
