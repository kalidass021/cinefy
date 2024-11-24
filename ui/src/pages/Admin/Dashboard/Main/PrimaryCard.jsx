import { useGetAllUsersQuery } from '../../../../redux/api/usersApiSlice';

const PrimaryCard = () => {
  const { data: users } = useGetAllUsersQuery();

  return (
    <div className='w-[100%] h-[10%] bg-[#282828] text-white rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-4'>Congratulations!</h2>
      <p>You have {users?.length} users.</p>
    </div>
  );
};

export default PrimaryCard;
