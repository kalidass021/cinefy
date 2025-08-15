import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NavigationDock } from './components';
// import useKeepAwake from './hooks/useKeepAwake';
// import { BASE_URL } from './config/constants';
import { Analytics } from '@vercel/analytics/react'; // for tracking the user interactions

const App = () => {
  // useKeepAwake(BASE_URL);
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <NavigationDock />
      <main className='py-3'>
        <Outlet />
      </main>
      <Analytics />
    </>
  );
};

export default App;
