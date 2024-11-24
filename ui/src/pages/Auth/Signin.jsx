import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';
import { useSigninMutation } from '../../redux/api/authApiSlice';
import { setCredentials } from '../../redux/slices/auth/authSlice';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('All fields are required');
    }

    try {
      const res = await signin({email, password}).unwrap();
      console.log('res', res);
      dispatch(setCredentials({...res}));
      navigate(redirect);
    } catch (err) {
      console.error(`Error while submitting the signin form ${err}`);
      return toast.error(err?.data?.message || err?.error);
    }
  }
  return (
    <div>
      <section className='pl-[10rem] flex flex-wrap'>
        <div className='mr-[4rem] mt-[5rem] '>
          <h1 className='text-2xl font-semibold mb-4'>Signin</h1>

          <form onSubmit={submitHandler} className='container w-[30rem]'>
            <div className='my-[2rem]'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-white '
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                autoComplete='email'
                className='mt-1 p-2 border rounded w-full'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='my-[2rem]'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-white '
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                autoComplete='current-password'
                className='mt-1 p-2 border rounded w-full'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type='submit'
              className='bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
            >
              {isLoading ? 'Signing In...' : 'Signin'}
            </button>
            {isLoading && <Loader />}
          </form>
          <div className='mt-4'>
            <p className='text-white'>
              New User?{'  '}
              <Link
                to={redirect ? `/signup?redirect=${redirect}` : '/signup'}
                className='text-teal-500 hover:underline'
              >
                Signup
              </Link>
            </p>
          </div>
        </div>

        <img
          src='https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          className='w-[45%] xl:block md:hidden sm:hidden rounded-lg'
        />
      </section>
    </div>
  );
};

export default Signin;
