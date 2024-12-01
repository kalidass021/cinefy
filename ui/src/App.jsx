import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import NavigationDock from './components/NavigationDock';

const App = () => {
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
