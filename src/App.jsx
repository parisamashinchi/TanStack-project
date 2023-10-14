import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import Courses from './components/Courses/Courses.jsx';
import CourseDetails from './components/Courses/CourseDetails.jsx';
import NewCourse from './components/Courses/NewCourse.jsx';
import EditCourse from './components/Courses/EditCourse.jsx';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryCLient} from './util/http.js';
import { CourseProvider } from './components/context/CourseContext.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/courses" />,
  },
  {
    path: '/courses',
    element: <Courses />,

    children: [
      {
        path: '/courses/new',
        element: <NewCourse />,
      },
    ],
  },
  {
    path: '/courses/:id',
    element: <CourseDetails />,
    children: [
      {
        path: '/courses/:id/edit',
        element: <EditCourse />,
      },
    ],
  },
]);



function App() {
  return (
  <QueryClientProvider client={queryCLient}>
    <CourseProvider>
     <RouterProvider router={router} />;
    </CourseProvider>
  </QueryClientProvider>
  )
}

export default App;
