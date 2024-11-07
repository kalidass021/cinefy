import { useRouteError } from 'react-router-dom';

const ErrorDisplay = () => {
  const err = useRouteError();
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-red-50 text-gray-800 overflow-hidden'>
      <div className='p-8 bg-white shadow-lg rounded-lg'>
        <h1 className='mb-6 text-6xl font-extrabold text-red-600'>
          Oops!!
        </h1>
        <h2 className='mb-4 text-2xl font-bold'>Something went wrong</h2>
        <h3 className='text-lg'>
          <span className='font-bold'>Error {err.status}:</span>
          {err.statusText}
        </h3>
      </div>
    </div>
  );
};

export default ErrorDisplay;
