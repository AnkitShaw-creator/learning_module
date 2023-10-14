
import './App.css';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home';
import AuthContext from './context/auth-context';
import Login from './components/Login/Login';
import CourseContent from './components/CourseContent/CourseContent'
/**
 * The main file for project. The Root file for all the logical branching of the project
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element:<Login/>},
      { path: '/profile', element: '' },
      { path: '/course-content', element: <CourseContent/>}
    ],
  }
])



function App() {

  /** only declare routes over here, program logic should be covered in thier respective files/folders */

  /** alternative solution for axios */
  // const get = async () => {
  //   const res = fetch('http://localhost:3000') // for checking the connection to the backend
  //   console.log(res);
  // }
  // get()

  return (
    <div className="App">
      <main>
        <RouterProvider router={router}/>
      </main>
    </div>
  );
}

export default App;
