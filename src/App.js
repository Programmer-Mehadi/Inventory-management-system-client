import { useContext, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AuthContext } from './contexts/AuthProvider';
import router from './routes/routes';
function App() {

  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
  }, [user])

  return (
    <div className="App max-w-[1440px] mx-auto">
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
