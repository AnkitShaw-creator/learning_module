
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home';
import ErrorPage from './Components/Error/ErrorPage';
import Login from './Components/Login/Login';
import ChangePassword from './Components/Login/ChangePassword';
import Profile from './Components/Profle/Profile';
import Dashboard from './Components/Dashboard/Dashboard';
import Redirect from './Redirect';
const router = createBrowserRouter([
  {
    path: '/',
    element:<Redirect/>
  },
  {
    path: '/admin',
    element: <Home/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin/login', element: <Login />
      },
      {
        path: '/admin/changePassword', element: <ChangePassword />
      },
      {
        path: '/admin/dashboard', element: <Dashboard />, children: [
          { path: '/admin/dashboard/profile', element: <Profile/> },
      ] },
      
      
    ],
  }
])



function App() {
  return (
    <div className="App">
      <main>
        <RouterProvider router={router}/>
      </main>
    </div>
  );
}

export default App;
