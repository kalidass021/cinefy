import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NavigationDock } from './components';
// import useKeepAwake from './hooks/useKeepAwake';
// import { BASE_URL } from './config/constants';

const App = () => {
  // useKeepAwake(BASE_URL);
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <NavigationDock />
      <main className='py-3'>
        <Outlet />
      </main>
    </>
  );
};

export default App;
