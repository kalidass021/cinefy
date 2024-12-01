import { Dock, DockIcon } from './ui/dock';
import { IoHome } from 'react-icons/io5';
import { FaClapperboard } from 'react-icons/fa6';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { TiUserAdd } from 'react-icons/ti';
import { TbDeviceAnalytics } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useSignoutMutation } from '../redux/api/authApiSlice';
import { signout } from '../redux/slices/auth/authSlice';

const NavigationDock = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signoutApiCall] = useSignoutMutation();

  const signoutHandler = async () => {
    try {
      await signoutApiCall().unwrap();
      dispatch(signout());
      navigate('/signin');
      toast.success('Signed out...');
    } catch (err) {
      console.error(`Error while signout ${err?.data?.message}`);
      return toast.error(err?.data?.message);
    }
  };
  return (
    <div className='relative'>
      <Dock
        magnification={60}
        distance={100}
        className='fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-10 z-50'
      >
        <DockIcon className='bg-black/10 dark:bg-white/10 p-3'>
          <Link to='/'>
            <IoHome className='w-full h-full' />
          </Link>
        </DockIcon>
        <DockIcon className='bg-black/10 dark:bg-white/10 p-3'>
          <Link to='/movies'>
            <FaClapperboard className='size-full' />
          </Link>
        </DockIcon>
        {!userInfo && (
          <DockIcon className='bg-black/10 dark:bg-white/10 p-3'>
            <Link to='/signin'>
              <FaSignInAlt className='size-full' />
            </Link>
          </DockIcon>
        )}
        {!userInfo && (
          <DockIcon className='bg-black/10 dark:bg-white/10 p-3'>
            <Link to='/signup'>
              <TiUserAdd className='size-full' />
            </Link>
          </DockIcon>
        )}

        {userInfo && (
          <DockIcon className='bg-black/10 dark:bg-white/10 p-3'>
            <Link to='/profile'>
              <IoSettingsOutline className='size-full' />
            </Link>
          </DockIcon>
        )}
        {userInfo?.isAdmin && (
          <DockIcon className='bg-black/10 dark:bg-white/10 p-3'>
            <Link to='/admin/movies/dashboard'>
              <TbDeviceAnalytics className='size-full' />
            </Link>
          </DockIcon>
        )}
        {userInfo && (
          <DockIcon className='bg-black/10 dark:bg-white/10 p-3'>
            <button onClick={signoutHandler}>
              <FaSignOutAlt className='size-full' />
            </button>
          </DockIcon>
        )}
      </Dock>
    </div>
  );
};

export default NavigationDock;
