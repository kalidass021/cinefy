import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';
import { useSignupMutation } from '../../redux/api/authApiSlice';
import { setCredentials } from '../../redux/slices/auth/authSlice';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  // search parameter
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      return toast.error('All fields are required');
    }

    if (password !== confirmPassword) {
      return toast.error('Passwords not match');
    }

    // console.log({ username, email, password });

    try {
      const res = await signup({ username, email, password }).unwrap();
      // console.log('res', res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success('User signed up successfully');
    } catch (err) {
      console.error(`Error while submitting the signup form ${err}`);
      return toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className='pl-[10rem] flex flex-wrap'>
      <div className='mr-[4rem] mt-[5rem]'>
        <h1 className='text-2xl font-semibold mb-4'>Signup</h1>
        <form onSubmit={submitHandler} className='container w-[30rem] '>
          {/* Name */}
          <div className='my-[2rem]'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-white'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              autoComplete='username'
              className='mt-1 p-2 border rouded w-full'
              placeholder='Enter Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* Email */}
          <div className='my-[2rem]'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-white'
            >
              Email Address
            </label>
            <input
              type='email'
              id='email'
              autoComplete='email'
              className='mt-1 p-2 border rouded w-full'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div className='my-[2rem]'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-white'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              autoComplete='new-password'
              className='mt-1 p-2 border rouded w-full'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Confirm Password */}
          <div className='my-[2rem]'>
            <label
              htmlFor='confirmpassword'
              className='block text-sm font-medium text-white'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmpassword'
              autoComplete='new-password'
              className='mt-1 p-2 border rouded w-full'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            disabled={isLoading}
            type='submit'
            className='bg-teal-500 text-white px-4 py-2
          rounded cursor-pointer my-[1rem]'
          >
            {isLoading ? 'Signing up...' : 'Signup'}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className='mt-4'>
          <p className='text-white'>
            Alredy have an account?{' '}
            <Link
              to={redirect ? `/signin?redirect=${redirect}` : '/signin'}
              className='text-teal-500 hover:underline'
            >
              Signin
            </Link>
          </p>
        </div>
      </div>
      <img
        src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt=''
        className='w-[45%] xl:block md:hidden sm:hidden rounded-lg'
      />
    </div>
  );
};

export default Signup;
