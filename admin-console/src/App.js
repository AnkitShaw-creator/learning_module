
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home';
import ErrorPage from './Components/Error/ErrorPage';
import Login from './Components/Login/Login';
import ChangePassword from './Components/Login/ChangePassword';
import Profile from './Components/Profle/Profile';
import Dashboard from './Components/Dashboard/Dashboard';
import Redirect from './Redirect';
import AddCourses from './Components/Pages/Courses/AddCourses';
import AddTopic from './Components/Pages/Topics/AddTopic';
import Topics from './Components/Pages/Topics/Topics';
import Users from './Components/Pages/Users/Users';
import AddUser from './Components/Pages/Users/AddUser';
import Courses from './Components/Pages/Courses/Courses';
import Syllabus from './Components/Pages/Syllabus/Syllabus';
import AddSyllabus from './Components/Pages/Syllabus/AddSyllabus';
import Departments from './Components/Pages/Department/Departments';
import AddDepartment from './Components/Pages/Department/AddDepartment';
import BulkUploadUser from './Components/Pages/Users/BulkUploadUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Redirect />   // page will redirect to admin dashboard
  },
  {
    path: '/admin',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin/login', element: <Login />
      },
      {
        path: '/admin/changePassword', element: <ChangePassword />
      },
      {
        path: '/admin/dashboard', element: <Dashboard />
      },
      {
        path: '/admin/dashboard/profile', element: <Profile />
      },
      {
        path: '/admin/users', element: <Users />,
      },
      {
        path: '/admin/bulkupdate', element: <BulkUploadUser />
      },
      {
        path: '/admin/updateuser', element: <AddUser />
      },
      {
        path: '/admin/courses', element: <Courses />,
      },
      {
        path: '/admin/courses/add', element: <AddCourses />
      },
      {
        path: '/admin/topics', element: <Topics />,
      },
      {
        path: '/admin/topics/add', element: <AddTopic />
      },
      {
        path: '/admin/syllabus', element: <Syllabus />,
      },
      {
        path: '/admin/syllabus/add', element: <AddSyllabus />
      },
      {
        path: '/admin/department', element: <Departments />,
      },
      {
        path: '/admin/department/add', element: <AddDepartment />,
      }
    ],
  },
]);

const App = () => {
  return (
    <div className="App">
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  )
};

export default App;
