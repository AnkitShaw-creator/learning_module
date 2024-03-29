
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home';
import ErrorPage from './components/Error/ErrorPage';
import CourseContent from './components/CourseContent/CourseContent';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ChangePassword from './components/Login/ChangePassword';
import Profile from './components/Profle/Profile';
import MediaDisplay from './components/CourseContent/MediaDisplay';

/**
 * The main file for project. The Root file for all the logical branching of the project
 * All the routes should be created here
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/profile', element: <Profile/> },
      {
        path: '/course-content/:courseCode', element: <CourseContent />,
        children: [
          { path: '/course-content/:courseCode/:linkId', element: <MediaDisplay/>},
        ]
      },
      { path: '/changePassword', element: <ChangePassword /> },
      
    ],
  }
])

function App() {
  /** only declare routes over here, program logic should be covered in thier respective files/folders */


  return (
    <div className="App">
      <main>
        <RouterProvider router={router}/>
      </main>
    </div> 
  );
}

export default App;
