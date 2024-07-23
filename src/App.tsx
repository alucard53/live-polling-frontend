import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './pages'
import StudentLogin from './pages/studentLogin'
import Student from './pages/student'
import Teacher from './pages/teacher'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Index />,
    },
    {
      path: '/studentLogin',
      element: <StudentLogin />,
    },
    {
      path: '/student',
      element: <Student />,
    },
    {
      path: '/teacher',
      element: <Teacher />,
    },
  ])

  return <RouterProvider router={router} />
}

export default App
